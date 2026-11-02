
import {
  BriefcaseBusiness,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function JobCard({
  job,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-5">

        {/* Job Title and Employment Type */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50">
              <BriefcaseBusiness
                size={22}
                className="text-blue-600"
              />
            </div>

            <h2 className="line-clamp-2 text-lg font-bold text-gray-900">
              {job?.title || "Untitled Job"}
            </h2>
          </div>

          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {job?.employmentType || "Not specified"}
          </span>
        </div>

        {/* Experience */}
        <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
          <Clock size={16} className="shrink-0 text-gray-400" />
          <span>
            {job?.experience || "Experience not specified"}
          </span>
        </div>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} className="shrink-0 text-gray-400" />
          <span>
            {job?.location || "Location not specified"}
          </span>
        </div>

        {/* Short Description */}
        <p className="mt-4 min-h-12 line-clamp-2 text-sm leading-6 text-gray-500">
          {job?.jobDescription || "No description provided."}
        </p>

        {/* Responsibilities and Requirements */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {job?.responsibilities?.length || 0} Responsibilities
          </span>

          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            {job?.requirements?.length || 0} Requirements
          </span>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">

          <button
            type="button"
            onClick={() => onView(job)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Eye size={16} />
            View
          </button>

          <button
            type="button"
            onClick={() => onEdit(job)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(job)}
            aria-label={`Delete ${job?.title || "job"}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      </div>
    </article>
  );
}
