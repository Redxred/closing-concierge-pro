import { motion } from "motion/react";

const logos = ["KW", "RE/MAX", "Compass", "eXp", "Coldwell Banker", "Century 21"];

export function TrustLogos() {
  return (
    <section className="border-y border-ink/5 bg-white/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {logos.map((l) => (
              <span
                key={l}
                className="font-display text-lg font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink/60"
              >
                {l}
              </span>
            ))}
          </div>
          <div className="text-center lg:text-right">
            <div className="font-display text-3xl font-bold text-ink">10,000+</div>
            <div className="text-sm text-ink/60">transactions trusted</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}