"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses", label: "Courses", icon: BookOpen, href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  { id: "profile", label: "Profile", icon: User, href: "/profile" },
];

/** Returns true when in the tablet range (768–1023px) */
function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    setIsTablet(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isTablet;
}

export function Sidebar() {
  const isTablet = useIsTablet();
  // null = uncontrolled (auto); true/false = user override
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const pathname = usePathname();

  // When breakpoint changes, reset the user override so auto-logic takes effect
  useEffect(() => {
    setUserOverride(null);
  }, [isTablet]);

  // Collapsed when: user explicitly collapsed, OR tablet with no override
  const collapsed = userOverride !== null ? userOverride : isTablet;

  const handleToggle = () => {
    setUserOverride((prev) => {
      // If no override yet, the effective state is `isTablet`, so toggle from that
      const current = prev !== null ? prev : isTablet;
      return !current;
    });
  };

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden h-screen flex-shrink-0 flex-col border-r border-white/[0.06] bg-[#0D0D12] md:flex"
      style={{ overflow: "hidden" }}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-white/[0.06] px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="ml-3 whitespace-nowrap text-sm font-semibold tracking-tight text-white"
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <div className="flex flex-1 flex-col gap-1 overflow-hidden p-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.id} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
                  collapsed && "justify-center px-0",
                  isActive
                    ? "text-white"
                    : "text-white/40 hover:bg-white/[0.04] hover:text-white/80"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive && "text-purple-400"
                  )}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <div className="shrink-0 border-t border-white/[0.06] p-3">
        <button
          onClick={handleToggle}
          className="flex w-full items-center justify-center rounded-xl p-2.5 text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>
    </motion.nav>
  );
}
