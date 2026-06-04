"use client";

function Bone({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      className="skeleton-pulse"
      style={{
        borderRadius: "6px",
        background: "var(--color-surface-3)",
        ...style,
      }}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
  variant?: "hero" | "course" | "activity";
}

export function SkeletonCard({ variant = "course" }: SkeletonCardProps) {
  if (variant === "activity") {
    return (
      <div
        className="card-editorial"
        style={{ padding: "1.5rem" }}
      >
        <Bone style={{ height: "1rem", width: "140px", marginBottom: "6px" }} />
        <Bone style={{ height: "0.75rem", width: "200px", marginBottom: "1.25rem" }} />
        <div style={{ display: "flex", gap: "2px" }}>
          {Array.from({ length: 26 }).map((_, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {Array.from({ length: 7 }).map((_, di) => (
                <Bone key={di} style={{ width: 10, height: 10, borderRadius: "2px" }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Course card skeleton
  return (
    <div className="card-editorial" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <Bone style={{ width: 40, height: 40, borderRadius: "10px" }} />
        <Bone style={{ width: 32, height: 32, borderRadius: "50%" }} />
      </div>
      <Bone style={{ height: "0.65rem", width: "60px", marginBottom: "6px" }} />
      <Bone style={{ height: "0.9rem", width: "80%", marginBottom: "4px" }} />
      <Bone style={{ height: "0.75rem", width: "60%", marginBottom: "1rem" }} />
      <Bone style={{ height: "4px", width: "100%", borderRadius: "99px" }} />
    </div>
  );
}
