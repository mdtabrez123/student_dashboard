import { createClient } from "./server";
import type { Course } from "@/lib/types";

export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching courses:", error.message);
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return data as Course[];
}
