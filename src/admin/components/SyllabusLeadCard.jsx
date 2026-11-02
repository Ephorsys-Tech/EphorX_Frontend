
import { Eye, Pencil, Trash2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SyllabusLeadCard = ({ lead, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {lead.fullName}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mt-1">
            {lead.courseName}
          </p>
        </div>

        <span className="shrink-0 text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
         Lead
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
        <Mail size={16} />
        <span className="truncate">{lead.email}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate(`/admin/view-lead/${lead._id}`)}
         className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 p-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Eye size={15} /> View
        </button>

        <button
          onClick={() => navigate(`/admin/edit-lead/${lead._id}`)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 p-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
        >
          <Pencil size={15} /> Edit
        </button>

        <button
          onClick={() => onDelete(lead._id)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 p-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={15} /> Delete
        </button>
      </div>
    </div>
  );
};

export default SyllabusLeadCard;
