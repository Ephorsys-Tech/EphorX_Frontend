import { ArrowRight } from "lucide-react";

export default function SectionHeading({ icon: Icon, title, action, onClick }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-800">
        <Icon size={20} className="text-blue-600" />
        {title}
      </h2>

      {action && (
        <button
          type="button"
          onClick={onClick}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
        >
          {action}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}
