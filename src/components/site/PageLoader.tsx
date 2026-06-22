"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/yaytrack-logo.png";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => clearTimeout(t1);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Website loading"
          aria-live="polite"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Gradient blobs behind */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.35 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-gradient-brand blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-gradient-cool blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.25 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute left-1/3 top-10 h-56 w-56 rounded-full bg-gradient-warm blur-3xl"
            />
          </div>

          {/* Brand mark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <img
              src={logoAsset}
              alt="YayTrack"
              className="h-10 w-auto"
            />

            {/* Progress bar */}
            <div className="w-48">
              <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-gradient-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>

            {/* Status text cycling */}
            <StatusText />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatusText() {
  const items = [
    "Initializing workspace...",
    "Loading timelines...",
    "Preparing dashboard...",
    "Ready to roll.",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 600);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="text-sm text-muted-foreground"
        >
          {items[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
