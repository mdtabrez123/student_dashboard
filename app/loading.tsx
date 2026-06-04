import { SkeletonCard } from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <section
      aria-label="Loading dashboard"
      aria-busy="true"
      style={{ padding: "2rem 2rem 4rem", minHeight: "100vh" }}
    >
      {/* Header skeleton */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          className="skeleton-pulse"
          style={{
            height: "0.75rem",
            width: "80px",
            borderRadius: "4px",
            background: "var(--color-surface-3)",
            marginBottom: "8px",
          }}
        />
        <div
          className="skeleton-pulse"
          style={{
            height: "2rem",
            width: "240px",
            borderRadius: "6px",
            background: "var(--color-surface-3)",
          }}
        />
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </div>

      {/* Hero skeleton */}
      <div
        className="card-editorial skeleton-pulse"
        style={{ padding: "2rem", minHeight: "200px", marginBottom: "2rem" }}
      />

      {/* Course cards skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} variant="course" />
          ))}
        </div>
        <SkeletonCard variant="activity" />
      </div>
    </section>
  );
}
