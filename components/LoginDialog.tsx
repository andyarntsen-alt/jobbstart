"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setError("");
    setLoading(true);

    const { error } = await signIn(email.trim());

    if (error) {
      setError(error);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  function handleClose(open: boolean) {
    if (!open) {
      setEmail("");
      setSent(false);
      setError("");
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-border">
        <DialogHeader>
          <div className="flex h-10 w-10 items-center justify-center border border-border mb-2">
            <Mail className="h-4 w-4" />
          </div>
          <DialogTitle className="text-base">
            {sent ? "Sjekk e-posten din" : "Logg inn"}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {sent
              ? `Vi har sendt en innloggingslenke til ${email}. Klikk lenken for å logge inn.`
              : "Skriv inn e-postadressen din, så sender vi deg en innloggingslenke."}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleClose(false)}
              className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Lukk
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <Input
              type="email"
              placeholder="din@epost.no"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="h-10 rounded-none border-border text-sm"
            />
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading || !email.trim()}
              className="w-full rounded-none h-10 bg-foreground text-background font-bold uppercase text-[11px] tracking-wider hover:bg-foreground/90"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Send innloggingslenke"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
