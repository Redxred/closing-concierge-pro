import { motion, useReducedMotion } from "motion/react";
import { RollingCounter } from "@/components/site/RollingCounter";

const logos = ["KW", "RE/MAX", "Compass", "eXp", "Coldwell Banker", "Century 21", "Sotheby's", "Berkshire Hathaway"];

export function TrustLogos() {
  const reduced = useReducedMotion();
  const track = [...logos, ...logos];

  return (
    <section className="relative overflow-hidden border-y border-ink/5 bg-white/60 py-12">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-[60%] -translate-x-1/2 rounded-full bg-accent-warm/5 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-[1fr_auto]">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <motion.div
            className="flex w-max gap-12 whitespace-nowrap"
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {track.map((l, i) => (
              <span
                key={`${l}-${i}`}
                className="font-display text-lg font-semibold tracking-tight text-ink/35 transition-colors hover:text-accent-warm"
              >
                {l}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-right"
        >
          <div className="font-display text-3xl font-bold text-ink">
            <RollingCounter to={10000} suffix="+" />
          </div>
          <div className="text-sm text-ink/60">transactions trusted</div>
        </motion.div>
      </div>
    </section>
  );
}