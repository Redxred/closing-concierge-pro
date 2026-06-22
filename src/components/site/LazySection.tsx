"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children only after the placeholder enters (or nears) the viewport.
 * Use for heavy, below-the-fold sections that run framer-motion loops or
 * expensive layout so they don't compete with the initial render.
 */
export function LazySection({
  children,
  rootMargin = "400px 0px",
  minHeight = 600,
  className,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={show ? undefined : { minHeight, contentVisibility: "auto", containIntrinsicSize: `1px ${minHeight}px` }}
    >
      {show ? children : null}
    </div>
  );
}