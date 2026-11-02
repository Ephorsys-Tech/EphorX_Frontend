
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  RefreshCw,
  BriefcaseBusiness,
  Users,
  X,
  Trash2,
  Plus,
} from "lucide-react";

import {
  getAllJobApplications,
  deleteJobApplication,
} from "../../api/jobApplicationApi";

import JobApplicationCard from "../../components/JobApplicationCard";

export default function JobApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllJobApplications();

      setApplications(
        Array.isArray(response?.applications)
          ? response.applications
          : []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load job applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return applications;

    return applications.filter((application) =>
      [
        application.fullName,
        application.email,
        application.phoneNumber,
        application.jobTitle,
      ]
        .filter(Boolean)
        .some((field) =>
          String(field).toLowerCase().includes(value)
        )
    );
  }, [applications, search]);

  const handleView = (application) => {
    navigate(`/admin/view-job-application/${application._id}`);
  };

  const handleEdit = (application) => {
    navigate(`/admin/edit-job-application/${application._id}`);
  };

  const handleDelete = async () => {
    if (!selectedApplication?._id) return;

    try {
      setDeleting(true);

      await deleteJobApplication(selectedApplication._id);

      setApplications((previous) =>
        previous.filter(
          (application) =>
            application._id !== selectedApplication._id
        )
      );

      setSelectedApplication(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete this application."
      );
    } finally {
      setDeleting(false);
    }
  };

  const uniqueJobCount = new Set(
    applications.map((application) =>
      typeof application.jobId === "object"
        ? application.jobId?._id
        : application.jobId
    ).filter(Boolean)
  ).size;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading and actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Job Applications
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage candidates who have applied for your job openings.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/admin/add-job-application")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Add Application
          </button>

          <button
            type="button"
            onClick={fetchApplications}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Applications
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {applications.length}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Applied Job Positions
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {uniqueJobCount}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50">
              <BriefcaseBusiness
                size={24}
                className="text-purple-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name, email, phone or job title..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Applications */}
      {loading ? (
        <div className="py-16 text-center text-gray-500">
          Loading job applications...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
          <Users
            size={42}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            {search
              ? "No matching applications"
              : "No applications yet"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {search
              ? "Try searching with a different name, email, or job title."
              : "Candidate applications will appear here when someone applies."}
          </p>

          {!search && (
            <button
              type="button"
              onClick={() => navigate("/admin/add-job-application")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Application
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredApplications.length} of{" "}
              {applications.length} applications
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredApplications.map((application) => (
              <JobApplicationCard
                key={application._id}
                application={application}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={setSelectedApplication}
              />
            ))}
          </div>
        </>
      )}

      {/* Delete confirmation modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Delete Application
              </h2>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                disabled={deleting}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Are you sure you want to delete the application submitted
              by{" "}
              <strong>{selectedApplication.fullName}</strong>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                <Trash2 size={16} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
