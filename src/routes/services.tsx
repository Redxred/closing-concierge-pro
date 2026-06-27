import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  FileSearch,
  Handshake,
  Layers,
  Phone,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — YayTrack Transaction Coordination" },
      {
        name: "description",
        content:
          "From file setup to compliance auditing — YayTrack runs every contract-to-close task so agents focus on selling.",
      },
      { property: "og:title", content: "YayTrack Services" },
      { property: "og:description", content: "End-to-end real estate transaction execution." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Layers,
    title: "File setup & timelines",
    body: "We instantly map every contractual date — EMD, contingency removal, closing — and track them like air traffic control.",
  },
  {
    icon: CalendarClock,
    title: "Contingency tracking",
    body: "Inspection, appraisal, financing, and disclosure timers monitored proactively. We chase the deadlines so you don't.",
  },
  {
    icon: Handshake,
    title: "Third-party coordination",
    body: "We become the central hub between escrow, title, lenders, opposing agents, and inspectors.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance auditing",
    body: "We collect every state and local disclosure, organize the file, and hand you a closing folder that's audit-ready on day one.",
  },
  {
    icon: FileSearch,
    title: "Document review",
    body: "Every signature, every initial, every addendum reviewed for completeness — before it ever lands on your broker's desk.",
  },
  {
    icon: Phone,
    title: "Client communication",
    body: "Optional white-labeled status updates keep your buyer or seller informed without taking your evening.",
  },
];

function ServicesPage() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 0.4]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative overflow-hidden py-32">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-20 -z-10 h-[480px] w-[640px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #2D6B5E, transparent)" }}
          animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[560px] rounded-full opacity-35 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #C5D94A, transparent)" }}
          animate={reduced ? undefined : { x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#1A1A2E 1px, transparent 1px), linear-gradient(90deg, #1A1A2E 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2D6B5E]/25 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2D6B5E] shadow-soft"
          >
            <Sparkles className="h-3.5 w-3.5" /> Services
          </motion.div>

          <h1 className="mt-6 font-display text-5xl font-bold tracking-tight text-ink md:text-7xl">
            {"Everything between ".split(" ").map((w, i) => (
              <motion.span
                key={`a-${i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mr-3 inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block bg-gradient-to-r from-[#2D6B5E] via-[#4A8C6F] to-[#C5D94A] bg-clip-text text-transparent"
            >
              contract &amp; close.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-6 max-w-2xl text-lg text-ink/65"
          >
            When you submit an executed contract, our system + specialized coordinators take over
            the entire process.
          </motion.p>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="relative py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 130, damping: 18, delay: i * 0.06 }}
                whileHover={reduced ? undefined : { y: -8 }}
                className="group relative h-full overflow-hidden rounded-3xl border border-ink/10 bg-white p-8 shadow-soft transition-shadow hover:shadow-lift"
              >
                {/* gradient sweep on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[#2D6B5E]/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(closest-side, #C5D94A, transparent)" }}
                />

                <motion.div
                  whileHover={reduced ? undefined : { rotate: [0, -8, 8, 0], scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                  className="relative grid h-12 w-12 place-items-center rounded-2xl text-white shadow-glow"
                  style={{
                    background: "linear-gradient(135deg, #2D6B5E 0%, #4A8C6F 100%)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>

                <h3 className="relative mt-6 font-display text-xl font-bold text-ink">
                  {s.title}
                </h3>
                <p className="relative mt-3 text-ink/65">{s.body}</p>

                <div className="relative mt-6 flex items-center gap-1.5 text-sm font-semibold text-[#2D6B5E] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* WHAT WE DON'T DO */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 110, damping: 20 }}
            className="relative overflow-hidden rounded-[32px] p-12 text-white md:p-16"
            style={{
              background:
                "linear-gradient(135deg, #1A1A2E 0%, #2D6B5E 60%, #1A1A2E 100%)",
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C5D94A]/20 blur-3xl"
              animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-[#2D6B5E]/40 blur-3xl"
              animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-[#C5D94A]" /> Compliance first
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold md:text-5xl">
                What we <span className="text-[#C5D94A]">don't</span> do.
              </h2>
              <p className="mt-4 max-w-2xl text-white/75">
                To protect your business, our coordinators operate strictly in a supportive,
                administrative capacity. We never perform licensed real estate activities — no
                price advice, no negotiation, no representation. Your operations stay perfectly
                compliant with local brokerage regulations.
              </p>

              <motion.div
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="mt-8 inline-block"
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#C5D94A] px-6 py-3 text-sm font-bold text-ink shadow-lg transition-shadow hover:shadow-2xl"
                >
                  Submit a contract
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}