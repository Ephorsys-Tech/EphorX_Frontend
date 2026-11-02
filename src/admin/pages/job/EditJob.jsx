
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Clock,
  FileText,
  Plus,
  Trash2,
  Save,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import {
  getJobById,
  updateJob,
} from "../../api/jobApi";

const initialFormData = {
  title: "",
  employmentType: "",
  experience: "",
  location: "",
  jobDescription: "",
  responsibilities: [""],
  requirements: [""],
};

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  // Fetch existing job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobById(id);

        const job =
          response?.job ||
          response?.data?.job ||
          response?.data ||
          response;

        if (!job || !job._id) {
          throw new Error("Job details not found.");
        }

        setFormData({
          title: job.title || "",
          employmentType: job.employmentType || "",
          experience: job.experience || "",
          location: job.location || "",
          jobDescription: job.jobDescription || "",
          responsibilities:
            Array.isArray(job.responsibilities) &&
            job.responsibilities.length > 0
              ? job.responsibilities
              : [""],
          requirements:
            Array.isArray(job.requirements) &&
            job.requirements.length > 0
              ? job.requirements
              : [""],
        });
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

  // Normal input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Responsibilities
  const handleResponsibilityChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const removeResponsibility = (index) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities:
        prev.responsibilities.length > 1
          ? prev.responsibilities.filter((_, i) => i !== index)
          : prev.responsibilities,
    }));
  };

  // Requirements
  const handleRequirementChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const removeRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements:
        prev.requirements.length > 1
          ? prev.requirements.filter((_, i) => i !== index)
          : prev.requirements,
    }));
  };

  // Update job
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const jobData = {
      title: formData.title.trim(),
      employmentType: formData.employmentType.trim(),
      experience: formData.experience.trim(),
      location: formData.location.trim(),
      jobDescription: formData.jobDescription.trim(),
      responsibilities: formData.responsibilities
        .map((item) => item.trim())
        .filter(Boolean),
      requirements: formData.requirements
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (
      !jobData.title ||
      !jobData.employmentType ||
      !jobData.experience ||
      !jobData.location ||
      !jobData.jobDescription
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (jobData.responsibilities.length === 0) {
      setError("Please add at least one responsibility.");
      return;
    }

    if (jobData.requirements.length === 0) {
      setError("Please add at least one requirement.");
      return;
    }

    try {
      setSaving(true);

      await updateJob(id, jobData);

      navigate("/admin/jobs", {
        state: { message: "Job updated successfully." },
      });
    } catch (err) {
      console.error("Error updating job:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to update job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center bg-gray-50">
        <RefreshCw size={32} className="animate-spin text-blue-600" />
        <p className="mt-4 text-sm text-gray-500">Loading job details...</p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-xl border border-red-200 bg-white p-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle size={22} />
            <p className="text-sm">{error}</p>
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
      <div className="mx-auto max-w-4xl">

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

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Edit Job
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the job information below.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle size={20} className="shrink-0 text-red-600" />
            <p className="flex-1 text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Close error"
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                <BriefcaseBusiness size={22} className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-500">
                  Edit the basic details of the job.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className={labelClass}>Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Employment Type *</label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select employment type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Experience *</label>
                <div className="relative">
                  <Clock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="e.g. 2-4 Years"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Job Location *</label>
                <div className="relative">
                  <MapPin
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Cuttack, Odisha / Remote"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50">
                <FileText size={22} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Job Description
                </h2>
                <p className="text-sm text-gray-500">
                  Edit the job description.
                </p>
              </div>
            </div>

            <label className={labelClass}>Description *</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={6}
              placeholder="Write a detailed job description..."
              className={`${inputClass} resize-y`}
            />
          </div>

          {/* Responsibilities */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Responsibilities
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update the responsibilities for this position.
                </p>
              </div>

              <button
                type="button"
                onClick={addResponsibility}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                <Plus size={17} />
                Add Responsibility
              </button>
            </div>

            <div className="space-y-3">
              {formData.responsibilities.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleResponsibilityChange(index, e.target.value)
                    }
                    placeholder={`Enter responsibility ${index + 1}`}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => removeResponsibility(index)}
                    disabled={formData.responsibilities.length === 1}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40"
                    aria-label={`Remove responsibility ${index + 1}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex flex-col justify-between gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Requirements
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Update the qualifications and skills required.
                </p>
              </div>

              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-100"
              >
                <Plus size={17} />
                Add Requirement
              </button>
            </div>

            <div className="space-y-3">
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                    {index + 1}
                  </span>

                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      handleRequirementChange(index, e.target.value)
                    }
                    placeholder={`Enter requirement ${index + 1}`}
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    disabled={formData.requirements.length === 1}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40"
                    aria-label={`Remove requirement ${index + 1}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mb-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  Updating Job...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Update Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
