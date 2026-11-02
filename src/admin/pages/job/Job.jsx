import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Search,
  RefreshCw,
  BriefcaseBusiness,
  X,
  AlertCircle,
  Trash2,
} from "lucide-react";

import {
  getAllJobs,
  deleteJob,
} from "../../api/jobApi.js";

import JobCard from "../../components/JobCard.jsx";

export default function Job() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [deletingJob, setDeletingJob] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Normalize the API response
  const normalizeJobs = (response) => {
    if (Array.isArray(response)) {
      return response;
    }

    if (Array.isArray(response?.jobs)) {
      return response.jobs;
    }

    if (Array.isArray(response?.data?.jobs)) {
      return response.data.jobs;
    }

    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.results)) {
      return response.results;
    }

    return [];
  };

  // Fetch all jobs
  const fetchJobs = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await getAllJobs();
      const jobsData = normalizeJobs(response);

      setJobs(jobsData);
    } catch (err) {
      console.error("Error fetching jobs:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load jobs. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Search jobs
  const filteredJobs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) {
      return jobs;
    }

    return jobs.filter((job) => {
      return (
        job?.title?.toLowerCase().includes(search) ||
        job?.employmentType?.toLowerCase().includes(search) ||
        job?.experience?.toLowerCase().includes(search) ||
        job?.location?.toLowerCase().includes(search) ||
        job?.jobDescription?.toLowerCase().includes(search)
      );
    });
  }, [jobs, searchTerm]);

  // Navigate to View Job page
  const handleView = (job) => {
    navigate(`/admin/view-job/${job._id}`);
  };

  // Navigate to Edit Job page
  const handleEdit = (job) => {
    navigate(`/admin/edit-job/${job._id}`);
  };

  // Delete job
  const handleDelete = async () => {
    if (!deletingJob?._id) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deleteJob(deletingJob._id);

      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== deletingJob._id)
      );

      setDeletingJob(null);
    } catch (err) {
      console.error("Error deleting job:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to delete job. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Jobs Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage, view, edit and delete job openings.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/add-job")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add New Job
          </button>
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
              className="text-red-500 transition hover:text-red-700"
              aria-label="Close error message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Search and Refresh Section */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Search */}
            <div className="relative w-full sm:max-w-md">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs..."
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={() => fetchJobs(true)}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={refreshing ? "animate-spin" : ""}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {/* Job Count */}
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredJobs.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {jobs.length}
              </span>{" "}
              jobs
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white">
            <RefreshCw
              size={32}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading jobs...
            </p>
          </div>
        ) : filteredJobs.length === 0 ? (

          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-4 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <BriefcaseBusiness
                size={30}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-gray-900">
              {searchTerm ? "No matching jobs found" : "No jobs available"}
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              {searchTerm
                ? "Try changing your search keyword."
                : "You haven't added any jobs yet. Start by creating your first job opening."}
            </p>

            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Clear Search
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/admin/add-job")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Plus size={17} />
                Add New Job
              </button>
            )}
          </div>

        ) : (

          /* Jobs Grid - Reusable JobCard */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={setDeletingJob}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <Trash2
                  size={22}
                  className="text-red-600"
                />
              </div>

              <button
                type="button"
                onClick={() => !deleting && setDeletingJob(null)}
                disabled={deleting}
                className="text-gray-400 transition hover:text-gray-600 disabled:opacity-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Delete Job?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deletingJob.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setDeletingJob(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete Job
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}