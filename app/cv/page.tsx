"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CVForm from "@/components/cv/CVForm";
import CVSeoContent from "@/components/cv/CVSeoContent";

export default function CVPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              JOBBSTART
            </span>
          </Link>
          <Button variant="outline" size="sm" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Tilbake
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-10 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bygg din CV</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Fyll inn informasjonen steg for steg, bruk KI for å forbedre
            teksten, og last ned en profesjonell PDF.
          </p>
        </div>

        <CVForm />
      </main>

      <CVSeoContent />
    </div>
  );
}
