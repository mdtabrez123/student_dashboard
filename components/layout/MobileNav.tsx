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
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border-dim)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8px 0 max(8px, env(safe-area-inset-bottom))",
        zIndex: 50,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      {NAV_ITEMS.map(({ href, label, icon: Icon, id }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={id}
            href={href}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              padding: "4px 16px",
              position: "relative",
              color: isActive ? "var(--color-gold-light)" : "var(--color-slate-warm)",
              textDecoration: "none",
            }}
          >
            {isActive && (
              <motion.div
                layoutId="mobileActiveIndicator"
                style={{
                  position: "absolute",
                  inset: "-2px 4px",
                  borderRadius: "8px",
                  background: "rgba(201, 168, 76, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <motion.div
              animate={{ color: isActive ? "var(--color-gold)" : "var(--color-slate-warm)" }}
              transition={{ duration: 0.2 }}
              style={{ position: "relative" }}
            >
              <Icon size={18} />
            </motion.div>
            <motion.span
              animate={{ color: isActive ? "var(--color-gold-light)" : "var(--color-slate-warm)" }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: "0.65rem",
                fontWeight: isActive ? 600 : 400,
                letterSpacing: "0.02em",
                position: "relative",
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
