import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, Eye, FileUp, Trophy, Workflow } from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it works — YayTrack" },
      { name: "description", content: "Submit a contract. YayTrack coordinates the rest. See the four-step workflow." },
      { property: "og:title", content: "How YayTrack works" },
      { property: "og:description", content: "Contract in. Closing out. Four steps." },
    ],
  }),
  component: HowPage,
});

const steps = [
  { icon: FileUp, title: "Submit the deal", body: "Upload the executed contract and basic transaction details in minutes." },
  { icon: Workflow, title: "We activate the file", body: "YayTrack reviews the paperwork, sets the workflow in motion, and begins operational follow-through." },
  { icon: Eye, title: "Track without managing", body: "Log in anytime to view status, milestones, deadlines, and any requested missing items." },
  { icon: Trophy, title: "Move to closing with confidence", body: "We keep the process moving while you stay focused on clients, pipeline, and closings." },
];

function HowPage() {
  return (
    <>
      <section className="relative overflow-hidden py-28">
        <div aria-hidden className="absolute -top-32 left-0 -z-10 h-[420px] w-[600px] rounded-full bg-gradient-cool opacity-30 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">How it works</span>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              Four steps. <span className="text-gradient-hero">Zero chaos.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              From the moment a contract is executed to the day the file closes, YayTrack runs the operational layer.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl space-y-10 px-6">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-8 shadow-card md:grid-cols-[180px_1fr] md:p-12">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-background shadow-glow">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="font-display text-6xl font-bold text-foreground/10">0{i + 1}</div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Ready to test-drive YayTrack?</h2>
            <p className="mt-4 text-lg text-muted-foreground">Submit one contract. We'll run it. No retainer.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-bold text-background hover:scale-105 transition-transform">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}