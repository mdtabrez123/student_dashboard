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
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses",   label: "Courses",   icon: BookOpen,         href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3,        href: "/analytics" },
  { id: "settings",  label: "Settings",  icon: Settings,         href: "/settings" },
  { id: "profile",   label: "Profile",   icon: User,             href: "/profile" },
] as const;

function useIsTablet(): boolean {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const animId = requestAnimationFrame(() => setIsTablet(mql.matches));
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mql.addEventListener("change", handler);
    return () => { cancelAnimationFrame(animId); mql.removeEventListener("change", handler); };
  }, []);
  return isTablet;
}

export function Sidebar() {
  const isTablet = useIsTablet();
  const [userOverride, setUserOverride] = useState<boolean | null>(null);
  const pathname = usePathname();

  const [prevIsTablet, setPrevIsTablet] = useState(isTablet);
  if (isTablet !== prevIsTablet) {
    setPrevIsTablet(isTablet);
    setUserOverride(null);
  }

  const collapsed = userOverride !== null ? userOverride : isTablet;

  function toggle() {
    setUserOverride((prev) => !(prev !== null ? prev : isTablet));
  }

  return (
    <motion.nav
      aria-label="Main navigation"
      animate={{ width: collapsed ? 64 : 248 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden h-screen shrink-0 flex-col md:flex"
      style={{
        background: "linear-gradient(180deg, #07070d 0%, #06060b 100%)",
        borderRight: "1px solid rgba(255,255,255,0.055)",
        overflow: "hidden",
      }}
    >
      {/* ── Brand ── */}
      <div
        className="flex h-16 shrink-0 items-center px-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
            boxShadow: "0 0 0 1px rgba(139,92,246,0.35), 0 0 20px rgba(124,58,237,0.3)",
          }}
        >
          <GraduationCap className="h-4 w-4 text-white" />
        </div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="brand-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.14 }}
              className="ml-3 overflow-hidden"
            >
              <p className="whitespace-nowrap text-sm font-bold tracking-tight text-white">
                LearnFlow
              </p>
              <p className="whitespace-nowrap text-[10px] text-white/25">
                Student Dashboard
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav items ── */}
      <div className="flex flex-1 flex-col overflow-hidden p-3 gap-0.5">
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.p
              key="nav-section-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/20"
            >
              Navigation
            </motion.p>
          )}
        </AnimatePresence>

        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "group relative flex h-10 items-center gap-3 rounded-xl text-sm font-medium transition-colors duration-100",
                collapsed ? "justify-center px-0" : "px-3",
                isActive
                  ? "text-white"
                  : "text-white/35 hover:text-white/65"
              )}
            >
              {/* Active highlight */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-fill"
                  className="absolute inset-0 rounded-xl"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(124,58,237,0.16) 0%, rgba(124,58,237,0.04) 100%)",
                    border: "1px solid rgba(124,58,237,0.22)",
                  }}
                />
              )}

              {/* Left accent bar */}
              {isActive && !collapsed && (
                <motion.div
                  layoutId="sidebar-active-bar"
                  className="absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full bg-violet-500"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              <Icon
                className={cn(
                  "relative h-[17px] w-[17px] shrink-0 transition-colors duration-100",
                  isActive ? "text-violet-400" : "text-white/30 group-hover:text-white/55"
                )}
              />

              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    key={`label-${item.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.11 }}
                    className="relative overflow-hidden whitespace-nowrap text-[13px]"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </div>

      {/* ── Bottom: user + collapse ── */}
      <div
        className="shrink-0 p-3 space-y-0.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.055)" }}
      >
        {/* User row */}
        <div
          className={cn(
            "flex h-10 items-center gap-3 rounded-xl",
            collapsed ? "justify-center" : "px-3"
          )}
        >
          <div
            className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
              boxShadow: "0 0 12px rgba(139,92,246,0.25)",
            }}
          >
            A
          </div>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.11 }}
                className="overflow-hidden"
              >
                <p className="whitespace-nowrap text-[13px] font-semibold text-white/80">
                  Alex Johnson
                </p>
                <p className="whitespace-nowrap text-[10px] text-white/25">Student</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collapse button */}
        <button
          onClick={toggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex h-8 w-full items-center gap-2.5 rounded-lg text-xs font-medium text-white/20 transition-colors hover:bg-white/[0.04] hover:text-white/45",
            collapsed ? "justify-center px-0" : "px-3"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.nav>
  );
}
