
import {
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function JobApplicationCard({
  application,
  onView,
  onEdit,
  onDelete,
}) {
  const formattedDate = application?.createdAt
    ? new Date(application.createdAt).toLocaleDateString()
    : "Date unavailable";

  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
            <UserRound size={23} className="text-blue-600" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-gray-900">
              {application?.fullName || "Unknown Candidate"}
            </h2>

            <p className="mt-1 truncate text-sm text-gray-500">
              {application?.jobTitle || "Job title unavailable"}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={16} className="shrink-0 text-gray-400" />
            <span className="truncate">{application?.email}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={16} className="shrink-0 text-gray-400" />
            <span>{application?.phoneNumber}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={16} className="shrink-0 text-gray-400" />
            <span>Applied: {formattedDate}</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
          <button
            type="button"
            onClick={() => onView(application)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Eye size={16} />
            View
          </button>

          <button
            type="button"
            onClick={() => onEdit(application)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(application)}
            aria-label={`Delete application from ${application?.fullName || "candidate"}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
