import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, CalendarClock, ClipboardCheck, FileSearch, Handshake, Layers, Phone } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — YayTrack Transaction Coordination" },
      { name: "description", content: "From file setup to compliance auditing — YayTrack runs every contract-to-close task so agents focus on selling." },
      { property: "og:title", content: "YayTrack Services" },
      { property: "og:description", content: "End-to-end real estate transaction execution." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Layers, title: "File setup & timelines", body: "We instantly map every contractual date — EMD, contingency removal, closing — and track them like air traffic control." },
  { icon: CalendarClock, title: "Contingency tracking", body: "Inspection, appraisal, financing, and disclosure timers monitored proactively. We chase the deadlines so you don't." },
  { icon: Handshake, title: "Third-party coordination", body: "We become the central hub between escrow, title, lenders, opposing agents, and inspectors." },
  { icon: ClipboardCheck, title: "Compliance auditing", body: "We collect every state and local disclosure, organize the file, and hand you a closing folder that's audit-ready on day one." },
  { icon: FileSearch, title: "Document review", body: "Every signature, every initial, every addendum reviewed for completeness — before it ever lands on your broker's desk." },
  { icon: Phone, title: "Client communication", body: "Optional white-labeled status updates keep your buyer or seller informed without taking your evening." },
];

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-28">
        <div aria-hidden className="absolute -top-32 right-0 -z-10 h-[420px] w-[600px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">Services</span>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
              Everything between <span className="text-gradient-hero">contract & close.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              When you submit an executed contract, our system + specialized coordinators take over the entire process.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card transition-transform hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-background shadow-glow">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="rounded-[32px] bg-brand-ink p-12 text-background md:p-16">
              <h2 className="font-display text-3xl font-bold md:text-5xl">What we don't do.</h2>
              <p className="mt-4 max-w-2xl text-background/70">
                To protect your business, our coordinators operate strictly in a supportive, administrative capacity. We never perform licensed real estate activities — no price advice, no negotiation, no representation. Your operations stay perfectly compliant with local brokerage regulations.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-bold text-foreground hover:scale-105 transition-transform">
                Submit a contract <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}