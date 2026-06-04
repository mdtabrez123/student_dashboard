"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, User, Settings } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home",     icon: LayoutDashboard, href: "/" },
  { id: "courses",   label: "Courses",  icon: BookOpen,        href: "/courses" },
  { id: "analytics", label: "Progress", icon: BarChart3,       href: "/analytics" },
  { id: "settings",  label: "Settings", icon: Settings,        href: "/settings" },
  { id: "profile",   label: "Profile",  icon: User,            href: "/profile" },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(22, 21, 18, 0.92)",
        borderTop: "1px solid var(--color-border-dim)",
        alignItems: "stretch",
        justifyContent: "space-around",
        paddingBottom: "env(safe-area-inset-bottom, 4px)",
        zIndex: 100,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.5), 0 -1px 0 rgba(201,168,76,0.05)",
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon, id }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={id}
            href={href}
            id={`mobile-nav-${id}`}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              padding: "10px 4px",
              position: "relative",
              color: isActive ? "var(--color-gold-light)" : "var(--color-slate-warm)",
              textDecoration: "none",
              minHeight: 56,
              transition: "color 0.2s ease",
            }}
          >
            {/* Active pill indicator at top */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  key="top-indicator"
                  layoutId="mobileTopBar"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "25%",
                    right: "25%",
                    height: 2,
                    borderRadius: "0 0 3px 3px",
                    background: "linear-gradient(90deg, var(--color-gold-dim), var(--color-gold-light))",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </AnimatePresence>

            {/* Active background glow */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="mobileActiveBg"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  style={{
                    position: "absolute",
                    inset: "6px 8px",
                    borderRadius: "10px",
                    background: "rgba(201, 168, 76, 0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>

            <motion.div
              animate={{
                color: isActive ? "var(--color-gold)" : "var(--color-slate-warm)",
                scale: isActive ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{ position: "relative", display: "flex" }}
            >
              <Icon size={19} strokeWidth={isActive ? 2 : 1.75} />
            </motion.div>

            <motion.span
              animate={{
                color: isActive ? "var(--color-gold-light)" : "var(--color-slate-warm)",
                fontWeight: isActive ? 600 : 400,
              }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.02em",
                position: "relative",
                lineHeight: 1,
              }}
            >
              {label}
            </motion.span>
          </Link>
        );
      })}
    </nav>
  );
}
