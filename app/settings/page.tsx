"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bell, Shield, Palette, Globe, Moon, Sun, Monitor,
  Mail, Smartphone, Volume2, Eye, Lock, Key,
  ChevronRight, Check,
} from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, type: "spring" as const, stiffness: 280, damping: 22 },
  }),
};

function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: 36,
        height: 20,
        borderRadius: "99px",
        background: checked ? "rgba(201, 168, 76, 0.6)" : "var(--color-surface-3)",
        border: checked ? "1px solid rgba(201, 168, 76, 0.4)" : "1px solid var(--color-border-dim)",
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      <motion.span
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: checked ? "var(--color-gold-light)" : "var(--color-slate-warm)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          display: "block",
        }}
      />
    </button>
  );
}

function SettingRow({
  label, sub, children, id,
}: { label: string; sub?: string; children: React.ReactNode; id?: string }) {
  return (
    <div
      id={id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "0.875rem 0",
        borderBottom: "1px solid var(--color-border-dim)",
      }}
      className="setting-row-last"
    >
      <div>
        <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-paper)" }}>{label}</p>
        {sub && <p style={{ marginTop: "2px", fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>{sub}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function Section({ title, icon: Icon, accent, bg, border, children, index }: {
  title: string; icon: React.ElementType; accent: string; bg: string; border: string; children: React.ReactNode; index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="card-editorial"
      style={{ padding: "1.5rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "6px",
            background: bg,
            border: `1px solid ${border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={14} color={accent} />
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-paper)", letterSpacing: "-0.01em" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

type Theme = "dark" | "light" | "system";

export default function SettingsPage() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [notifs, setNotifs] = useState({ email: true, push: false, sound: true, weekly: true });
  const [privacy, setPrivacy] = useState({ publicProfile: false, showProgress: true, showStreak: true });
  const [language, setLanguage] = useState("English");

  const toggle = (group: "notifs" | "privacy", key: string) => {
    if (group === "notifs") setNotifs((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
    else setPrivacy((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
  };

  const THEMES: { id: Theme; label: string; Icon: React.ElementType }[] = [
    { id: "dark", label: "Dark", Icon: Moon },
    { id: "light", label: "Light", Icon: Sun },
    { id: "system", label: "System", Icon: Monitor },
  ];

  return (
    <section aria-label="Settings" style={{ padding: "2rem 2rem 4rem", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "0.35rem",
              }}
            >
              Preferences
            </p>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--color-paper)",
                lineHeight: 1.1,
              }}
            >
              Settings
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "0.25rem",
              padding: "8px 20px",
              borderRadius: "var(--radius-md)",
              background: "rgba(201, 168, 76, 0.15)",
              border: "1px solid rgba(201, 168, 76, 0.3)",
              color: "var(--color-gold-light)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            Save changes
          </motion.button>
        </div>
        <div className="divider-warm" style={{ marginTop: "1.5rem" }} />
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}
        className="settings-grid"
      >
        {/* Appearance */}
        <Section title="Appearance" icon={Palette} accent="var(--color-gold)" bg="rgba(201,168,76,0.1)" border="rgba(201,168,76,0.2)" index={0}>
          <p style={{ marginBottom: "0.75rem", fontSize: "0.78rem", color: "var(--color-slate-warm)" }}>
            Choose your preferred theme
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            {THEMES.map(({ id, label, Icon }) => (
              <button
                key={id}
                id={`theme-${id}`}
                onClick={() => setTheme(id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 8px",
                  borderRadius: "var(--radius-sm)",
                  border: theme === id ? "1px solid rgba(201,168,76,0.4)" : "1px solid var(--color-border-dim)",
                  background: theme === id ? "rgba(201,168,76,0.1)" : "var(--color-surface-3)",
                  color: theme === id ? "var(--color-gold-light)" : "var(--color-slate-warm)",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={16} />
                {label}
                {theme === id && <Check size={12} color="var(--color-gold)" />}
              </button>
            ))}
          </div>
        </Section>

        {/* Language & Region */}
        <Section title="Language & Region" icon={Globe} accent="var(--color-sage)" bg="rgba(107,143,110,0.1)" border="rgba(107,143,110,0.2)" index={1}>
          <SettingRow label="Language" sub="Interface language" id="setting-language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: "5px 10px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--color-border-dim)",
                background: "var(--color-surface-3)",
                color: "var(--color-paper)",
                fontSize: "0.78rem",
                outline: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
              }}
            >
              {["English", "Hindi", "Spanish", "French", "German", "Japanese"].map((l) => (
                <option key={l} value={l} style={{ background: "var(--color-surface)" }}>{l}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Timezone" sub="Used for scheduling reminders" id="setting-timezone">
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>Asia/Kolkata</span>
          </SettingRow>
          <SettingRow label="Date format" id="setting-date-format">
            <span style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>DD / MM / YYYY</span>
          </SettingRow>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell} accent="var(--color-gold)" bg="rgba(201,168,76,0.08)" border="rgba(201,168,76,0.2)" index={2}>
          <SettingRow label="Email notifications" sub="Receive course updates via email" id="setting-email-notifs">
            <Toggle id="toggle-email" checked={notifs.email} onChange={() => toggle("notifs", "email")} />
          </SettingRow>
          <SettingRow label="Push notifications" sub="Browser push alerts" id="setting-push-notifs">
            <Toggle id="toggle-push" checked={notifs.push} onChange={() => toggle("notifs", "push")} />
          </SettingRow>
          <SettingRow label="Sound effects" sub="Play sounds on completion" id="setting-sound">
            <Toggle id="toggle-sound" checked={notifs.sound} onChange={() => toggle("notifs", "sound")} />
          </SettingRow>
          <SettingRow label="Weekly digest" sub="Summary of your week every Monday" id="setting-weekly">
            <Toggle id="toggle-weekly" checked={notifs.weekly} onChange={() => toggle("notifs", "weekly")} />
          </SettingRow>
        </Section>

        {/* Privacy */}
        <Section title="Privacy" icon={Eye} accent="var(--color-sage)" bg="rgba(107,143,110,0.08)" border="rgba(107,143,110,0.2)" index={3}>
          <SettingRow label="Public profile" sub="Allow others to view your profile" id="setting-public-profile">
            <Toggle id="toggle-public" checked={privacy.publicProfile} onChange={() => toggle("privacy", "publicProfile")} />
          </SettingRow>
          <SettingRow label="Show progress" sub="Display course progress publicly" id="setting-show-progress">
            <Toggle id="toggle-progress" checked={privacy.showProgress} onChange={() => toggle("privacy", "showProgress")} />
          </SettingRow>
          <SettingRow label="Show streak" sub="Display your streak on leaderboard" id="setting-show-streak">
            <Toggle id="toggle-streak" checked={privacy.showStreak} onChange={() => toggle("privacy", "showStreak")} />
          </SettingRow>
        </Section>

        {/* Security */}
        <Section title="Security" icon={Shield} accent="var(--color-ember)" bg="rgba(212,98,42,0.1)" border="rgba(212,98,42,0.2)" index={4}>
          {[
            { label: "Change password", sub: "Update your login password", Icon: Key, id: "btn-change-password" },
            { label: "Two-factor authentication", sub: "Add an extra security layer", Icon: Lock, id: "btn-2fa" },
            { label: "Active sessions", sub: "Manage logged-in devices", Icon: Monitor, id: "btn-sessions" },
          ].map(({ label, sub, Icon, id }) => (
            <button
              key={id}
              id={id}
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.875rem 0",
                paddingBottom: "0.875rem",
                borderBottom: "1px solid var(--color-border-dim)",
                cursor: "pointer",
                background: "none",
                textAlign: "left",
              }}
              className="security-row"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Icon size={15} color="var(--color-slate-warm)" />
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-paper)" }}>{label}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-slate-warm)" }}>{sub}</p>
                </div>
              </div>
              <ChevronRight size={15} color="var(--color-slate-warm)" style={{ flexShrink: 0 }} />
            </button>
          ))}
        </Section>

        {/* Contact Channels */}
        <Section title="Contact Channels" icon={Mail} accent="var(--color-gold-dim)" bg="rgba(138,111,46,0.1)" border="rgba(138,111,46,0.2)" index={5}>
          {[
            { label: "Email", value: "alex@learnflow.io", id: "contact-email" },
            { label: "Phone", value: "+91 98765 43210", id: "contact-phone" },
            { label: "Sound", value: "Chime (default)", id: "contact-sound" },
          ].map(({ label, value, id }) => (
            <SettingRow key={id} label={label} sub={value} id={id}>
              <button
                style={{
                  padding: "4px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--color-border-dim)",
                  background: "var(--color-surface-3)",
                  color: "var(--color-slate-warm)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "color 0.15s ease",
                }}
              >
                Edit
              </button>
            </SettingRow>
          ))}
        </Section>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .settings-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .setting-row-last:last-child {
          border-bottom: none;
        }
        .security-row:last-child {
          border-bottom: none !important;
        }
        .security-row:hover {
          opacity: 0.8;
        }
      `}</style>
    </section>
  );
}
