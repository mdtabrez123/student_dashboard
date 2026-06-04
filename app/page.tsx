import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import {
  CoursesSection,
  CoursesSectionSkeleton,
} from "@/components/dashboard/CoursesSection";

export default function DashboardPage() {
  return (
    <div className="min-h-full pb-24 md:pb-8" style={{ padding: "2rem 2rem 4rem" }}>
      {/* Page header */}
      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "0.35rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Overview
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-paper)",
                lineHeight: 1.1,
              }}
            >
              Good morning,{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-gold-light)" }}>
                Alex.
              </em>
            </h1>
          </div>
          <div className="badge-warm" style={{ marginTop: "0.25rem" }}>
            ✦ &nbsp;4 courses active
          </div>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </header>

      {/* Hero tile */}
      <HeroTile />

      {/* Courses + Activity */}
      <div style={{ marginTop: "2rem" }}>
        <Suspense fallback={<CoursesSectionSkeleton />}>
          <CoursesSection />
        </Suspense>
      </div>
    </div>
  );
}
