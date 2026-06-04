import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  CoursesSection,
  CoursesSectionSkeleton,
} from "@/components/dashboard/CoursesSection";

/**
 * Dashboard Page — synchronous Server Component.
 *
 * Does NOT await anything itself. Instead:
 *   - HeroTile renders immediately (no data dependency)
 *   - CoursesSection is wrapped in <Suspense> and streams in
 *     once getCourses() resolves on the server
 *
 * This means the hero + header paint instantly; courses stream in after.
 */
export default function DashboardPage() {
  return (
    <section aria-label="Dashboard" className="min-h-screen p-6 md:p-8 lg:p-10">

      {/* Page header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">
            Overview
          </p>
          <h2 className="mt-1 text-base font-semibold text-white">Dashboard</h2>
        </div>
        <span className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Live
        </span>
      </header>

      {/*
       * AnimatedSection provides the staggered entrance animation.
       * Assignment requirement: "Bento tiles should not appear all at once
       * — they must stagger in sequentially"
       */}
      <AnimatedSection>
        <BentoGrid>
          <HeroTile />

          {/*
           * Suspense boundary — shows skeleton cards while Supabase responds.
           * Assignment requirement: "implement Suspense boundaries to show
           * skeleton loaders while data is being fetched"
           */}
          <Suspense fallback={<CoursesSectionSkeleton />}>
            <CoursesSection />
          </Suspense>
        </BentoGrid>
      </AnimatedSection>

    </section>
  );
}
