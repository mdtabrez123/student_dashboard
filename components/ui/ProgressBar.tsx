"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  accentColor?: string;
  glowColor?: string;
  className?: string;
}

export function ProgressBar({
  value,
  accentColor = "#8b5cf6",
  glowColor,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10px" });

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full",
        className
      )}
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      {/* Fill */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: value / 100 } : { scaleX: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.12 }}
        style={{
          transformOrigin: "left",
          background: accentColor,
          boxShadow: glowColor ? `0 0 10px ${glowColor}` : undefined,
        }}
        className="h-full w-full rounded-full"
      />

      {/* Shimmer — fires once on mount */}
      <motion.div
        aria-hidden
        initial={{ x: "-100%", opacity: 0 }}
        animate={isInView ? { x: "350%", opacity: [0, 0.55, 0] } : {}}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
        className="absolute inset-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </div>
  );
}
