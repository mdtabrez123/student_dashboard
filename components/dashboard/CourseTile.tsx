"use client";

import { motion } from "framer-motion";
import {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield, BarChart3,
  Terminal, Wifi, Lock,
  type LucideIcon,
} from "lucide-react";
import type { Course } from "@/lib/types";

/* ─── Icon registry ─────────────────────────────────── */
const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield,
  BarChart3, Terminal, Wifi, Lock,
};

/* ─── Warm color pairs matching reference palette ────── */
const colorPairs: { accent: string; bg: string; border: string }[] = [
  {
    accent: "var(--color-gold)",
    bg: "rgba(201, 168, 76, 0.1)",
    border: "rgba(201, 168, 76, 0.2)",
  },
  {
    accent: "var(--color-ember)",
    bg: "rgba(212, 98, 42, 0.1)",
    border: "rgba(212, 98, 42, 0.2)",
  },
  {
    accent: "var(--color-sage)",
    bg: "rgba(107, 143, 110, 0.1)",
    border: "rgba(107, 143, 110, 0.2)",
  },
  {
    accent: "#8b7dd8",
    bg: "rgba(139, 125, 216, 0.1)",
    border: "rgba(139, 125, 216, 0.2)",
  },
];

interface CourseDetails {
  subtitle: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  lessons: number;
  duration: string;
}

export function getCourseDetails(title: string, index: number): CourseDetails {
  const t = title.toLowerCase();
  if (t.includes("machine learning")) {
    return { subtitle: "Deep learning, neural networks & PyTorch models.", level: "Advanced", lessons: 18, duration: "14h 30m" };
  }
  if (t.includes("web performance")) {
    return { subtitle: "Critical rendering path & Core Web Vitals audit.", level: "Intermediate", lessons: 12, duration: "8h 15m" };
  }
  if (t.includes("typescript")) {
    return { subtitle: "Type gymnastics, generics & structural patterns.", level: "Advanced", lessons: 15, duration: "11h 45m" };
  }
  if (t.includes("system design")) {
    return { subtitle: "Microservices, caching architectures & load balancing.", level: "Expert", lessons: 24, duration: "18h 20m" };
  }
  if (t.includes("react")) {
    return { subtitle: "Concurrent rendering, hooks & Server Components.", level: "Advanced", lessons: 28, duration: "21h 10m" };
  }
  if (t.includes("database")) {
    return { subtitle: "SQL optimization, query plans & schema replication.", level: "Intermediate", lessons: 20, duration: "14h 0m" };
  }
  if (t.includes("cloud") || t.includes("devops")) {
    return { subtitle: "Kubernetes orchestration, Docker & CI/CD workflows.", level: "Intermediate", lessons: 36, duration: "26h 45m" };
  }
  if (t.includes("security")) {
    return { subtitle: "OWASP vulnerability analysis & penetration testing.", level: "Intermediate", lessons: 22, duration: "16h 15m" };
  }
  if (t.includes("data science")) {
    return { subtitle: "Exploratory analysis, Pandas pipelines & modeling.", level: "Intermediate", lessons: 40, duration: "28h 30m" };
  }
  if (t.includes("ai engineering") || t.includes("artificial intelligence")) {
    return { subtitle: "Prompt optimization, LangChain agent systems & vector search.", level: "Expert", lessons: 30, duration: "22h 0m" };
  }

  const levels: CourseDetails["level"][] = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const level = levels[(index + title.length) % levels.length];
  const lessons = 10 + ((index * 3 + title.length) % 20);
  const duration = `${5 + ((index * 2 + title.length) % 15)}h`;

  return {
    subtitle: "Complete pathway to master concepts & industrial application.",
    level,
    lessons,
    duration,
  };
}

export function CourseTile({ course, index }: { course: Course; index: number }) {
  const Icon = ICON_MAP[course.icon_name] ?? BookOpen;
  const color = colorPairs[index % colorPairs.length];
  const details = getCourseDetails(course.title, index);

  const progressLabel =
    course.progress >= 90 ? "Almost there!"
    : course.progress >= 50 ? "Halfway through"
    : course.progress > 0 ? "Just started"
    : "Not started";

  const statusBadge =
    course.progress === 100 ? { label: "Completed", color: "var(--color-sage)", bg: "rgba(107,143,110,0.12)", border: "rgba(107,143,110,0.25)" }
    : course.progress === 0 ? { label: "Not Started", color: "var(--color-slate-warm)", bg: "var(--color-surface-3)", border: "var(--color-border-dim)" }
    : course.progress >= 90 ? { label: "Almost Done", color: "var(--color-gold-light)", bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.25)" }
    : { label: "In Progress", color: "var(--color-ember)", bg: "rgba(212,98,42,0.1)", border: "rgba(212,98,42,0.2)" };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.08 }}
      whileHover={{
        scale: 1.015,
        boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${color.border}`,
        y: -3,
      }}
      className="card-editorial"
      style={{
        padding: "1.5rem",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Icon + progress row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "10px",
            background: color.bg,
            border: `1px solid ${color.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} color={color.accent} />
        </div>

        {/* Progress ring */}
        <div style={{ position: "relative", width: 32, height: 32, flexShrink: 0 }}>
          <svg width="32" height="32" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="16" cy="16" r="13"
              fill="transparent"
              stroke="var(--color-surface-3)"
              strokeWidth="2"
            />
            <circle
              cx="16" cy="16" r="13"
              fill="transparent"
              stroke={color.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 13}
              strokeDashoffset={2 * Math.PI * 13 * (1 - course.progress / 100)}
              style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)", opacity: 0.8 }}
            />
          </svg>
          <span
            className="font-mono"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "0.5rem",
              fontWeight: 700,
              color: "var(--color-paper)",
            }}
          >
            {course.progress}
          </span>
        </div>
      </div>

      {/* Level tag */}
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: color.accent,
          marginBottom: "4px",
          opacity: 0.8,
        }}
      >
        {details.level}
      </p>

      {/* Title */}
      <h3
        style={{
          fontSize: "0.9rem",
          fontWeight: 600,
          lineHeight: 1.3,
          color: "var(--color-paper)",
          marginBottom: "2px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {course.title}
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--color-slate-warm)",
          lineHeight: 1.5,
          marginBottom: "1rem",
        }}
      >
        {details.subtitle}
      </p>

      {/* Progress bar */}
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              color: "var(--color-slate-warm)",
              fontWeight: 500,
            }}
          >
            {progressLabel}
          </span>
          <span
            className="font-mono"
            style={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: color.accent,
            }}
          >
            {course.progress}%
          </span>
        </div>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: course.progress / 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 + index * 0.06 }}
            style={{
              background: `linear-gradient(90deg, ${color.accent}66, ${color.accent})`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "1rem",
          borderTop: "1px solid var(--color-border-dim)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>
          {details.lessons} lessons · {details.duration}
        </p>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: "99px",
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            color: statusBadge.color,
            background: statusBadge.bg,
            border: `1px solid ${statusBadge.border}`,
          }}
        >
          {statusBadge.label}
        </span>
      </div>
    </motion.article>
  );
}
