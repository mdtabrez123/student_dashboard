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
  { label: "Courses", value: "4", icon: BookOpen, accent: "var(--color-gold)", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.2)" },
  { label: "Study Hours", value: "148", icon: Clock, accent: "var(--color-sage)", bg: "rgba(107,143,110,0.1)", border: "rgba(107,143,110,0.2)" },
  { label: "Streak", value: "14d", icon: Flame, accent: "var(--color-ember)", bg: "rgba(212,98,42,0.1)", border: "rgba(212,98,42,0.2)" },
  { label: "Leaderboard", value: "Top 8%", icon: Trophy, accent: "#8b7dd8", bg: "rgba(139,125,216,0.1)", border: "rgba(139,125,216,0.2)" },
];

/* ── Completed courses ── */
const COMPLETED = [
  { title: "JavaScript Fundamentals", score: 96, accent: "var(--color-gold)" },
  { title: "React Essentials", score: 91, accent: "var(--color-sage)" },
  { title: "Node.js Basics", score: 88, accent: "var(--color-ember)" },
  { title: "Git & GitHub", score: 100, accent: "#8b7dd8" },
];

/* ── Badges ── */
const BADGES = [
  { label: "7-Day Streak", icon: Flame, accent: "var(--color-ember)", bg: "rgba(212,98,42,0.1)", border: "rgba(212,98,42,0.2)", earned: true },
  { label: "First Course", icon: BookOpen, accent: "var(--color-gold)", bg: "rgba(201,168,76,0.1)", border: "rgba(201,168,76,0.2)", earned: true },
  { label: "Perfect Score", icon: Star, accent: "#8b7dd8", bg: "rgba(139,125,216,0.1)", border: "rgba(139,125,216,0.2)", earned: true },
  { label: "Top 10%", icon: Trophy, accent: "var(--color-sage)", bg: "rgba(107,143,110,0.1)", border: "rgba(107,143,110,0.2)", earned: true },
  { label: "30-Day Streak", icon: Medal, accent: "var(--color-gold-dim)", bg: "rgba(138,111,46,0.1)", border: "rgba(138,111,46,0.2)", earned: false },
  { label: "Course Master", icon: Award, accent: "var(--color-slate-warm)", bg: "var(--color-surface-3)", border: "var(--color-border-dim)", earned: false },
];

/* ── Recent activity ── */
const ACTIVITY = [
  { text: "Completed TypeScript Generics", time: "2 days ago", accent: "var(--color-gold)" },
  { text: "Started Machine Learning module 4", time: "3 days ago", accent: "var(--color-sage)" },
  { text: "Scored 94% on System Design quiz", time: "1 week ago", accent: "var(--color-ember)" },
  { text: "Reached 14-day study streak", time: "1 week ago", accent: "var(--color-ember)" },
  { text: "Finished Web Performance section 3", time: "2 weeks ago", accent: "#8b7dd8" },
];

/* ── Skills ── */
const SKILLS = [
  { label: "TypeScript", pct: 84, accent: "var(--color-gold)" },
  { label: "System Design", pct: 60, accent: "var(--color-sage)" },
  { label: "Machine Learning", pct: 72, accent: "var(--color-ember)" },
  { label: "Web Performance", pct: 91, accent: "#8b7dd8" },
  { label: "React", pct: 88, accent: "var(--color-gold-light)" },
  { label: "Node.js", pct: 75, accent: "var(--color-gold-dim)" },
];

