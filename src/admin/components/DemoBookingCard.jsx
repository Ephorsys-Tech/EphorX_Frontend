import { Eye, Pencil, Trash2, Mail, BookOpen, User } from "lucide-react";

const DemoBookingCard = ({
  booking,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <User size={21} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {booking.fullName}
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Demo Session Request
            </p>
          </div>
        </div>
      </div>

      {/* Only 3 Fields */}
      <div className="space-y-3">

        {/* Course Name */}
        <div className="flex items-center gap-3">
          <BookOpen size={17} className="shrink-0 text-gray-400" />

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Course</p>
            <p className="truncate text-sm font-medium text-gray-700">
              {booking.courseName || "Not provided"}
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <Mail size={17} className="shrink-0 text-gray-400" />

          <div className="min-w-0">
            <p className="text-xs text-gray-400">Email</p>
            <p className="truncate text-sm font-medium text-gray-700">
              {booking.email || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-1 border-t border-gray-100 pt-1">

        <button
          onClick={() => onView(booking)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 p-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={() => onEdit(booking)}
           className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(booking)}
         className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 p-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>
    </div>
  );
};

export default DemoBookingCard;
