import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Lock, ShieldCheck, KeyRound, FileSearch, ServerCog, Fingerprint } from "lucide-react";

const badges = [
  { icon: Lock, label: "Encryption in transit & at rest", sub: "TLS 1.3 · AES-256" },
  { icon: ShieldCheck, label: "SOC 2-aligned controls", sub: "Continuous monitoring" },
  { icon: KeyRound, label: "Role-based access", sub: "Least-privilege by default" },
  { icon: FileSearch, label: "Full audit trail", sub: "Every change, every deal" },
  { icon: ServerCog, label: "Daily encrypted backups", sub: "Point-in-time recovery" },
  { icon: Fingerprint, label: "SSO & 2FA ready", sub: "For teams & brokerages" },
];

export function TrustBadges() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const track = [...badges, ...badges];

  return (
    <section className="relative overflow-hidden bg-white py-20">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-[#2D6B5E]/8 blur-3xl"
        animate={reduced ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-10 text-center"
        >
          <div className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-warm">Built for trust</div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Your contracts deserve real safeguards.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/65">
            The same security primitives the biggest brokerages ask us about — on by default for every account.
          </p>
        </motion.div>

        <div
          className="group relative overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className={`flex w-max gap-4 ${reduced ? "" : "animate-marquee"} ${paused ? "marquee-paused" : ""}`}
            style={reduced ? undefined : { animationDuration: "42s" }}
          >
            {track.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={`${b.label}-${i}`}
                  className="flex w-[280px] shrink-0 items-center gap-4 rounded-2xl border border-ink/10 bg-white/80 p-5 shadow-soft backdrop-blur transition-shadow hover:shadow-lift"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF4EE] text-accent-warm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-ink">{b.label}</div>
                    <div className="truncate text-xs text-ink/55">{b.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink/45">
          SOC 2 Type II report available under NDA on request.
        </p>
      </div>
    </section>
  );
}