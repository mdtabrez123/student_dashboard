"use client";

import {
  Code2,
  Layers,
  Brain,
  Zap,
  BookOpen,
  Database,
  Globe,
  Cpu,
  FlaskConical,
  Rocket,
  Shield,
  BarChart3,
  Terminal,
  Wifi,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import type { Course } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layers,
  Brain,
  Zap,
  BookOpen,
  Database,
  Globe,
  Cpu,
  FlaskConical,
  Rocket,
  Shield,
  BarChart3,
  Terminal,
  Wifi,
  Lock,
};

const iconGradients = [
  "from-purple-600 to-indigo-600",
  "from-cyan-600 to-blue-600",
  "from-indigo-600 to-purple-600",
  "from-violet-600 to-cyan-600",
];

// Gradient mesh colors per card index
const meshColors = [
  "rgba(124,58,237,0.12)",   // purple
  "rgba(6,182,212,0.12)",    // cyan
  "rgba(79,70,229,0.12)",    // indigo
  "rgba(139,92,246,0.12)",   // violet
];

const glowTypes = ["purple", "cyan", "indigo", "purple"] as const;

interface CourseTileProps {
  course: Course;
  index: number;
}

export function CourseTile({ course, index }: CourseTileProps) {
  const Icon = iconMap[course.icon_name] ?? BookOpen;
  const gradient = iconGradients[index % iconGradients.length];
  const glow = glowTypes[index % glowTypes.length];
  const meshColor = meshColors[index % meshColors.length];
  const meshColor2 = meshColors[(index + 2) % meshColors.length];

  const statusLabel =
    course.progress < 30
      ? "Just started"
      : course.progress < 70
      ? "In progress"
      : course.progress < 100
      ? "Almost there"
      : "Completed";

  return (
    <AnimatedItem>
      <GlassCard glow={glow} className="group h-full p-6">
        {/* GAP 6 FIX: Gradient mesh background per card */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${meshColor} 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, ${meshColor2} 0%, transparent 55%)`,
          }}
        />

        {/* Grain texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Icon */}
        <div
          className={`relative mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>

        {/* GAP 5 FIX: Title with Framer Motion hover — no CSS group-hover */}
        <motion.h3
          initial="rest"
          whileHover="hover"
          className="relative mb-1 text-sm font-semibold text-white"
        >
          <motion.span
            variants={{
              rest: { color: "rgba(255,255,255,1)" },
              hover: { color: "rgba(216,180,254,1)" },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {course.title}
          </motion.span>
        </motion.h3>

        <p className="relative mb-4 text-xs text-white/40">{statusLabel}</p>

        {/* Progress */}
        <ProgressBar value={course.progress} />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-white/30">Progress</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.4 + index * 0.08,
            }}
            className="text-xs font-bold text-white/70"
          >
            {course.progress}%
          </motion.span>
        </div>
      </GlassCard>
    </AnimatedItem>
  );
}
