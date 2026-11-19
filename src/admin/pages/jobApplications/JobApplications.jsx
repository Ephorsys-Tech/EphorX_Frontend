
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
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
import RefreshButton from "../../../common/components/RefreshButton";
import Button from "../../../common/components/Button";

export default function JobApplications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApplications = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
      setError("");

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
    applications
      .map((application) =>
        typeof application.jobId === "object"
          ? application.jobId?._id
          : application.jobId
      )
      .filter(Boolean)
  ).size;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">

        {/* Page Heading - Fixed */}
        <div className="mb-5 flex shrink-0 flex-col justify-between gap-4 pt-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Job Applications
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage candidates who have applied for your job openings.
            </p>
          </div>

          <Button
            text="Add Application"
            icon={Plus}
            onClick={() => navigate("/admin/add-job-application")}
          />
        </div>

        {/* Summary Cards - Fixed */}
        <div className="mb-5 grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
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

        {/* Search and Refresh - Fixed */}
        <div className="mb-5 shrink-0 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by candidate name, email, phone or job title..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Refresh and Total Count */}
            <div className="flex items-center justify-end gap-4">
              <RefreshButton
                onClick={fetchApplications}
                loading={loading}
              />

              <div className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-indigo-50 px-5 py-3">
                <span className="text-sm font-medium text-gray-600">
                  Total Applications:
                </span>

                <span className="text-lg font-bold text-indigo-700">
                  {applications.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message - Fixed */}
        {error && (
          <div className="mb-4 flex shrink-0 items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Scrollable Applications Area */}
        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-5">

          {/* Loading State */}
          {loading ? (
            <div className="flex min-h-75 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500">
              Loading job applications...
            </div>
          ) : filteredApplications.length === 0 ? (

            /* Empty State */
            <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
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
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Add Application
                </button>
              )}
            </div>

          ) : (

            /* Applications Grid */
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
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Delete Application
              </h2>

              <button
                type="button"
                onClick={() => !deleting && setSelectedApplication(null)}
                disabled={deleting}
                className="text-gray-400 transition hover:text-gray-700 disabled:opacity-50"
                aria-label="Close modal"
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

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
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
