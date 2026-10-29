import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Video,
  Radio,
  FileText,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  CalendarDays,
  Clock,
  Users,
  X,
} from "lucide-react";

import {
  getAllWebinars,
  deleteWebinar,
} from "../../api/webinarApi"

const Webinar = () => {
  const navigate = useNavigate();

  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const [openActionId, setOpenActionId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchWebinars = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllWebinars();
      setWebinars(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch webinars.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const filteredWebinars = useMemo(() => {
    return webinars.filter((webinar) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        webinar.title?.toLowerCase().includes(search) ||
        webinar.category?.toLowerCase().includes(search) ||
        webinar.instructor?.name?.toLowerCase().includes(search) ||
        webinar.description?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" || webinar.status === statusFilter;

      const matchesType =
        typeFilter === "all" || webinar.type === typeFilter;

      const matchesAvailability =
        availabilityFilter === "all" ||
        webinar.availability === availabilityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesAvailability
      );
    });
  }, [
    webinars,
    searchTerm,
    statusFilter,
    typeFilter,
    availabilityFilter,
  ]);

  const stats = useMemo(
    () => [
      {
        label: "Total Webinars",
        value: webinars.length,
        icon: Video,
        color: "bg-blue-50 text-blue-600",
      },
      {
        label: "Published",
        value: webinars.filter((item) => item.status === "published").length,
        icon: Radio,
        color: "bg-green-50 text-green-600",
      },
      {
        label: "Drafts",
        value: webinars.filter((item) => item.status === "draft").length,
        icon: FileText,
        color: "bg-amber-50 text-amber-600",
      },
      {
        label: "Live Webinars",
        value: webinars.filter((item) => item.type === "live").length,
        icon: Users,
        color: "bg-purple-50 text-purple-600",
      },
    ],
    [webinars]
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleting(true);
      setError("");

      await deleteWebinar(deleteTarget._id);

      setWebinars((previous) =>
        previous.filter((item) => item._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || "Failed to delete webinar.");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not scheduled";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not scheduled";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "—";

    if (duration < 60) return `${duration} min`;

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
  };

  const formatLabel = (value) => {
    if (!value) return "—";

    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusStyle = (status) => {
    const styles = {
      published: "bg-green-100 text-green-700",
      draft: "bg-amber-100 text-amber-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return styles[status] || "bg-gray-100 text-gray-700";
  };

  const getAvailabilityStyle = (availability) => {
    const styles = {
      scheduled: "bg-blue-100 text-blue-700",
      anytime: "bg-purple-100 text-purple-700",
      completed: "bg-gray-100 text-gray-700",
    };

    return styles[availability] || "bg-gray-100 text-gray-700";
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setAvailabilityFilter("all");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "all" ||
    typeFilter !== "all" ||
    availabilityFilter !== "all";

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Webinars
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create, manage, and organize your webinars.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={fetchWebinars}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/add-webinar")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Webinar
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 rounded p-1 hover:bg-red-100"
            aria-label="Dismiss error"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Summary cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and filters */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, category, or instructor..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(event) => setTypeFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Types</option>
              <option value="live">Live</option>
              <option value="pre-recorded">Pre-recorded</option>
            </select>

            <select
              value={availabilityFilter}
              onChange={(event) => setAvailabilityFilter(event.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="all">All Availability</option>
              <option value="scheduled">Scheduled</option>
              <option value="anytime">Anytime</option>
              <option value="completed">Completed</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Webinar table */}
      <div className="overflow-visible rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold text-gray-900">
            All Webinars
          </h2>

          <p className="text-sm text-gray-500">
            Showing {filteredWebinars.length} of {webinars.length} webinars
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3">
            <RefreshCw
              size={28}
              className="animate-spin text-blue-600"
            />
            <p className="text-sm text-gray-500">
              Loading webinars...
            </p>
          </div>
        ) : filteredWebinars.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Video size={26} className="text-gray-400" />
            </div>

            <h3 className="text-base font-semibold text-gray-800">
              {webinars.length === 0
                ? "No webinars found"
                : "No matching webinars"}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-gray-500">
              {webinars.length === 0
                ? "Add your first webinar to get started."
                : "Try changing your search or filters."}
            </p>

            {webinars.length === 0 ? (
              <button
                type="button"
                onClick={() => navigate("/admin/add-webinar")}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Webinar
              </button>
            ) : (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-262.5 border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Webinar
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Instructor
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Schedule
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Type
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Availability
                  </th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredWebinars.map((webinar) => (
                  <tr
                    key={webinar._id}
                    className="transition hover:bg-gray-50/70"
                  >
                    {/* Webinar details */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {webinar.thumbnail ? (
                          <img
                            src={webinar.thumbnail}
                            alt={webinar.title || "Webinar thumbnail"}
                            className="h-14 w-20 shrink-0 rounded-lg border border-gray-100 object-cover"
                          />
                        ) : (
                          <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                            <Video
                              size={22}
                              className="text-blue-500"
                            />
                          </div>
                        )}

                        <div className="min-w-0 max-w-xs">
                          <p className="truncate text-sm font-semibold text-gray-900">
                            {webinar.title || "Untitled Webinar"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {webinar.category || "Uncategorized"}
                          </p>
                          <p className="mt-1 line-clamp-1 text-xs text-gray-400">
                            {webinar.description || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {webinar.instructor?.avatar ? (
                          <img
                            src={webinar.instructor.avatar}
                            alt={webinar.instructor.name || "Instructor"}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                            {webinar.instructor?.name
                              ?.charAt(0)
                              ?.toUpperCase() || "I"}
                          </div>
                        )}

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {webinar.instructor?.name || "—"}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {webinar.instructor?.designation || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Schedule */}
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <CalendarDays
                            size={15}
                            className="shrink-0 text-gray-400"
                          />
                          {formatDate(webinar.date)}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock
                            size={14}
                            className="shrink-0 text-gray-400"
                          />
                          {webinar.startTime || "Time not set"}
                        </div>

                        <p className="pl-5 text-xs text-gray-400">
                          {formatDuration(webinar.duration)}
                        </p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          webinar.type === "live"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {formatLabel(webinar.type)}
                      </span>
                    </td>

                    {/* Availability */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getAvailabilityStyle(
                          webinar.availability
                        )}`}
                      >
                        {formatLabel(webinar.availability)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          webinar.status
                        )}`}
                      >
                        {formatLabel(webinar.status)}
                      </span>
                    </td>

                    {/* Three-dot action menu */}
                    <td className="px-5 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenActionId(
                              openActionId === webinar._id
                                ? null
                                : webinar._id
                            )
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          aria-label={`Actions for ${webinar.title}`}
                          aria-expanded={openActionId === webinar._id}
                        >
                          <MoreVertical size={20} />
                        </button>

                        {openActionId === webinar._id && (
                          <>
                            <button
                              type="button"
                              aria-label="Close actions menu"
                              className="fixed inset-0 z-10 cursor-default"
                              onClick={() => setOpenActionId(null)}
                            />

                            <div className="absolute right-0 z-20 mt-1 w-25 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenActionId(null);
                                  navigate(
                                    `/admin/view-webinar/${webinar._id}`
                                  );
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                              >
                                <Eye size={16} />
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenActionId(null);
                                  navigate(
                                    `/admin/edit-webinar/${webinar._id}`
                                  );
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
                              >
                                <Pencil size={16} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenActionId(null);
                                  setDeleteTarget(webinar);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !deleting
            ) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-webinar-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={23} className="text-red-600" />
            </div>

            <h2
              id="delete-webinar-title"
              className="text-lg font-bold text-gray-900"
            >
              Delete webinar?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteTarget.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <RefreshCw size={15} className="animate-spin" />
                )}
                {deleting ? "Deleting..." : "Delete Webinar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinar;
