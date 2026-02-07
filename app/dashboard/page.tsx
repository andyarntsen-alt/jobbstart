"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Loader2,
  FileText,
  Pencil,
  Trash2,
  LogIn,
} from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import {
  fetchApplications,
  deleteApplication,
  fetchCV,
} from "@/lib/supabase/storage";
import DownloadButtons from "@/components/generator/DownloadButtons";
import type { SavedApplication, SavedCV } from "@/types/dashboard";
import type { ContactInfo, ExportLayout } from "@/types/application";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<SavedApplication[]>([]);
  const [cv, setCv] = useState<SavedCV | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewApp, setViewApp] = useState<SavedApplication | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    Promise.all([
      fetchApplications(user.id),
      fetchCV(user.id),
    ]).then(([apps, savedCv]) => {
      setApplications(apps);
      setCv(savedCv);
      setLoading(false);
    });
  }, [user]);

  async function handleDelete(id: string) {
    if (!user) return;
    setDeleting(id);
    const ok = await deleteApplication(user.id, id);
    if (ok) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
    }
    setDeleting(null);
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-black/5 bg-background">
          <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
            <Link href="/">
              <span className="text-2xl font-extrabold tracking-tight">
                CVPILOT
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
        <main className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10 py-24 text-center">
          <div className="flex h-12 w-12 mx-auto items-center justify-center border border-border mb-4">
            <LogIn className="h-5 w-5 opacity-40" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Logg inn</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Logg inn for å se dine lagrede søknader og CV-er.
          </p>
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90 rounded-none">
            <Link href="/">Gå til forsiden</Link>
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-black/5 bg-background">
        <div className="mx-auto flex h-[80px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
          <Link href="/">
            <span className="text-2xl font-extrabold tracking-tight">
              CVPILOT
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

      <main className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Mine dokumenter</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Dine lagrede søknader og CV-er.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-foreground/30" />
          </div>
        ) : (
          <div className="space-y-12">
            {/* CV Section */}
            <section>
              <span className="industrial-label mb-4 block">/ DIN CV</span>
              {cv ? (
                <div className="border border-border p-5 md:p-6 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">
                      {cv.name || "Uten navn"}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Mal: {cv.template} · Sist oppdatert: {formatDate(cv.updatedAt)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 shrink-0"
                    asChild
                  >
                    <Link href="/cv">
                      <Pencil className="h-3.5 w-3.5" />
                      Rediger CV
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed border-border bg-muted/30 p-10 text-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Du har ikke lagret noen CV enda.
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 text-sm"
                      asChild
                    >
                      <Link href="/cv">Lag din CV</Link>
                    </Button>
                  </div>
                </div>
              )}
            </section>

            {/* Applications Section */}
            <section>
              <span className="industrial-label mb-4 block">
                / DINE SØKNADER {applications.length > 0 && `(${applications.length})`}
              </span>
              {applications.length > 0 ? (
                <div className="space-y-1">
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="border border-border p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-white transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="h-3.5 w-3.5 opacity-40 shrink-0" />
                          <p className="text-sm font-bold truncate">
                            {app.jobTitle || "Søknad"}
                          </p>
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                          Mal: {app.template} · {formatDate(app.createdAt)}
                        </p>
                        <p className="text-xs text-foreground/50 mt-1.5 line-clamp-1">
                          {app.generatedText.slice(0, 120)}...
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewApp(app)}
                        >
                          Se søknad
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(app.id)}
                          disabled={deleting === app.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deleting === app.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center border-2 border-dashed border-border bg-muted/30 p-10 text-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Du har ikke generert noen søknader enda.
                    </p>
                    <Button
                      variant="link"
                      className="mt-2 text-sm"
                      asChild
                    >
                      <Link href="/generator">Lag din første søknad</Link>
                    </Button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* View application dialog */}
      <Dialog open={!!viewApp} onOpenChange={(open) => !open && setViewApp(null)}>
        {viewApp && (
          <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto border-border">
            <DialogHeader>
              <DialogTitle className="text-base">
                {viewApp.jobTitle || "Søknad"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Mal: {viewApp.template} · {formatDate(viewApp.createdAt)} · {viewApp.wordCount} ord
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed border border-border p-5 bg-white">
              {viewApp.generatedText}
            </div>
            <div className="mt-4">
              <DownloadButtons
                text={viewApp.generatedText}
                canExport={true}
                isPaid={true}
                contactInfo={viewApp.contactInfo}
                layout={viewApp.layout as ExportLayout}
                jobTitle={viewApp.jobTitle || undefined}
                onUpgradeClick={() => {}}
              />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
