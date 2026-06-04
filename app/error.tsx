"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error("[LearnFlow] Dashboard error:", error);
  }, [error]);

  const isNetwork =
    error.message.toLowerCase().includes("fetch") ||
    error.message.toLowerCase().includes("network") ||
    error.message.toLowerCase().includes("connect");

  return (
    <section
      aria-label="Error"
      className="flex min-h-screen items-center justify-center p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm rounded-xl border border-white/[0.07] bg-[#111113] p-8 text-center"
        role="alert"
      >
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-red-500/10">
          <AlertCircle className="h-5 w-5 text-red-400" />
        </div>

        <h1 className="mb-2 text-base font-semibold text-white">
          {isNetwork ? "Connection failed" : "Something went wrong"}
        </h1>
        <p className="mb-6 text-sm text-[#71717a]">
          {isNetwork
            ? "Can't reach the database. Check your internet connection."
            : "We couldn't load your course data. Your progress is safe."}
        </p>

        {error.digest && (
          <p className="mb-5 font-mono text-[10px] text-[#3f3f46]">
            ref: {error.digest}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg px-4 py-2 text-sm text-[#71717a] hover:text-white"
          >
            Reload page
          </button>
        </div>
      </motion.div>
    </section>
  );
}
