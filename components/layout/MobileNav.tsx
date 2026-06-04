"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart3, User } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Home",     icon: LayoutDashboard, href: "/" },
  { id: "courses",   label: "Courses",  icon: BookOpen,        href: "/courses" },
  { id: "analytics", label: "Progress", icon: BarChart3,       href: "/analytics" },
  { id: "profile",   label: "Profile",  icon: User,            href: "/profile" },
] as const;

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(7,7,13,0.92)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 py-3"
            >
              {/* Active top indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="absolute inset-x-4 top-0 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #7c3aed, #8b5cf6)",
                      boxShadow: "0 0 8px rgba(139,92,246,0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                animate={{
                  color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)",
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.15 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              <motion.span
                animate={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)" }}
                transition={{ duration: 0.15 }}
                className="text-[10px] font-semibold"
              >
                {item.label}
              </motion.span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
