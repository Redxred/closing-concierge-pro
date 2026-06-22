import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { WordReveal } from "@/components/site/WordReveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YayTrack — Run every real estate transaction on autopilot" },
      {
        name: "description",
        content:
          "YayTrack is the tech-enabled human team that coordinates your real estate transactions contract-to-close. Pay per deal. Zero retainers.",
      },
      { property: "og:title", content: "YayTrack — Operational Capacity as a Service" },
      { property: "og:description", content: "Stop chasing paperwork. Start chasing listings." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <LogoMarquee />
      <Pillars />
      <DashboardSection />
      <Stats />
      <ServicesPreview />
      <CTA />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 pt-16">
      {/* Animated gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          style={{ y: y1 }}
          className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-gradient-brand opacity-40 blur-3xl animate-blob"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-[-10%] top-32 h-[460px] w-[460px] rounded-full bg-gradient-cool opacity-40 blur-3xl animate-blob [animation-delay:-4s]"
        />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
            Operational Capacity as a Service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          >
            One platform to run{" "}
            <span className="text-gradient-hero animate-gradient">every transaction</span>{" "}
            on autopilot.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            A single deal has 180–300 moving parts. YayTrack’s human coordinators plus smart software
            run them all — so you focus on what you do best: selling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-card transition-transform hover:scale-105 active:scale-95"
            >
              Submit your first contract
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-background"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> Pay per transaction</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> Real-time dashboard</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> Audit-ready files</span>
          </motion.div>
        </div>

        {/* Floating dashboard preview */}
        <FloatingDashboard />
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative"
    >
      <div className="absolute -inset-4 rounded-[28px] bg-gradient-hero opacity-30 blur-2xl" />

      <div className="relative overflow-hidden rounded-[24px] border border-border bg-card shadow-glow">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-pink/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-yellow/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-brand-cyan/80" />
          </div>
          <div className="text-xs font-medium text-muted-foreground">yaytrack.app / deals</div>
          <div className="h-2.5 w-12 rounded-full bg-muted" />
        </div>

        <div className="space-y-3 p-5">
          {[
            { name: "1428 Maple Ave", stage: "Inspection", pct: 35, tint: "bg-gradient-warm" },
            { name: "92 Crescent Dr", stage: "Appraisal", pct: 62, tint: "bg-gradient-brand" },
            { name: "705 Lake View", stage: "Final review", pct: 88, tint: "bg-gradient-cool" },
            { name: "210 Beacon St", stage: "Disclosures", pct: 20, tint: "bg-gradient-hero" },
          ].map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.stage}</div>
                </div>
                <div className="text-xs font-bold text-foreground/80">{d.pct}%</div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.9, ease: "easeOut" }}
                  className={`h-full ${d.tint}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-12 hidden rounded-2xl border border-border bg-background px-4 py-3 shadow-card md:flex items-center gap-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-cool text-background">
          <Zap className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs font-semibold">Inspection scheduled</div>
          <div className="text-[10px] text-muted-foreground">2 min ago</div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-10 hidden rounded-2xl border border-border bg-background px-4 py-3 shadow-card md:flex items-center gap-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-background">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs font-semibold">Disclosures complete</div>
          <div className="text-[10px] text-muted-foreground">Audit ready</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LogoMarquee() {
  const items = ["SkySlope", "Dotloop", "DocuSign", "qualia", "Stewart", "Ramquest", "First American", "Notarize"];
  return (
    <section className="border-y border-border bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Works alongside the tools your brokerage already uses
        </p>
        <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max gap-12 animate-marquee">
            {[...items, ...items].map((l, i) => (
              <div key={i} className="font-display text-2xl font-semibold text-foreground/40 whitespace-nowrap">
                {l}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: Workflow,
    title: "Real Execution",
    body:
      "We don’t just alert you to problems — we actively solve them and coordinate paperwork on your behalf.",
    tint: "bg-gradient-brand",
  },
  {
    icon: Eye,
    title: "Real Visibility",
    body:
      "Check the exact status of any transaction instantly. No status emails. No back-and-forth phone calls.",
    tint: "bg-gradient-cool",
  },
  {
    icon: ShieldCheck,
    title: "Real Control",
    body:
      "Standardized systems keep your agents, team, and entire brokerage perfectly compliant and organized.",
    tint: "bg-gradient-warm",
  },
];

function Pillars() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">The YayTrack difference</span>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Not software. Not a VA. <span className="text-gradient-brand">Execution.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We’re a process-driven, tech-enabled transaction execution partner — built around three pillars.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card transition-transform hover:-translate-y-1">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${p.tint} text-background shadow-glow`}>
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold">{p.title}</h3>
                <p className="mt-3 text-muted-foreground">{p.body}</p>
                <div className={`absolute inset-x-0 -bottom-px h-1 ${p.tint} opacity-0 transition-opacity group-hover:opacity-100`} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Mission control</span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            One dashboard. <br /> Every deal. <br /> <span className="text-gradient-hero">Zero chasing.</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Watch dates, contingencies, disclosures, and third-party touchpoints update in real time — coordinated by humans, surfaced by software.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Critical dates auto-mapped on contract submission",
              "Contingency timers for inspection, appraisal, financing",
              "Threaded comms with escrow, lenders, opposing agents",
              "Audit-ready compliance folder on close",
            ].map((l) => (
              <li key={l} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-hero opacity-25 blur-3xl" />
            <div className="relative rounded-3xl border border-border bg-card p-6 shadow-glow">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: "Active", v: "24" },
                  { l: "Closing this week", v: "7" },
                  { l: "On-time rate", v: "98%" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-muted p-4">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                    <div className="mt-1 font-display text-2xl font-bold">{s.v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { name: "1428 Maple Ave", days: "EMD due in 2d", color: "bg-brand-pink" },
                  { name: "92 Crescent Dr", days: "Appraisal pending", color: "bg-brand-blue" },
                  { name: "705 Lake View", days: "Clear to close", color: "bg-brand-cyan" },
                  { name: "210 Beacon St", days: "Disclosures 4/9", color: "bg-brand-purple" },
                  { name: "1903 Park Pl", days: "Title ordered", color: "bg-brand-yellow" },
                ].map((d) => (
                  <div key={d.name} className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full ${d.color}`} />
                      <span className="text-sm font-medium">{d.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{d.days}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/[0-9.]/g, "");
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numeric);
      setDisplay(current + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return <div ref={ref}>{display}</div>;
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const stats = [
    { v: "180+", l: "moving parts per deal" },
    { v: "0", l: "monthly retainers" },
    { v: "24/7", l: "dashboard visibility" },
    { v: "100%", l: "compliance coverage" },
  ];
  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div style={{ y }} className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.05} className="bg-background p-8 text-center">
              <div className="font-display text-5xl font-bold text-gradient-brand">
                <AnimatedCounter value={s.v} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const services = [
  { icon: Layers, title: "File setup & timelines", body: "Critical dates instantly mapped and tracked from contract." },
  { icon: Clock, title: "Contingency tracking", body: "Inspection, appraisal, and mortgage approvals proactively monitored." },
  { icon: Workflow, title: "Third-party coordination", body: "We become the hub between escrow, lenders, and opposing agents." },
  { icon: FileCheck2, title: "Compliance auditing", body: "Every required disclosure collected — audit-ready at close." },
];

function ServicesPreview() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">What we run</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">From contract to close.</h2>
            </div>
            <Link to="/services" className="group inline-flex items-center gap-2 text-sm font-semibold">
              Explore services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-muted">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-brand-ink p-12 text-background shadow-glow md:p-20">
            <div aria-hidden className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-brand opacity-50 blur-3xl animate-blob" />
            <div aria-hidden className="absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-gradient-cool opacity-40 blur-3xl animate-blob [animation-delay:-5s]" />
            <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-4xl font-bold md:text-5xl">
                  Hand off the chaos. <br /> <span className="text-gradient-hero">Keep the commission.</span>
                </h2>
                <p className="mt-4 max-w-lg text-background/70">
                  Submit your next contract and watch YayTrack run it to the closing table.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-bold text-foreground shadow-card transition-transform hover:scale-105">
                  Start your first deal <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-background/20 px-7 py-4 text-sm font-semibold text-background hover:bg-background/10">
                  See pricing <Gauge className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
