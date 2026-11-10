import { useState } from "react";
import {
  Mail,
  Phone,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const EnrollmentCard = ({
  enrollment,
  onView,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAction = (callback) => {
    setMenuOpen(false);
    callback();
  };

  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">

      {/* Card Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
            {enrollment.fullName?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-800">
              {enrollment.fullName}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Participant
            </p>
          </div>
        </div>

        {/* Three Dot Menu */}
        <div className="relative shrink-0">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <MoreVertical size={21} />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />

              <div className="absolute right-0 top-10 z-20 w-27 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl">

                <button
                  onClick={() => handleAction(onView)}
                  className="flex w-full items-center gap-3 px-3 py-1.5 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Eye size={16} />
                  View
                </button>

                <button
                  onClick={() => handleAction(onEdit)}
                  className="flex w-full items-center gap-3 px-3  text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleAction(onDelete)}
                  className="flex w-full items-center gap-3 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>
            </>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="mt-4 space-y-3 border-t border-slate-100 pt-3">

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Mail size={16} className="shrink-0 text-slate-400" />
          <span className="truncate">{enrollment.email}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Phone size={16} className="shrink-0 text-slate-400" />
          <span>{enrollment.phoneNumber}</span>
        </div>

      </div>

    </div>
  );
};

export default EnrollmentCard;