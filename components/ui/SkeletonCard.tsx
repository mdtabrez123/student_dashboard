import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "hero" | "course" | "activity";
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-white/[0.06]",
        className
      )}
    />
  );
}

export function SkeletonCard({ className, variant = "course" }: SkeletonCardProps) {
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "col-span-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8",
          className
        )}
      >
        <Skeleton className="mb-3 h-4 w-32" />
        <Skeleton className="mb-2 h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <div className="mt-6 flex gap-4">
          <Skeleton className="h-16 w-32 rounded-xl" />
          <Skeleton className="h-16 w-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (variant === "activity") {
    return (
      <div
        className={cn(
          "col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6",
          className
        )}
      >
        <Skeleton className="mb-4 h-5 w-40" />
        <div className="grid grid-cols-[repeat(52,_1fr)] gap-1">
          {Array.from({ length: 364 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6",
        className
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="mb-2 h-1.5 w-full rounded-full" />
      <div className="mt-3 flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
}
