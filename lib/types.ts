/**
 * Represents a row in the Supabase `courses` table.
 *
 * Schema:
 *   id         uuid       — primary key, auto-generated
 *   title      text       — course name
 *   progress   integer    — 0–100 completion percentage
 *   icon_name  text       — Lucide icon name (e.g. "Code2", "Brain")
 *   created_at timestampz — ISO 8601 string from Supabase
 */
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

export interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface StreakData {
  current: number;
  longest: number;
}
