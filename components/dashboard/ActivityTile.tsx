"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { Activity } from "lucide-react";

type Level = 0 | 1 | 2 | 3 | 4;

interface Day {
  date: Date;
  count: number;
  level: Level;
}

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function buildGrid(): Day[] {
  const today = new Date();
  const total = WEEKS * DAYS_PER_WEEK;
  return Array.from({ length: total }, (_, i) => {
    const offset = total - 1 - i;
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    const r = seededRandom(i * 7 + 13);
    const count =
      r < 0.35 ? 0
      : r < 0.55 ? Math.floor(seededRandom(i) * 2) + 1
      : r < 0.75 ? Math.floor(seededRandom(i) * 3) + 3
      : r < 0.90 ? Math.floor(seededRandom(i) * 4) + 6
      :             Math.floor(seededRandom(i) * 5) + 10;
    const level: Level =
      count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;
    return { date, count, level };
  });
}

/* Violet scale — 5 levels */
const CELL_BG: Record<Level, string> = {
  0: "rgba(255,255,255,0.04)",
  1: "rgba(109,40,217,0.35)",
  2: "rgba(109,40,217,0.55)",
  3: "rgba(124,58,237,0.75)",
  4: "rgba(139,92,246,1)",
};

const CELL_GLOW: Record<Level, string | undefined> = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: "0 0 6px rgba(124,58,237,0.35)",
  4: "0 0 10px rgba(139,92,246,0.55)",
};

const MONTH_NAMES = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const DAY_LABELS: Record<number, string> = { 1: "Mon", 3: "Wed", 5: "Fri" };

const CELL_SIZE = 13;
const CELL_GAP  = 3;
const CELL_STEP = CELL_SIZE + CELL_GAP;
const DAY_LABEL_WIDTH = 28;

export function ActivityTile() {
  const days = useMemo(() => buildGrid(), []);
  const weeks: Day[][] = useMemo(
    () => Array.from({ length: WEEKS }, (_, w) =>
      days.slice(w * DAYS_PER_WEEK, w * DAYS_PER_WEEK + DAYS_PER_WEEK)
    ),
    [days]
  );

  const monthLabels = useMemo(() => {
    const labels: { label: string; col: number }[] = [];
    const seen = new Set<string>();
    weeks.forEach((week, col) => {
      const d = week[0];
      if (d && d.date.getDate() <= 7) {
        const key = `${d.date.getFullYear()}-${d.date.getMonth()}`;
        if (!seen.has(key)) {
          seen.add(key);
          labels.push({ label: MONTH_NAMES[d.date.getMonth()], col });
        }
      }
    });
    return labels;
  }, [weeks]);

  const activeDays    = days.filter((d) => d.count > 0).length;
  const totalSessions = days.reduce((s, d) => s + d.count, 0);
  const bestStreak    = 14; // deterministic

  const gridWidth  = WEEKS * CELL_STEP - CELL_GAP;
  const gridHeight = DAYS_PER_WEEK * CELL_STEP - CELL_GAP;

  return (
    <AnimatedItem className="md:col-span-2 lg:col-span-4">
      <article
        className="h-full overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(160deg, #0f0f1a 0%, #0d0d17 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.35)",
        }}
      >
        {/* ── Header ── */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            {/* Title row */}
            <div className="mb-1.5 flex items-center gap-2.5">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
              >
                <Activity className="h-3.5 w-3.5 text-violet-400" />
              </div>
              <h2 className="text-base font-bold text-white">Study Activity</h2>
            </div>
            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Your learning sessions over the past year
            </p>
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Active days",  value: activeDays    },
              { label: "Sessions",     value: totalSessions },
              { label: "Best streak",  value: `${bestStreak}d` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl px-3.5 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p className="text-sm font-bold tabular-nums text-white">{value}</p>
                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Heatmap ── */}
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div style={{ minWidth: gridWidth + DAY_LABEL_WIDTH + 8 }}>

            {/* Month labels */}
            <div
              className="relative mb-2"
              style={{ height: 14, marginLeft: DAY_LABEL_WIDTH + 4, width: gridWidth }}
            >
              {monthLabels.map(({ label, col }, i) => (
                <span
                  key={i}
                  className="absolute text-[10px] font-semibold"
                  style={{ left: col * CELL_STEP, top: 0, color: "rgba(255,255,255,0.25)" }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Day labels + grid */}
            <div className="flex">
              {/* Day labels */}
              <div
                className="shrink-0 flex flex-col"
                style={{ width: DAY_LABEL_WIDTH, marginRight: 4, height: gridHeight }}
              >
                {Array.from({ length: DAYS_PER_WEEK }, (_, dayIdx) => (
                  <div
                    key={dayIdx}
                    className="flex items-center text-[10px] font-semibold"
                    style={{
                      height: CELL_SIZE,
                      marginBottom: dayIdx < DAYS_PER_WEEK - 1 ? CELL_GAP : 0,
                      color: "rgba(255,255,255,0.22)",
                    }}
                  >
                    {DAY_LABELS[dayIdx] ?? ""}
                  </div>
                ))}
              </div>

              {/* Cells */}
              <div className="flex" style={{ gap: CELL_GAP }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col" style={{ gap: CELL_GAP }}>
                    {week.map((day, di) => {
                      const globalIdx = wi * DAYS_PER_WEEK + di;
                      return (
                        <motion.div
                          key={di}
                          title={`${day.date.toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })} · ${day.count} session${day.count !== 1 ? "s" : ""}`}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.5 }}
                          transition={{
                            opacity: { delay: globalIdx * 0.0003, duration: 0.18 },
                            scale: { type: "spring", stiffness: 350, damping: 18 },
                          }}
                          className="cursor-default rounded-[3px]"
                          style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            background: CELL_BG[day.level],
                            boxShadow: CELL_GLOW[day.level],
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Legend ── */}
        <div className="mt-4 flex items-center justify-end gap-1.5">
          <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>Less</span>
          {([0, 1, 2, 3, 4] as Level[]).map((l) => (
            <div
              key={l}
              className="rounded-[3px]"
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                background: CELL_BG[l],
                boxShadow: CELL_GLOW[l],
              }}
            />
          ))}
          <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>More</span>
        </div>
      </article>
    </AnimatedItem>
  );
}
