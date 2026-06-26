import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { Twitter, Linkedin, Github, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import logoAsset from "@/assets/yaytrack-logo.png";

const socials = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "mailto:hello@yaytrack.com", label: "Email", Icon: Mail },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  // When users prefer reduced motion, we disable looping/parallax animations
  // and convert entrance reveals into instant, fully-visible states so the
  // footer still looks polished without any movement.
  const loop = prefersReducedMotion ? undefined : { repeat: Infinity, ease: "easeInOut" as const };
  const fadeUp = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : undefined;
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-brand-ink text-background">
      {/* Animated gradient top hairline */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #FF7A45, #C5D94A, #2D6B5E, transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={prefersReducedMotion ? { backgroundPosition: "50% 0%" } : { backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "linear" }}
      />
      {/* Animated ambient glows */}
      <motion.div
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.2 }}
        className={`pointer-events-none absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-hero blur-3xl ${prefersReducedMotion ? "" : "animate-blob"}`}
      />
      <motion.div
        aria-hidden
        animate={prefersReducedMotion ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 12, ...loop! }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gradient-brand opacity-20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={prefersReducedMotion ? undefined : { x: [0, -30, 0], y: [0, 25, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 14, ...loop! }}
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-gradient-cool opacity-15 blur-3xl"
      />
      {/* subtle dotted grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Newsletter / CTA band */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative grid gap-8 overflow-hidden rounded-3xl border border-background/10 bg-background/[0.03] p-8 backdrop-blur md:grid-cols-[1.2fr_1fr] md:p-12"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-warm/30 blur-3xl"
            animate={prefersReducedMotion ? { opacity: 0.5 } : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-background/15 bg-background/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-background/70">
              <Sparkles className="h-3 w-3" /> Closing brief
            </div>
            <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
              One smart email a week. Zero busywork.
            </h3>
            <p className="mt-3 max-w-md text-sm text-background/65">
              Field notes on closings, contract automation, and what's saving agents real hours this month.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="relative flex flex-col items-stretch justify-center gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-background/15 bg-background/5 p-1.5 pl-5 transition-colors focus-within:border-background/40">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brokerage.com"
                className="flex-1 bg-transparent text-sm text-background placeholder:text-background/40 outline-none"
              />
              <motion.button
                type="submit"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                className="group inline-flex items-center gap-1.5 rounded-full bg-accent-warm px-4 py-2 text-xs font-semibold text-white shadow-lift"
              >
                {sent ? "Subscribed" : "Subscribe"}
                <ArrowRight className={`h-3.5 w-3.5 ${prefersReducedMotion ? "" : "transition-transform group-hover:translate-x-0.5"}`} />
              </motion.button>
            </div>
            <p className="pl-5 text-[11px] text-background/45">
              No spam. Unsubscribe in one click.
            </p>
          </form>
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="group flex items-center gap-2">
            <img
              src={logoAsset}
              alt="YayTrack"
              width={160}
              height={36}
              loading="lazy"
              decoding="async"
              className={`h-9 w-auto ${prefersReducedMotion ? "" : "transition-transform duration-300 group-hover:scale-105"}`}
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-background/60">
            Upload the contract. YayTrack builds the timeline, files the emails, and tells you what needs you today.
          </p>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08, delayChildren: prefersReducedMotion ? 0 : 0.2 } },
            }}
            className="mt-6 flex items-center gap-3"
            aria-label="Social links"
          >
            {socials.map(({ href, label, Icon }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: prefersReducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.85 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.08 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                  transition={prefersReducedMotion ? undefined : { type: "spring", stiffness: 380, damping: 18 }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-background/15 bg-background/5 text-background/70 transition-colors duration-300 hover:border-background/40 hover:text-background"
                >
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-full bg-gradient-brand opacity-0 blur-md ${prefersReducedMotion ? "group-hover:opacity-60" : "transition-opacity duration-300 group-hover:opacity-60"}`}
                  />
                  <Icon className="relative h-4 w-4" strokeWidth={2} />
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {[
          {
            title: "Product",
            links: [
              { to: "/services", label: "Services" },
              { to: "/how-it-works", label: "How it works" },
              { to: "/pricing", label: "Pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { to: "/", label: "Privacy" },
              { to: "/", label: "Terms" },
              { to: "/", label: "Compliance" },
            ],
          },
        ].map((col, colIdx) => (
          <motion.div
            key={col.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: prefersReducedMotion ? 0 : 0.1 + colIdx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/40">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2">
              {col.links.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="group relative inline-block text-sm text-background/80 transition-colors hover:text-background"
                  >
                    <span className="relative">
                      {l.label}
                      <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-brand group-hover:scale-x-100 ${prefersReducedMotion ? "" : "transition-transform duration-300 ease-out"}`} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
        className="relative mx-auto flex max-w-7xl flex-col gap-4 border-t border-background/10 px-6 py-6 text-xs text-background/50 md:flex-row md:items-center md:justify-between"
      >
        <div>© {new Date().getFullYear()} YayTrack Systems. Professional administrative services.</div>
        <div>Coordinators operate in a supportive, administrative capacity. We do not perform licensed real estate activities.</div>
      </motion.div>
      {/* Giant wordmark */}
      <div className="relative overflow-hidden">
        <motion.div
          aria-hidden
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none select-none px-6 pb-4 text-center font-display text-[18vw] font-bold leading-none tracking-tight"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          YayTrack
        </motion.div>
      </div>
    </footer>
  );
}