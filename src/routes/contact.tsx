import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Opera" },
      { name: "description", content: "Talk to Opera about running your real estate transactions. We respond within one business hour." },
      { property: "og:title", content: "Contact Opera" },
      { property: "og:description", content: "Start a deal or schedule a 15-minute operational audit." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative overflow-hidden py-28">
      <div aria-hidden className="absolute -top-20 right-0 -z-10 h-[420px] w-[600px] rounded-full bg-gradient-brand opacity-25 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-0 -z-10 h-[420px] w-[600px] rounded-full bg-gradient-cool opacity-25 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">Contact</span>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-6xl">
            Let's run your <span className="text-gradient-hero">next deal.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-muted-foreground">
            Drop your details and we'll reach out within one business hour to scope your operational needs.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { icon: Mail, label: "team@opera.app" },
              { icon: Phone, label: "+1 (415) 555-0190" },
              { icon: MapPin, label: "San Francisco · Remote-first" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-muted">
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="font-medium">{c.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-[28px] border border-border bg-card p-8 shadow-card md:p-10"
          >
            {submitted ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-background shadow-glow">
                  <Send className="h-5 w-5" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-bold">Thanks — we got it.</h2>
                <p className="mt-3 text-muted-foreground">A coordinator will reach out within one business hour.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" placeholder="Jane Doe" />
                  <Field label="Email" placeholder="jane@brokerage.com" type="email" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Brokerage" placeholder="Coastal Realty" />
                  <Field label="Monthly deals" placeholder="5" type="number" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">How can we help?</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your current workflow…"
                    className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-4 text-sm font-bold text-background shadow-card transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Schedule operational audit
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-foreground/20"
      />
    </div>
  );
}