
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Download,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";

import { getJobApplicationById } from "../../api/jobApplicationApi.js";

const SERVER_URL = "http://localhost:5500";

export default function ViewJobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getJobApplicationById(id);
        setApplication(response?.application || null);
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

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-2 text-gray-500">
        <LoaderCircle className="animate-spin" size={20} />
        Loading application...
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">
          {error || "Application not found."}
        </p>

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

  const resumeUrl = application.resume
    ? application.resume.startsWith("http")
      ? application.resume
      : `${SERVER_URL}${application.resume.startsWith("/") ? "" : "/"}${application.resume}`
    : null;

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

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <UserRound size={32} className="text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {application.fullName}
            </h1>

            <p className="mt-1 text-gray-500">
              Job Application Details
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 border-t border-gray-100 pt-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
              <UserRound size={17} className="text-gray-400" />
              {application.fullName}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
              <Mail size={17} className="text-gray-400" />
              <a
                href={`mailto:${application.email}`}
                className="break-all hover:text-blue-600"
              >
                {application.email}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
              <Phone size={17} className="text-gray-400" />
              <a
                href={`tel:${application.phoneNumber}`}
                className="hover:text-blue-600"
              >
                {application.phoneNumber}
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Applied Position</p>
            <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
              <BriefcaseBusiness size={17} className="text-gray-400" />
              {application.jobTitle}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Application Date</p>
            <div className="mt-2 flex items-center gap-2 font-medium text-gray-900">
              <CalendarDays size={17} className="text-gray-400" />
              {application.createdAt
                ? new Date(application.createdAt).toLocaleString()
                : "Not available"}
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Application ID</p>
            <p className="mt-2 break-all font-medium text-gray-900">
              {application._id}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50">
            <FileText size={22} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Candidate Resume
            </h2>
            <p className="text-sm text-gray-500">
              View or download the candidate's uploaded resume.
            </p>
          </div>
        </div>

        {resumeUrl ? (
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <ExternalLink size={17} />
              Open Resume
            </a>

            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Download size={17} />
              Download Resume
            </a>
          </div>
        ) : (
          <p className="mt-5 text-sm text-gray-500">
            No resume is available for this application.
          </p>
        )}
      </div>
    </div>
  );
}
