import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import logoAsset from "@/assets/yaytrack-logo.png";

export function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-border bg-brand-ink text-background">
      {/* Animated ambient glows */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-[50%] bg-gradient-hero blur-3xl animate-blob"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-gradient-brand opacity-20 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-gradient-cool opacity-15 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/" className="group flex items-center gap-2">
            <img
              src={logoAsset}
              alt="YayTrack"
              width={160}
              height={36}
              loading="lazy"
              decoding="async"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-background/60">
            Operational Capacity as a Service. Real humans, smart software — coordinating every real estate transaction from contract to close.
          </p>
        </motion.div>

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
        ].map((col, colIdx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 + colIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-background/40">
              {col.title}
            </div>
            <ul className="mt-4 space-y-2">
              {col.links.map((l, i) => (
                <li key={i}>
                  <Link
                    to={l.to}
                    className="group relative inline-block text-sm text-background/80 transition-colors hover:text-background"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mx-auto flex max-w-7xl flex-col gap-4 border-t border-background/10 px-6 py-6 text-xs text-background/50 md:flex-row md:items-center md:justify-between"
      >
        <div>© {new Date().getFullYear()} YayTrack Systems. Professional administrative services.</div>
        <div>Coordinators operate in a supportive, administrative capacity. We do not perform licensed real estate activities.</div>
      </motion.div>
    </footer>
  );
}