import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Check,
  LayoutDashboard,
  Shield,
  Users,
  Zap,
  Building2,
  FileCheck,
  Headphones,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ──────────── data ──────────── */

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for solo agents closing their first few deals each month.",
    pricePerDeal: 295,
    priceMonthly: 0,
    priceYearly: 0,
    buttonText: "Start a deal",
    buttonVariant: "outline" as const,
    features: [
      { text: "Full contract-to-close coordination", icon: FileCheck },
      { text: "Real-time deal dashboard", icon: LayoutDashboard },
      { text: "Compliance & disclosure checks", icon: Shield },
      { text: "Email + SMS support", icon: Headphones },
    ],
    includes: [
      "What's included:",
      "Unlimited client updates",
      "Audit-ready closing folder",
      "Document collection & review",
      "Deadline tracking & alerts",
      "Cancel anytime",
    ],
  },
  {
    name: "Team",
    description:
      "Best for growing teams with 5+ active deals per month.",
    pricePerDeal: 245,
    priceMonthly: 0,
    priceYearly: 0,
    buttonText: "Talk to sales",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      { text: "Everything in Starter", icon: Check },
      { text: "Team roll-up dashboard", icon: LayoutDashboard },
      { text: "Branded client updates", icon: Sparkles },
      { text: "Priority coordinator pool", icon: Zap },
    ],
    includes: [
      "Everything in Starter, plus:",
      "Multi-agent pipeline view",
      "Custom branding on comms",
      "Faster turnaround times",
      "Dedicated account check-ins",
      "Volume-based discounts",
    ],
  },
  {
    name: "Brokerage",
    description:
      "Custom volume pricing for brokerages and large production teams.",
    pricePerDeal: 0,
    priceMonthly: 0,
    priceYearly: 0,
    buttonText: "Request quote",
    buttonVariant: "outline" as const,
    features: [
      { text: "Everything in Team", icon: Check },
      { text: "Brokerage compliance audit", icon: Shield },
      { text: "SSO & role permissions", icon: Building2 },
      { text: "Dedicated success lead", icon: Users },
    ],
    includes: [
      "Everything in Team, plus:",
      "Custom SOP integration",
      "White-label options",
      "Executive reporting",
      "API access",
      "SLA guarantees",
    ],
  },
];

/* ──────────── animated price counter ──────────── */

function AnimatedPrice({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = { current: 0 };
    const duration = 800;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      controls.current = Math.round(eased * value);
      setDisplay(controls.current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toLocaleString()}
    </span>
  );
}

/* ──────────── toggle switch ──────────── */

const PricingSwitch = ({
  onSwitch,
  className,
}: {
  onSwitch: (value: string) => void;
  className?: string;
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div
      className={cn(
        "relative flex h-14 w-fit items-center rounded-2xl border border-border bg-muted p-1.5 shadow-inner",
        className
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={cn(
          "absolute h-[calc(100%-12px)] rounded-xl bg-gradient-brand shadow-md",
          selected === "0" ? "left-1.5 w-[148px] sm:w-[168px]" : "left-[calc(100%-148px+1.5px)] w-[148px] sm:left-[calc(100%-168px+1.5px)] sm:w-[168px]"
        )}
      />
      <button
        onClick={() => handleSwitch("0")}
        className={cn(
          "relative z-10 h-full rounded-xl px-5 py-2 text-sm font-semibold transition-colors sm:px-7 sm:text-base",
          selected === "0"
            ? "text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Per Deal
      </button>
      <button
        onClick={() => handleSwitch("1")}
        className={cn(
          "relative z-10 flex h-full items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold transition-colors sm:px-7 sm:text-base",
          selected === "1"
            ? "text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Monthly Bundle
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            selected === "1"
              ? "bg-white/20 text-white"
              : "bg-brand-pink/10 text-brand-pink"
          )}
        >
          Save 15%
        </span>
      </button>
    </div>
  );
};

/* ──────────── route ──────────── */

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Pay per transaction with YayTrack" },
      {
        name: "description",
        content:
          "No retainers. No surprise fees. YayTrack charges per active transaction — you pay when you have deals.",
      },
      { property: "og:title", content: "YayTrack Pricing" },
      {
        property: "og:description",
        content: "Per-transaction pricing built for agents, teams, and brokerages.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [isMonthly, setIsMonthly] = useState(false);

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, filter: "blur(8px)" },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-25 blur-3xl"
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink"
          >
            Pricing
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl"
          >
            We&apos;ve got a plan{" "}
            <span className="text-gradient-hero">perfect for you</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Trusted by top-producing agents. Explore which option is right for
            your business — no setup fees, no monthly minimums.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex justify-center"
          >
            <PricingSwitch onSwitch={(v) => setIsMonthly(v === "1")} />
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-24">
        <motion.div
          className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {plans.map((plan, index) => (
            <motion.div key={plan.name} variants={itemVariants}>
              <Card
                className={cn(
                  "relative h-full overflow-hidden rounded-3xl border bg-card transition-shadow duration-300",
                  plan.popular
                    ? "border-foreground/30 shadow-glow"
                    : "border-border shadow-card hover:shadow-lg"
                )}
              >
                {plan.popular && (
                  <div className="absolute right-5 top-5">
                    <span className="rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="pb-4 pt-8">
                  <h3 className="font-display text-xl font-bold">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      {plan.pricePerDeal > 0 ? (
                        <motion.div
                          key={isMonthly ? "monthly" : "perdeal"}
                          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                          transition={{ duration: 0.35 }}
                          className="font-display text-5xl font-bold"
                        >
                          {isMonthly ? (
                            <>
                              <AnimatedPrice value={Math.round(plan.pricePerDeal * 4.25)} />
                              <span className="ml-1 text-lg font-medium text-muted-foreground">
                                /mo
                              </span>
                            </>
                          ) : (
                            <>
                              <AnimatedPrice value={plan.pricePerDeal} />
                              <span className="ml-1 text-lg font-medium text-muted-foreground">
                                /deal
                              </span>
                            </>
                          )}
                        </motion.div>
                      ) : (
                        <span className="font-display text-4xl font-bold">
                          Custom
                        </span>
                      )}
                    </AnimatePresence>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-6 pb-8">
                  <Link to="/contact" className="w-full">
                    <Button
                      variant={plan.buttonVariant}
                      className={cn(
                        "w-full rounded-full py-6 text-sm font-bold transition-transform hover:scale-[1.02]",
                        plan.popular
                          ? "bg-foreground text-background hover:bg-foreground/90"
                          : ""
                      )}
                    >
                      {plan.buttonText}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Features
                      </span>
                      <div className="h-px flex-1 bg-border" />
                    </div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {plan.includes[0]}
                    </p>

                    <ul className="space-y-3">
                      {plan.includes.slice(1).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* All plans include */}
      <section className="pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl px-6"
        >
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
            <h2 className="font-display text-2xl font-bold">
              All plans include
            </h2>
            <div className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
              {[
                "No setup fees",
                "No monthly minimums",
                "Cancel anytime",
                "Audit-ready closing folder",
                "Real-time dashboard",
                "Human coordinator on every file",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-purple" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
