import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "LearnFlow — Student Dashboard",
  description: "Track your learning journey with clarity and focus.",
  keywords: ["student dashboard", "learning tracker", "courses", "progress"],
  authors: [{ name: "LearnFlow" }],
  openGraph: {
    title: "LearnFlow — Student Dashboard",
    description: "Track your learning progress and study habits.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ background: "var(--color-ink)", color: "var(--color-paper)", fontFamily: "var(--font-body)" }}>
        <div className="flex h-dvh overflow-hidden">
          <Sidebar />
          <main
            className="flex-1 overflow-y-auto relative pb-20 md:pb-0"
            style={{ zIndex: 1 }}
          >
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
