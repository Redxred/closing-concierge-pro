import { createFileRoute, Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useRef, useEffect, useState, memo } from "react";
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
  Calendar,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { AlertTriangle, Building2, HelpCircle, UserCheck } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { WordReveal } from "@/components/site/WordReveal";
import { LazySection } from "@/components/site/LazySection";
import OnboardCard from "@/components/ui/onboard-card";

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
      <LazySection minHeight={520}>
        <PainSection />
      </LazySection>
      <LazySection minHeight={520}>
        <Pillars />
      </LazySection>
      <LazySection minHeight={760}>
        <DashboardSection />
      </LazySection>
      <LazySection minHeight={620}>
        <HowItWorksSection />
      </LazySection>
      <LazySection minHeight={320}>
        <Stats />
      </LazySection>
      <LazySection minHeight={560}>
        <ServicesPreview />
      </LazySection>
      <LazySection minHeight={560}>
        <WhoItsForSection />
      </LazySection>
      <LazySection minHeight={520}>
        <TeamSection />
      </LazySection>
      <LazySection minHeight={620}>
        <FAQSection />
      </LazySection>
      <LazySection minHeight={620}>
        <OnboardDemo />
      </LazySection>
      <LazySection minHeight={420}>
        <CTA />
      </LazySection>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mouse-driven parallax — MotionValues + rAF, no React re-renders
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 80, damping: 20, mass: 0.4 });
  const my = useSpring(myRaw, { stiffness: 80, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let nx = 0;
    let ny = 0;
    let pending = false;

    const flush = () => {
      mxRaw.set(nx);
      myRaw.set(ny);
      pending = false;
    };
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      nx = (e.clientX - cx) / cx;
      ny = (e.clientY - cy) / cy;
      if (!pending) {
        pending = true;
        raf = requestAnimationFrame(flush);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [mxRaw, myRaw, reduceMotion]);

  // Derive blob x-offsets from the mouse MotionValue (no React state)
  const blob1X = useTransform(mx, (v) => v * 30);
  const blob2X = useTransform(mx, (v) => v * -40);
  const blob3X = useTransform(mx, (v) => v * 20);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 pt-16 [contain:layout_paint]">
      {/* Layered parallax background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 will-change-transform">
        {/* Parallax grid */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 [background-image:linear-gradient(to_right,hsl(var(--border)/0.4)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.4)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)] opacity-60"
        />
        {/* Gradient blobs with mouse + scroll parallax */}
        <motion.div
          style={{ y: y1, x: blob1X }}
          className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-gradient-brand opacity-40 blur-3xl animate-blob will-change-transform"
        />
        <motion.div
          style={{ y: y2, x: blob2X }}
          className="absolute right-[-10%] top-32 h-[460px] w-[460px] rounded-full bg-gradient-cool opacity-40 blur-3xl animate-blob [animation-delay:-4s] will-change-transform"
        />
        <motion.div
          style={{ y: y3, x: blob3X }}
          className="absolute left-1/3 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-warm opacity-30 blur-3xl animate-blob [animation-delay:-8s] will-change-transform"
        />

        {/* Floating decorative orbs */}
        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[28%] h-3 w-3 rounded-full bg-brand-pink shadow-[0_0_30px_hsl(var(--brand-pink))]"
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[18%] h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_24px_hsl(var(--brand-cyan))]"
        />
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[42%] top-[12%] h-2.5 w-2.5 rounded-full bg-brand-yellow shadow-[0_0_24px_hsl(var(--brand-yellow))]"
        />

        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: heroOpacity, scale: heroScale }}
        className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-24"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-pink" />
            Tech-Enabled Operational Certainty for Real Estate Agents
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
          >
            Submit the deal. Stay focused on selling.{" "}
            <span className="text-gradient-hero animate-gradient">We run the operation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl"
          >
            YayTrack is your transaction execution partner for Maryland real estate deals — combining
            expert follow-through, real-time visibility, and compliance-aware process control so you
            can move from contract to close with less friction, less anxiety, and more confidence.
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
              Submit Your First Deal
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3.5 text-sm font-semibold backdrop-blur hover:bg-background"
            >
              See How It Works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> Fast handoff</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> Clear status</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-purple" /> No project-managing required</span>
          </motion.div>
        </div>

        {/* Floating dashboard preview */}
        <FloatingDashboard mx={mx} my={my} />
      </motion.div>
    </section>
  );
}

