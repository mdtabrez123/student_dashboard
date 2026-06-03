"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";

type ActivityLevel = 0 | 1 | 2 | 3 | 4;

interface ActivityDay {
  date: Date;
  count: number;
  level: ActivityLevel;
}

const WEEKS = 52;
const DAYS_PER_WEEK = 7;
const TOTAL_DAYS = WEEKS * DAYS_PER_WEEK;

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = [];
  const today = new Date();

  for (let i = TOTAL_DAYS - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const rand = seededRandom(i * 7 + 13);
    const count =
      rand < 0.35
        ? 0
        : rand < 0.55
        ? Math.floor(seededRandom(i) * 2) + 1
        : rand < 0.75
        ? Math.floor(seededRandom(i) * 3) + 3
        : rand < 0.9
        ? Math.floor(seededRandom(i) * 4) + 6
        : Math.floor(seededRandom(i) * 5) + 10;

    const level: ActivityLevel =
      count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4;

    days.push({ date, count, level });
  }
  return days;
}

const levelColors: Record<ActivityLevel, string> = {
  0: "bg-white/[0.05] border border-white/[0.04]",
  1: "bg-purple-900/60 border border-purple-700/30",
  2: "bg-purple-700/70 border border-purple-500/40",
  3: "bg-indigo-500/80 border border-indigo-400/50",
  4: "bg-gradient-to-br from-purple-400 to-cyan-400 shadow-sm shadow-purple-500/30",
};

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(), []);

  const weeks: ActivityDay[][] = [];
  for (let w = 0; w < WEEKS; w++) {
    weeks.push(activityData.slice(w * DAYS_PER_WEEK, (w + 1) * DAYS_PER_WEEK));
  }

  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, colIdx) => {
    const firstDay = week[0];
    if (firstDay && firstDay.date.getDate() <= 7) {
      monthLabels.push({
        label: MONTH_LABELS[firstDay.date.getMonth()],
        col: colIdx,
      });
    }
  });

  const totalStudyDays = activityData.filter((d) => d.count > 0).length;

  return (
    <AnimatedItem className="md:col-span-2 lg:col-span-2">
      <article className="relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
        {/* Background glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Study Activity</h2>
            <p className="mt-0.5 text-xs text-white/40">
              {totalStudyDays} active days in the last year
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-white/30">
            <span>Less</span>
            {([0, 1, 2, 3, 4] as ActivityLevel[]).map((l) => (
              <div key={l} className={`h-3 w-3 rounded-sm ${levelColors[l]}`} />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* Month labels */}
        <div className="relative mb-1 flex pl-6">
          {monthLabels.map(({ label, col }, i) => (
            <span
              key={i}
              className="absolute text-[10px] text-white/25"
              style={{ left: `${col * (11 + 2) + 24}px` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Graph */}
        <div className="flex gap-0.5">
          {/* Day labels */}
          <div className="mr-1.5 flex flex-col justify-between pt-0.5">
            {DAY_LABELS.map((label, i) => (
              <span key={i} className="h-[11px] text-[9px] leading-none text-white/25">
                {label}
              </span>
            ))}
          </div>

          {/* Week columns */}
          <div className="flex gap-0.5">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-0.5">
                {week.map((day, dayIdx) => {
                  const globalIdx = weekIdx * 7 + dayIdx;
                  return (
                    // GAP 3 FIX: Framer Motion whileHover instead of CSS hover:scale-125
                    <motion.div
                      key={dayIdx}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.25 }}
                      transition={{
                        default: {
                          delay: globalIdx * 0.0008,
                          duration: 0.3,
                          ease: "easeOut",
                        },
                        // Spring for hover specifically
                        scale: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      title={`${day.date.toDateString()} — ${day.count} sessions`}
                      className={`h-[11px] w-[11px] cursor-pointer rounded-sm ${levelColors[day.level]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </article>
    </AnimatedItem>
  );
}
