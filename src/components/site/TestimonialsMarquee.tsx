import { useState } from "react";

const items = [
  {
    name: "Sarah Chen",
    role: "Top Producer · KW Bay Area",
    quote: "Handled 60+ escrows without missing a deadline. YayTrack runs the deal so I can run the listings.",
  },
  {
    name: "Marcus Wright",
    role: "Team Lead · Compass",
    quote: "We added three agents without hiring a single coordinator. The morning brief alone paid for the year.",
  },
  {
    name: "Priya Anand",
    role: "Broker/Owner · eXp",
    quote: "First contract uploaded — timeline built in 40 seconds. I stopped re-typing dates that week.",
  },
  {
    name: "Jordan Lee",
    role: "Agent · RE/MAX",
    quote: "My clients literally said 'this is the smoothest closing we've ever had.' That sells the next one.",
  },
  {
    name: "Elena Ruiz",
    role: "Solo Agent · Coldwell Banker",
    quote: "I was the bottleneck. Now I'm just the closer. Best 'hire' I never had to make.",
  },
];

export function TestimonialsMarquee() {
  const [paused, setPaused] = useState(false);
  const loop = [...items, ...items];
  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-6xl px-6 mb-12 text-center">
        <h2 className="font-display text-4xl font-bold text-ink md:text-5xl">Loved by agents who hate paperwork</h2>
      </div>
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-6 w-max"
          style={{
            animation: "marquee 40s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {loop.map((t, i) => (
            <article
              key={i}
              className="w-[360px] flex-none rounded-3xl border border-ink/10 bg-white p-7 shadow-soft"
            >
              <p className="text-ink/80 leading-relaxed">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent-warm to-[#FFA47A]" />
                <div>
                  <div className="font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-ink/55">{t.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}