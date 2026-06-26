import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Upload, ListChecks, ThumbsUp } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Upload,
    title: "Upload the contract",
    body: "YayTrack pulls every date, party, and contingency.",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "Review the timeline",
    body: "Tasks and reminders already built.",
  },
  {
    n: "03",
    icon: ThumbsUp,
    title: "Approve and go",
    body: "YayTrack watches every file and flags what needs you.",
  },
];

export function HowItWorksAuto() {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % 3), 2800);
    return () => clearInterval(id);
  }, [tick]);

  const restart = () => {
    setActive(0);
    setTick((t) => t + 1);
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-sm uppercase tracking-[0.2em] text-accent-warm">How it works</div>
            <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">From PDF to closed in three moves.</h2>
          </div>
          <button
            onClick={restart}
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm text-ink/70 transition-colors hover:bg-ink hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Restart
          </button>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.n}
                  onClick={() => setActive(i)}
                  className={`relative w-full rounded-2xl border p-6 text-left transition-all ${
                    isActive
                      ? "border-accent-warm/30 bg-[#FFF4EE] shadow-soft"
                      : "border-ink/10 bg-white hover:border-ink/20"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="how-active"
                      className="absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-r-full bg-accent-warm"
                    />
                  )}
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 flex-none items-center justify-center rounded-xl ${isActive ? "bg-accent-warm text-white" : "bg-ink/5 text-ink/60"}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-ink/40">{s.n}</div>
                      <div className="font-display text-xl font-semibold text-ink">{s.title}</div>
                      <p className="mt-1 text-sm text-ink/65">{s.body}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="relative h-[460px] rounded-3xl border border-ink/10 bg-gradient-to-br from-white to-[#FAFAF8] p-6 shadow-lift">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, scale: 0.97 }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                className="h-full"
              >
                {active === 0 && (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="rounded-2xl border-2 border-dashed border-accent-warm/40 bg-white p-10">
                      <Upload className="mx-auto h-10 w-10 text-accent-warm" />
                      <div className="mt-3 font-semibold text-ink">Drop contract here</div>
                      <div className="text-xs text-ink/50">PDF · DOCX · scan · photo</div>
                    </div>
                    <div className="mt-6 text-sm text-ink/60">Extracting 23 fields…</div>
                  </div>
                )}
                {active === 1 && (
                  <div className="space-y-2.5">
                    {[
                      ["Inspection", "Jul 28"],
                      ["EMD due", "Aug 1"],
                      ["Appraisal", "Aug 5"],
                      ["Loan contingency", "Aug 9"],
                      ["Final walkthrough", "Aug 13"],
                      ["Closing", "Aug 14"],
                    ].map(([t, d], i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between rounded-xl border border-ink/5 bg-white px-4 py-3"
                      >
                        <span className="text-ink/80">{t}</span>
                        <span className="text-sm text-ink/50">{d}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {active === 2 && (
                  <div className="flex h-full flex-col justify-center gap-4">
                    <div className="rounded-2xl bg-gradient-to-br from-accent-warm to-[#FFA47A] p-6 text-white">
                      <div className="text-xs uppercase tracking-wider opacity-80">Needs you today</div>
                      <div className="mt-1 text-2xl font-bold">Approve EMD wire</div>
                      <button className="mt-4 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-accent-warm">Approve →</button>
                    </div>
                    {["Filed inspection report ✓", "Synced to calendar ✓", "Client portal updated ✓"].map((t) => (
                      <div key={t} className="rounded-xl border border-ink/5 bg-white px-4 py-2.5 text-sm text-ink/70">{t}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}