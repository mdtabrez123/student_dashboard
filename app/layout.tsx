import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LearnFlow — Student Learning Dashboard",
  description:
    "Track your learning progress, courses, and study activity with LearnFlow — a modern student dashboard powered by AI insights.",
  keywords: ["student dashboard", "learning", "courses", "progress tracker"],
  authors: [{ name: "LearnFlow" }],
  openGraph: {
    title: "LearnFlow — Student Learning Dashboard",
    description: "Track your learning progress, courses, and study activity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0B0B0F] font-sans text-white antialiased">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
