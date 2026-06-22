"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Calendar, Mail, ArrowLeft, Check, Clock } from "lucide-react";

type Step = "intro" | "schedule" | "confirm" | "done";

function getNextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) days.push(new Date(d));
  }
  return days;
}

const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

function formatDay(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

export function CoordinatorWidget() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const days = getNextBusinessDays(5);

  const resetFlow = () => {
    setStep("intro");
    setSelectedDay(null);
    setSelectedSlot(null);
    setEmail("");
  };

  const closeWidget = () => {
    setOpen(false);
    setTimeout(resetFlow, 300);
  };

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
            className="pointer-events-auto w-[320px] overflow-hidden rounded-2xl border border-border bg-card/95 p-5 shadow-card backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2">
                {step !== "intro" && step !== "done" && (
                  <button
                    aria-label="Back"
                    onClick={() => setStep(step === "confirm" ? "schedule" : "intro")}
                    className="mt-1 grid h-6 w-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-pink">
                    {step === "done" ? "Confirmed" : "Live now"}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold leading-tight">
                    {step === "schedule"
                      ? "Pick a time"
                      : step === "confirm"
                        ? "Confirm details"
                        : step === "done"
                          ? "You're booked"
                          : "Talk to a Coordinator"}
                  </div>
                </div>
              </div>
              <button
                aria-label="Close"
                onClick={closeWidget}
                className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="mt-2 text-sm text-muted-foreground">
                    Real humans, ready to scope your next deal. We reply within one business hour.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      onClick={() => setStep("schedule")}
                      className="group flex items-center justify-between rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule a 15-min audit
                      </span>
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </button>
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

              {step === "schedule" && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Day
                  </div>
                  <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
                    {days.map((d) => {
                      const active = selectedDay?.toDateString() === d.toDateString();
                      return (
                        <button
                          key={d.toISOString()}
                          onClick={() => setSelectedDay(d)}
                          className={`shrink-0 rounded-lg border px-2.5 py-2 text-center transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-foreground hover:bg-muted"
                          }`}
                        >
                          <div className="text-[10px] uppercase tracking-wide opacity-70">
                            {d.toLocaleDateString(undefined, { weekday: "short" })}
                          </div>
                          <div className="text-sm font-semibold leading-tight">
                            {d.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Time
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map((slot) => {
                      const active = selectedSlot === slot;
                      const disabled = !selectedDay;
                      return (
                        <button
                          key={slot}
                          disabled={disabled}
                          onClick={() => setSelectedSlot(slot)}
                          className={`rounded-lg border px-2 py-2 text-xs font-medium transition-colors ${
                            active
                              ? "border-foreground bg-foreground text-background"
                              : "border-border text-foreground hover:bg-muted"
                          } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    disabled={!selectedDay || !selectedSlot}
                    onClick={() => setStep("confirm")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Continue
                    <span>→</span>
                  </button>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3"
                >
                  <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm">
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4 text-brand-pink" />
                      {selectedDay ? formatDay(selectedDay) : ""}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {selectedSlot} · 15 minutes
                    </div>
                  </div>

                  <label className="mt-3 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Your email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-foreground"
                  />

                  <button
                    disabled={!/.+@.+\..+/.test(email)}
                    onClick={() => setStep("done")}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                  >
                    Confirm appointment
                  </button>
                </motion.div>
              )}

              {step === "done" && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 18 }}
                    className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-background"
                  >
                    <Check className="h-6 w-6" />
                  </motion.div>
                  <p className="mt-3 text-sm font-medium">
                    {selectedDay ? formatDay(selectedDay) : ""} · {selectedSlot}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    A calendar invite is on its way to <span className="font-medium text-foreground">{email}</span>.
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      to="/contact"
                      onClick={closeWidget}
                      className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Add more details
                    </Link>
                    <button
                      onClick={closeWidget}
                      className="rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-95"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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