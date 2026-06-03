"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

/**
 * Mobile bottom navigation bar.
 * Uses Framer Motion layoutId="mobileActiveIndicator" for the active pip —
 * same pattern as Sidebar's layoutId="activeIndicator".
 */
export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/[0.08] bg-[#0D0D12]/90 px-2 py-2 backdrop-blur-xl md:hidden"
    >
      {mobileNavItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            className="relative flex flex-col items-center gap-1 rounded-xl px-4 py-2 text-xs"
          >
            {/* GAP 4 FIX: Framer Motion layoutId active indicator */}
            {isActive && (
              <motion.div
                layoutId="mobileActiveIndicator"
                className="absolute inset-0 rounded-xl border border-purple-500/20 bg-gradient-to-t from-purple-600/15 to-indigo-600/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            <motion.div
              animate={
                isActive
                  ? { scale: 1.1, color: "rgb(192,132,252)" }
                  : { scale: 1, color: "rgba(255,255,255,0.4)" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <Icon className="h-5 w-5" />
            </motion.div>

            <motion.span
              animate={
                isActive
                  ? { color: "rgb(192,132,252)" }
                  : { color: "rgba(255,255,255,0.4)" }
              }
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={cn("relative font-medium")}
            >
              {item.label}
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );
}
