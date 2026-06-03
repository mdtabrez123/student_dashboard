"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: "purple" | "cyan" | "indigo" | "none";
  hover?: boolean;
}

const glowVariants = {
  purple: {
    rest: {
      scale: 1,
      boxShadow: "0 0 0px rgba(124,58,237,0)",
      borderColor: "rgba(255,255,255,0.08)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 0 40px rgba(124,58,237,0.18)",
      borderColor: "rgba(124,58,237,0.35)",
    },
  },
  cyan: {
    rest: {
      scale: 1,
      boxShadow: "0 0 0px rgba(6,182,212,0)",
      borderColor: "rgba(255,255,255,0.08)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 0 40px rgba(6,182,212,0.18)",
      borderColor: "rgba(6,182,212,0.35)",
    },
  },
  indigo: {
    rest: {
      scale: 1,
      boxShadow: "0 0 0px rgba(79,70,229,0)",
      borderColor: "rgba(255,255,255,0.08)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 0 40px rgba(79,70,229,0.18)",
      borderColor: "rgba(79,70,229,0.35)",
    },
  },
  none: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
  },
};

export function GlassCard({
  children,
  className,
  glow = "purple",
  hover = true,
  ...props
}: GlassCardProps) {
  const variants = glowVariants[glow];

  return (
    <motion.div
      initial="rest"
      whileHover={hover ? "hover" : undefined}
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border bg-white/[0.04] backdrop-blur-xl",
        className
      )}
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
