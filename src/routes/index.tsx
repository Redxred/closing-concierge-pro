import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { lazy, Suspense, useState } from "react";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FileText,
  Inbox,
  LayoutDashboard,
  Link as LinkIcon,
  Mail,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
} from "lucide-react";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { LazySection } from "@/components/site/LazySection";
import { ScrollCue } from "@/components/site/ScrollCue";
import { TrustLogos } from "@/components/site/TrustLogos";
import { PinnedFeatures } from "@/components/site/PinnedFeatures";
import { HowItWorksAuto } from "@/components/site/HowItWorksAuto";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { RollingCounter } from "@/components/site/RollingCounter";
import { TestimonialsMarquee } from "@/components/site/TestimonialsMarquee";
import { TiltCard } from "@/components/site/TiltCard";

const Hero3D = lazy(() => import("@/components/site/Hero3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YayTrack — Upload the contract. We build the rest." },
      {
        name: "description",
        content:
          "YayTrack reads your contracts, builds the timeline, files your emails, and tells you what needs you today. You just review and approve.",
      },
      { property: "og:title", content: "YayTrack — Upload the contract. We build the rest." },
      { property: "og:description", content: "Stop re-typing dates. Start closing deals." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-surface-soft text-ink">
      <ScrollProgress />
      <Hero />
      <TrustLogos />
      <ProblemSection />
      <PinnedFeatures />
      <LazySection minHeight={720}>
        <HowItWorksAuto />
      </LazySection>
      <LazySection minHeight={620}>
        <FeatureGrid />
      </LazySection>
      <LazySection minHeight={560}>
        <BeforeAfter />
      </LazySection>
      <LazySection minHeight={360}>
        <ProofNumbers />
      </LazySection>
      <LazySection minHeight={520}>
        <TestimonialsMarquee />
      </LazySection>
      <LazySection minHeight={420}>
        <PricingTeaser />
      </LazySection>
      <LazySection minHeight={520}>
        <FAQ />
      </LazySection>
      <FinalCTA />
    </div>
  );
}

/* ---------- HERO ---------- */
const headlineWords = "Upload the contract. YayTrack builds the rest.".split(" ");

function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden
          className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-accent-warm/10 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-40 right-0 h-[520px] w-[520px] rounded-full bg-[#FFE9DD]/60 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#C5D94A]/15 blur-3xl"
          animate={{ x: [-20, 30, -20], y: [10, -20, 10], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,26,26,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(26,26,26,.6) 1px,transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-warm/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-warm"
          >
            <Sparkles className="h-3.5 w-3.5" /> New · Auto-built timelines
          </motion.div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
            {headlineWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.1 + i * 0.06 }}
                className="mr-[0.25em] inline-block"
              >
                {w === "YayTrack" ? <span className="text-accent-warm">{w}</span> : w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65"
          >
            YayTrack reads your contracts, builds the timeline, files your emails, and tells you what needs you today — you just review and approve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.02]"
            >
              Start Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-6 py-3.5 text-sm font-semibold text-ink hover:bg-ink/[0.03]"
            >
              Book a 15-min demo
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="mt-4 text-xs text-ink/55"
          >
            First transaction free · No credit card · Works with any state's contract
          </motion.div>
        </div>
        <div className="relative h-[440px] md:h-[520px]">
          <Suspense fallback={<HeroFallback />}>
            <Hero3D />
          </Suspense>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <ScrollCue />
      </div>
    </section>
  );
}

function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-80 w-60 rotate-[-6deg] rounded-2xl border border-ink/10 bg-white shadow-lift" />
    </div>
  );
}

