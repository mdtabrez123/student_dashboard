"use client";

import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { BookOpen, Lock, Search } from "lucide-react";
import type { Course } from "@/lib/types";
import { getCourseDetails } from "@/components/dashboard/CourseTile";

const AVAILABLE = [
  { id: "explore-1", title: "React Architecture", iconName: "Globe", tag: "Popular" },
  { id: "explore-2", title: "Database Design", iconName: "Database", tag: "New" },
  { id: "explore-3", title: "Cloud & DevOps", iconName: "Cpu", tag: "Trending" },
  { id: "explore-4", title: "Cybersecurity", iconName: "Shield", tag: "" },
  { id: "explore-5", title: "Data Science", iconName: "BarChart3", tag: "Popular" },
  { id: "explore-6", title: "AI Engineering", iconName: "FlaskConical", tag: "New" },
] as const;

const FILTERS = ["All", "In Progress", "Almost Done", "Completed"];

const colorPairs = [
  { accent: "var(--color-gold)", bg: "rgba(201, 168, 76, 0.1)", border: "rgba(201, 168, 76, 0.2)" },
  { accent: "var(--color-ember)", bg: "rgba(212, 98, 42, 0.1)", border: "rgba(212, 98, 42, 0.2)" },
  { accent: "var(--color-sage)", bg: "rgba(107, 143, 110, 0.1)", border: "rgba(107, 143, 110, 0.2)" },
  { accent: "#8b7dd8", bg: "rgba(139, 125, 216, 0.1)", border: "rgba(139, 125, 216, 0.2)" },
];

interface CoursesClientProps {
  initialEnrolled: Course[];
}

