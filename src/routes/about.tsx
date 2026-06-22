import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, Eye, ShieldCheck, Workflow } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About YayTrack — The first OCaaS partner for real estate" },
      { name: "description", content: "YayTrack is the first YayTracktional Capacity as a Service partner — a process-driven, tech-enabled transaction execution team for real estate." },
      { property: "og:title", content: "About YayTrack" },
      { property: "og:description", content: "Human execution. Smart software. Built for real estate operations." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-28">
        <div aria-hidden className="absolute -top-20 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-hero opacity-25 blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">About YayTrack</span>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              We eliminate the <span className="text-gradient-hero">operational chaos</span> of real estate.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              So you can focus on what you do best: selling.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">The Why</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Our mission</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              A single real estate transaction has between 180 and 300 moving pieces. Too many top-producing agents, growing teams, and brokerages find their growth capped because they're buried in transaction logistics.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe you shouldn't have to choose between chasing paperwork and chasing new listings. Our mission is to take over the operational heavy lifting — giving you back your time and peace of mind.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">Who we are</span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">YayTracktional Capacity as a Service</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              We are the first true OCaaS partner for the real estate industry. We aren't a self-serve software platform where you still do all the manual entry, and we aren't unmanaged virtual assistants who require constant direction.
            </p>
            <p className="mt-4 text-lg font-semibold text-foreground">
              We are a process-driven, tech-enabled transaction execution partner.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">Our pillars</span>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Three commitments to every client.</h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { icon: Workflow, t: "Real Execution", b: "We don't just alert you to problems — we actively solve them and coordinate the paperwork on your behalf.", tint: "bg-gradient-brand" },
              { icon: Eye, t: "Real Visibility", b: "Our real-time dashboard lets you check the exact status of your transactions instantly.", tint: "bg-gradient-cool" },
              { icon: ShieldCheck, t: "Real Control", b: "Standardized systems that keep you, your team, or your entire brokerage completely compliant.", tint: "bg-gradient-warm" },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-card">
                  <div className={`grid h-12 w-12 place-items-center rounded-2xl ${p.tint} text-background`}>
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-bold">{p.t}</h3>
                  <p className="mt-3 text-muted-foreground">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="grid gap-10 rounded-[32px] border border-border bg-card p-12 md:grid-cols-2 md:p-16">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple">The edge</span>
                <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">How we're different</h2>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-display text-xl font-bold">Pay-as-you-go flexibility</h3>
                  <p className="mt-2 text-muted-foreground">
                    No high monthly retainer fees. We operate per-transaction — we only get paid when you have active deals in your pipeline.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">Administrative compliance</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our coordinators operate strictly in a supportive administrative capacity. We never perform licensed real estate activities — your operations stay compliant with local brokerage regulations.
                  </p>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:scale-105 transition-transform">
                  Talk to our team <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}