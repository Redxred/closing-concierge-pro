import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-brand-ink text-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-hero blur-3xl opacity-30"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand font-display font-bold">O</span>
            <span className="font-display text-xl font-bold">Opera</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-background/60">
            Operational Capacity as a Service. Real humans, smart software — coordinating every real estate transaction from contract to close.
          </p>
        </div>

        {[
          {
            title: "Product",
            links: [
              { to: "/services", label: "Services" },
              { to: "/how-it-works", label: "How it works" },
              { to: "/pricing", label: "Pricing" },
            ],
          },
          {
            title: "Company",
            links: [
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ],
          },
          {
            title: "Legal",
            links: [
              { to: "/", label: "Privacy" },
              { to: "/", label: "Terms" },
              { to: "/", label: "Compliance" },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/40">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2">
              {col.links.map((l, i) => (
                <li key={i}>
                  <Link to={l.to} className="text-sm text-background/80 transition-colors hover:text-background">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 border-t border-background/10 px-6 py-6 text-xs text-background/50 md:flex-row md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Opera Systems. Professional administrative services.</div>
        <div>Coordinators operate in a supportive, administrative capacity. We do not perform licensed real estate activities.</div>
      </div>
    </footer>
  );
}