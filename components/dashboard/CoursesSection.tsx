import { getCourses } from "@/lib/supabase/queries";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
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
    <>
      {/* Section heading — col-span-full so it spans all grid columns */}
      <div className="col-span-full mt-2 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">My courses</h2>
        <span className="text-xs text-zinc-600">{courses.length} enrolled</span>
      </div>

      <CourseGrid courses={courses} />
      <ActivityTile />
    </>
  );
}

function EmptyState() {
  return (
    <div className="md:col-span-2 lg:col-span-4 flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-12 text-center">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
        <BookOpen className="h-5 w-5 text-zinc-600" />
      </div>
      <h3 className="mb-1.5 text-sm font-semibold text-white">No courses yet</h3>
      <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
        Add rows to your{" "}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-xs text-violet-400">
          courses
        </code>{" "}
        Supabase table to see them here.
      </p>
    </div>
  );
}

/**
 * Skeleton shown by <Suspense> while CoursesSection awaits Supabase.
 * Assignment requirement: "implement loading.tsx or Suspense boundaries
 * to show skeleton loaders while data is being fetched"
 */
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
