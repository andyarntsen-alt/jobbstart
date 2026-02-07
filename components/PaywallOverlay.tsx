"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PaywallOverlayProps {
  visiblePercent: number;
  children: React.ReactNode;
  ctaText: string;
  onUpgrade: () => void;
  watermarkText?: string;
}

export default function PaywallOverlay({
  visiblePercent,
  children,
  ctaText,
  onUpgrade,
  watermarkText,
}: PaywallOverlayProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const visibleHeight = contentHeight * visiblePercent;

  return (
    <div className="relative">
      {/* Invisible full-height content for measurement */}
      <div
        ref={contentRef}
        className="absolute inset-0 invisible pointer-events-none"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Visible clipped content */}
      <div
        className="overflow-hidden"
        style={{ maxHeight: contentHeight > 0 ? `${visibleHeight}px` : "none" }}
      >
        {children}
      </div>

      {/* Blur overlay + CTA */}
      {contentHeight > 0 && (
        <div className="relative">
          {/* Gradient fade */}
          <div
            className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background pointer-events-none"
          />

          {/* Blurred content area */}
          <div className="relative bg-background border border-border p-8">
            {/* Watermark */}
            {watermarkText && (
              <div
                className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none"
                aria-hidden="true"
              >
                <span className="text-6xl font-bold text-foreground/5 rotate-[-30deg] whitespace-nowrap">
                  {watermarkText}
                </span>
              </div>
            )}

            {/* CTA */}
            <div className="relative flex flex-col items-center gap-4 py-6">
              <div className="flex h-12 w-12 items-center justify-center border border-border">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center max-w-xs">
                {ctaText}
              </p>
              <Button
                onClick={onUpgrade}
                className="bg-foreground text-background hover:bg-foreground/80"
              >
                Lås opp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
