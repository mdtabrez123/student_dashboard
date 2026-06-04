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
      className={`relative flex h-5 w-9 items-center rounded-full transition-colors duration-200 ${checked ? "bg-violet-600" : "bg-white/[0.1]"
        }`}
    >
      <motion.span
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className="h-3.5 w-3.5 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

function SettingRow({
  label, sub, children, id,
}: { label: string; sub?: string; children: React.ReactNode; id?: string }) {
  return (
    <div id={id} className="flex items-center justify-between gap-4 py-3.5 border-b border-white/[0.05] last:border-0">
      <div>
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Section({ title, icon: Icon, color, children, index }: {
  title: string; icon: React.ElementType; color: string; children: React.ReactNode; index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-white/[0.07] bg-[#0f0f1c] p-5"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${color}20` }}>
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
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
    <section aria-label="Settings" className="min-h-screen p-6 md:p-8 lg:p-10">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600">Preferences</p>
          <h1 className="mt-1 text-base font-semibold text-white">Settings</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="rounded-lg bg-violet-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
        >
          Save changes
        </motion.button>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

        {/* Appearance */}
        <Section title="Appearance" icon={Palette} color="#8b5cf6" index={0}>
          <p className="mb-3 text-xs text-zinc-600">Choose your preferred theme</p>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map(({ id, label, Icon }) => (
              <button
                key={id}
                id={`theme-${id}`}
                onClick={() => setTheme(id)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all text-xs font-medium ${theme === id
                  ? "border-violet-500/60 bg-violet-600/10 text-violet-300"
                  : "border-white/[0.07] bg-white/[0.02] text-zinc-500 hover:border-white/[0.12] hover:text-zinc-300"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {theme === id && <Check className="h-3 w-3 text-violet-400" />}
              </button>
            ))}
          </div>
        </Section>

        {/* Language & Region */}
        <Section title="Language & Region" icon={Globe} color="#0ea5e9" index={1}>
          <SettingRow label="Language" sub="Interface language" id="setting-language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 outline-none focus:border-violet-500/50"
            >
              {["English", "Hindi", "Spanish", "French", "German", "Japanese"].map((l) => (
                <option key={l} value={l} className="bg-[#0c0c18]">{l}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Timezone" sub="Used for scheduling reminders" id="setting-timezone">
            <span className="text-xs text-zinc-500">Asia/Kolkata</span>
          </SettingRow>
          <SettingRow label="Date format" id="setting-date-format">
            <span className="text-xs text-zinc-500">DD / MM / YYYY</span>
          </SettingRow>
        </Section>

        {/* Notifications */}
        <Section title="Notifications" icon={Bell} color="#f59e0b" index={2}>
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
        <Section title="Privacy" icon={Eye} color="#10b981" index={3}>
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
        <Section title="Security" icon={Shield} color="#ef4444" index={4}>
          {[
            { label: "Change password", sub: "Update your login password", Icon: Key, id: "btn-change-password" },
            { label: "Two-factor authentication", sub: "Add an extra security layer", Icon: Lock, id: "btn-2fa" },
            { label: "Active sessions", sub: "Manage logged-in devices", Icon: Monitor, id: "btn-sessions" },
          ].map(({ label, sub, Icon, id }) => (
            <button
              key={id}
              id={id}
              className="flex w-full items-center justify-between border-b border-white/[0.05] py-3.5 last:border-0 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-3 text-left">
                <Icon className="h-4 w-4 text-zinc-600" />
                <div>
                  <p className="text-sm font-medium text-zinc-200">{label}</p>
                  <p className="mt-0.5 text-xs text-zinc-600">{sub}</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-700" />
            </button>
          ))}
        </Section>

        {/* Notifications channels */}
        <Section title="Contact Channels" icon={Mail} color="#06b6d4" index={5}>
          {[
            { label: "Email", value: "alex@learnflow.io", Icon: Mail, id: "contact-email" },
            { label: "Phone", value: "+91 98765 43210", Icon: Smartphone, id: "contact-phone" },
            { label: "Sound", value: "Chime (default)", Icon: Volume2, id: "contact-sound" },
          ].map(({ label, value, id }) => (
            <SettingRow key={id} label={label} sub={value} id={id}>
              <button className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors">
                Edit
              </button>
            </SettingRow>
          ))}
        </Section>

      </div>
    </section>
  );
}
