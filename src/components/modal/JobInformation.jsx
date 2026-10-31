import {
  MapPin,
  Clock3,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

const JobInformation = ({ job }) => {
  if (!job) return null;

  return (
    <div className="w-full space-y-7 px-10 pb-8">

      {/* Job Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
            {job.type}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            {job.experience}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
          {job.title}
        </h2>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MapPin size={17} className="shrink-0 text-sky-600" />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={17} className="shrink-0 text-sky-600" />
            <span>{job.experience}</span>
          </div>

          <div className="flex items-center gap-2">
            <BriefcaseBusiness
              size={17}
              className="shrink-0 text-sky-600"
            />
            <span>{job.type}</span>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <section>
        <h3 className="text-base font-bold text-slate-900">
          Job Description
        </h3>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          {job.description}
        </p>
      </section>

      {/* Responsibilities */}
      <section>
        <h3 className="text-base font-bold text-slate-900">
          Responsibilities
        </h3>

        <ul className="mt-4 space-y-3">
          {job.responsibilities?.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm leading-6 text-slate-600"
            >
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-sky-600"
              />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section>
        <h3 className="text-base font-bold text-slate-900">
          Requirements
        </h3>

        <ul className="mt-4 space-y-3">
          {job.requirements?.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-sm leading-6 text-slate-600"
            >
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0 text-sky-600"
              />

              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
};

export default JobInformation;