import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Check,
  Shield,
  ArrowRight,
  Sparkles,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PricingComparison } from "@/components/site/PricingComparison";

/* ──────────── data ──────────── */

type Plan = {
  name: string;
  description: string;
  lines: { label: string; value: string }[];
  total: { label: string; value: string };
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Single Side",
    description:
      "Represent one side of the transaction with end-to-end coordination.",
    lines: [
      { label: "Submit Fee", value: "$75" },
      { label: "Closing Fee", value: "$275" },
    ],
    total: { label: "per transaction", value: "$350" },
    buttonText: "Start a deal",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Double Side",
    description:
      "Both sides of the deal coordinated under one streamlined file.",
    lines: [
      { label: "Submit Fee", value: "$145" },
      { label: "Closing Fee", value: "$495" },
    ],
    total: { label: "per transaction", value: "$640" },
    buttonText: "Start a deal",
    buttonVariant: "outline",
  },
  {
    name: "Listing Add-On",
    description:
      "Add full listing coordination to any transaction.",
    lines: [
      { label: "Flat Fee", value: "$185" },
    ],
    total: { label: "add-on, flat fee", value: "$185" },
    buttonText: "Add listing support",
    buttonVariant: "outline",
  },
];

/* ──────────── route ──────────── */

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Simple pricing. Clear value. | YayTrack" },
      {
        name: "description",
        content:
          "Start with one deal and scale when the volume grows. Transparent per-transaction pricing for agents, teams, and brokerages.",
      },
      { property: "og:title", content: "YayTrack Pricing" },
      {
        property: "og:description",
        content:
          "Single Side $350, Double Side $640, Listing Add-On $185. Fall-through guarantee included.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
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
      <section className="relative overflow-hidden pt-32 pb-16">
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
            Simple pricing. Clear value.
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-display text-5xl font-bold tracking-tight md:text-6xl"
          >
            Start with one deal.{" "}
            <span className="text-gradient-hero">
              Scale when the volume grows.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            YayTrack is designed to make it easy to get started without
            committing to internal overhead too early. Our pricing model gives
            individual agents a simple entry point, while still supporting teams
            and brokerages that need a more scalable operational structure.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16">
        <motion.div
          className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="group relative"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-hero opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40"
              />
              <Card
                className={cn(
                  "relative h-full overflow-hidden rounded-3xl border bg-card transition-all duration-300 group-hover:border-foreground/40 group-hover:shadow-glow",
                  plan.popular
                    ? "border-foreground/30 shadow-glow"
                    : "border-border shadow-card hover:shadow-lg"
                )}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100"
                />
                {plan.popular && (
                  <div className="absolute right-5 top-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                      <Sparkles className="h-3 w-3 animate-pulse" />
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
                </CardHeader>

                <CardContent className="flex flex-col gap-6 pb-8">
                  <div className="space-y-3 rounded-2xl border border-border/70 bg-muted/40 p-5">
                    {plan.lines.map((line) => (
                      <div
                        key={line.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {line.label}
                        </span>
                        <span className="font-semibold tabular-nums">
                          {line.value}
                        </span>
                      </div>
                    ))}
                    <div className="my-2 h-px bg-border" />
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Total
                      </span>
                      <div className="text-right">
                        <div className="font-display text-3xl font-bold tabular-nums transition-transform duration-300 group-hover:scale-110 group-hover:text-gradient-hero">
                          {plan.total.value}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {plan.total.label}
                        </div>
                      </div>
                    </div>
                  </div>

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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Teams & Brokerages banner */}
      <section className="pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl px-6"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-brand p-8 text-white shadow-glow md:p-12">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto]">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur">
                  <Building2 className="h-3.5 w-3.5" />
                  Teams & Brokerages
                </div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Need more ongoing operational support?
                </h2>
                <p className="mt-2 max-w-2xl text-white/90">
                  YayTrack supports custom plans built around transaction
                  volume, team structure, and operational complexity.
                </p>
              </div>
              <Link to="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-white px-6 py-6 text-sm font-bold text-foreground hover:bg-white/90"
                >
                  Contact Us for a Custom Plan
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fall-Through Guarantee */}
      <section className="pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl px-6"
        >
          <div className="flex items-start gap-4 rounded-2xl border border-brand-pink/30 bg-brand-pink/5 p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-white shadow-md">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">
                Fall-Through Guarantee
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                If your deal falls through, the closing fee is completely
                waived. You only pay the{" "}
                <span className="font-semibold text-foreground">
                  $75 intake fee
                </span>{" "}
                to cover file activation.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Full feature comparison */}
      <PricingComparison />

      {/* Closing line */}
      <section className="pb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl px-6 text-center"
        >
          <p className="font-display text-xl font-semibold md:text-2xl">
            Simple enough to start.{" "}
            <span className="text-gradient-hero">
              Flexible enough to grow with your business.
            </span>
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-brand-purple" />
            No setup fees · No monthly minimums · Cancel anytime
          </div>
        </motion.div>
      </section>
    </>
  );
}