export default function ProfilePage() {
  return (
    <section aria-label="Profile" style={{ padding: "2rem 2rem 4rem", minHeight: "100vh" }}>
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
              Account
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
              Profile
            </h1>
          </div>
          <motion.button
            id="edit-profile-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border-dim)",
              color: "var(--color-slate-warm)",
              fontSize: "0.85rem",
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              transition: "color 0.15s ease",
            }}
          >
            <Edit3 size={14} />
            Edit Profile
          </motion.button>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </header>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}
        className="profile-grid"
      >
        {/* ── Left column ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Profile card */}
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="card-editorial"
            style={{ padding: "1.5rem", textAlign: "center" }}
          >
            {/* Avatar */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-gold-dim), var(--color-gold))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  fontFamily: "var(--font-display)",
                }}
              >
                A
              </div>
              <span
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: "var(--color-sage)",
                  border: "2px solid var(--color-surface-2)",
                  display: "block",
                }}
              />
            </div>

            <h2
              className="font-display"
              style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-paper)", marginBottom: "2px" }}
            >
              Alex Johnson
            </h2>
            <p style={{ fontSize: "0.78rem", color: "var(--color-gold)", fontWeight: 600, marginBottom: "0.75rem" }}>
              Full-Stack Developer
            </p>
            <p style={{ fontSize: "0.8rem", color: "var(--color-slate-warm)", lineHeight: 1.6, marginBottom: "1rem" }}>
              Passionate learner building skills in TypeScript, system design, and ML. Always chasing the next milestone.
            </p>

            {/* Meta */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" }}>
              {[
                { Icon: MapPin, text: "Bangalore, India" },
                { Icon: Calendar, text: "Joined January 2024" },
                { Icon: Link2, text: "learnflow.io/alex" },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "var(--color-slate-warm)" }}>
                  <Icon size={13} style={{ flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center", gap: "8px" }}>
              {[
                { Icon: AtSign, id: "social-twitter", color: "var(--color-sage)" },
                { Icon: Code2, id: "social-github", color: "var(--color-paper)" },
                { Icon: Briefcase, id: "social-linkedin", color: "var(--color-gold)" },
              ].map(({ Icon, id, color }) => (
                <motion.button
                  key={id}
                  id={id}
                  whileHover={{ scale: 1.15, y: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "var(--radius-sm)",
                    background: "var(--color-surface-3)",
                    border: "1px solid var(--color-border-dim)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={14} color={color} />
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
            className="card-editorial"
            style={{ padding: "1.5rem" }}
          >
            <h3
              className="font-display"
              style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em", marginBottom: "1rem" }}
            >
              Badges
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
              {BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    title={badge.label}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 6px",
                      borderRadius: "var(--radius-sm)",
                      border: badge.earned ? badge.border : "1px solid var(--color-border-dim)",
                      background: badge.earned ? badge.bg : "transparent",
                      opacity: badge.earned ? 1 : 0.4,
                      filter: badge.earned ? "none" : "grayscale(1)",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: badge.earned ? badge.bg : "transparent",
                      }}
                    >
                      <Icon size={14} color={badge.earned ? badge.accent : "var(--color-slate-warm)"} />
                    </div>
                    <span style={{ textAlign: "center", fontSize: "0.62rem", lineHeight: 1.2, color: "var(--color-slate-warm)" }}>
                      {badge.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Right columns ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Stats row */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}
            className="profile-stats-grid"
          >
            {STATS.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="card-editorial"
                  style={{ padding: "1.25rem 1rem" }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      background: s.bg,
                      border: `1px solid ${s.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <Icon size={15} color={s.accent} />
                  </div>
                  <p className="stat-number" style={{ fontSize: "1.5rem", color: "var(--color-paper)", marginBottom: "2px" }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)", fontWeight: 500 }}>
                    {s.label}
                  </p>
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
            className="card-editorial"
            style={{ padding: "1.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3
                className="font-display"
                style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
              >
                Skills & Proficiency
              </h3>
              <TrendingUp size={15} color="var(--color-sage)" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="skills-grid">
              {SKILLS.map((skill, i) => (
                <div key={skill.label}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-paper)", fontWeight: 500 }}>{skill.label}</span>
                    <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>{skill.pct}%</span>
                  </div>
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: skill.pct / 100 }}
                      transition={{ delay: 0.4 + i * 0.07, type: "spring", stiffness: 200, damping: 24 }}
                      style={{ background: `linear-gradient(90deg, ${skill.accent}66, ${skill.accent})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Completed + Activity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="profile-bottom-grid">
            {/* Completed courses */}
            <motion.div
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="card-editorial"
              style={{ padding: "1.5rem" }}
            >
              <h3
                className="font-display"
                style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em", marginBottom: "1rem" }}
              >
                Completed Courses
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {COMPLETED.map((c) => (
                  <div key={c.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                      <CheckCircle2 size={15} color={c.accent} style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: "0.78rem", color: "var(--color-paper)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c.title}
                      </span>
                    </div>
                    <span
                      className="font-mono"
                      style={{
                        flexShrink: 0,
                        padding: "2px 8px",
                        borderRadius: "99px",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        color: c.accent,
                        background: `${c.accent}20`,
                        border: `1px solid ${c.accent}33`,
                      }}
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
              className="card-editorial"
              style={{ padding: "1.5rem" }}
            >
              <h3
                className="font-display"
                style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em", marginBottom: "1rem" }}
              >
                Recent Activity
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                    <span
                      style={{
                        marginTop: "6px",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: a.accent,
                        flexShrink: 0,
                        display: "block",
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "0.78rem", color: "var(--color-paper)", lineHeight: 1.4 }}>{a.text}</p>
                      <p style={{ marginTop: "2px", fontSize: "0.68rem", color: "var(--color-slate-warm)" }}>{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .profile-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .profile-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .profile-bottom-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
