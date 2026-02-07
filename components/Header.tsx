"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import LoginDialog from "@/components/LoginDialog";

const menuItems = [
  { label: "Lag søknad", href: "/generator" },
  { label: "Lag CV", href: "/cv" },
  { label: "Priser", href: "#priser" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <>
    <header className="sticky top-0 z-[1000] w-full border-b border-black/5 bg-background/80 backdrop-blur-md h-16 flex items-center">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex items-center gap-2">
            <span className="text-lg font-black uppercase tracking-[-0.05em] text-foreground">
              CV<span className="opacity-40">pilot</span>
            </span>
          </Link>
        </motion.div>

        <nav aria-label="Hovednavigasjon">
          {/* Desktop: vanlige knapper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-6"
          >
            <a
              href="#priser"
              className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
            >
              Priser
            </a>
            <Button asChild className="relative overflow-hidden group bg-transparent border border-foreground/20 text-foreground font-bold uppercase text-[11px] tracking-wider px-5 h-10 rounded-none hover:bg-foreground hover:text-background transition-all">
              <Link href="/cv">
                <span className="relative z-10 flex items-center gap-2">
                  Lag CV
                </span>
              </Link>
            </Button>
            <Button asChild className="relative overflow-hidden group bg-foreground text-background font-bold uppercase text-[11px] tracking-wider px-5 h-10 rounded-none hover:bg-foreground/90 transition-all">
              <Link href="/generator">
                <span className="relative z-10 flex items-center gap-2">
                  Lag søknad
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </Button>
            {!loading && user && (
              <Link
                href="/dashboard"
                className="text-[13px] font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Mine dokumenter
              </Link>
            )}
            {!loading && (
              user ? (
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/50 hover:text-foreground transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Logg ut
                </button>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/50 hover:text-foreground transition-colors"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Logg inn
                </button>
              )
            )}
          </motion.div>

          {/* Mobil: meny-knapp */}
          <div className="md:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center border border-foreground/10 text-foreground transition-colors hover:bg-foreground hover:text-background"
              aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-14 w-48 border border-foreground/10 bg-background shadow-lg"
                >
                  {menuItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:bg-foreground hover:text-background transition-all border-b border-foreground/5"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {!loading && user && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:bg-foreground hover:text-background transition-all border-b border-foreground/5"
                    >
                      Mine dokumenter
                    </Link>
                  )}
                  {!loading && (
                    user ? (
                      <button
                        onClick={() => { signOut(); setMenuOpen(false); }}
                        className="block w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:bg-foreground hover:text-background transition-all"
                      >
                        Logg ut
                      </button>
                    ) : (
                      <button
                        onClick={() => { setLoginOpen(true); setMenuOpen(false); }}
                        className="block w-full text-left px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-foreground/70 hover:bg-foreground hover:text-background transition-all"
                      >
                        Logg inn
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </header>

    <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
}
