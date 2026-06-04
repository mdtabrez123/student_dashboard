"use client";

import { motion } from "framer-motion";
import { Flame, Clock, TrendingUp, Trophy, ArrowRight, Zap } from "lucide-react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";
import { useState, useEffect } from "react";

const STREAK = 14;
const STREAK_GOAL = 30;

const STATS = [
  {
    icon: Flame,
    label: "Day Streak",
    value: "14",
    unit: "days",
    color: "#f97316",
    glow: "rgba(249,115,22,0.22)",
    iconBg: "rgba(249,115,22,0.1)",
    iconBorder: "rgba(249,115,22,0.18)",
  },
  {
    icon: Clock,
    label: "Study Time",
    value: "12.4",
    unit: "hrs/wk",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.22)",
    iconBg: "rgba(139,92,246,0.1)",
    iconBorder: "rgba(139,92,246,0.18)",
  },
  {
    icon: TrendingUp,
    label: "Avg Progress",
    value: "69",
    unit: "%",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.22)",
    iconBg: "rgba(6,182,212,0.1)",
    iconBorder: "rgba(6,182,212,0.18)",
  },
  {
    icon: Trophy,
    label: "Leaderboard",
    value: "Top 8",
    unit: "%",
    color: "#eab308",
    glow: "rgba(234,179,8,0.22)",
    iconBg: "rgba(234,179,8,0.1)",
    iconBorder: "rgba(234,179,8,0.18)",
  },
] as const;

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
    <AnimatedItem className="col-span-full">
      <article
        className="relative overflow-hidden rounded-2xl p-7 md:p-10"
        style={{
          background: "linear-gradient(145deg, #0d0d18 0%, #0a0a15 60%, #0c0a18 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.02), 0 24px 80px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* ── Aurora blobs ── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="aurora-a absolute -top-40 -left-40 h-96 w-96 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.9) 0%, transparent 70%)",
              filter: "blur(52px)",
              opacity: 0.1,
            }}
          />
          <div
            className="aurora-b absolute -bottom-32 left-[20%] h-80 w-80 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.9) 0%, transparent 70%)",
              filter: "blur(60px)",
              opacity: 0.07,
            }}
          />
          <div
            className="aurora-c absolute -top-20 right-[5%] h-72 w-[40%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, transparent 70%)",
              filter: "blur(64px)",
              opacity: 0.065,
            }}
          />
        </div>

        {/* ── Noise texture ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative">
          {/* ── Greeting + heading + CTA ── */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {/* Greeting pill */}
              <div
                className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                style={{
                  background: "rgba(124,58,237,0.1)",
                  border: "1px solid rgba(124,58,237,0.22)",
                }}
              >
                <Zap className="h-3 w-3 text-violet-400" />
                <span className="text-[11px] font-semibold tracking-wide text-violet-300">
                  {greeting}
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                Welcome back,{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #c4b5fd 0%, #a78bfa 40%, #67e8f9 100%)",
                  }}
                >
                  Alex
                </span>
              </h1>

              <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                {STREAK}-day streak&nbsp;&nbsp;·&nbsp;&nbsp;4 active courses&nbsp;&nbsp;·&nbsp;&nbsp;keep pushing
              </p>
            </div>

            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 8px 32px rgba(124,58,237,0.4), 0 0 0 1px rgba(139,92,246,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-5 py-2.5 text-sm font-semibold text-white"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                border: "1px solid rgba(139,92,246,0.4)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.2)",
              }}
            >
              Continue learning
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>

          {/* ── Stats chips ── */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{
                    delay: 0.14 + i * 0.07,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="relative cursor-default overflow-hidden rounded-xl p-4"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {/* Glow orb */}
                  <div
                    aria-hidden
                    className="glow-pulse pointer-events-none absolute -right-5 -top-5 h-16 w-16 rounded-full"
                    style={{
                      background: stat.glow,
                      filter: "blur(14px)",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-3.5 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      background: stat.iconBg,
                      border: `1px solid ${stat.iconBorder}`,
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: stat.color }} />
                  </div>

                  {/* Value */}
                  <p className="relative text-[22px] font-bold tabular-nums leading-none text-white">
                    {stat.value}
                    <span
                      className="ml-1 text-xs font-normal"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {stat.unit}
                    </span>
                  </p>

                  {/* Label */}
                  <p
                    className="relative mt-1.5 text-[11px] font-medium"
                    style={{ color: "rgba(255,255,255,0.38)" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* ── 30-day streak bar ── */}
          <div className="mt-8">
            <div
              className="mb-3 flex items-center justify-between text-[11px] font-medium"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <span>30-day activity</span>
              <span className="tabular-nums">
                {STREAK} / {STREAK_GOAL} days
              </span>
            </div>
            <div className="flex h-1.5 gap-[3px]">
              {Array.from({ length: STREAK_GOAL }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.013,
                    type: "spring",
                    stiffness: 400,
                    damping: 24,
                  }}
                  style={{
                    transformOrigin: "bottom",
                    boxShadow: i < STREAK ? "0 0 4px rgba(139,92,246,0.35)" : undefined,
                  }}
                  className={`flex-1 rounded-full ${
                    i < STREAK ? "bg-violet-500" : "bg-white/[0.06]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </AnimatedItem>
  );
}
