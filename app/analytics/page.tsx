"use client";

import { motion } from "framer-motion";
import {
  TrendingUp, Clock, Flame, Trophy, Target, BookOpen,
  BarChart3, Calendar, ArrowUp, ArrowDown, Minus,
} from "lucide-react";

/* ── Seeded RNG for deterministic data ── */
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ── Weekly hours data (last 8 weeks) ── */
const WEEKLY_HOURS = Array.from({ length: 8 }, (_, i) => ({
  week: `W${i + 1}`,
  hours: Math.round(sr(i * 3 + 7) * 14 + 4),
}));
const MAX_HOURS = Math.max(...WEEKLY_HOURS.map((w) => w.hours));

/* ── Subject breakdown ── */
const SUBJECTS = [
  { label: "TypeScript", pct: 34, color: "var(--color-gold)" },
  { label: "System Design", pct: 22, color: "var(--color-ember)" },
  { label: "Machine Learning", pct: 28, color: "var(--color-sage)" },
  { label: "Web Performance", pct: 16, color: "#8b7dd8" },
];

/* ── KPI cards ── */
const KPIS = [
  { icon: Clock, label: "Total Study Time", value: "148h", sub: "this year", accent: "var(--color-gold)", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.2)", trend: "up" },
  { icon: Flame, label: "Current Streak", value: "14", sub: "days", accent: "var(--color-ember)", bg: "rgba(212,98,42,0.1)", border: "rgba(212,98,42,0.2)", trend: "up" },
  { icon: Target, label: "Goals Completed", value: "23", sub: "of 30 set", accent: "var(--color-sage)", bg: "rgba(107,143,110,0.1)", border: "rgba(107,143,110,0.2)", trend: "up" },
  { icon: Trophy, label: "Leaderboard", value: "Top 8%", sub: "among 4.8k users", accent: "#8b7dd8", bg: "rgba(139,125,216,0.1)", border: "rgba(139,125,216,0.2)", trend: "same" },
];

/* ── Monthly comparison ── */
const MONTHLY = [
  { month: "Jan", hours: 28 }, { month: "Feb", hours: 34 }, { month: "Mar", hours: 31 },
  { month: "Apr", hours: 42 }, { month: "May", hours: 38 }, { month: "Jun", hours: 22 },
];
const MAX_MONTHLY = Math.max(...MONTHLY.map((m) => m.hours));

/* ── Recent milestones ── */
const MILESTONES = [
  { text: "Completed TypeScript Generics module", time: "2 days ago", icon: BookOpen, accent: "var(--color-gold)", bg: "rgba(201,168,76,0.1)" },
  { text: "7-day streak achieved", time: "1 week ago", icon: Flame, accent: "var(--color-ember)", bg: "rgba(212,98,42,0.1)" },
  { text: "Scored 94% on System Design quiz", time: "1 week ago", icon: Target, accent: "var(--color-sage)", bg: "rgba(107,143,110,0.1)" },
  { text: "Reached top 10% on leaderboard", time: "2 weeks ago", icon: Trophy, accent: "#8b7dd8", bg: "rgba(139,125,216,0.1)" },
  { text: "Finished ML Fundamentals section", time: "3 weeks ago", icon: TrendingUp, accent: "var(--color-gold-dim)", bg: "rgba(138,111,46,0.1)" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <ArrowUp size={12} color="var(--color-sage)" />;
  if (trend === "down") return <ArrowDown size={12} color="var(--color-ember)" />;
  return <Minus size={12} color="var(--color-slate-warm)" />;
}

export default function AnalyticsPage() {
  return (
    <section aria-label="Analytics" style={{ padding: "2rem 2rem 4rem", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "0.35rem",
              }}
            >
              Insights
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-paper)",
                lineHeight: 1.1,
              }}
            >
              Analytics
            </h1>
          </div>
          <div
            className="badge-warm"
            style={{ marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "6px" }}
          >
            <Calendar size={11} />
            Last 12 months
          </div>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </header>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02 }}
              className="card-editorial"
              style={{ padding: "1.25rem 1.5rem" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: kpi.bg,
                    border: `1px solid ${kpi.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={16} color={kpi.accent} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "99px",
                    background: "var(--color-surface-3)",
                    border: "1px solid var(--color-border-dim)",
                  }}
                >
                  <TrendIcon trend={kpi.trend} />
                </div>
              </div>
              <p
                className="stat-number"
                style={{ fontSize: "1.75rem", color: "var(--color-paper)", marginBottom: "2px" }}
              >
                {kpi.value}
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--color-paper)", fontWeight: 500, marginBottom: "2px" }}>
                {kpi.label}
              </p>
              <p style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
        className="analytics-charts-grid"
      >
        {/* Weekly study hours bar chart */}
        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h2
                className="font-display"
                style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
              >
                Weekly Study Hours
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>Last 8 weeks</p>
            </div>
            <BarChart3 size={16} color="var(--color-gold)" />
          </div>
          <div style={{ display: "flex", height: "140px", alignItems: "flex-end", gap: "8px" }}>
            {WEEKLY_HOURS.map((w, i) => (
              <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>{w.hours}h</span>
                <div style={{ position: "relative", width: "100%", height: "100px", background: "var(--color-surface-3)", borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: w.hours / MAX_HOURS }}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      transformOrigin: "bottom",
                      background: "linear-gradient(to top, var(--color-gold-dim), var(--color-gold-light))",
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>{w.week}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject breakdown */}
        <motion.div
          custom={5}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h2
                className="font-display"
                style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
              >
                Subject Breakdown
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>Time distribution</p>
            </div>
            <Target size={16} color="var(--color-sage)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SUBJECTS.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-paper)", fontWeight: 500 }}>{s.label}</span>
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>{s.pct}%</span>
                </div>
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: s.pct / 100 }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 220, damping: 22 }}
                    style={{ background: `linear-gradient(90deg, ${s.color}66, ${s.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SUBJECTS.map((s) => (
              <span key={s.label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block" }} />
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly + Milestones row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1rem",
        }}
        className="analytics-charts-grid"
      >
        {/* Monthly hours */}
        <motion.div
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <div>
              <h2
                className="font-display"
                style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
              >
                Monthly Progress
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>Hours studied per month</p>
            </div>
            <TrendingUp size={16} color="var(--color-sage)" />
          </div>
          <div style={{ display: "flex", height: "112px", alignItems: "flex-end", gap: "12px" }}>
            {MONTHLY.map((m, i) => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div style={{ position: "relative", width: "100%", height: "88px", background: "var(--color-surface-3)", borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: m.hours / MAX_MONTHLY }}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 22 }}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      transformOrigin: "bottom",
                      background: "linear-gradient(to top, var(--color-sage), rgba(107,143,110,0.5))",
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          custom={7}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.5rem" }}
        >
          <h2
            className="font-display"
            style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em", marginBottom: "1rem" }}
          >
            Recent Milestones
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div
                    style={{
                      marginTop: "2px",
                      width: 24,
                      height: 24,
                      borderRadius: "6px",
                      background: m.bg,
                      border: `1px solid ${m.accent}33`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={12} color={m.accent} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--color-paper)", lineHeight: 1.4 }}>{m.text}</p>
                    <p style={{ marginTop: "2px", fontSize: "0.68rem", color: "var(--color-slate-warm)" }}>{m.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .analytics-charts-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
