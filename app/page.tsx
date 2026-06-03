import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  CoursesSection,
  CoursesSectionSkeleton,
} from "@/components/dashboard/CoursesSection";

/**
 * Dashboard Page — Server Component (not async itself).
 *
 * Rendering strategy:
 *   1. <HeroTile /> — rendered immediately, no data dependency.
 *   2. <CoursesSection /> — async RSC behind <Suspense>:
 *      - Falls back to <CoursesSectionSkeleton /> (pulsing skeleton loaders)
 *        while the Supabase query is in flight.
 *      - On success: renders live CourseGrid + ActivityTile.
 *      - On database error: error propagates to app/error.tsx boundary.
 */
export default function DashboardPage() {
  return (
    <section
      aria-label="Dashboard"
      className="min-h-screen p-4 md:p-6 lg:p-8"
    >
      {/* Page header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/30">
            Overview
          </p>
          <h2 className="text-lg font-semibold text-white">Dashboard</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
          <span className="text-xs text-white/40">Live</span>
        </div>
      </header>

      <AnimatedSection>
        <BentoGrid>
          {/*
           * Hero renders instantly — not behind Suspense.
           * RSC streaming: critical chrome first, data-dependent content below.
           */}
          <HeroTile />

          {/*
           * Suspense boundary: Supabase fetch happens inside CoursesSection.
           * Users see animated skeleton cards immediately, then live data streams in.
           * Errors surface to app/error.tsx — no silent fallback to fake data.
           */}
          <Suspense fallback={<CoursesSectionSkeleton />}>
            <CoursesSection />
          </Suspense>
        </BentoGrid>
      </AnimatedSection>
    </section>
  );
}
