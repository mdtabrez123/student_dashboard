import { SkeletonCard } from "@/components/ui/SkeletonCard";

/**
 * Route-level loading UI — shown by Next.js while the page is initially loading.
 * Uses the same grid dimensions as the real BentoGrid to prevent layout shifts.
 *
 * Also used as the Suspense skeleton via <CoursesSectionSkeleton />.
 */
export default function Loading() {
  return (
    <section
      aria-label="Loading dashboard"
      aria-busy="true"
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      {/* Header skeleton */}
      <header className="mb-6 flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3 w-16 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-5 w-24 animate-pulse rounded bg-white/[0.08]" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400/30" />
          <div className="h-3 w-6 animate-pulse rounded bg-white/[0.06]" />
        </div>
      </header>

      {/* Bento grid skeleton — mirrors real grid breakpoints exactly */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Hero skeleton — full width */}
        <SkeletonCard variant="hero" />

        {/* Course skeletons — 4 tiles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} variant="course" />
        ))}

        {/* Activity graph skeleton — spans 2 cols */}
        <SkeletonCard variant="activity" />
      </div>
    </section>
  );
}
