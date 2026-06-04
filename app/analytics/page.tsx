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

const WEEKLY_HOURS = Array.from({ length: 8 }, (_, i) => ({
  week: `W${i + 1}`,
  hours: Math.round(sr(i * 3 + 7) * 14 + 4),
}));
const MAX_HOURS = Math.max(...WEEKLY_HOURS.map((w) => w.hours));

const SUBJECTS = [
  { label: "TypeScript",      pct: 34, color: "var(--color-gold)" },
  { label: "System Design",   pct: 22, color: "var(--color-ember)" },
  { label: "Machine Learning", pct: 28, color: "var(--color-sage)" },
  { label: "Web Performance", pct: 16, color: "#8b7dd8" },
];

const KPIS = [
  { icon: Clock,  label: "Total Study Time",  value: "148h",   sub: "this year",          accent: "var(--color-gold)",  bg: "rgba(201,168,76,0.1)",   border: "rgba(201,168,76,0.2)",   trend: "up" },
  { icon: Flame,  label: "Current Streak",    value: "14",     sub: "days",               accent: "var(--color-ember)", bg: "rgba(212,98,42,0.1)",    border: "rgba(212,98,42,0.2)",    trend: "up" },
  { icon: Target, label: "Goals Completed",   value: "23",     sub: "of 30 set",          accent: "var(--color-sage)",  bg: "rgba(107,143,110,0.1)",  border: "rgba(107,143,110,0.2)", trend: "up" },
  { icon: Trophy, label: "Leaderboard",       value: "Top 8%", sub: "among 4.8k users",   accent: "#8b7dd8",            bg: "rgba(139,125,216,0.1)",  border: "rgba(139,125,216,0.2)", trend: "same" },
];

const MONTHLY = [
  { month: "Jan", hours: 28 }, { month: "Feb", hours: 34 }, { month: "Mar", hours: 31 },
  { month: "Apr", hours: 42 }, { month: "May", hours: 38 }, { month: "Jun", hours: 22 },
];
const MAX_MONTHLY = Math.max(...MONTHLY.map((m) => m.hours));

