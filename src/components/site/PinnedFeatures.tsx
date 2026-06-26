import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FileText, Workflow, CheckCircle2 } from "lucide-react";

const features = [
  {
    label: "Read",
    icon: FileText,
    title: "Upload any contract. We read it.",
    body:
      "Upload any state's contract — even handwritten. YayTrack pulls every date, party, and contingency. No templates, no setup.",
  },
  {
    label: "Build",
    icon: Workflow,
    title: "The timeline builds itself.",
    body:
      "Tasks, deadlines, and reminders ready in seconds. Move one date and the whole chain shifts.",
  },
  {
    label: "Approve",
    icon: CheckCircle2,
    title: "You stopped being a data-entry clerk.",
    body:
      "YayTrack does the typing — you make the calls. Review and go.",
  },
];

function MockCard({ index, active }: { index: number; active: number }) {
  const isActive = index === active;
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 0.85,
        z: isActive ? 0 : -120,
        rotateX: isActive ? 0 : 10,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 22 }}
      className="absolute inset-0 rounded-3xl border border-ink/10 bg-white p-6 shadow-lift"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-between border-b border-ink/5 pb-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        </div>
        <div className="text-xs text-ink/40">yaytrack.app</div>
      </div>
      <div className="mt-5 space-y-3">
        {index === 0 && (
          <>
            <div className="rounded-xl border border-dashed border-accent-warm/40 bg-[#FFF4EE] p-4 text-sm text-ink/70">
              📄 Purchase_Agreement_123Maple.pdf — extracting…
            </div>
            {["Closing date · Aug 14", "EMD due · Aug 1", "Inspection · Jul 28"].map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-lg bg-ink/[0.03] px-3 py-2 text-sm text-ink/75">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
                {t}
              </div>
            ))}
          </>
        )}
        {index === 1 && (
          <>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              {["Jul", "Aug", "Sep"].map((m) => (
                <div key={m} className="rounded-lg bg-ink/[0.04] p-2 text-center text-ink/50">{m}</div>
              ))}
            </div>
            {[
              ["Order inspection", "Jul 24"],
              ["EMD wire confirm", "Aug 1"],
              ["Appraisal scheduled", "Aug 5"],
              ["Final walkthrough", "Aug 13"],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center justify-between rounded-lg border border-ink/5 px-3 py-2 text-sm">
                <span className="text-ink/80">{t}</span>
                <span className="text-ink/40">{d}</span>
              </div>
            ))}
          </>
        )}
        {index === 2 && (
          <>
            <div className="rounded-xl bg-gradient-to-br from-[#FFF4EE] to-white p-4">
              <div className="text-xs uppercase tracking-wider text-accent-warm">Needs you today</div>
              <div className="mt-1 text-ink font-semibold">Confirm EMD receipt with title</div>
              <button className="mt-3 rounded-lg bg-ink px-3 py-1.5 text-xs text-white">Approve →</button>
            </div>
            {["Sent to lender · ✓", "Filed to deal · ✓", "Client portal updated · ✓"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-sm text-ink/60">
                <CheckCircle2 className="h-4 w-4 text-accent-warm" />
                {t}
              </div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}

export function PinnedFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-2 lg:gap-16">
          {/* Copy side */}
          <div className="flex flex-col justify-center">
            {features.map((f, i) => (
              <FeatureCopy key={f.label} feature={f} index={i} progress={scrollYProgress} />
            ))}
          </div>
          {/* Mock side */}
          <div className="relative mx-auto h-[520px] w-full max-w-md tilt-3d">
            <FeatureMockStack progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCopy({
  feature,
  index,
  progress,
}: {
  feature: (typeof features)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index / 3;
  const end = (index + 1) / 3;
  const opacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [20, -20]);
  const Icon = feature.icon;
  return (
    <motion.div style={{ opacity, y }} className="absolute max-w-lg">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-warm/30 bg-[#FFF4EE] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-warm">
        <Icon className="h-3.5 w-3.5" /> {feature.label}
      </div>
      <h3 className="font-display text-4xl font-bold text-ink md:text-5xl">{feature.title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-ink/65">{feature.body}</p>
    </motion.div>
  );
}

function FeatureMockStack({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // Render all three; each one's opacity/scale is driven by progress
  return (
    <>
      {features.map((_, i) => (
        <MockAt key={i} index={i} progress={progress} />
      ))}
    </>
  );
}

function MockAt({ index, progress }: { index: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const start = index / 3;
  const end = (index + 1) / 3;
  const opacity = useTransform(progress, [start - 0.05, start + 0.08, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, start + 0.15, end - 0.05, end + 0.05], [0.85, 1, 1, 0.9]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <MockCard index={index} active={index} />
    </motion.div>
  );
}