/* ---------- PROBLEM ---------- */
function ProblemSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent-warm/10 blur-3xl"
        animate={{ x: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/3 h-72 w-72 rounded-full bg-[#2D6B5E]/10 blur-3xl"
        animate={{ x: [0, -40, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="font-display text-4xl font-bold leading-tight text-ink md:text-5xl"
        >
          Every new contract means re-typing the same dates.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg leading-relaxed text-ink/65"
        >
          Every “any update?” text pulls you off real work. One missed deadline can cost a closing — and a client.
          Growing shouldn't mean drowning.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------- FEATURE GRID ---------- */
const features = [
  { icon: Brain, label: "AI contract reading" },
  { icon: Workflow, label: "Auto-built timeline & tasks" },
  { icon: Inbox, label: "Email-to-deal matching" },
  { icon: ClipboardList, label: "Reusable workflows & checklists" },
  { icon: Mail, label: "Email & SMS templates with merge fields" },
  { icon: LinkIcon, label: "No-login client portal" },
  { icon: Sun, label: "Daily morning brief email" },
  { icon: Calendar, label: "Google/Outlook calendar sync" },
  { icon: ShieldCheck, label: "Compliance & audit trail" },
  { icon: FileText, label: "One-click deal summary" },
];

function FeatureGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[80%] -translate-x-1/2 rounded-full bg-[#FFE9DD]/40 blur-3xl"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Everything the deal needs. Nothing you don't.</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: (i % 3) * 0.06 }}
                whileHover={{ y: -4 }}
              >
                <TiltCard className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft hover:shadow-lift transition-shadow">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4EE] text-accent-warm"
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <div className="mt-4 font-semibold text-ink">{f.label}</div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROOF / NUMBERS ---------- */
function ProofNumbers() {
  return (
    <section className="relative overflow-hidden py-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/5 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {[
            { value: 12, suffix: "+", label: "hours saved per deal" },
            { value: 10000, suffix: "+", label: "deals managed" },
            { value: 5, suffix: " min", label: "live in under" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="rounded-3xl border border-ink/10 bg-white p-10 shadow-soft"
            >
              <div className="font-display text-5xl font-bold text-ink md:text-6xl">
                <RollingCounter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm uppercase tracking-[0.18em] text-ink/55">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PRICING TEASER ---------- */
function PricingTeaser() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="overflow-hidden rounded-[28px] border border-ink/10 bg-white p-10 shadow-lift md:p-14"
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-3 text-sm uppercase tracking-[0.2em] text-accent-warm">Pricing</div>
              <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">
                First transaction free.<br />
                <span className="text-accent-warm">No per-seat fees.</span>
              </h2>
              <p className="mt-4 text-ink/65">Adding agents never raises your bill. Pay per deal, not per chair.</p>
              <Link
                to="/pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
              >
                See pricing <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-2xl bg-[#FAFAF8] p-6">
              <div className="mb-3 text-xs uppercase tracking-wider text-ink/50">What you're replacing</div>
              <ul className="space-y-2 text-sm text-ink/75">
                {[
                  "Cancel the transaction spreadsheet",
                  "Cancel the form-builder subscription",
                  "Cancel the reminder app",
                  "Six logins → one tab, one bill",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent-warm" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
const faqs = [
  ["Does it work with my state's contracts?", "Yes — YayTrack reads any state's contract (and even handwritten ones). No templates to set up."],
  ["Is my data secure?", "Bank-grade encryption in transit and at rest, SOC 2-aligned controls, and a full audit trail on every deal."],
  ["Do I have to drop Dotloop or SkySlope?", "No. Keep them for e-sign. YayTrack runs the deal around them — we coordinate, they sign."],
  ["How fast is setup?", "Most agents are live in under 5 minutes. Upload your first contract and the timeline builds itself."],
  ["Can my whole team use it?", "Yes. No per-seat fees — your assistants, TCs, and partners can all collaborate on the same deals."],
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="mb-10 text-center font-display text-4xl font-bold text-ink md:text-5xl">Frequently asked</h2>
        <div className="space-y-3">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div key={q} className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-soft">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-ink">{q}</span>
                  <ChevronDown className={`h-4 w-4 text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-ink/65 leading-relaxed">{a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="relative overflow-hidden rounded-[32px] bg-ink p-12 text-center text-white shadow-lift md:p-16"
        >
          {/* animated ambient glows */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-accent-warm/40 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 20, 0], opacity: [0.45, 0.7, 0.45] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-[#C5D94A]/25 blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, -20, 0], opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* subtle grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative font-display text-4xl font-bold md:text-5xl"
          >
            Run your first deal through YayTrack — free.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-4 max-w-xl text-white/70"
          >
            See your timeline build itself in under a minute.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-8"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-warm px-8 py-4 text-base font-semibold text-white shadow-lift transition-transform hover:scale-[1.03]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Start Free</span>
              <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-10 max-w-md rounded-2xl border border-white/15 bg-white/[0.06] p-5 text-left text-sm text-white/80 backdrop-blur-sm"
          >
            <div className="font-semibold text-white">A note from the founder —</div>
            <p className="mt-2 leading-relaxed">
              I built YayTrack because I watched my best agents drown in paperwork they shouldn't have to do. Try it free
              on your next contract. If it doesn't save you hours, just email me.
            </p>
            <a href="mailto:team@yaytrack.com" className="mt-3 inline-block text-accent-warm hover:underline">team@yaytrack.com</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}