const MILESTONES = [
  { text: "Completed TypeScript Generics module", time: "2 days ago",  icon: BookOpen,    accent: "var(--color-gold)",     bg: "rgba(201,168,76,0.1)" },
  { text: "7-day streak achieved",               time: "1 week ago",  icon: Flame,       accent: "var(--color-ember)",    bg: "rgba(212,98,42,0.1)" },
  { text: "Scored 94% on System Design quiz",    time: "1 week ago",  icon: Target,      accent: "var(--color-sage)",     bg: "rgba(107,143,110,0.1)" },
  { text: "Reached top 10% on leaderboard",      time: "2 weeks ago", icon: Trophy,      accent: "#8b7dd8",               bg: "rgba(139,125,216,0.1)" },
  { text: "Finished ML Fundamentals section",    time: "3 weeks ago", icon: TrendingUp,  accent: "var(--color-gold-dim)", bg: "rgba(138,111,46,0.1)" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up")   return <ArrowUp   size={11} color="var(--color-sage)" />;
  if (trend === "down") return <ArrowDown size={11} color="var(--color-ember)" />;
  return <Minus size={11} color="var(--color-slate-warm)" />;
}

export default function AnalyticsPage() {
  return (
    <section aria-label="Analytics" className="page-container">
      {/* ── Header ── */}
      <header style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)", marginBottom: "0.3rem" }}>
              Insights
            </p>
            <h1 className="font-display" style={{ fontSize: "clamp(1.6rem, 5vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--color-paper)", lineHeight: 1.1 }}>
              Analytics
            </h1>
          </div>
          <div className="badge-warm" style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "0.25rem" }}>
            <Calendar size={11} />
            Last 12 months
          </div>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.25rem" }} />
      </header>

      {/* ── KPI Cards — 2 cols mobile, 4 cols tablet+ ── */}
      <div className="kpi-grid" style={{ marginBottom: "1.25rem" }}>
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
              style={{ padding: "1rem" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: "8px", background: kpi.bg, border: `1px solid ${kpi.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color={kpi.accent} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "3px", padding: "2px 7px", borderRadius: "99px", background: "var(--color-surface-3)", border: "1px solid var(--color-border-dim)" }}>
                  <TrendIcon trend={kpi.trend} />
                </div>
              </div>
              <p className="stat-number" style={{ fontSize: "1.5rem", color: "var(--color-paper)", marginBottom: "2px" }}>
                {kpi.value}
              </p>
              <p style={{ fontSize: "0.76rem", color: "var(--color-paper)", fontWeight: 500, marginBottom: "1px" }}>{kpi.label}</p>
              <p style={{ fontSize: "0.67rem", color: "var(--color-slate-warm)" }}>{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ── Row 1: Weekly bar chart + Subject breakdown ── */}
      <div className="analytics-charts-grid" style={{ marginBottom: "1.25rem" }}>
        {/* Weekly study hours */}
        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}>
                Weekly Study Hours
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.72rem", color: "var(--color-slate-warm)" }}>Last 8 weeks</p>
            </div>
            <BarChart3 size={15} color="var(--color-gold)" />
          </div>
          {/* Responsive bar chart wrapper */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: 120 }}>
            {WEEKLY_HOURS.map((w, i) => (
              <div key={w.week} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--color-slate-warm)", whiteSpace: "nowrap" }}>{w.hours}h</span>
                <div style={{ flex: 1, position: "relative", width: "100%", background: "var(--color-surface-3)", borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: w.hours / MAX_HOURS }}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      transformOrigin: "bottom",
                      background: "linear-gradient(to top, var(--color-gold-dim), var(--color-gold-light))",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.58rem", color: "var(--color-slate-warm)" }}>{w.week}</span>
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
          style={{ padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}>
                Subject Breakdown
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.72rem", color: "var(--color-slate-warm)" }}>Time distribution</p>
            </div>
            <Target size={15} color="var(--color-sage)" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SUBJECTS.map((s, i) => (
              <div key={s.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "0.76rem", color: "var(--color-paper)", fontWeight: 500 }}>{s.label}</span>
                  <span className="font-mono" style={{ fontSize: "0.72rem", color: "var(--color-slate-warm)" }}>{s.pct}%</span>
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
          <div style={{ marginTop: "0.875rem", display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SUBJECTS.map((s) => (
              <span key={s.label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.67rem", color: "var(--color-slate-warm)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, display: "inline-block", flexShrink: 0 }} />
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Row 2: Monthly bars + Milestones ── */}
      <div className="analytics-charts-grid">
        {/* Monthly progress */}
        <motion.div
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.25rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div>
              <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}>
                Monthly Progress
              </h2>
              <p style={{ marginTop: "2px", fontSize: "0.72rem", color: "var(--color-slate-warm)" }}>Hours studied per month</p>
            </div>
            <TrendingUp size={15} color="var(--color-sage)" />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: 110 }}>
            {MONTHLY.map((m, i) => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
                <div style={{ flex: 1, position: "relative", width: "100%", background: "var(--color-surface-3)", borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: m.hours / MAX_MONTHLY }}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 22 }}
                    style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      transformOrigin: "bottom",
                      background: "linear-gradient(to top, var(--color-sage), rgba(107,143,110,0.5))",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
                <span style={{ fontSize: "0.6rem", color: "var(--color-slate-warm)" }}>{m.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent milestones */}
        <motion.div
          custom={7}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="card-editorial"
          style={{ padding: "1.25rem" }}
        >
          <h2 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em", marginBottom: "0.875rem" }}>
            Recent Milestones
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                  <div style={{
                    marginTop: "1px", width: 22, height: 22, borderRadius: "6px",
                    background: m.bg, border: `1px solid ${m.accent}33`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={11} color={m.accent} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "0.76rem", color: "var(--color-paper)", lineHeight: 1.4 }}>{m.text}</p>
                    <p style={{ marginTop: "1px", fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>{m.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
