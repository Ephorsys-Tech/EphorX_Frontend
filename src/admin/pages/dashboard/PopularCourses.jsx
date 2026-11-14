import { BookOpen, GraduationCap } from "lucide-react";

import SectionHeading from "./SectionHeading";

const courseColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-orange-500",
];

export default function PopularCourses({ courses, onViewAll }) {
  const maxCourseEnrollments = Math.max(
    ...courses.map((course) => course.enrollments),
    1
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <SectionHeading
        icon={GraduationCap}
        title="Popular Courses"
        action="View All"
        onClick={onViewAll}
      />

      <div className="space-y-5">
        {courses.length > 0 ? (
          courses.map((course, index) => {
            const percentage = Math.round(
              (course.enrollments / maxCourseEnrollments) * 100
            );

            return (
              <div
                key={`${course.name}-${index}`}
                className="flex items-center gap-3"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">
                  <BookOpen size={21} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {course.name}
                    </p>
                    <span className="shrink-0 text-xs font-semibold text-slate-500">
                      {course.enrollments}
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${courseColors[index % courseColors.length]}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">
            No courses available.
          </p>
        )}
      </div>
    </div>
  );
}
