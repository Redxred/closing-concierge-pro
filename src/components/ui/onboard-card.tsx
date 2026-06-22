"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Loader } from "lucide-react";

interface OnboardCardProps {
  duration?: number;
  step1?: string;
  step2?: string;
  step3?: string;
}

export default function OnboardCard({
  duration = 3000,
  step1 = "Welcome Aboard",
  step2 = "Verifying Details",
  step3 = "Account Created",
}: OnboardCardProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [step1, step2, step3];

  useEffect(() => {
    let cancelled = false;
    const stepTime = duration / 3;

    const run = async () => {
      setProgress(0);
      setStep(0);

      for (let i = 0; i < 3; i++) {
        if (cancelled) return;
        setStep(i);

        const start = performance.now();
        const tick = () => {
          if (cancelled) return;
          const elapsed = performance.now() - start;
          const pct = Math.min((elapsed / stepTime) * 100, 100);
          setProgress(pct);
          if (pct < 100) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        await new Promise((r) => setTimeout(r, stepTime));
      }

      if (!cancelled) setProgress(100);
    };

    run();

    const loop = setInterval(() => {
      if (cancelled) return;
      run();
    }, duration + 1500);

    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, [duration]);

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-2xl border bg-card p-6 shadow-xl">
      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          style={{ width: `${(step / 3) * 100 + progress / 3}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((label, i) => {
          const isDone = i < step;
          const isActive = i === step;
          const isPending = i > step;

          return (
            <motion.div
              key={label}
              initial={false}
              animate={{
                opacity: isPending ? 0.4 : 1,
                x: isActive ? 0 : 0,
              }}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                isActive && "border-primary/30 bg-primary/5",
                isDone && "border-green-500/20 bg-green-500/5",
                isPending && "border-muted bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium",
                  isDone && "bg-green-500 text-white",
                  isActive && "bg-primary text-primary-foreground",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                <AnimatePresence mode="wait">
                  {isDone ? (
                    <motion.div
                      key="check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.div>
                  ) : isActive ? (
                    <motion.div
                      key="loader"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      exit={{ scale: 0 }}
                      transition={{ rotate: { repeat: Infinity, duration: 1, ease: "linear" } }}
                    >
                      <Loader className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <motion.span
                      key="num"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      {i + 1}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1">
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive && "text-primary",
                    isDone && "text-green-600",
                    isPending && "text-muted-foreground"
                  )}
                >
                  {label}
                </p>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="mt-1.5 h-1 rounded-full bg-primary/20"
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
