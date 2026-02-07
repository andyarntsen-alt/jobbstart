import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";
import { redis } from "@/lib/redis";

// 10 AI requests per 24 hours per IP
const aiLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "24 h"),
      prefix: "rl:ai",
    })
  : null;

// 20 scrape requests per 24 hours per IP
const scrapeLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "24 h"),
      prefix: "rl:scrape",
    })
  : null;

// 5 checkout requests per hour per IP
const checkoutLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:checkout",
    })
  : null;

// 10 verify requests per hour per IP
const verifyLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      prefix: "rl:verify",
    })
  : null;

const limiters = {
  ai: aiLimiter,
  scrape: scrapeLimiter,
  checkout: checkoutLimiter,
  verify: verifyLimiter,
};

export function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function rateLimit(
  req: NextRequest,
  type: "ai" | "scrape" | "checkout" | "verify"
): Promise<{ success: boolean; remaining: number }> {
  const limiter = limiters[type];

  if (!limiter) {
    if (process.env.NODE_ENV === "production") {
      console.error(`Rate limiter "${type}" unavailable in production`);
      return { success: false, remaining: 0 };
    }
    return { success: true, remaining: 999 };
  }

  const ip = getIp(req);
  const result = await limiter.limit(ip);

  return { success: result.success, remaining: result.remaining };
}
