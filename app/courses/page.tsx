import { getCourses } from "@/lib/supabase/queries";
import { CoursesClient } from "./CoursesClient";


// Force dynamic rendering since we read cookies inside getCourses()
export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const enrolledCourses = await getCourses();
  return <CoursesClient initialEnrolled={enrolledCourses} />;
}
