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
  Flame,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { id: "courses",   label: "Courses",   icon: BookOpen,         href: "/courses" },
  { id: "analytics", label: "Analytics", icon: BarChart3,        href: "/analytics" },
  { id: "settings",  label: "Settings",  icon: Settings,         href: "/settings" },
  { id: "profile",   label: "Profile",   icon: User,             href: "/profile" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setCollapsed(e.matches);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <motion.aside
      aria-label="Main navigation"
      animate={{ width: collapsed ? 68 : 224 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="hidden md:flex flex-col relative flex-shrink-0"
      style={{
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border-dim)",
        zIndex: 20,
        overflow: "visible",
        minHeight: 0,
      }}
    >
      {/* Inner wrapper clips content but not the toggle button */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            padding: collapsed ? "1.25rem 0" : "1.25rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            borderBottom: "1px solid var(--color-border-dim)",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, var(--color-gold-dim), var(--color-gold))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Flame size={16} color="var(--color-ink)" strokeWidth={2.5} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    className="font-display"
                    style={{
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "var(--color-paper)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    LearnFlow
                  </p>
                  <p
                    style={{
                      fontSize: "0.6rem",
                      color: "var(--color-slate-warm)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Student Dashboard
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, var(--color-gold-dim), var(--color-gold))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Flame size={16} color="var(--color-ink)" strokeWidth={2.5} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <nav
          style={{
            flex: 1,
            padding: "0.75rem 0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <AnimatePresence>
            {!collapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-gold-dim)",
                  padding: "0 8px",
                  marginBottom: "0.4rem",
                  whiteSpace: "nowrap",
                }}
              >
                Navigation
              </motion.p>
            )}
          </AnimatePresence>

          {NAV_ITEMS.map(({ href, label, icon: Icon, id }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={id}
                href={href}
                title={collapsed ? label : undefined}
                className="nav-item"
                style={{
                  justifyContent: collapsed ? "center" : "flex-start",
                  padding: collapsed ? "10px 0" : "10px 10px",
                  color: isActive ? "var(--color-gold-light)" : undefined,
                  borderRadius: "8px",
                  margin: "0 2px",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "8px",
                      background: "rgba(201, 168, 76, 0.1)",
                      border: "1px solid rgba(201, 168, 76, 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  size={17}
                  style={{
                    flexShrink: 0,
                    color: isActive ? "var(--color-gold)" : undefined,
                    position: "relative",
                  }}
                />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: "relative",
                        fontSize: "0.875rem",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Footer / user area */}
        <div
          style={{
            padding: collapsed ? "1rem 0" : "1rem",
            borderTop: "1px solid var(--color-border-dim)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8a6f2e, #c9a84c)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--color-ink)",
            }}
          >
            A
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ minWidth: 0 }}
              >
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-paper)",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  Alex Johnson
                </p>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--color-slate-warm)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Student
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Toggle button — positioned OUTSIDE overflow:hidden inner wrapper ── */}
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "var(--color-surface-3)" }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          position: "absolute",
          right: -12,
          top: "50%",
          transform: "translateY(-50%)",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--color-gold)",
          zIndex: 30,
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          transition: "background 0.15s ease",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          {collapsed ? (
            <motion.span
              key="expand"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ChevronRight size={12} />
            </motion.span>
          ) : (
            <motion.span
              key="collapse"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.15 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <ChevronLeft size={12} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.aside>
  );
}
