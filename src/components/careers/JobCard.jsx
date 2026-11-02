
import { ArrowUpRight, MapPin, BriefcaseBusiness, Clock3 } from "lucide-react";

const JobCard = ({ job, onViewDetails }) => {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition-all duration-300 group-hover:bg-[#071927] group-hover:text-sky-400">
          <BriefcaseBusiness size={23} />
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
          {job.type}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-extrabold text-slate-950">
        {job.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
        {job.shortDescription}
      </p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <MapPin size={15} className="text-sky-600" />
          {job.location}
        </span>

        <span className="flex items-center gap-1.5">
          <Clock3 size={15} className="text-sky-600" />
          {job.experience}
        </span>
      </div>

      <div className="mt-auto pt-6">
        <button
          type="button"
          onClick={() => onViewDetails(job)}
          className="group/btn flex w-full items-center justify-between rounded-xl bg-[#071927] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-sky-600"
        >
          View Details
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover/btn:rotate-45"
          />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
