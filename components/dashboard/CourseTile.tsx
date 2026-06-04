"use client";

import { motion } from "framer-motion";
import {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield, BarChart3,
  Terminal, Wifi, Lock, ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import type { Course } from "@/lib/types";

/* ─── Icon registry ─────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield,
  BarChart3, Terminal, Wifi, Lock,
};

/* ─── Per-card palette ──────────────────────────────── */
interface Palette {
  accent: string;
  glow: string;
  glowStrong: string;
  iconBg: string;
  iconBorder: string;
  gradientStart: string;
}

const PALETTES: Palette[] = [
  {
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
    glowStrong: "rgba(139,92,246,0.28)",
    iconBg: "rgba(139,92,246,0.1)",
    iconBorder: "rgba(139,92,246,0.2)",
    gradientStart: "rgba(139,92,246,0.06)",
  },
  {
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.18)",
    glowStrong: "rgba(6,182,212,0.28)",
    iconBg: "rgba(6,182,212,0.1)",
    iconBorder: "rgba(6,182,212,0.2)",
    gradientStart: "rgba(6,182,212,0.06)",
  },
  {
    accent: "#10b981",
    glow: "rgba(16,185,129,0.18)",
    glowStrong: "rgba(16,185,129,0.28)",
    iconBg: "rgba(16,185,129,0.1)",
    iconBorder: "rgba(16,185,129,0.2)",
    gradientStart: "rgba(16,185,129,0.06)",
  },
  {
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    glowStrong: "rgba(245,158,11,0.28)",
    iconBg: "rgba(245,158,11,0.1)",
    iconBorder: "rgba(245,158,11,0.2)",
    gradientStart: "rgba(245,158,11,0.06)",
  },
];

/* ─── Status label ──────────────────────────────────── */
function getStatusLabel(progress: number): string {
  if (progress === 0)   return "Not started";
  if (progress < 25)   return "Just started";
  if (progress < 50)   return "In progress";
  if (progress < 75)   return "Halfway there";
  if (progress < 100)  return "Almost done";
  return "Completed ✓";
}

/* ─── Component ─────────────────────────────────────── */
interface CourseTileProps {
  course: Course;
  index: number;
}

export function CourseTile({ course, index }: CourseTileProps) {
  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const p = PALETTES[index % PALETTES.length];

  return (
    <AnimatedItem>
      <motion.article
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="relative flex h-full flex-col overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(160deg, #0f0f1a 0%, #0d0d17 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Animated hover glow border ── */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: `0 0 0 1px ${p.glow}, 0 12px 48px -8px ${p.glow}`,
          }}
        />

        {/* ── Top-corner color gradient ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full"
          style={{
            background: `radial-gradient(circle, ${p.gradientStart} 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />

        {/* ── Card body ── */}
        <div className="relative flex h-full flex-col p-5">
          {/* Icon + arrow row */}
          <div className="mb-5 flex items-start justify-between">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: p.iconBg,
                border: `1px solid ${p.iconBorder}`,
                boxShadow: `0 0 24px -4px ${p.glow}`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: p.accent }} />
            </div>

            <motion.div
              aria-hidden
              variants={{
                rest:  { opacity: 0, scale: 0.75, x: 6, y: -6 },
                hover: { opacity: 1, scale: 1,    x: 0, y: 0  },
              }}
              transition={{ duration: 0.16 }}
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.5)" }} />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="mb-1.5 text-sm font-semibold leading-snug text-white">
            {course.title}
          </h3>

          {/* Status */}
          <p
            className="mb-5 text-[11px] font-medium"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            {getStatusLabel(course.progress)}
          </p>

          {/* Progress */}
          <div className="mt-auto">
            <div className="mb-2 flex items-center justify-between">
              <span
                className="text-[11px] font-medium"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Progress
              </span>
              <motion.span
                className="text-xs font-bold tabular-nums"
                style={{ color: p.accent }}
                variants={{
                  rest:  { textShadow: "none" },
                  hover: { textShadow: `0 0 12px ${p.glow}` },
                }}
              >
                {course.progress}%
              </motion.span>
            </div>
            <ProgressBar
              value={course.progress}
              accentColor={p.accent}
              glowColor={p.glowStrong}
            />
          </div>
        </div>
      </motion.article>
    </AnimatedItem>
  );
}