export function CoursesClient({ initialEnrolled }: CoursesClientProps) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const enrolledMapped = useMemo(() => {
    return initialEnrolled.map((course) => {
      let status = "In Progress";
      if (course.progress === 0) status = "Not Started";
      else if (course.progress >= 90 && course.progress < 100) status = "Almost Done";
      else if (course.progress === 100) status = "Completed";
      return { ...course, status };
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
    <section aria-label="Courses" style={{ padding: "2rem 2rem 4rem", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
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
              Learning
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
              My Courses
            </h1>
          </div>
          <span className="badge-warm" style={{ marginTop: "0.25rem" }}>
            {initialEnrolled.length} enrolled
          </span>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </header>

      {/* Search + Filter */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
          {/* Search bar */}
          <div style={{ position: "relative", width: "100%", maxWidth: "440px" }}>
            <Search
              size={14}
              style={{
                position: "absolute",
                top: "50%",
                left: "12px",
                transform: "translateY(-50%)",
                color: "var(--color-slate-warm)",
                pointerEvents: "none",
              }}
            />
            <input
              id="course-search"
              type="text"
              placeholder="Search courses…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                paddingLeft: "36px",
                paddingRight: "1rem",
                paddingTop: "0.6rem",
                paddingBottom: "0.6rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border-dim)",
                background: "var(--color-surface-2)",
                color: "var(--color-paper)",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.15s ease",
                fontFamily: "var(--font-body)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201, 168, 76, 0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--color-border-dim)")}
            />
          </div>

          {/* Filter pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                id={`filter-${f.replace(/\s+/g, "-").toLowerCase()}`}
                onClick={() => setFilter(f)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "99px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  background: filter === f ? "rgba(201, 168, 76, 0.15)" : "var(--color-surface-2)",
                  border: filter === f ? "1px solid rgba(201, 168, 76, 0.35)" : "1px solid var(--color-border-dim)",
                  color: filter === f ? "var(--color-gold-light)" : "var(--color-slate-warm)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div style={{ marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--color-paper)",
              letterSpacing: "-0.01em",
            }}
          >
            Enrolled
          </h2>
          <span style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>
            {filteredEnrolled.length} of {enrolledMapped.length}
          </span>
        </div>

        {filteredEnrolled.length === 0 ? (
          <div
            className="card-editorial"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                marginBottom: "1rem",
                width: 44,
                height: 44,
                borderRadius: "10px",
                background: "rgba(201, 168, 76, 0.08)",
                border: "1px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BookOpen size={20} color="var(--color-gold)" />
            </div>
            <h3
              className="font-display"
              style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-paper)", marginBottom: "0.5rem" }}
            >
              No courses match
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-slate-warm)" }}>
              Try adjusting your search or filter.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {filteredEnrolled.map((course, i) => {
              const details = getCourseDetails(course.title, i);
              const color = colorPairs[i % colorPairs.length];
              const circumference = 2 * Math.PI * 13;
              const strokeDashoffset = circumference - (course.progress / 100) * circumference;

              const statusBadge =
                course.progress === 100
                  ? { label: "Completed", color: "var(--color-sage)", bg: "rgba(107,143,110,0.12)", border: "rgba(107,143,110,0.25)" }
                  : course.progress === 0
                  ? { label: "Not Started", color: "var(--color-slate-warm)", bg: "var(--color-surface-3)", border: "var(--color-border-dim)" }
                  : course.progress >= 90
                  ? { label: "Almost Done", color: "var(--color-gold-light)", bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.25)" }
                  : { label: "In Progress", color: "var(--color-ember)", bg: "rgba(212,98,42,0.1)", border: "rgba(212,98,42,0.2)" };

              return (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                  whileHover={{ scale: 1.015, y: -3 }}
                  className="card-editorial"
                  style={{
                    padding: "1.5rem",
                    cursor: "default",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  {/* Icon + progress ring */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        background: color.bg,
                        border: `1px solid ${color.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <BookOpen size={18} color={color.accent} />
                    </div>
                    <div style={{ position: "relative", width: 32, height: 32 }}>
                      <svg width="32" height="32" style={{ transform: "rotate(-90deg)" }}>
                        <circle cx="16" cy="16" r="13" fill="transparent" stroke="var(--color-surface-3)" strokeWidth="2" />
                        <circle
                          cx="16" cy="16" r="13"
                          fill="transparent"
                          stroke={color.accent}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          style={{ transition: "stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1)", opacity: 0.8 }}
                        />
                      </svg>
                      <span
                        className="font-mono"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "0.5rem",
                          fontWeight: 700,
                          color: "var(--color-paper)",
                        }}
                      >
                        {course.progress}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent, marginBottom: "4px", opacity: 0.8 }}>
                    {details.level}
                  </p>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-paper)", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)", lineHeight: 1.5, marginBottom: "1rem" }}>
                    {details.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>Progress</span>
                      <span className="font-mono" style={{ fontSize: "0.78rem", fontWeight: 600, color: color.accent }}>{course.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <motion.div
                        className="progress-fill"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: course.progress / 100 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 + i * 0.05 }}
                        style={{ background: `linear-gradient(90deg, ${color.accent}66, ${color.accent})` }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--color-border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>{details.lessons} lessons · {details.duration}</p>
                    <span style={{ padding: "2px 8px", borderRadius: "99px", fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.05em", color: statusBadge.color, background: statusBadge.bg, border: `1px solid ${statusBadge.border}` }}>
                      {statusBadge.label}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Available Courses */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2
            className="font-display"
            style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
          >
            Explore More
          </h2>
          <span style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>{AVAILABLE.length} available</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {AVAILABLE.map((course, i) => {
            const details = getCourseDetails(course.title, i + initialEnrolled.length);
            const color = colorPairs[(i + initialEnrolled.length) % colorPairs.length];
            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + initialEnrolled.length) * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                whileHover={{ scale: 1.015, y: -3 }}
                className="card-editorial"
                style={{
                  padding: "1.5rem",
                  cursor: "default",
                  display: "flex",
                  flexDirection: "column",
                  opacity: 0.75,
                }}
              >
                {/* Icon + Lock */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      background: color.bg,
                      border: `1px solid ${color.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <BookOpen size={18} color={color.accent} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {course.tag && (
                      <span className="badge-warm" style={{ fontSize: "0.6rem" }}>{course.tag}</span>
                    )}
                    <Lock size={14} color="var(--color-slate-warm)" />
                  </div>
                </div>

                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: color.accent, marginBottom: "4px", opacity: 0.8 }}>
                  {details.level}
                </p>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.3, color: "var(--color-paper)", marginBottom: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)", lineHeight: 1.5, marginBottom: "1rem" }}>
                  {details.subtitle}
                </p>

                <div style={{ marginTop: "auto", paddingTop: "1rem", borderTop: "1px solid var(--color-border-dim)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "0.7rem", color: "var(--color-slate-warm)" }}>{details.lessons} lessons · {details.duration}</p>
                  <span style={{ padding: "2px 8px", borderRadius: "99px", fontSize: "0.65rem", fontWeight: 600, color: "var(--color-slate-warm)", background: "var(--color-surface-3)", border: "1px solid var(--color-border-dim)" }}>
                    Locked
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
