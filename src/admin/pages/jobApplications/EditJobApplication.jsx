
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  FileText,
  Upload,
  LoaderCircle,
} from "lucide-react";

import {
  getJobApplicationById,
  updateJobApplication,
} from "../../api/jobApplicationApi.js";

export default function EditJobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    jobId: "",
    jobTitle: "",
  });

  const [existingResume, setExistingResume] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);

        const response = await getJobApplicationById(id);
        const application = response?.application;

        if (!application) {
          setError("Job application not found.");
          return;
        }

        setFormData({
          fullName: application.fullName || "",
          email: application.email || "",
          phoneNumber: application.phoneNumber || "",
          jobId:
            typeof application.jobId === "object"
              ? application.jobId?._id || ""
              : application.jobId || "",
          jobTitle: application.jobTitle || "",
        });

        setExistingResume(application.resume || "");
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load application details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setNewResume(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.jobId.trim() ||
      !formData.jobTitle.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("fullName", formData.fullName.trim());
      data.append("email", formData.email.trim());
      data.append("phoneNumber", formData.phoneNumber.trim());
      data.append("jobId", formData.jobId.trim());
      data.append("jobTitle", formData.jobTitle.trim());

      if (newResume) {
        data.append("resume", newResume);
      }

      await updateJobApplication(id, data);

      navigate(`/admin/view-job-application/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.map((item) => item.msg).join(", ") ||
          "Unable to update job application."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-2 text-gray-500">
        <LoaderCircle size={20} className="animate-spin" />
        Loading application...
      </div>
    );
  }

  if (error && !formData.fullName) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/admin/apply-jobs")}
          className="mt-4 text-sm font-semibold text-blue-600 hover:underline"
        >
          Back to applications
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <button
        type="button"
        onClick={() => navigate(`/admin/view-job-application/${id}`)}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Application
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Job Application
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the candidate's application information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Edit the candidate's contact details.
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
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter candidate name"
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
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter email address"
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
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter phone number"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Applied Job Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            The job ID and title are saved with the application.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job ID *
              </label>

              <div className="relative">
                <BriefcaseBusiness
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Job Title *
              </label>

              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter applied job title"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Candidate Resume
          </h2>

          {existingResume && (
            <p className="mt-3 break-all text-sm text-gray-500">
              Current resume: {existingResume}
            </p>
          )}

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400 hover:bg-blue-50/50">
            <Upload size={25} className="text-blue-600" />

            <span className="mt-2 text-sm font-semibold text-gray-700">
              {newResume ? newResume.name : "Upload a new resume"}
            </span>

            <span className="mt-1 text-xs text-gray-500">
              Leave empty to keep the existing resume.
            </span>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/admin/view-job-application/${id}`)}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Update Application"}
          </button>
        </div>
      </form>
    </div>
  );
}
