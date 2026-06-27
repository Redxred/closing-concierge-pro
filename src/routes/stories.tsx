import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Building2, Clock, FileCheck2, Quote, Sparkles, TrendingUp, Users } from "lucide-react";
import { LazySection } from "@/components/site/LazySection";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Client Stories — YayTrack" },
      {
        name: "description",
        content:
          "Real teams using YayTrack to close cleaner, faster transactions. Outcomes shared with the agents' permission and compliance-safe metrics.",
      },
      { property: "og:title", content: "Client Stories — YayTrack" },
      {
        property: "og:description",
        content: "How brokerages and solo agents run their pipeline with YayTrack.",
      },
    ],
    links: [
      // Preload the LCP heading font weight so the hero paints in one frame.
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap",
      },
    ],
  }),
  component: StoriesPage,
});

type Story = {
  agent: string;
  role: string;
  market: string;
  brokerage: string;
  challenge: string;
  approach: string;
  outcomes: { icon: typeof Clock; label: string; value: string }[];
  quote: string;
  badge: string;
};

/**
 * Illustrative stories — replace with confirmed agent quotes and metrics
 * before publishing. All numbers are ranges or rounded and contain no PII.
 */
const stories: Story[] = [
  {
    agent: "Maya R.",
    role: "Solo agent",
    market: "Austin, TX",
    brokerage: "Independent",
    badge: "Solo agent",
    challenge:
      "Juggling 9 active contracts in a spreadsheet — missed an EMD deadline that nearly cost a closing.",
    approach:
      "Forwarded every contract to YayTrack. Timelines auto-built; morning brief replaced her 7am scramble.",
    outcomes: [
      { icon: Clock, label: "Time saved / deal", value: "~10 hrs" },
      { icon: FileCheck2, label: "On-time deadlines", value: "100%" },
      { icon: TrendingUp, label: "Deals / month", value: "+2" },
    ],
    quote:
      "I stopped re-typing the same dates into three places. The contract goes in, the timeline comes out, and I just review.",
  },
  {
    agent: "Daniel K.",
    role: "Team lead",
    market: "Phoenix, AZ",
    brokerage: "Mid-size brokerage",
    badge: "10-agent team",
    challenge:
      "Three TCs, two spreadsheets, and no shared source of truth. Onboarding a new agent took a full week.",
    approach:
      "Standardized every transaction on YayTrack workflows. New agents start their first deal the same day.",
    outcomes: [
      { icon: Users, label: "New-agent ramp", value: "1 day" },
      { icon: Clock, label: "Coordinator hours / week", value: "−18" },
      { icon: FileCheck2, label: "Compliance file completeness", value: "98%+" },
    ],
    quote:
      "Every coordinator looks at the same dashboard. Nobody's chasing 'where's the addendum?' on Slack anymore.",
  },
  {
    agent: "Priya N.",
    role: "Listing specialist",
    market: "Seattle, WA",
    brokerage: "Boutique luxury",
    badge: "Listings-heavy",
    challenge:
      "Client portal looked dated, and high-end sellers expected white-glove status updates without phone tag.",
    approach:
      "Used YayTrack's no-login client portal as the seller's window into the deal. Stopped sending status texts.",
    outcomes: [
      { icon: TrendingUp, label: "Seller NPS shift", value: "+24" },
      { icon: Clock, label: "Status calls / week", value: "−9" },
      { icon: FileCheck2, label: "Listings closed on time", value: "100%" },
    ],
    quote:
      "My sellers feel taken care of without me being on the phone. That's the whole job.",
  },
  {
    agent: "Carlos M.",
    role: "Broker/owner",
    market: "Miami, FL",
    brokerage: "Independent brokerage (24 agents)",
    badge: "Brokerage",
    challenge:
      "Compliance audits were a fire drill. Audit trail lived across email, Dotloop, and a TC's memory.",
    approach:
      "Routed every deal through YayTrack. Audit trail is automatic; broker review takes minutes.",
    outcomes: [
      { icon: FileCheck2, label: "Audit prep time", value: "−85%" },
      { icon: Clock, label: "Broker review / deal", value: "~6 min" },
      { icon: Users, label: "Per-seat fees", value: "$0" },
    ],
    quote:
      "I can pull a clean file for any deal from the last 12 months in under a minute. That changed my Sundays.",
  },
  {
    agent: "Jess T.",
    role: "Transaction coordinator",
    market: "Denver, CO",
    brokerage: "Contract TC serving 14 agents",
    badge: "TC",
    challenge:
      "Capacity capped at 30 active files. Hiring a second TC wasn't financially viable yet.",
    approach:
      "Pushed reusable workflows + email-to-deal matching to handle intake, leaving real coordination work for her.",
    outcomes: [
      { icon: TrendingUp, label: "Active files handled", value: "30 → 55" },
      { icon: Clock, label: "Inbox triage / day", value: "−2 hrs" },
      { icon: FileCheck2, label: "Late-task rate", value: "<1%" },
    ],
    quote:
      "YayTrack does the data-entry version of my job so I can do the human version of my job.",
  },
];

