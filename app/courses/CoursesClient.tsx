"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield, BarChart3,
  Clock, Users, Star, PlayCircle, Lock, Search,
} from "lucide-react";
import type { Course } from "@/lib/types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code2, Layers, Brain, Zap, BookOpen, Database,
  Globe, Cpu, FlaskConical, Rocket, Shield, BarChart3,
};

const COLORS = ["#7c3aed", "#0ea5e9", "#10b981", "#f59e0b"];
const BG_COLORS = [
  "rgba(124,58,237,0.14)",
  "rgba(14,165,233,0.14)",
  "rgba(16,185,129,0.14)",
  "rgba(245,158,11,0.14)"
];

const AVAILABLE = [
  { id: "explore-1", title: "React Architecture", iconName: "Globe", color: "#ec4899", iconBg: "rgba(236,72,153,0.14)", rating: 4.9, lessons: 28, duration: "15h", students: 9210, tag: "Popular" },
  { id: "explore-2", title: "Database Design", iconName: "Database", color: "#14b8a6", iconBg: "rgba(20,184,166,0.14)", rating: 4.7, lessons: 20, duration: "11h", students: 4330, tag: "New" },
  { id: "explore-3", title: "Cloud & DevOps", iconName: "Cpu", color: "#8b5cf6", iconBg: "rgba(139,92,246,0.14)", rating: 4.8, lessons: 36, duration: "22h", students: 7650, tag: "Trending" },
  { id: "explore-4", title: "Cybersecurity", iconName: "Shield", color: "#ef4444", iconBg: "rgba(239,68,68,0.14)", rating: 4.6, lessons: 22, duration: "13h", students: 3120, tag: "" },
  { id: "explore-5", title: "Data Science", iconName: "BarChart3", color: "#f97316", iconBg: "rgba(249,115,22,0.14)", rating: 4.8, lessons: 40, duration: "24h", students: 8900, tag: "Popular" },
  { id: "explore-6", title: "AI Engineering", iconName: "FlaskConical", color: "#06b6d4", iconBg: "rgba(6,182,212,0.14)", rating: 4.9, lessons: 30, duration: "19h", students: 11200, tag: "New" },
];

const FILTERS = ["All", "In Progress", "Almost Done", "Completed"];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

interface CoursesClientProps {
  initialEnrolled: Course[];
}

export function CoursesClient({ initialEnrolled }: CoursesClientProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Map Supabase courses to the UI layout properties dynamically
  const enrolledMapped = useMemo(() => {
    return initialEnrolled.map((course, idx) => {
      const color = COLORS[idx % COLORS.length];
      const iconBg = BG_COLORS[idx % BG_COLORS.length];
      const Icon = ICON_MAP[course.icon_name] ?? BookOpen;

      let status = "In Progress";
      if (course.progress === 0) status = "Not Started";
      else if (course.progress >= 90 && course.progress < 100) status = "Almost Done";
      else if (course.progress === 100) status = "Completed";

      // Deterministic decorative stats based on index/progress
      const lessons = 12 + (idx * 4) + (course.progress % 5);
      const duration = `${6 + idx * 3}h ${10 + (course.progress % 30)}m`;

      return {
        ...course,
        color,
        iconBg,
        icon: Icon,
        status,
        lessons,
        duration
      };
    });
  }, [initialEnrolled]);

  const filteredEnrolled = useMemo(() => {
    return enrolledMapped.filter((c) => {
      const matchFilter = filter === "All" || c.status === filter;
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [enrolledMapped, filter, search]);

  return (
    <section aria-label="Courses" className="min-h-screen p-6 md:p-8 lg:p-10">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Learning</p>
          <h1 className="mt-1 text-base font-semibold text-white">My Courses</h1>
        </div>
        <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-500">
          {initialEnrolled.length} enrolled
        </span>
      </header>

      {/* Search + Filter */}
      <div className="mb-8 flex flex-col items-center justify-center gap-4">
        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-600"
            style={{ left: "12px" }}
          />
          <input
            id="course-search"
            type="text"
            placeholder="Search courses…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "36px" }}
            className="w-full rounded-xl border border-white/[0.07] bg-white/[0.03] py-2.5 pr-4 text-xs text-zinc-300 placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              id={`filter-${f.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                filter === f
                  ? "bg-violet-600 text-white"
                  : "border border-white/[0.07] bg-white/[0.03] text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="mb-10">
        <h2 className="mb-4 text-sm font-semibold text-white">Enrolled</h2>
        {filteredEnrolled.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-12 text-center">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
              <BookOpen className="h-5 w-5 text-zinc-600" />
            </div>
            <h3 className="mb-1.5 text-sm font-semibold text-white">No courses match search or filter</h3>
            <p className="max-w-xs text-xs text-zinc-500">
              Try adjusting your query or filter keywords.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredEnrolled.map((course, i) => {
              const Icon = course.icon;
              return (
                <motion.article
                  key={course.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.02, boxShadow: `0 0 0 1px ${course.color}55, 0 12px 28px ${course.color}18` }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5 cursor-pointer"
                >
                  {/* Ambient glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ background: `radial-gradient(ellipse 70% 55% at 10% 10%, ${course.iconBg} 0%, transparent 65%)` }}
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.05]"
                    style={{ background: course.iconBg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: course.color }} />
                  </div>

                  <h3 className="relative mb-1 text-sm font-semibold text-white">{course.title}</h3>
                  <p className="relative mb-1 text-xs text-zinc-500">{course.status}</p>

                  <div className="relative mb-3 flex items-center gap-3 text-[10px] text-zinc-600">
                    <span className="flex items-center gap-1"><PlayCircle className="h-3 w-3" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
                  </div>

                  {/* Progress */}
                  <div className="relative mt-auto">
                    <div className="mb-1.5 flex items-center justify-between text-[10px]">
                      <span className="text-zinc-600">Progress</span>
                      <span className="font-medium tabular-nums text-zinc-400">{course.progress}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: course.progress / 100 }}
                        transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 220, damping: 22 }}
                        style={{ transformOrigin: "left", background: course.color }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Courses */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Explore More</h2>
          <span className="text-xs text-zinc-600">{AVAILABLE.length} available</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AVAILABLE.map((course, i) => {
            const Icon = ICON_MAP[course.iconName] ?? BookOpen;
            return (
              <motion.article
                key={course.id}
                custom={i + initialEnrolled.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.015, boxShadow: `0 0 0 1px ${course.color}44, 0 10px 24px ${course.color}14` }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-4 cursor-pointer"
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.05]"
                  style={{ background: course.iconBg }}
                >
                  <Icon className="h-5 w-5" style={{ color: course.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">{course.title}</h3>
                    {course.tag && (
                      <span className="shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: `${course.color}22`, color: course.color }}>
                        {course.tag}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-600">
                    <span className="flex items-center gap-0.5"><Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />{course.rating}</span>
                    <span className="flex items-center gap-1"><PlayCircle className="h-2.5 w-2.5" />{course.lessons} lessons</span>
                    <span className="flex items-center gap-1"><Users className="h-2.5 w-2.5" />{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <Lock className="h-4 w-4 shrink-0 text-zinc-700" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
