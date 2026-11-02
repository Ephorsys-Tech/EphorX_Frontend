
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Clock,
  FileText,
  CheckCircle2,
  ClipboardList,
  Edit,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import { getJobById } from "../../api/jobApi";

export default function ViewJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobById(id);

        const jobData =
          response?.job ||
          response?.data?.job ||
          response?.data ||
          response;

        if (!jobData || !jobData._id) {
          throw new Error("Job details not found.");
        }

        setJob(jobData);
      } catch (err) {
        console.error("Error fetching job:", err);

        setError(
          err?.response?.data?.message ||
            err.message ||
            "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center bg-gray-50">
        <RefreshCw size={32} className="animate-spin text-blue-600" />
        <p className="mt-4 text-sm text-gray-500">
          Loading job details...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-white p-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={22} />
            <p className="text-sm">
              {error || "Job not found."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={17} />
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Job Details
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                View the complete information for this job opening.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate(`/admin/edit-job/${job._id}`)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Edit size={17} />
              Edit Job
            </button>
          </div>
        </div>

        {/* Job Overview */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <BriefcaseBusiness
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {job.title}
                </h2>

                <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {job.employmentType}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Clock size={19} className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Experience</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {job.experience}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <MapPin size={19} className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {job.location}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <BriefcaseBusiness size={19} className="text-gray-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Employment Type</p>
                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    {job.employmentType}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <FileText size={21} className="text-purple-600" />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              Job Description
            </h2>
          </div>

          <p className="whitespace-pre-line text-sm leading-7 text-gray-600">
            {job.jobDescription || "No description provided."}
          </p>
        </div>

        {/* Responsibilities */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <ClipboardList size={21} className="text-green-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Responsibilities
              </h2>
              <p className="text-sm text-gray-500">
                Key responsibilities for this position.
              </p>
            </div>
          </div>

          {job.responsibilities?.length > 0 ? (
            <ul className="space-y-3">
              {job.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-green-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              No responsibilities added.
            </p>
          )}
        </div>

        {/* Requirements */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <CheckCircle2 size={21} className="text-orange-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Requirements
              </h2>
              <p className="text-sm text-gray-500">
                Qualifications and skills required.
              </p>
            </div>
          </div>

          {job.requirements?.length > 0 ? (
            <ul className="space-y-3">
              {job.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-gray-600"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 shrink-0 text-orange-600"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">
              No requirements added.
            </p>
          )}
        </div>

        {/* Bottom Action */}
        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/edit-job/${job._id}`)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Edit size={17} />
            Edit This Job
          </button>
        </div>

      </div>
    </div>
  );
}
