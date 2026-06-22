"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Calendar, Mail } from "lucide-react";

export function CoordinatorWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && visible && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto w-[300px] overflow-hidden rounded-2xl border border-border bg-card/95 p-5 shadow-card backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-pink">
                  Live now
                </div>
                <div className="mt-1 font-display text-lg font-semibold leading-tight">
                  Talk to a Coordinator
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Real humans, ready to scope your next deal. We reply within one business hour.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule a 15-min audit
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <a
                href="mailto:team@yaytrack.com"
                className="group flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  team@yaytrack.com
                </span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close coordinator widget" : "Talk to a coordinator"}
            aria-expanded={open}
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="pointer-events-auto group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground py-3 pl-4 pr-5 text-sm font-semibold text-background shadow-card"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-10 rounded-full bg-gradient-brand opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70"
            />
            <span className="relative grid h-6 w-6 place-items-center">
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid place-items-center"
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="chat"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid place-items-center"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="relative hidden sm:inline">
              {open ? "Close" : "Talk to a Coordinator"}
            </span>
            {!open && (
              <span
                aria-hidden
                className="relative flex h-2 w-2"
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-pink opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-pink" />
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}