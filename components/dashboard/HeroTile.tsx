"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, Target, Zap } from "lucide-react";
import { AnimatedItem } from "@/components/ui/AnimatedSection";

const streak = 14;

export function HeroTile() {
  return (
    <AnimatedItem className="col-span-full">
      <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] p-8 md:p-10">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#0D0D12]" />
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 50%)",
                "radial-gradient(ellipse at 40% 80%, rgba(79,70,229,0.18) 0%, transparent 60%), radial-gradient(ellipse at 60% 10%, rgba(124,58,237,0.12) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(6,182,212,0.12) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-purple-400"
            >
              Good morning ✦
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              Welcome Back,{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Student
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-white/50"
            >
              You&apos;re making incredible progress. Keep the momentum going!
            </motion.p>
          </div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-3"
          >
            <StatChip
              icon={<Flame className="h-4 w-4 text-orange-400" />}
              label="Day Streak"
              value={`${streak} days`}
              glow="orange"
            />
            <StatChip
              icon={<Trophy className="h-4 w-4 text-yellow-400" />}
              label="Rank"
              value="Top 5%"
              glow="yellow"
            />
            <StatChip
              icon={<Target className="h-4 w-4 text-cyan-400" />}
              label="Goal"
              value="2h / day"
              glow="cyan"
            />
            <StatChip
              icon={<Zap className="h-4 w-4 text-purple-400" />}
              label="XP Today"
              value="480 pts"
              glow="purple"
            />
          </motion.div>
        </div>

        {/* Streak bar */}
        <div className="mt-6 flex items-center gap-1">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 + i * 0.025, type: "spring", stiffness: 400, damping: 20 }}
              className={`h-4 flex-1 rounded-sm ${
                i < streak
                  ? "bg-gradient-to-t from-orange-500 to-orange-300 shadow-sm shadow-orange-500/30"
                  : "bg-white/[0.06]"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-white/30">30-day streak history</p>
      </article>
    </AnimatedItem>
  );
}

function StatChip({
  icon,
  label,
  value,
  glow,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  glow: string;
}) {
  const glowColors: Record<string, string> = {
    orange: "border-orange-500/20 bg-orange-500/10",
    yellow: "border-yellow-500/20 bg-yellow-500/10",
    cyan: "border-cyan-500/20 bg-cyan-500/10",
    purple: "border-purple-500/20 bg-purple-500/10",
  };
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 ${glowColors[glow]}`}
    >
      {icon}
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
          {label}
        </p>
        <p className="text-sm font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
