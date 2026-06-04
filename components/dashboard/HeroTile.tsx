"use client";

import { motion } from "framer-motion";
import { Flame, Clock, TrendingUp, Trophy, Target, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const STREAK = 14;
const STREAK_GOAL = 30;

// 14-day streak bar data
const streakData = [
  0.9, 0.7, 1.0, 0.5, 0.8, 0.3, 1.0,
  0.6, 1.0, 0.9, 0.4, 1.0, 0.7, 1.0,
];

const QUICK_STATS = [
  { icon: Target, label: "Goal", value: "80% weekly" },
  { icon: Clock, label: "Today", value: "1.4 hrs" },
  { icon: TrendingUp, label: "Rank", value: "Top 8%" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HeroTile() {
  const [greeting, setGreeting] = useState("Good day");
  useEffect(() => {
    const id = requestAnimationFrame(() => setGreeting(getGreeting()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="card-editorial"
      style={{
        padding: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Animated gradient background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 80%, rgba(212,98,42,0.05) 0%, transparent 60%)",
            "radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Decorative corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 160,
          height: 160,
          background: "radial-gradient(circle at top right, rgba(201,168,76,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "1.5rem",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Left: main content */}
        <div>
          {/* Streak badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 12px",
                borderRadius: "99px",
                background: "rgba(212, 98, 42, 0.15)",
                border: "1px solid rgba(212, 98, 42, 0.25)",
              }}
            >
              <Flame size={13} color="var(--color-ember)" strokeWidth={2.5} />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--color-ember)",
                  letterSpacing: "0.05em",
                }}
              >
                {STREAK}-day streak
              </span>
            </div>
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--color-paper)",
              marginBottom: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Keep the momentum{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              going.
            </em>
          </h2>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-slate-warm)",
              lineHeight: 1.6,
              maxWidth: "360px",
              marginBottom: "1.5rem",
            }}
          >
            You&apos;re in the top 12% of learners this week.
            Complete today&apos;s ML module to hit your weekly goal.
          </p>

          {/* Quick stats row */}
          <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            {QUICK_STATS.map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "6px",
                    background: "rgba(201, 168, 76, 0.1)",
                    border: "1px solid rgba(201, 168, 76, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={13} color="var(--color-gold)" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      color: "var(--color-slate-warm)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      lineHeight: 1,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "var(--color-paper)",
                      lineHeight: 1.3,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 32px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "var(--radius-md)",
              background: "rgba(201, 168, 76, 0.12)",
              border: "1px solid rgba(201, 168, 76, 0.25)",
              color: "var(--color-gold-light)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Continue learning
            <ArrowRight size={14} />
          </motion.button>
        </div>

        {/* Right: streak bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "var(--color-slate-warm)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "4px",
              textAlign: "right",
            }}
          >
            14d activity
          </p>
          <div
            style={{
              display: "flex",
              gap: "3px",
              alignItems: "flex-end",
              height: 60,
            }}
          >
            {streakData.map((value, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.3 + i * 0.04,
                }}
                style={{
                  width: 7,
                  height: 60 * value,
                  borderRadius: "3px",
                  background:
                    i === streakData.length - 1
                      ? "linear-gradient(0deg, var(--color-gold-dim), var(--color-gold-light))"
                      : value > 0.7
                      ? "rgba(201, 168, 76, 0.5)"
                      : value > 0.4
                      ? "rgba(201, 168, 76, 0.25)"
                      : "var(--color-surface-3)",
                  transformOrigin: "bottom",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>

          {/* 30-day progress bar */}
          <div style={{ marginTop: "1rem", minWidth: "120px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span style={{ fontSize: "0.6rem", color: "var(--color-slate-warm)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                30d goal
              </span>
              <span className="font-mono" style={{ fontSize: "0.6rem", color: "var(--color-gold)", fontWeight: 600 }}>
                {STREAK}/{STREAK_GOAL}
              </span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: STREAK / STREAK_GOAL }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
