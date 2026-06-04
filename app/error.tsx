"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertTriangle } from "lucide-react";

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
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card-editorial"
        role="alert"
        style={{
          width: "100%",
          maxWidth: "380px",
          padding: "2.5rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto 1.5rem",
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(212, 98, 42, 0.12)",
            border: "1px solid rgba(212, 98, 42, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AlertTriangle size={22} color="var(--color-ember)" />
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--color-paper)",
            marginBottom: "0.5rem",
            letterSpacing: "-0.01em",
          }}
        >
          {isNetwork ? "Connection failed" : "Something went wrong"}
        </h1>
        <p style={{ marginBottom: "1.75rem", fontSize: "0.875rem", color: "var(--color-slate-warm)", lineHeight: 1.6 }}>
          {isNetwork
            ? "Can't reach the database. Check your internet connection."
            : "We couldn't load your course data. Your progress is safe."}
        </p>

        {error.digest && (
          <p
            className="font-mono"
            style={{ marginBottom: "1.25rem", fontSize: "0.65rem", color: "var(--color-slate-warm)", opacity: 0.6 }}
          >
            ref: {error.digest}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={reset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "10px 24px",
              borderRadius: "var(--radius-md)",
              background: "rgba(201, 168, 76, 0.15)",
              border: "1px solid rgba(201, 168, 76, 0.3)",
              color: "var(--color-gold-light)",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-body)",
            }}
          >
            <RefreshCw size={14} />
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 24px",
              borderRadius: "var(--radius-md)",
              background: "transparent",
              border: "none",
              color: "var(--color-slate-warm)",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "color 0.15s ease",
              fontFamily: "var(--font-body)",
            }}
          >
            Reload page
          </button>
        </div>
      </motion.div>
    </section>
  );
}
