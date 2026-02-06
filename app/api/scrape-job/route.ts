import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { FINN_URL_PATTERN } from "@/lib/constants";
import { rateLimit } from "@/lib/rate-limit";

function extractFinnId(url: string): string | null {
  const match = url.match(FINN_URL_PATTERN);
  return match ? match[3] : null;
}

export async function POST(req: NextRequest) {
  try {
    const { success } = await rateLimit(req, "scrape");
    if (!success) {
      return NextResponse.json(
        { error: "For mange forespørsler. Prøv igjen senere." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL er påkrevd" },
        { status: 400 }
      );
    }

    // Domain whitelist — kun FINN.no tillatt
    try {
      const parsedUrl = new URL(url.trim());
      const hostname = parsedUrl.hostname.replace(/^www\./, "");
      if (hostname !== "finn.no") {
        return NextResponse.json(
          { error: "Kun FINN.no-lenker er støttet. Lim inn en lenke fra finn.no/job/." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Ugyldig URL-format." },
        { status: 400 }
      );
    }

    const finnId = extractFinnId(url.trim());
    if (!finnId) {
      return NextResponse.json(
        { error: "Ugyldig FINN.no-URL. Bruk en lenke som: finn.no/job/ad/123456" },
        { status: 400 }
      );
    }

    // Try the standard FINN.no job ad URL
    const finnUrl = `https://www.finn.no/job/fulltime/ad.html?finnkode=${finnId}`;

    const response = await fetch(finnUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nb-NO,nb;q=0.9,no;q=0.8,nn;q=0.7,en;q=0.6",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Fant ikke annonsen. Sjekk at lenken er riktig og at annonsen fortsatt er aktiv." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Kunne ikke hente annonsen fra FINN.no. Prøv igjen senere." },
        { status: 502 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract job title
    const title =
      $('h1').first().text().trim() ||
      $('h2').first().text().trim() ||
      $('meta[property="og:title"]').attr("content")?.trim() ||
      "";

    // Extract company name - FINN uses various structures
    const company =
      $('[data-testid="company-name"]').text().trim() ||
      $('a[href*="/company/"]').first().text().trim() ||
      $(".org-name").text().trim() ||
      $('span:contains("Arbeidsgiver")').parent().find("a").text().trim() ||
      "";

    // Extract the main job description content
    // FINN.no uses various selectors for job content
    let description = "";

    // Try common FINN.no content selectors
    const contentSelectors = [
      '[data-testid="ad-description"]',
      '[data-testid="object-description"]',
      ".import-decoration",
      ".job-description",
      '[class*="Description"]',
      "article",
      ".ad-content",
    ];

    for (const selector of contentSelectors) {
      const el = $(selector);
      if (el.length && el.text().trim().length > 50) {
        description = el.text().trim();
        break;
      }
    }

    // Fallback: grab all text from the main content area
    if (!description) {
      const mainContent = $("main").first();
      if (mainContent.length) {
        // Remove nav, header, footer, script elements
        mainContent.find("nav, header, footer, script, style, button").remove();
        description = mainContent.text().trim();
      }
    }

    // Extract key details
    const details: string[] = [];

    // Look for definition lists or key-value pairs common on FINN
    $("dt, .u-strong, [class*=\"key\"]").each((_, el) => {
      const key = $(el).text().trim();
      const value =
        $(el).next("dd, span, [class*=\"value\"]").text().trim() ||
        $(el).parent().text().replace(key, "").trim();
      if (key && value && value.length < 200) {
        details.push(`${key}: ${value}`);
      }
    });

    if (!description && !title) {
      return NextResponse.json(
        {
          error:
            "Kunne ikke lese annonseteksten. FINN.no kan ha endret strukturen. Prøv å lime inn teksten manuelt.",
        },
        { status: 422 }
      );
    }

    // Build the combined text
    const parts: string[] = [];
    if (title) parts.push(title);
    if (company) parts.push(`Bedrift: ${company}`);
    if (details.length > 0) parts.push(details.join("\n"));
    if (description) parts.push(description);

    const text = parts.join("\n\n");

    // Clean up excessive whitespace
    const cleanedText = text
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]+/g, " ")
      .trim();

    return NextResponse.json({
      text: cleanedText,
      title,
      company,
    });
  } catch (error: unknown) {
    console.error("Scrape job error:", error);

    if (error instanceof DOMException && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "Tidsavbrudd ved henting fra FINN.no. Prøv igjen." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Noe gikk galt ved henting av annonsen. Prøv å lime inn teksten manuelt." },
      { status: 500 }
    );
  }
}
