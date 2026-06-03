"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, WifiOff, Database } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * App-level error boundary — catches errors thrown by async Server Components,
 * including Supabase query failures from lib/supabase/queries.ts.
 *
 * Must be a Client Component (Next.js requirement for error.tsx).
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to console for debugging during development
    console.error("[LearnFlow] Dashboard error:", error);
  }, [error]);

  const isNetworkError =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("network") ||
    error.message.toLowerCase().includes("connect");

  const Icon = isNetworkError ? WifiOff : Database;
  const title = isNetworkError
    ? "Connection Error"
    : "Database Error";
  const description = isNetworkError
    ? "Unable to reach the database. Check your internet connection and try again."
    : "We couldn't load your course data. This is a temporary issue — your progress is safe.";

  return (
    <section
      aria-label="Error"
      className="flex min-h-screen items-center justify-center p-6"
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-8 text-center backdrop-blur-xl"
        role="alert"
        aria-live="assertive"
      >
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
          <Icon className="h-6 w-6 text-red-400" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h2 className="mb-2 text-lg font-semibold text-white">{title}</h2>

        {/* Description */}
        <p className="mb-4 text-sm leading-relaxed text-white/50">
          {description}
        </p>

        {/* Error detail (dev-friendly) */}
        {error.message && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-xs text-white/25 hover:text-white/40 transition-colors">
              Technical details
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-white/[0.04] p-3 font-mono text-[10px] leading-relaxed text-white/30 whitespace-pre-wrap">
              {error.message}
            </pre>
            {error.digest && (
              <p className="mt-1 font-mono text-[10px] text-white/20">
                Digest: {error.digest}
              </p>
            )}
          </details>
        )}

        {/* Retry */}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          <motion.button
            onClick={reset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/[0.14]"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </motion.button>

          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            Reload page
          </motion.button>
        </div>
      </motion.article>
    </section>
  );
}