const FloatingDashboard = memo(function FloatingDashboard({
  mx,
  my,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const rotateY = useTransform(mx, (v) => v * 6);
  const rotateX = useTransform(my, (v) => v * -6);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{ rotateY, rotateX, transformPerspective: 1200 }}
      className="relative will-change-transform [transform-style:preserve-3d]"
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

      {/* Additional floating UI elements */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-10 bottom-24 hidden rounded-2xl border border-border bg-background px-4 py-3 shadow-card lg:flex items-center gap-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-warm text-background">
          <Calendar className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs font-semibold">EMD due in 2d</div>
          <div className="text-[10px] text-muted-foreground">1428 Maple Ave</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [2, -1, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-8 top-4 hidden rounded-2xl border border-border bg-background px-4 py-3 shadow-card lg:flex items-center gap-2"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-hero text-background">
          <TrendingUp className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs font-semibold">On-time rate 98%</div>
          <div className="text-[10px] text-muted-foreground">Last 30 days</div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-8 -bottom-6 hidden rounded-full border border-border bg-background px-3 py-2 shadow-card md:flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-cyan" />
        </span>
        <span className="text-xs font-semibold">24 active deals</span>
      </motion.div>
    </motion.div>
  );
});

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
    title: "⚙️ Real Execution",
    body:
      "Our team handles the 180+ administrative tasks per transaction — so the file moves without you running it.",
    tint: "bg-gradient-brand",
  },
  {
    icon: Eye,
    title: "👁️ Real Visibility",
    body:
      "Log in anytime to see exactly where your file stands — status, milestones, missing items, next steps.",
    tint: "bg-gradient-cool",
  },
  {
    icon: ShieldCheck,
    title: "🛡️ Real Control",
    body:
      "Compliance-aware coordination with clear process boundaries — structured, accountable, and never overstepping licensed activities.",
    tint: "bg-gradient-warm",
  },
];

function Pillars() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">More than transaction coordination</span>
            <WordReveal
              text="YayTrack is the execution layer behind a more controlled real estate operation."
              className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl"
            />
            <p className="mt-4 text-lg text-muted-foreground">
              YayTrack is a tech-enabled transaction execution partner for real estate agents, teams,
              and brokerages. We combine specialized human follow-through with real-time visibility,
              so every deal moves forward with more structure, more clarity, and less friction. You
              hand off the transaction, we run the process behind the scenes, and you stay informed
              without having to become the project manager of the file.
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              A modern operational partner — not just another coordinator, assistant, or dashboard.
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

function OnboardDemo() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Getting started</span>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Onboard in <span className="text-gradient-brand">under a minute</span>.
              </h2>
              <p className="mt-5 text-lg text-muted-foreground">
                No complex setup. No long forms. Submit a contract and watch YayTrack spin up your deal instantly.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Upload contract — we auto-map critical dates",
                  "Review pre-built timeline in seconds",
                  "Track everything to the closing table",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={0.15}>
              <OnboardCard
                duration={3000}
                step1="Welcome Aboard"
                step2="Verifying Details"
                step3="Account Created"
              />
            </Reveal>
          </div>
        </Reveal>
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
                  Bring more control to your transactions — <br /> <span className="text-gradient-hero">without adding more to your plate.</span>
                </h2>
                <p className="mt-4 max-w-lg text-background/70">
                  YayTrack helps real estate agents, teams, and brokerages move deals forward with
                  more structure, more visibility, and less operational friction. Less chaos. Less
                  follow-up. More confidence from contract to close.
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-bold text-foreground shadow-card transition-transform hover:scale-105">
                  Submit Your First Deal <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-background/20 px-7 py-4 text-sm font-semibold text-background hover:bg-background/10">
                  Schedule a Quick Intro <Calendar className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PainSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">
            The real problem is not paperwork. It is operational chaos.
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
            Every transaction pulls you away from <span className="text-gradient-hero">selling</span>.
          </h2>
          <div className="mt-6 space-y-5 text-lg text-muted-foreground">
            <p>
              Real estate agents are expected to do two jobs at the same time: generate business and
              operate the file. That means prospecting, showing homes, and negotiating offers — while
              also tracking signatures, reviewing documents, coordinating title and lender updates,
              managing contingencies, and making sure no deadline slips through the cracks.
            </p>
            <p>
              That is where the real pressure builds. Not just in the workload itself, but in the
              constant mental interruption of wondering what is missing, what is late, who has not
              responded, and whether something small could put the entire deal at risk.
            </p>
            <p>
              When every transaction brings 180 to 300 moving pieces, the business starts to feel
              reactive. More follow-up. More stress. More commission risk. Less room to actually stay
              focused on selling.
            </p>
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-pink" />
            <p className="text-base font-semibold text-foreground">
              The issue is not that agents need another tool. The issue is that they need the operation
              to feel under control.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const howSteps = [
  { n: "01", t: "Submit the deal", b: "Upload the executed contract and basic transaction details in minutes." },
  { n: "02", t: "We activate the file", b: "YayTrack reviews the paperwork, sets the workflow in motion, and begins operational follow-through." },
  { n: "03", t: "Track without managing", b: "Log in anytime to view status, milestones, deadlines, and any requested missing items." },
  { n: "04", t: "Move to closing with confidence", b: "We keep the process moving while you stay focused on clients, pipeline, and closings." },
];

function HowItWorksSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">How it works</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              A simple handoff from <span className="text-gradient-hero">contract to close</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              YayTrack is designed to make the operational side of the transaction feel easy from the
              start. Once you have an executed contract, the handoff is quick, clear, and structured.
              You submit the deal, our team reviews the file, activates the process, and begins
              coordinating the transaction behind the scenes. From there, you can track progress, see
              what has been handled, and respond only when something specific is needed from you.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {howSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
                <div className="font-display text-5xl font-bold text-gradient-brand">{s.n}</div>
                <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">
            Simple to start. Easy to follow. Built to keep the operation moving.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const audiences = [
  { icon: UserCheck, t: "Productive solo agents", b: "For agents who are closing consistently and need operational relief without hiring in-house too early.", tint: "bg-gradient-brand" },
  { icon: Users, t: "Small to mid-sized teams", b: "For team leads who need clearer oversight, better process consistency, and less chaos across active files.", tint: "bg-gradient-cool" },
  { icon: Building2, t: "Boutique and growing brokerages", b: "For broker-owners who want stronger visibility, compliance-aware support, and a more scalable way to handle transaction volume.", tint: "bg-gradient-warm" },
];

function WhoItsForSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">Who YayTrack is built for</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Built for real estate professionals who need more control{" "}
              <span className="text-gradient-hero">without more internal overhead</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              YayTrack is designed for real estate businesses that are already moving deals and feeling
              the weight of the operation behind them. It is especially valuable for agents who are
              juggling active transactions while still trying to prospect, show homes, negotiate, and
              keep clients informed — and for teams that need more structure, visibility, and
              consistency as volume grows.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {audiences.map((a, i) => (
            <Reveal key={a.t} delay={i * 0.1}>
              <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-card transition-transform hover:-translate-y-1">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${a.tint} text-background shadow-glow`}>
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{a.t}</h3>
                <p className="mt-3 text-muted-foreground">{a.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">
            If your business is growing faster than your operational capacity, YayTrack is built for that moment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function TeamSection() {
  const members = [
    { name: "Operations Lead", role: "Transaction execution" },
    { name: "Coordinator", role: "File activation & follow-through" },
    { name: "Compliance Lead", role: "Process control" },
    { name: "Product & Tech", role: "Visibility layer" },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">The team</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              The people behind <span className="text-gradient-hero">the operation</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              A small, focused team building something serious for real estate professionals in the
              DMV. We combine real estate knowledge, operational discipline, and technology to make
              transaction coordination actually work.
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-card text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-gradient-hero opacity-90" />
                <h3 className="mt-5 font-display text-lg font-bold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 text-center text-sm font-semibold text-muted-foreground">
            Real people. Real follow-through. Real results from contract to close.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is YayTrack just another transaction coordinator service?", a: "No. YayTrack is designed as a tech-enabled transaction execution partner — combining human follow-through with real-time visibility, so the file feels organized, active, and under control without forcing you to manage it yourself." },
  { q: "Is YayTrack a software platform like Dotloop or Skyslope?", a: "No. YayTrack is not a self-serve platform where you do the work alone. It is an operational service supported by a visibility layer, so you can track progress without carrying the process yourself." },
  { q: "Do I still have to manage the transaction?", a: "No. You submit the deal, YayTrack takes over the operational follow-through, and you step in only when something specific is needed from you." },
  { q: "How is it different from hiring a virtual assistant?", a: "A VA typically provides hourly labor and still requires close supervision. YayTrack is built around process discipline, operational accountability, and structured follow-through — not just task support." },
  { q: "Does YayTrack handle licensed real estate activities?", a: "No. YayTrack is built around administrative, operational, and coordination support. It does not negotiate contracts, provide legal advice, or perform any licensed activities that must remain with the agent or broker." },
  { q: "How much visibility will I have into the file?", a: "You will have a clear view of status, milestones, missing items, and progress through the portal — without being forced into the role of project manager." },
  { q: "Can my entire team or brokerage use YayTrack?", a: "Yes. YayTrack is built for productive solo agents first, but it is also designed to support growing teams and brokerages that need more structure, visibility, and operational consistency as volume increases." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">
            Questions we know real estate professionals ask
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Everything you need to know before <span className="text-gradient-hero">handing off your next file</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            YayTrack is built to make the operational side of the transaction easier to delegate,
            easier to follow, and easier to trust. These are the most common questions agents, teams,
            and brokerages ask before getting started.
          </p>
        </Reveal>
        <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card shadow-card">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-start justify-between gap-4 p-6 text-left"
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                    <span className="font-display text-base font-bold md:text-lg">{f.q}</span>
                  </span>
                  <span className={`mt-0.5 text-xl font-bold transition-transform ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pl-14 text-muted-foreground">{f.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
