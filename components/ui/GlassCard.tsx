"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "purple" | "cyan" | "indigo" | "none";
  hover?: boolean;
}

const glowMap = {
  purple: "hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] hover:border-purple-500/30",
  cyan: "hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:border-cyan-500/30",
  indigo: "hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] hover:border-indigo-500/30",
  none: "",
};

export function GlassCard({
  children,
  className,
  glow = "purple",
  hover = true,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl",
        "transition-all duration-300",
        hover && glowMap[glow],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
