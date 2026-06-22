import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import logoAsset from "@/assets/yaytrack-logo.png";

const socials = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
  { href: "mailto:hello@yaytrack.com", label: "Email", Icon: Mail },
];

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
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
            className="mt-6 flex items-center gap-3"
            aria-label="Social links"
          >
            {socials.map(({ href, label, Icon }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 12, scale: 0.85 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 380, damping: 18 }}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-background/15 bg-background/5 text-background/70 transition-colors duration-300 hover:border-background/40 hover:text-background"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full bg-gradient-brand opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-60"
                  />
                  <Icon className="relative h-4 w-4" strokeWidth={2} />
                </motion.a>
              </motion.li>
            ))}
          </motion.ul>
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