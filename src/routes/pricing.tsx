import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Pay per transaction with YayTrack" },
      { name: "description", content: "No retainers. No surprise fees. YayTrack charges per active transaction — you pay when you have deals." },
      { property: "og:title", content: "YayTrack Pricing" },
      { property: "og:description", content: "Per-transaction pricing built for agents, teams, and brokerages." },
    ],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Solo agent",
    price: "$295",
    desc: "Per executed transaction.",
    features: ["Full contract-to-close coordination", "Real-time dashboard", "Compliance & disclosures", "Email + SMS support"],
    accent: "bg-gradient-cool",
    cta: "Start a deal",
    featured: false,
  },
  {
    name: "Team",
    price: "$245",
    desc: "Per transaction, 5+ deals/mo.",
    features: ["Everything in Solo", "Team roll-up dashboard", "Branded client updates", "Priority coordinator pool"],
    accent: "bg-gradient-brand",
    cta: "Talk to sales",
    featured: true,
  },
  {
    name: "Brokerage",
    price: "Custom",
    desc: "Volume pricing for brokerages.",
    features: ["Everything in Team", "Brokerage compliance audit", "SSO & permissions", "Dedicated success lead"],
    accent: "bg-gradient-warm",
    cta: "Request quote",
    featured: false,
  },
];

function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden py-28">
        <div aria-hidden className="absolute -top-32 left-1/2 -z-10 h-[420px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">Pricing</span>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              Pay <span className="text-gradient-hero">when you close.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              No high monthly retainers. We operate per-transaction — you only pay when you have active deals in your pipeline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className={`relative h-full overflow-hidden rounded-3xl border ${t.featured ? "border-foreground/30 shadow-glow" : "border-border shadow-card"} bg-card p-8`}>
                {t.featured && (
                  <div className="absolute right-6 top-6 rounded-full bg-gradient-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                    Most popular
                  </div>
                )}
                <div className={`inline-block rounded-xl ${t.accent} px-3 py-1 text-xs font-bold text-background`}>{t.name}</div>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-bold">{t.price}</span>
                  {t.price !== "Custom" && <span className="text-sm text-muted-foreground">/ deal</span>}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                <ul className="mt-6 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-transform hover:scale-[1.02] ${t.featured ? "bg-foreground text-background" : "border border-border"}`}>
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-10 text-center">
              <h2 className="font-display text-2xl font-bold">All plans include</h2>
              <div className="mt-6 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2">
                {["No setup fees", "No monthly minimums", "Cancel anytime", "Audit-ready closing folder", "Real-time dashboard", "Human coordinator on every file"].map((f) => (
                  <div key={f} className="flex items-center gap-2"><Check className="h-4 w-4 text-brand-purple" /> {f}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}