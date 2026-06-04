"use client";

import { motion } from "framer-motion";
import {
  Flame, Trophy, Clock, BookOpen, Star,
  MapPin, Calendar, Link2, AtSign, Code2, Briefcase,
  Edit3, Award, TrendingUp, CheckCircle2, Medal,
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

/* ── Stats ── */
const STATS = [
  { label: "Courses", value: "4", icon: BookOpen, color: "#7c3aed" },
  { label: "Study Hours", value: "148", icon: Clock, color: "#0ea5e9" },
  { label: "Streak", value: "14d", icon: Flame, color: "#f97316" },
  { label: "Leaderboard", value: "Top 8%", icon: Trophy, color: "#eab308" },
];

/* ── Completed courses ── */
const COMPLETED = [
  { title: "JavaScript Fundamentals", score: 96, color: "#f59e0b" },
  { title: "React Essentials", score: 91, color: "#0ea5e9" },
  { title: "Node.js Basics", score: 88, color: "#10b981" },
  { title: "Git & GitHub", score: 100, color: "#7c3aed" },
];

/* ── Badges ── */
const BADGES = [
  { label: "7-Day Streak", icon: Flame, color: "#f97316", earned: true },
  { label: "First Course", icon: BookOpen, color: "#7c3aed", earned: true },
  { label: "Perfect Score", icon: Star, color: "#eab308", earned: true },
  { label: "Top 10%", icon: Trophy, color: "#10b981", earned: true },
  { label: "30-Day Streak", icon: Medal, color: "#ec4899", earned: false },
  { label: "Course Master", icon: Award, color: "#06b6d4", earned: false },
];

/* ── Recent activity ── */
const ACTIVITY = [
  { text: "Completed TypeScript Generics", time: "2 days ago", color: "#7c3aed" },
  { text: "Started Machine Learning module 4", time: "3 days ago", color: "#10b981" },
  { text: "Scored 94% on System Design quiz", time: "1 week ago", color: "#0ea5e9" },
  { text: "Reached 14-day study streak", time: "1 week ago", color: "#f97316" },
  { text: "Finished Web Performance section 3", time: "2 weeks ago", color: "#f59e0b" },
];

/* ── Skills ── */
const SKILLS = [
  { label: "TypeScript", pct: 84, color: "#7c3aed" },
  { label: "System Design", pct: 60, color: "#0ea5e9" },
  { label: "Machine Learning", pct: 72, color: "#10b981" },
  { label: "Web Performance", pct: 91, color: "#f59e0b" },
  { label: "React", pct: 88, color: "#ec4899" },
  { label: "Node.js", pct: 75, color: "#06b6d4" },
];

export default function ProfilePage() {
  return (
    <section aria-label="Profile" className="min-h-screen p-6 md:p-8 lg:p-10">

      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Account</p>
          <h1 className="mt-1 text-base font-semibold text-white">Profile</h1>
        </div>
        <motion.button
          id="edit-profile-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <Edit3 className="h-3.5 w-3.5" /> Edit Profile
        </motion.button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        {/* ── Left column: avatar + bio ── */}
        <div className="flex flex-col gap-4">

          {/* Profile card */}
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-6 text-center"
          >
            {/* Avatar */}
            <div className="relative mx-auto mb-4 h-20 w-20">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-violet-900/40">
                A
              </div>
              <span className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-[#0f0f1c] bg-emerald-500" />
            </div>

            <h2 className="text-base font-bold text-white">Alex Johnson</h2>
            <p className="mt-0.5 text-xs text-violet-400 font-medium">Full-Stack Developer</p>
            <p className="mt-3 text-xs leading-relaxed text-zinc-500">
              Passionate learner building skills in TypeScript, system design, and ML. Always chasing the next milestone.
            </p>

            {/* Meta */}
            <div className="mt-4 space-y-2 text-left">
              {[
                { Icon: MapPin, text: "Bangalore, India" },
                { Icon: Calendar, text: "Joined January 2024" },
                { Icon: Link2, text: "learnflow.io/alex" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-zinc-600">
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-5 flex justify-center gap-3">
              {[
                { Icon: AtSign, id: "social-twitter", color: "#1DA1F2" },
                { Icon: Code2, id: "social-github", color: "#e4e4e7" },
                { Icon: Briefcase, id: "social-linkedin", color: "#0A66C2" },
              ].map(({ Icon, id, color }) => (
                <motion.button
                  key={id}
                  id={id}
                  whileHover={{ scale: 1.15, y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] transition-colors hover:border-white/[0.15]"
                >
                  <Icon className="h-3.5 w-3.5" style={{ color }} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
          >
            <h3 className="mb-4 text-sm font-semibold text-white">Badges</h3>
            <div className="grid grid-cols-3 gap-2">
              {BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    title={badge.label}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border p-2.5 ${badge.earned
                      ? "border-white/[0.07] bg-white/[0.03]"
                      : "border-white/[0.03] bg-white/[0.01] opacity-40 grayscale"
                      }`}
                  >
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ background: badge.earned ? `${badge.color}22` : "transparent" }}
                    >
                      <Icon className="h-3.5 w-3.5" style={{ color: badge.earned ? badge.color : "#52525b" }} />
                    </div>
                    <span className="text-center text-[9px] leading-tight text-zinc-500">{badge.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Right columns: stats + skills + activity ── */}
        <div className="flex flex-col gap-4 lg:col-span-2">

          {/* Stats row */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-4"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 90% 70% at 0% 0%, ${s.color}12 0%, transparent 65%)` }}
                  />
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-xl mb-3" style={{ background: `${s.color}20` }}>
                    <Icon className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                  <p className="relative text-xl font-bold tabular-nums text-white">{s.value}</p>
                  <p className="relative mt-0.5 text-[10px] text-zinc-600">{s.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Skills */}
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Skills & Proficiency</h3>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SKILLS.map((skill, i) => (
                <div key={skill.label}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">{skill.label}</span>
                    <span className="tabular-nums text-zinc-600">{skill.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: skill.pct / 100 }}
                      transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200, damping: 24 }}
                      style={{ transformOrigin: "left", background: skill.color }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Completed courses + Activity side by side */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Completed courses */}
            <motion.div
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
            >
              <h3 className="mb-4 text-sm font-semibold text-white">Completed Courses</h3>
              <div className="space-y-3">
                {COMPLETED.map((c) => (
                  <div key={c.title} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: c.color }} />
                      <span className="text-xs text-zinc-300 truncate">{c.title}</span>
                    </div>
                    <span
                      className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
                      style={{ background: `${c.color}20`, color: c.color }}
                    >
                      {c.score}%
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent activity */}
            <motion.div
              custom={5}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
            >
              <h3 className="mb-4 text-sm font-semibold text-white">Recent Activity</h3>
              <div className="space-y-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: a.color }}
                    />
                    <div className="min-w-0">
                      <p className="text-xs leading-snug text-zinc-300">{a.text}</p>
                      <p className="mt-0.5 text-[10px] text-zinc-600">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
