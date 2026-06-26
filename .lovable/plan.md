## YayTrack homepage rebuild — light, airy, animated

Rebuild the homepage as a single, scroll-driven landing page matching the spec: light theme, smooth Lenis scrolling, lightweight 3D hero, pinned cycling feature section, and rich Framer Motion reveals throughout. All work is frontend; copy is exactly as provided.

### Visual direction
- Background `#FAFAF8`, ink `#1A1A1A`, single warm accent `#FF7A45` (kept alongside existing brand teal/lime as secondary supporting tones so the rest of the site doesn't break).
- Cards: 16–24px radius, soft layered shadows, light glass on floating mockups.
- Type: Inter (already loaded), large confident headlines, generous leading.
- Springs: stiffness ~120, damping ~18; durations 0.4–0.8s.
- Respects `prefers-reduced-motion` everywhere; disables Lenis, 3D rotation, parallax.

### New dependencies
- `lenis` (smooth inertia scroll, site-wide)
- `three`, `@react-three/fiber`, `@react-three/drei` (hero 3D)

### Files to add
- `src/components/site/SmoothScroll.tsx` — Lenis provider mounted in `__root.tsx`, syncs with Framer Motion's scroll, disabled under reduced-motion and on touch.
- `src/components/site/Hero3D.tsx` — lazy-loaded R3F canvas with a single floating rounded "contract card" mesh (RoundedBox + subtle environment), mouse-parallax tilt, slow idle float/rotate. Mobile fallback = static tilted card image.
- `src/components/site/PinnedFeatures.tsx` — scroll-scrubbed pinned section cycling Read → Build → Approve; mockup cards scale/translateZ/tilt + cross-fade with synced side copy.
- `src/components/site/HowItWorksAuto.tsx` — auto-playing 3-step loop (Upload / Review / Approve) with active-step highlight, animated dashboard mockup states, and a Restart button.
- `src/components/site/BeforeAfter.tsx` — two columns sliding in from opposite sides on enter.
- `src/components/site/RollingCounter.tsx` — rolling-digit counter triggered on view.
- `src/components/site/TiltCard.tsx` — perspective + rotateX/Y to cursor wrapper for feature/testimonial cards.
- `src/components/site/TestimonialsMarquee.tsx` — auto-scrolling horizontal carousel, pauses on hover.
- `src/components/site/TrustLogos.tsx` — muted brokerage wordmarks row + the "10,000+ transactions" stat.
- `src/components/site/ScrollCue.tsx` — bouncing "Scroll" arrow for the hero.

### Files to edit
- `src/routes/index.tsx` — fully replace with the 12-section structure and exact copy from the brief, wiring all new components in order: Hero → TrustLogos → Problem → PinnedFeatures → HowItWorksAuto → FeatureGrid → BeforeAfter → Proof (RollingCounter) → TestimonialsMarquee → PricingTeaser → FAQ → FinalCTA. Existing scroll progress bar stays.
- `src/routes/__root.tsx` — wrap content with `SmoothScroll`.
- `src/styles.css` — add `--accent-warm: #FF7A45`, light surface tokens (`#FAFAF8`, `#1A1A1A`), card radii/shadow utilities, and a `.tilt-3d` perspective helper. Keep existing teal/lime brand tokens so Header/Footer/Pricing pages remain intact.
- `package.json` — add the 3 deps above via `bun add`.

### Performance
- R3F canvas loaded via `React.lazy` + `Suspense` inside `LazySection`; `dpr={[1, 1.5]}`, `frameloop="demand"` when idle off-screen.
- All animations on transform/opacity; `will-change` + `contain: paint` on heavy sections.
- Mobile (`pointer: coarse` or `<768px`): swap 3D for a static tilted card PNG, drop parallax listeners, soften reveal distances.
- Lenis disabled under reduced-motion and on touch devices.

### Build order (so you can iterate per section)
1. Tokens + Lenis + reduced-motion plumbing.
2. Hero (copy + word-stagger + 3D + scroll cue).
3. Trust logos + Problem.
4. Pinned cycling features (the signature effect).
5. How It Works auto-loop.
6. Feature grid + Before/After.
7. Counters + Testimonials marquee.
8. Pricing teaser + FAQ + Final CTA.

I'll ship sections 1–4 in the first pass (the hero, smooth scroll, trust, problem, and the signature pinned section), verify the build, then continue with 5–8 in a follow-up so you can review each milestone.
