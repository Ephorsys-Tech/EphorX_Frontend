
import {
  BriefcaseBusiness,
  GraduationCap,
  X,
} from "lucide-react";

const ExpertDetailsModal = ({ expert, onClose }) => {
  if (!expert) return null;

  return (
    <div className="relative overflow-hidden bg-white">

      {/* Expert profile */}
      <div className="flex items-center  gap-4 border-b border-slate-100 p-5 sm:gap-6 sm:p-2">

        {/* Profile image */}
        <div className="h-32 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 shadow-sm sm:h-60 sm:w-60">
          <img
            src={expert.image}
            alt={expert.name}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Expert identity */}
        <div className="min-w-0 ">
          <span className="inline-flex  rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:text-xs">
            Industry Expert
          </span>

          <h3 className="mt-3 text-xl font-extrabold leading-tight text-slate-950 sm:text-3xl">
            {expert.name}
          </h3>

          <p className="mt-2 text-sm font-semibold leading-6 text-blue-700 sm:text-base">
            {expert.role}
          </p>
        </div>
      </div>

      {/* Expert information */}
      <div className="p-5 sm:p-2">

        {/* Expertise field */}
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-bold text-blue-700">
          <BriefcaseBusiness size={15} />
          {expert.field}
        </span>

        <h4 className="mt-3 text-lg font-bold text-slate-950">
          Professional Expertise
        </h4>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {expert.description}
        </p>

        {/* Experience information */}
        <div className="mt-2 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-white">
            <GraduationCap size={24} />
          </span>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Professional Experience
            </p>

            <p className="mt-1 text-lg font-extrabold text-blue-900">
              {expert.experience}
            </p>
          </div>
        </div>

        {/* Close modal */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-800 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
        >
          Close Details
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExpertDetailsModal;
