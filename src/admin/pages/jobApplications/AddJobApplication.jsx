
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  Upload,
  Save,
  FileText,
  LoaderCircle,
  X,
} from "lucide-react";

import axios from "axios";
import { createJobApplication } from "../../api/jobApplicationApi";

const JOB_API_URL = "http://localhost:5500/api/auth/job";

export default function AddJobApplication() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobId: "",
    jobTitle: "",
  });

  const [jobs, setJobs] = useState([]);
  const [resume, setResume] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchJobs = async () => {
    try {
      setError("");
      setLoadingJobs(true);

      const response = await axios.get(
        `${JOB_API_URL}/get-all-job`
      );

      console.log("Jobs API response:", response.data);

      const jobList =
        response.data?.jobs ||
        response.data?.applications ||
        response.data?.data?.jobs ||
        response.data?.data ||
        [];

      if (!Array.isArray(jobList)) {
        throw new Error("Jobs API did not return an array.");
      }

      setJobs(jobList);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      console.error("Backend error response:", err.response?.data);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load job positions."
      );
    } finally {
      setLoadingJobs(false);
    }
  };

  fetchJobs();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleJobChange = (e) => {
    const selectedJob = jobs.find(
      (job) => job._id === e.target.value
    );

    setFormData((previous) => ({
      ...previous,
      jobId: selectedJob?._id || "",
      jobTitle: selectedJob?.title || "",
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (!allowedExtensions.test(file.name)) {
      setError("Please upload a PDF, DOC, or DOCX resume.");
      e.target.value = "";
      return;
    }

    setError("");
    setResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.jobId ||
      !formData.jobTitle
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!resume) {
      setError("Please upload the candidate's resume.");
      return;
    }

    const data = new FormData();

    data.append("fullName", formData.fullName.trim());
    data.append("email", formData.email.trim());
    data.append("phoneNumber", formData.phoneNumber.trim());
    data.append("jobId", formData.jobId);
    data.append("jobTitle", formData.jobTitle);
    data.append("resume", resume);

    try {
      setSaving(true);

      await createJobApplication(data);

      navigate("/admin/apply-jobs");
    } catch (err) {
      const validationErrors = err.response?.data?.errors
        ?.map((item) => item.msg)
        .filter(Boolean)
        .join(", ");

      setError(
        validationErrors ||
          err.response?.data?.message ||
          "Unable to create job application."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <button
        type="button"
        onClick={() => navigate("/admin/apply-jobs")}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Applications
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Add Job Application
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manually add a candidate's job application.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
      >
        {error && (
          <div className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Candidate information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter the candidate's contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name *
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter candidate name"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address *
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number *
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* Applied job */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Applied Job
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select the job position for this candidate.
          </p>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Select Job Position *
            </label>

            <div className="relative">
              <BriefcaseBusiness
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={formData.jobId}
                onChange={handleJobChange}
                required
                disabled={loadingJobs || jobs.length === 0}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
              >
                <option value="">
                  {loadingJobs
                    ? "Loading job positions..."
                    : jobs.length === 0
                    ? "No job positions available"
                    : "Select a job position"}
                </option>

                {jobs.map((job) => (
                  <option key={job._id} value={job._id}>
                    {job.title}
                  </option>
                ))}
              </select>
            </div>

            {formData.jobTitle && (
              <p className="mt-2 text-xs text-green-600">
                Selected position: {formData.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Resume upload */}
        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Resume
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload the candidate's resume. PDF, DOC, or DOCX files are accepted.
          </p>

          <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Upload size={23} className="text-blue-600" />
            </div>

            <span className="mt-3 text-sm font-semibold text-gray-800">
              {resume ? resume.name : "Click to upload resume"}
            </span>

            <span className="mt-1 text-xs text-gray-500">
              PDF, DOC, or DOCX
            </span>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />
          </label>

          {resume && (
            <div className="mt-3 flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <div className="flex min-w-0 items-center gap-2">
                <FileText
                  size={20}
                  className="shrink-0 text-blue-600"
                />
                <span className="truncate text-sm text-gray-700">
                  {resume.name}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setResume(null)}
                className="ml-3 text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Form actions */}
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/admin/job-applications")}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || loadingJobs || jobs.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Add Application
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
