import { getCourses } from "@/lib/supabase/queries";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { BookOpen } from "lucide-react";

/**
 * Async Server Component — owns the Supabase data fetch.
 *
 * Rendering strategy (from page.tsx):
 *   <Suspense fallback={<CoursesSectionSkeleton />}>
 *     <CoursesSection />     ← this component
 *   </Suspense>
 *
 * Errors thrown here propagate to app/error.tsx.
 * Empty table renders <EmptyState /> instead of crashing.
 */
export async function CoursesSection() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <>
        <EmptyState />
        <ActivityTile />
      </>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Section heading */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          className="font-display"
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "var(--color-paper)",
            letterSpacing: "-0.01em",
          }}
        >
          Your Courses
        </h2>
        <span className="badge-warm">{courses.length} enrolled</span>
      </div>

      {/* Courses grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <CourseGrid courses={courses} />
      </div>

      {/* Activity heatmap */}
      <ActivityTile />
    </div>
  );
}

function EmptyState() {
  return (
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
          background: "rgba(201, 168, 76, 0.1)",
          border: "1px solid rgba(201, 168, 76, 0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BookOpen size={20} color="var(--color-gold)" />
      </div>
      <h3
        className="font-display"
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          color: "var(--color-paper)",
          marginBottom: "0.5rem",
        }}
      >
        No courses yet
      </h3>
      <p style={{ fontSize: "0.85rem", color: "var(--color-slate-warm)", maxWidth: "280px", lineHeight: 1.6 }}>
        Add rows to your{" "}
        <code
          className="font-mono"
          style={{
            fontSize: "0.78rem",
            color: "var(--color-gold)",
            background: "rgba(201, 168, 76, 0.1)",
            padding: "1px 6px",
            borderRadius: "4px",
          }}
        >
          courses
        </code>{" "}
        Supabase table to see them here.
      </p>
    </div>
  );
}

/**
 * Skeleton shown by <Suspense> while CoursesSection awaits Supabase.
 */
export function CoursesSectionSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* heading skeleton */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          className="skeleton-pulse"
          style={{
            height: "1.15rem",
            width: "140px",
            borderRadius: "6px",
            background: "var(--color-surface-3)",
          }}
        />
        <div
          className="skeleton-pulse"
          style={{
            height: "1.4rem",
            width: "80px",
            borderRadius: "99px",
            background: "var(--color-surface-3)",
          }}
        />
      </div>

      {/* Course cards skeleton */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="card-editorial skeleton-pulse"
            style={{ padding: "1.5rem", minHeight: "160px" }}
          />
        ))}
      </div>

      {/* Activity skeleton */}
      <div
        className="card-editorial skeleton-pulse"
        style={{ padding: "1.5rem", minHeight: "200px" }}
      />
    </div>
  );
}