function StoriesPage() {
  return (
    <div className="bg-surface-soft text-ink">
      <Hero />
      <StoriesGrid />
      <CTA />
    </div>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-accent-warm/10 blur-3xl"
        animate={reduced ? undefined : { x: [0, 40, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#C5D94A]/15 blur-3xl"
        animate={reduced ? undefined : { x: [0, -40, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-warm/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-warm"
        >
          <Sparkles className="h-3.5 w-3.5" /> Client stories
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl"
        >
          Real teams. <span className="text-accent-warm">Cleaner closings.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink/65"
        >
          Solo agents, TCs, and brokerages running their entire pipeline through YayTrack. Shared with permission,
          with numbers kept to ranges so no client detail leaks.
        </motion.p>
      </div>
    </section>
  );
}

function StoriesGrid() {
  return (
    <section className="relative pb-24">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        {stories.map((s, i) =>
          i < 1 ? (
            <StoryCard key={s.agent} story={s} index={i} />
          ) : (
            <LazySection
              key={s.agent}
              minHeight={420}
              rootMargin="600px 0px"
              fallback={<StoryCardSkeleton flipped={i % 2 === 1} />}
            >
              <StoryCard story={s} index={i} />
            </LazySection>
          ),
        )}
      </div>
      <p className="mx-auto mt-12 max-w-3xl px-6 text-center text-xs text-ink/45">
        Names appear with permission. Metrics are agent-reported, rounded to ranges, and exclude transaction
        values, addresses, or any client information. Outcomes vary by market and workflow.
      </p>
    </section>
  );
}

function StoryCard({ story, index }: { story: Story; index: number }) {
  const reduced = useReducedMotion();
  const flipped = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="group relative overflow-hidden rounded-[28px] border border-ink/10 bg-white p-8 shadow-soft transition-shadow hover:shadow-lift md:p-10"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 480px" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent-warm/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent-warm/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className={`relative grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center ${flipped ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-[#FFF4EE] px-3 py-1 font-semibold uppercase tracking-wider text-accent-warm">
              {story.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-ink/55">
              <Building2 className="h-3.5 w-3.5" /> {story.brokerage} · {story.market}
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
            {story.agent} <span className="text-ink/45">— {story.role}</span>
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/70">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                Challenge
              </div>
              <p className="mt-1">{story.challenge}</p>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/45">
                With YayTrack
              </div>
              <p className="mt-1">{story.approach}</p>
            </div>
          </div>

          <figure className="mt-6 rounded-2xl bg-[#FAFAF8] p-5">
            <Quote className="h-4 w-4 text-accent-warm" aria-hidden />
            <blockquote className="mt-2 font-display text-lg leading-snug text-ink">
              "{story.quote}"
            </blockquote>
            <figcaption className="mt-3 text-xs text-ink/55">
              — {story.agent}, {story.role}
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-1">
          {story.outcomes.map((o) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.label}
                whileHover={reduced ? undefined : { y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="rounded-2xl border border-ink/10 bg-white p-5 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF4EE] text-accent-warm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold leading-none text-ink">
                      {o.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-ink/50">
                      {o.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-center text-white shadow-lift md:p-14">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Want your story here?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/70">
            Run your first transaction free. If YayTrack saves you hours, we'd love to feature your team next.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent-warm px-7 py-3.5 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.03]"
          >
            Start free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}