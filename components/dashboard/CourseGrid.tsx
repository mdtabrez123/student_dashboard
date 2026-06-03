import { CourseTile } from "./CourseTile";
import type { Course } from "@/lib/types";

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  return (
    <section aria-label="Your Courses" className="contents">
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}
    </section>
  );
}
