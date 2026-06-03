import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Responsive Bento Grid:
 *   Mobile  (<768px):   1-column
 *   Tablet  (768–1023px): 2-column  ← md breakpoint
 *   Desktop (≥1024px):  4-column  ← lg breakpoint
 */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4",
        "md:grid-cols-2",
        "lg:grid-cols-4",
        className
      )}
    >
      {children}
    </div>
  );
}
