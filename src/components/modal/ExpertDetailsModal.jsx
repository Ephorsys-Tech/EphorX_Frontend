
import {
  BriefcaseBusiness,
  GraduationCap,
  X,
} from "lucide-react";

const ExpertDetailsModal = ({ expert, onClose }) => {
  if (!expert) return null;

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Expert cover image */}
      <div className="relative h-56 bg-slate-100 sm:h-64">
        <img
          src={expert.image}
          alt={expert.name}
          className="h-full w-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

       

        {/* Expert identity */}
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
            Industry Expert
          </p>

          <h3 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
            {expert.name}
          </h3>

          <p className="mt-1 text-sm text-white/80">
            {expert.role}
          </p>
        </div>
      </div>

      {/* Expert information */}
      <div className="p-5 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
          <BriefcaseBusiness size={15} />
          {expert.field}
        </span>

        <h4 className="mt-5 text-lg font-bold text-slate-950">
          Professional Expertise
        </h4>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {expert.description}
        </p>

        {/* Experience information */}
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sky-300">
            <GraduationCap size={24} />
          </span>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Professional Experience
            </p>

            <p className="mt-1 text-lg font-extrabold text-slate-950">
              {expert.experience}
            </p>
          </div>
        </div>

        {/* Close modal */}
        <button
          type="button"
          onClick={onClose}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-sky-400 hover:text-slate-950"
        >
          Close Details
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ExpertDetailsModal;
