import { motion, useReducedMotion } from "motion/react";
import { Activity, Headphones, DatabaseBackup, Sparkles } from "lucide-react";

const commitments = [
  {
    icon: Activity,
    title: "Always-on infrastructure",
    body: "Redundant cloud regions and live status monitoring keep your deals reachable around the clock.",
    stat: "24 / 7",
    statLabel: "monitored",
  },
  {
    icon: Headphones,
    title: "Real human support",
    body: "Talk to a real transaction coordinator — not a chatbot. Most replies in under an hour during business days.",
    stat: "< 1h",
    statLabel: "avg. response",
  },
  {
    icon: DatabaseBackup,
    title: "Your data stays yours",
    body: "Export every deal, document, and timeline anytime. Cancel and we hand it back in a clean archive.",
    stat: "100%",
    statLabel: "portable",
  },
];

export function ServiceCommitments() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-accent-warm/8 blur-3xl"
        animate={reduced ? undefined : { x: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-[#C5D94A]/12 blur-3xl"
        animate={reduced ? undefined : { x: [0, -30, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-12 text-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-warm/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-warm">
            <Sparkles className="h-3.5 w-3.5" /> Our promise
          </div>
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
            What you can count on, every deal.
          </h2>
        </motion.div>

        <div
          className="relative"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {commitments.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    delay: i * 0.08,
                  }}
                  whileHover={reduced ? undefined : { y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 shadow-soft transition-shadow hover:shadow-lift"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-warm/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <motion.div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4EE] text-accent-warm"
                      whileHover={reduced ? undefined : { rotate: [0, -8, 8, 0], scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-bold text-ink">{c.stat}</div>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
                        {c.statLabel}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{c.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink/45">
          Targets, not contractual guarantees — reach out for a custom SLA if your team needs one.
        </p>
      </div>
    </section>
  );
}