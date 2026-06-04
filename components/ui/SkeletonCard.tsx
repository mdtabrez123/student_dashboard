"use client";

import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "hero" | "course" | "activity";
}

/**
 * Reusable skeleton bone.
 * Uses the .skeleton-pulse CSS class defined in globals.css.
 * Assignment requirement: "skeleton loaders should have a subtle pulsing animation"
 */
function Bone({ className }: { className?: string }) {
  return (
    <div
      className={cn("skeleton-pulse rounded-lg bg-white/[0.06]", className)}
    />
  );
}

export function SkeletonCard({ className, variant = "course" }: SkeletonCardProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "col-span-full rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-6 md:p-8",
          className
        )}
      >
        {/* Greeting + title */}
        <div className="mb-6">
          <Bone className="mb-2 h-3 w-24" />
          <Bone className="mb-2 h-7 w-56" />
          <Bone className="h-3.5 w-44" />
        </div>
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Bone key={i} className="h-20 rounded-xl" />
          ))}
        </div>
        {/* Streak */}
        <div className="mt-5">
          <Bone className="mb-2 h-2 w-full rounded-full" />
        </div>
      </div>
    );
  }

  if (variant === "activity") {
    return (
      <div
        className={cn(
          "col-span-full md:col-span-2 lg:col-span-4 rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5",
          className
        )}
      >
        <Bone className="mb-1.5 h-4 w-32" />
        <Bone className="mb-5 h-3 w-48" />
        {/* Heatmap cells */}
        <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-[3px]">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <Bone key={di} className="h-[12px] w-[12px] rounded-[3px]" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Course card skeleton
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5",
        className
      )}
    >
      <Bone className="mb-5 h-10 w-10 rounded-xl" />
      <Bone className="mb-1.5 h-4 w-36" />
      <Bone className="mb-5 h-3 w-24" />
      <Bone className="h-[3px] w-full rounded-full" />
    </div>
  );
}
