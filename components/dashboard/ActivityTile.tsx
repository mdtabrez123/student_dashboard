"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const WEEKS = 26;
const DAYS_PER_WEEK = 7;
const TOTAL = WEEKS * DAYS_PER_WEEK;

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getActivityLevel(value: number): number {
  if (value > 0.85) return 4;
  if (value > 0.65) return 3;
  if (value > 0.45) return 2;
  if (value > 0.2) return 1;
  return 0;
}

// Warm gold-toned activity levels matching reference
const levelColors = [
  "var(--color-surface-3)",
  "rgba(201, 168, 76, 0.2)",
  "rgba(201, 168, 76, 0.4)",
  "rgba(201, 168, 76, 0.65)",
  "var(--color-gold)",
];

const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function ActivityTile() {
  const cells = useMemo(() => {
    const rand = seededRandom(42);
    return Array.from({ length: TOTAL }, (_, i) => {
      const recency = i / TOTAL;
      const base = rand();
      const weighted = base * (0.4 + recency * 0.6);
      return getActivityLevel(weighted);
    });
  }, []);

  // Month labels for x-axis
  const monthLabels = useMemo(() => {
    const now = new Date();
    const labels: { label: string; col: number }[] = [];
    for (let w = 0; w < WEEKS; w += 4) {
      const d = new Date(now);
      d.setDate(d.getDate() - (WEEKS - w) * 7);
      labels.push({
        label: d.toLocaleString("default", { month: "short" }),
        col: w,
      });
    }
    return labels;
  }, []);

  const totalSessions = useMemo(
    () => cells.filter((c) => c > 0).length,
    [cells]
  );

  const activeDays = totalSessions;
  const bestStreak = 14;

  return (
    <div
      className="card-editorial"
      style={{ padding: "1.5rem", overflow: "hidden" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "var(--color-paper)",
              letterSpacing: "-0.01em",
              marginBottom: "2px",
            }}
          >
            Learning Activity
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>
            {totalSessions} sessions in the last 6 months
          </p>
        </div>

        {/* Stat chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { label: "Active days", value: activeDays },
            { label: "Best streak", value: `${bestStreak}d` },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                background: "var(--color-surface-3)",
                border: "1px solid var(--color-border-dim)",
              }}
            >
              <p
                className="font-mono"
                style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-paper)" }}
              >
                {value}
              </p>
              <p style={{ fontSize: "0.6rem", color: "var(--color-slate-warm)", letterSpacing: "0.04em" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>Less</span>
          {levelColors.map((c, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: "2px",
                background: c,
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}
          <span style={{ fontSize: "0.65rem", color: "var(--color-slate-warm)" }}>More</span>
        </div>
      </div>

      {/* Grid */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: WEEKS * 14 }}>
          {/* Month labels */}
          <div
            style={{
              display: "flex",
              marginLeft: 28,
              marginBottom: 4,
              gap: 2,
              position: "relative",
              height: 14,
            }}
          >
            {monthLabels.map(({ label, col }) => (
              <div
                key={`${label}-${col}`}
                style={{
                  position: "absolute",
                  left: col * 14,
                  fontSize: "0.6rem",
                  color: "var(--color-slate-warm)",
                  letterSpacing: "0.04em",
                  fontWeight: 600,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Day labels + cells */}
          <div style={{ display: "flex", gap: "0" }}>
            {/* Day labels */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                marginRight: 4,
                flexShrink: 0,
              }}
            >
              {dayLabels.map((d, i) => (
                <div
                  key={d}
                  style={{
                    height: 10,
                    fontSize: "0.55rem",
                    color: i % 2 === 0 ? "var(--color-slate-warm)" : "transparent",
                    display: "flex",
                    alignItems: "center",
                    letterSpacing: "0.04em",
                    fontWeight: 600,
                  }}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: WEEKS }, (_, w) => (
                <div key={w} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {Array.from({ length: DAYS_PER_WEEK }, (_, d) => {
                    const cellIndex = w * DAYS_PER_WEEK + d;
                    const level = cells[cellIndex];
                    const isRecent = w >= WEEKS - 2;
                    return (
                      <motion.div
                        key={d}
                        className="activity-cell"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          delay: cellIndex * 0.0005,
                          duration: 0.2,
                        }}
                        whileHover={{ scale: 1.3 }}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "2px",
                          background: levelColors[level],
                          border: isRecent && level > 0
                            ? "1px solid rgba(201, 168, 76, 0.3)"
                            : "1px solid rgba(255,255,255,0.03)",
                          cursor: "default",
                        }}
                        title={`Level ${level} activity`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
