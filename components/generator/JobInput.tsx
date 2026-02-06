"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Link as LinkIcon, Sparkles } from "lucide-react";
import type { ContactInfo } from "@/types/application";
import { FINN_URL_PATTERN } from "@/lib/constants";

interface JobInputProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  userBackground: string;
  onUserBackgroundChange: (value: string) => void;
  contactInfo: ContactInfo;
  onContactInfoChange: (info: ContactInfo) => void;
  onFetchFromUrl: (url: string) => Promise<void>;
  isFetchingUrl: boolean;
  urlError: string;
  onImproveBackground: () => void;
  isImprovingBackground: boolean;
  improveError: string;
}

export default function JobInput({
  jobDescription,
  onJobDescriptionChange,
  userBackground,
  onUserBackgroundChange,
  contactInfo,
  onContactInfoChange,
  onFetchFromUrl,
  isFetchingUrl,
  urlError,
  onImproveBackground,
  isImprovingBackground,
  improveError,
}: JobInputProps) {
  const [finnUrl, setFinnUrl] = useState("");

  const isFinnUrl = FINN_URL_PATTERN.test(finnUrl.trim());

  function handleUrlChange(value: string) {
    setFinnUrl(value);
  }

  async function handleFetch() {
    if (!isFinnUrl) return;
    await onFetchFromUrl(finnUrl.trim());
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="finn-url" className="mb-2 text-base font-semibold">
          FINN.no-lenke (valgfritt)
        </Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="finn-url"
              placeholder="https://www.finn.no/job/ad/123456"
              value={finnUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleFetch}
            disabled={!isFinnUrl || isFetchingUrl}
          >
            {isFetchingUrl ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Henter...
              </>
            ) : (
              "Hent annonse"
            )}
          </Button>
        </div>
        {urlError && (
          <p className="mt-1.5 text-xs font-medium text-red-600">{urlError}</p>
        )}
        {!urlError && (
          <p className="mt-1.5 text-xs text-muted-foreground">
            Lim inn en FINN.no-lenke for å hente annonseteksten automatisk
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="job-description" className="mb-2 text-base font-semibold">
          Stillingsannonse *
        </Label>
        <Textarea
          id="job-description"
          placeholder="Lim inn hele stillingsannonsen her, eller bruk FINN.no-lenken over..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          className="min-h-[200px] resize-y"
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          {jobDescription.length} / 5000 tegn
        </p>
      </div>

      <div>
        <Label htmlFor="background" className="mb-2 text-base font-semibold">
          Din bakgrunn (valgfritt)
        </Label>
        <Textarea
          id="background"
          placeholder="Beskriv din erfaring, utdanning og ferdigheter som er relevante for stillingen..."
          value={userBackground}
          onChange={(e) => onUserBackgroundChange(e.target.value)}
          className="min-h-[120px] resize-y"
          disabled={isImprovingBackground}
        />
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Jo mer du skriver, jo bedre blir søknaden tilpasset deg.
          </p>
          {userBackground.trim().length >= 10 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onImproveBackground}
              disabled={isImprovingBackground}
              className="h-7 gap-1.5 text-[11px] font-semibold uppercase tracking-wider"
            >
              {isImprovingBackground ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Forbedrer...
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3" />
                  Forbedre med KI
                </>
              )}
            </Button>
          )}
        </div>
        {improveError && (
          <p className="mt-1 text-xs font-medium text-red-600">{improveError}</p>
        )}
      </div>

      <div className="space-y-3">
        <Label className="text-base font-semibold">Kontaktinfo (valgfritt)</Label>
        <div className="grid gap-3 sm:grid-cols-3">
          <Input
            placeholder="Fullt navn"
            value={contactInfo.name}
            onChange={(e) =>
              onContactInfoChange({ ...contactInfo, name: e.target.value })
            }
          />
          <Input
            placeholder="Telefon"
            value={contactInfo.phone}
            onChange={(e) =>
              onContactInfoChange({ ...contactInfo, phone: e.target.value })
            }
          />
          <Input
            placeholder="E-post"
            type="email"
            value={contactInfo.email}
            onChange={(e) =>
              onContactInfoChange({ ...contactInfo, email: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
