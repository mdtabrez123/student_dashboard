import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { BentoGrid } from "@/components/dashboard/BentoGrid";

export default function Loading() {
  return (
    <section aria-label="Loading dashboard" aria-busy="true" className="min-h-screen p-4 md:p-6 lg:p-8">
      {/* Header skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3 w-14 rounded-md bg-white/[0.05]" style={{ animation: "pulse 1.8s ease-in-out infinite" }} />
          <div className="h-4 w-20 rounded-md bg-white/[0.06]" style={{ animation: "pulse 1.8s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Grid skeleton */}
      <BentoGrid>
        <SkeletonCard variant="hero" />
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} variant="course" />
        ))}
        <SkeletonCard variant="activity" />
      </BentoGrid>
    </section>
  );
}
