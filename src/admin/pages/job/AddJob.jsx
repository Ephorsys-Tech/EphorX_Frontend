
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { createJob } from "../../api/jobApi";

export default function AddJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    employmentType: "",
    experience: "",
    location: "",
    jobDescription: "",
    responsibilities: [""],
    requirements: [""],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle normal input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle responsibility changes
  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...formData.responsibilities];
    updatedResponsibilities[index] = value;

    setFormData((prev) => ({
      ...prev,
      responsibilities: updatedResponsibilities,
    }));
  };

  // Add responsibility field
  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  // Remove responsibility field
  const removeResponsibility = (index) => {
    if (formData.responsibilities.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // Handle requirement changes
  const handleRequirementChange = (index, value) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = value;

    setFormData((prev) => ({
      ...prev,
      requirements: updatedRequirements,
    }));
  };

  // Add requirement field
  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  // Remove requirement field
  const removeRequirement = (index) => {
    if (formData.requirements.length === 1) return;

    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const responsibilities = formData.responsibilities
      .map((item) => item.trim())
      .filter(Boolean);

    const requirements = formData.requirements
      .map((item) => item.trim())
      .filter(Boolean);

    if (!formData.title.trim()) {
      setError("Please enter the job title.");
      return;
    }

    if (!formData.employmentType.trim()) {
      setError("Please select the employment type.");
      return;
    }

    if (!formData.experience.trim()) {
      setError("Please enter the required experience.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Please enter the job location.");
      return;
    }

    if (!formData.jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    if (responsibilities.length === 0) {
      setError("Please add at least one responsibility.");
      return;
    }

    if (requirements.length === 0) {
      setError("Please add at least one requirement.");
      return;
    }

    const jobData = {
      ...formData,
      title: formData.title.trim(),
      employmentType: formData.employmentType.trim(),
      experience: formData.experience.trim(),
      location: formData.location.trim(),
      jobDescription: formData.jobDescription.trim(),
      responsibilities,
      requirements,
    };

    try {
      setLoading(true);

      await createJob(jobData);

      navigate("/admin/jobs", {
        state: { message: "Job created successfully." },
      });
    } catch (err) {
      console.error("Error creating job:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to create job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-7">
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Add New Job
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to create a new job opening.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <p className="flex-1 text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
              aria-label="Close error message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Basic Job Information */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
                <BriefcaseBusiness
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Basic Information
                </h2>
                <p className="text-sm text-gray-500">
                  Enter the basic details of the job.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Job Title */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Job Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className={inputClass}
                />
              </div>

              {/* Employment Type */}
              <div>
                <label className={labelClass}>
                  Employment Type <span className="text-red-500">*</span>
                </label>

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

              {/* Experience */}
              <div>
                <label className={labelClass}>
                  Experience <span className="text-red-500">*</span>
                </label>

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

              {/* Location */}
              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Job Location <span className="text-red-500">*</span>
                </label>

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

          {/* Job Description */}
          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">

            <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50">
                <FileText
                  size={22}
                  className="text-purple-600"
                />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Job Description
                </h2>
                <p className="text-sm text-gray-500">
                  Describe the role and its purpose.
                </p>
              </div>
            </div>

            <label className={labelClass}>
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows={6}
              placeholder="Write a detailed description of the job..."
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
                  Add the key responsibilities for this position.
                </p>
              </div>

              <button
                type="button"
                onClick={addResponsibility}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <Plus size={17} />
                Add Responsibility
              </button>
            </div>

            <div className="space-y-3">
              {formData.responsibilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
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
                  Add the qualifications and skills required.
                </p>
              </div>

              <button
                type="button"
                onClick={addRequirement}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                <Plus size={17} />
                Add Requirement
              </button>
            </div>

            <div className="space-y-3">
              {formData.requirements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
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
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove requirement ${index + 1}`}
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mb-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              <X size={17} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  Creating Job...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Create Job
                </>
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
