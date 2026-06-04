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
  { label: "TypeScript", pct: 34, color: "#7c3aed" },
  { label: "System Design", pct: 22, color: "#0ea5e9" },
  { label: "Machine Learning", pct: 28, color: "#10b981" },
  { label: "Web Performance", pct: 16, color: "#f59e0b" },
];

/* ── KPI cards ── */
const KPIS = [
  { icon: Clock, label: "Total Study Time", value: "148h", sub: "this year", color: "#8b5cf6", trend: "up" },
  { icon: Flame, label: "Current Streak", value: "14", sub: "days", color: "#f97316", trend: "up" },
  { icon: Target, label: "Goals Completed", value: "23", sub: "of 30 set", color: "#10b981", trend: "up" },
  { icon: Trophy, label: "Leaderboard", value: "Top 8%", sub: "among 4.8k users", color: "#eab308", trend: "same" },
];

/* ── Monthly comparison ── */
const MONTHLY = [
  { month: "Jan", hours: 28 }, { month: "Feb", hours: 34 }, { month: "Mar", hours: 31 },
  { month: "Apr", hours: 42 }, { month: "May", hours: 38 }, { month: "Jun", hours: 22 },
];
const MAX_MONTHLY = Math.max(...MONTHLY.map((m) => m.hours));

/* ── Recent milestones ── */
const MILESTONES = [
  { text: "Completed TypeScript Generics module", time: "2 days ago", icon: BookOpen, color: "#7c3aed" },
  { text: "7-day streak achieved", time: "1 week ago", icon: Flame, color: "#f97316" },
  { text: "Scored 94% on System Design quiz", time: "1 week ago", icon: Target, color: "#10b981" },
  { text: "Reached top 10% on leaderboard", time: "2 weeks ago", icon: Trophy, color: "#eab308" },
  { text: "Finished ML Fundamentals section", time: "3 weeks ago", icon: TrendingUp, color: "#0ea5e9" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.07, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <ArrowUp className="h-3 w-3 text-emerald-400" />;
  if (trend === "down") return <ArrowDown className="h-3 w-3 text-red-400" />;
  return <Minus className="h-3 w-3 text-zinc-500" />;
}

export default function AnalyticsPage() {
  return (
    <section aria-label="Analytics" className="min-h-screen p-6 md:p-8 lg:p-10">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Insights</p>
          <h1 className="mt-1 text-base font-semibold text-white">Analytics</h1>
        </div>
        <span className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-500">
          <Calendar className="h-3 w-3" /> Last 12 months
        </span>
      </header>

      {/* KPI Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {KPIS.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.label}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
            >
              <div className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${kpi.color}12 0%, transparent 65%)` }} />
              <div className="relative flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${kpi.color}20` }}>
                  <Icon className="h-4 w-4" style={{ color: kpi.color }} />
                </div>
                <div className="flex items-center gap-1 rounded-md border border-white/[0.05] bg-white/[0.03] px-1.5 py-0.5 text-[10px]">
                  <TrendIcon trend={kpi.trend} />
                </div>
              </div>
              <p className="relative mt-4 text-2xl font-bold tabular-nums text-white">{kpi.value}</p>
              <p className="relative text-xs font-medium text-zinc-400">{kpi.label}</p>
              <p className="relative mt-0.5 text-[10px] text-zinc-600">{kpi.sub}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Weekly study hours bar chart */}
        <motion.div
          custom={4}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Weekly Study Hours</h2>
              <p className="mt-0.5 text-xs text-zinc-600">Last 8 weeks</p>
            </div>
            <BarChart3 className="h-4 w-4 text-violet-400" />
          </div>
          <div className="flex h-36 items-end gap-2">
            {WEEKLY_HOURS.map((w, i) => (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[9px] tabular-nums text-zinc-700">{w.hours}h</span>
                <div className="relative w-full overflow-hidden rounded-t-lg bg-white/[0.04]" style={{ height: "100px" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: w.hours / MAX_HOURS }}
                    transition={{ delay: 0.3 + i * 0.06, type: "spring", stiffness: 220, damping: 22 }}
                    style={{ transformOrigin: "bottom", background: "linear-gradient(to top, #7c3aed, #a78bfa)" }}
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                  />
                </div>
                <span className="text-[9px] text-zinc-600">{w.week}</span>
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
          className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Subject Breakdown</h2>
              <p className="mt-0.5 text-xs text-zinc-600">Time distribution</p>
            </div>
            <Target className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="space-y-3">
            {SUBJECTS.map((s, i) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">{s.label}</span>
                  <span className="tabular-nums text-zinc-500">{s.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: s.pct / 100 }}
                    transition={{ delay: 0.4 + i * 0.08, type: "spring", stiffness: 220, damping: 22 }}
                    style={{ transformOrigin: "left", background: s.color }}
                    className="h-full rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Donut-like visual */}
          <div className="mt-5 flex gap-2 flex-wrap">
            {SUBJECTS.map((s) => (
              <span key={s.label} className="flex items-center gap-1 text-[10px] text-zinc-500">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Monthly + Milestones row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* Monthly hours */}
        <motion.div
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Monthly Progress</h2>
              <p className="mt-0.5 text-xs text-zinc-600">Hours studied per month</p>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex h-28 items-end gap-3">
            {MONTHLY.map((m, i) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative w-full overflow-hidden rounded-t-lg bg-white/[0.04]" style={{ height: "88px" }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: m.hours / MAX_MONTHLY }}
                    transition={{ delay: 0.3 + i * 0.07, type: "spring", stiffness: 220, damping: 22 }}
                    style={{ transformOrigin: "bottom", background: "linear-gradient(to top, #10b981, #34d399)" }}
                    className="absolute bottom-0 left-0 right-0 rounded-t-lg"
                  />
                </div>
                <span className="text-[9px] text-zinc-600">{m.month}</span>
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
          className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
        >
          <h2 className="mb-4 text-sm font-semibold text-white">Recent Milestones</h2>
          <div className="space-y-3">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg" style={{ background: `${m.color}20` }}>
                    <Icon className="h-3 w-3" style={{ color: m.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs leading-snug text-zinc-300">{m.text}</p>
                    <p className="mt-0.5 text-[10px] text-zinc-600">{m.time}</p>
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
