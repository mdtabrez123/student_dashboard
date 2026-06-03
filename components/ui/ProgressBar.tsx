"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  color?: "purple" | "cyan" | "indigo" | "gradient";
}

const colorMap = {
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
  indigo: "bg-indigo-500",
  gradient: "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500",
};

/**
 * Animates using scaleX (transform) NOT width — GPU-composited, zero layout shifts.
 * transformOrigin "left" ensures it grows left-to-right.
 */
export function ProgressBar({
  value,
  className,
  color = "gradient",
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const scaleX = value / 100;

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]",
        className
      )}
    >
      {/* scaleX animation: transform-only, no layout shift */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isInView
            ? { scaleX, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.2,
        }}
        style={{ transformOrigin: "left" }}
        className={cn("h-full w-full rounded-full", colorMap[color])}
      />
      {/* Shimmer — also transform-only */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={isInView ? { x: "200%", opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
          delay: 0.4,
        }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  );
}
