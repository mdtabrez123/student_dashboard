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
  title: "LearnFlow — Student Dashboard",
  description:
    "Track your learning progress, course completion, and study habits in one place.",
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
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased" style={{ background: "#050507", color: "#f0f0f5" }}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto pb-20 md:pb-0 md:px-12 lg:px-20">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
