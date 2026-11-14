import { Users } from "lucide-react";

import SectionHeading from "./SectionHeading";

export default function RecentEnrollments({ enrollments, onViewAll }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <SectionHeading
        icon={Users}
        title="Recent Enrollments"
        action="View All"
        onClick={onViewAll}
      />

      <div className="space-y-5">
        {enrollments.length > 0 ? (
          enrollments.map((person) => {
            const isPending = /pending|await|review/i.test(person.status);

            return (
              <div key={person.key} className="flex items-center gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-blue-400 to-indigo-600 text-xs font-bold text-white">
                  {person.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-800">
                    {person.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {person.course}
                  </p>
                </div>

                <span
                  className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${
                    isPending
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {person.status}
                </span>
              </div>
            );
          })
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">
            No enrollments available.
          </p>
        )}
      </div>
    </div>
  );
}
