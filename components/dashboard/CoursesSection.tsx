import { getCourses } from "@/lib/supabase/queries";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { BookOpen } from "lucide-react";

/**
 * Async Server Component — fetches live course data from Supabase.
 *
 * Wrapped in <Suspense> in page.tsx so the HeroTile renders immediately
 * while this component awaits the database response.
 *
 * Errors propagate up to the nearest error.tsx boundary.
 */
export async function CoursesSection() {
  const courses = await getCourses();

  // Graceful empty-state — table exists but has no rows yet
  if (courses.length === 0) {
    return (
      <>
        <EmptyCoursesState />
        <ActivityTile />
      </>
    );
  }

  return (
    <>
      <CourseGrid courses={courses} />
      <ActivityTile />
    </>
  );
}

/** Shown when the courses table is empty (not an error — just no data yet) */
function EmptyCoursesState() {
  return (
    <div className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] p-12 text-center backdrop-blur-xl">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10 ring-1 ring-purple-500/20">
        <BookOpen className="h-6 w-6 text-purple-400" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-white">
        No courses yet
      </h3>
      <p className="text-sm text-white/40">
        Add rows to your{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-purple-300">
          courses
        </code>{" "}
        table in Supabase to see them here.
      </p>
    </div>
  );
}

/** Skeleton fallback shown while CoursesSection is streaming */
export function CoursesSectionSkeleton() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} variant="course" />
      ))}
      <SkeletonCard variant="activity" />
    </>
  );
}
