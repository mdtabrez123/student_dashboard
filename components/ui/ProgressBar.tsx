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

export function ProgressBar({
  value,
  className,
  color = "gradient",
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]",
        className
      )}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className={cn("h-full rounded-full", colorMap[color])}
      />
      {/* Shimmer overlay */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={isInView ? { x: "200%" } : { x: "-100%" }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
        className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  );
}
