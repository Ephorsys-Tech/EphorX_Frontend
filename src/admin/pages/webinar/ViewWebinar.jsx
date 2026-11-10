import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Video,
  CalendarDays,
  Clock,
  UserRound,
  Users,
  Tag,
  Globe,
  FileText,
  RefreshCw,
  AlertCircle,
  Radio,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { getWebinarById } from "../../api/webinarApi.js";

const ViewWebinar = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [webinar, setWebinar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWebinar = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      if (!id) {
        throw new Error("Webinar ID is missing.");
      }

      const data = await getWebinarById(id);

      if (!data) {
        throw new Error("Webinar details were not found.");
      }

      setWebinar(data);
    } catch (err) {
      setError(err.message || "Failed to fetch webinar details.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchWebinar();
  }, [fetchWebinar]);

  const formatLabel = (value) => {
    if (!value) return "Not specified";

    return value
      .split("-")
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const formatDate = (date) => {
    if (!date) return "Not scheduled";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not scheduled";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "Not specified";

    if (duration < 60) {
      return `${duration} minutes`;
    }

    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return minutes
      ? `${hours} hours ${minutes} minutes`
      : `${hours} ${hours === 1 ? "hour" : "hours"}`;
  };

  const formatCreatedDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-gray-800">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-gray-50">
        <RefreshCw size={30} className="animate-spin text-blue-600" />
        <p className="text-sm text-gray-500">
          Loading webinar details...
        </p>
      </div>
    );
  }

  if (error || !webinar) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <button
          type="button"
          onClick={() => navigate("/admin/webinars")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Webinars
        </button>

        <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <AlertCircle size={28} className="text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Unable to load webinar
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            {error || "The requested webinar could not be found."}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={fetchWebinar}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw size={16} />
              Try Again
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/webinars")}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Back to Webinars
            </button>
          </div>
        </div>
      </div>
    );
  }

  const instructor = webinar.instructor || {};

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/admin/webinars")}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Webinars
          </button>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Webinar Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View the complete information for this webinar.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/admin/edit-webinar/${webinar._id}`)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Pencil size={17} />
          Edit Webinar
        </button>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-3">
        {/* Main webinar information */}
        <div className="space-y-6 xl:col-span-2">
          {/* Thumbnail and title */}
          <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="relative h-56 bg-linear-to-br from-blue-100 to-indigo-100 sm:h-80">
              {webinar.thumbnail ? (
                <img
                  src={webinar.thumbnail}
                  alt={webinar.title || "Webinar thumbnail"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Video size={64} className="text-blue-400" />
                </div>
              )}

              <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                    webinar.status
                  )}`}
                >
                  {formatLabel(webinar.status)}
                </span>

                <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                  {formatLabel(webinar.type)}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  <Tag size={13} />
                  {webinar.category || "Uncategorized"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getAvailabilityStyle(
                    webinar.availability
                  )}`}
                >
                  {formatLabel(webinar.availability)}
                </span>
              </div>

              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                {webinar.title || "Untitled Webinar"}
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <DetailItem
                  icon={CalendarDays}
                  label="Webinar Date"
                  value={formatDate(webinar.date)}
                />

                <DetailItem
                  icon={Clock}
                  label="Start Time"
                  value={webinar.startTime || "Not set"}
                />

                <DetailItem
                  icon={Video}
                  label="Duration"
                  value={formatDuration(webinar.duration)}
                />

                <DetailItem
                  icon={Globe}
                  label="Timezone"
                  value={webinar.timezone || "Asia/Kolkata"}
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  About This Webinar
                </h3>
                <p className="text-xs text-gray-500">
                  Webinar description and overview
                </p>
              </div>
            </div>

            <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
              {webinar.description || "No description provided."}
            </p>
          </section>

          {/* Instructor details */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <UserRound size={20} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Instructor Information
                </h3>
                <p className="text-xs text-gray-500">
                  Webinar presenter details
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {instructor.avatar ? (
                <img
                  src={instructor.avatar}
                  alt={instructor.name || "Instructor"}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-purple-50 text-2xl font-bold text-purple-600">
                  {instructor.name?.charAt(0)?.toUpperCase() || "I"}
                </div>
              )}

              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {instructor.name || "Instructor not specified"}
                </h4>

                <p className="mt-1 text-sm text-gray-500">
                  {instructor.designation || "Designation not specified"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Status summary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-5 font-semibold text-gray-900">
              Webinar Summary
            </h3>

            <div className="space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="text-sm text-gray-600">
                    Publication Status
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                    webinar.status
                  )}`}
                >
                  {formatLabel(webinar.status)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <CalendarDays size={18} />
                  </div>
                  <span className="text-sm text-gray-600">
                    Availability
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityStyle(
                    webinar.availability
                  )}`}
                >
                  {formatLabel(webinar.availability)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <Radio size={18} />
                  </div>
                  <span className="text-sm text-gray-600">
                    Webinar Type
                  </span>
                </div>

                <span className="text-sm font-medium text-gray-800">
                  {formatLabel(webinar.type)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                    <Users size={18} />
                  </div>
                  <span className="text-sm text-gray-600">
                    Attendees
                  </span>
                </div>

                <span className="text-sm font-semibold text-gray-900">
                  {webinar.attendeeCount ?? 0}
                </span>
              </div>
            </div>
          </section>

          {/* Record information */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">
              Record Information
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Webinar ID
                </p>
                <p className="mt-1 break-all text-xs text-gray-600">
                  {webinar._id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Created On
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {formatCreatedDate(webinar.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Last Updated
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  {formatCreatedDate(webinar.updatedAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold text-gray-900">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate(`/admin/edit-webinar/${webinar._id}`)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Pencil size={16} />
                Edit Webinar
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/webinars")}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={16} />
                Back to Webinars
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ViewWebinar;
