import { motion } from "motion/react";
import { X, Check } from "lucide-react";

const rows = [
  ["Re-typing dates by hand", "Dates, parties, deadlines extracted in seconds."],
  ["Hunting your inbox for the right deal", "Every email filed to the right transaction."],
  ["Fielding 'where are we?' calls", "Clients check a live link; the calls stop."],
  ["Opening 14 tabs to remember what's due", "One morning brief tells you what needs you today."],
];

export function BeforeAfter() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
            Your day now vs. your day on YayTrack
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="rounded-3xl border border-ink/10 bg-white p-8 shadow-soft"
          >
            <div className="mb-6 text-sm uppercase tracking-[0.2em] text-ink/50">Your day now</div>
            <ul className="space-y-4">
              {rows.map(([before]) => (
                <li key={before} className="flex items-start gap-3 text-ink/70">
                  <X className="mt-0.5 h-5 w-5 flex-none text-ink/30" />
                  <span>{before}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="rounded-3xl border border-accent-warm/20 bg-gradient-to-br from-white to-[#FFF4EE] p-8 shadow-lift"
          >
            <div className="mb-6 text-sm uppercase tracking-[0.2em] text-accent-warm">Your day on YayTrack</div>
            <ul className="space-y-4">
              {rows.map(([, after]) => (
                <li key={after} className="flex items-start gap-3 text-ink">
                  <Check className="mt-0.5 h-5 w-5 flex-none text-accent-warm" />
                  <span className="font-medium">{after}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}