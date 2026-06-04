import { createClient } from "./server";
import type { Course } from "@/lib/types";



/**
 * Fetches all courses from the Supabase `courses` table, ordered by creation date.
 *
 * Called exclusively from Server Components via Next.js RSC.
 * Throws on database error so the nearest error boundary handles it.
 * Falls back to DEMO_COURSES when the table is empty (e.g., seed not applied yet).
 *
 * @returns Promise<Course[]> — live data from Supabase, or demo data if empty
 * @throws Error when the Supabase query fails
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    // Throw so Next.js error.tsx catches it — no silent fallback to fake data
    throw new Error(
      `Failed to fetch courses from Supabase: ${error.message} (code: ${error.code})`,
    );
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data as Course[];
}
