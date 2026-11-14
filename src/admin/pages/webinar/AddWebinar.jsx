import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Video,
  ImagePlus,
  UserRound,
  CalendarDays,
  Clock,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react";

import { createWebinar } from "../../api/webinarApi";

const initialForm = {
  title: "",
  description: "",
  category: "",
  type: "live",
  date: "",
  startTime: "",
  timezone: "Asia/Kolkata",
  duration: "60",
  availability: "scheduled",
  status: "draft",
  instructorName: "",
  instructorDesignation: "",
};

const AddWebinar = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Clean up temporary image preview URLs.
  useEffect(() => {
    return () => {
      if (thumbnailPreview.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }

      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [thumbnailPreview, avatarPreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleImageChange = (event, imageType) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (imageType === "thumbnail") {
      setThumbnailFile(file);
      setThumbnailPreview(previewUrl);
    } else {
      setAvatarFile(file);
      setAvatarPreview(previewUrl);
    }

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.title.trim().length < 3) {
      setError("Title must contain at least 3 characters.");
      return;
    }

    if (form.description.trim().length < 10) {
      setError("Description must contain at least 10 characters.");
      return;
    }

    if (!form.category.trim()) {
      setError("Please enter a webinar category.");
      return;
    }

    if (!form.instructorName.trim()) {
      setError("Please enter the instructor name.");
      return;
    }

    if (!form.instructorDesignation.trim()) {
      setError("Please enter the instructor designation.");
      return;
    }

    const duration = Number(form.duration);

    if (!Number.isInteger(duration) || duration < 1 || duration > 1440) {
      setError("Duration must be between 1 and 1440 minutes.");
      return;
    }

    if (
      form.type === "live" &&
      form.availability === "scheduled" &&
      (!form.date || !form.startTime)
    ) {
      setError(
        "Please select a date and start time for a scheduled live webinar."
      );
      return;
    }

    try {
      setSaving(true);

      const webinarData = new FormData();

      webinarData.append("title", form.title.trim());
      webinarData.append("description", form.description.trim());
      webinarData.append("category", form.category.trim());
      webinarData.append("type", form.type);
      webinarData.append("duration", String(duration));
      webinarData.append("timezone", form.timezone);
      webinarData.append("availability", form.availability);
      webinarData.append("status", form.status);

      // Send empty values when the webinar is not scheduled.
      webinarData.append("date", form.date || "");
      webinarData.append("startTime", form.startTime || "");

      // The backend validator expects instructor as a JSON object.
      webinarData.append(
        "instructor",
        JSON.stringify({
          name: form.instructorName.trim(),
          designation: form.instructorDesignation.trim(),
        })
      );

      if (thumbnailFile) {
        webinarData.append("thumbnail", thumbnailFile);
      }

      if (avatarFile) {
        webinarData.append("instructorAvatar", avatarFile);
      }

      await createWebinar(webinarData);

      navigate("/admin/webinars", {
        state: { message: "Webinar created successfully." },
      });
    } catch (err) {
      setError(err.message || "Failed to create webinar.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="mb-7">
        <button
          type="button"
          onClick={() => navigate("/admin/webinars")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Webinars
        </button>

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Add Webinar
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a new webinar and configure its details.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-start gap-2">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Webinar information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Video size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Webinar Information
              </h2>
              <p className="text-xs text-gray-500">
                Basic details about your webinar
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="title">
                Webinar Title <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter webinar title"
                className={inputClass}
                minLength={3}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="category">
                Category <span className="text-red-500">*</span>
              </label>

              <input
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Technology, Business"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="type">
                Webinar Type <span className="text-red-500">*</span>
              </label>

              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="live">Live</option>
                {/* <option value="pre-recorded">Pre-recorded</option> */}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass} htmlFor="description">
                Description <span className="text-red-500">*</span>
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe what attendees will learn..."
                rows={5}
                className={`${inputClass} resize-y`}
                minLength={10}
                required
              />
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ImagePlus size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Webinar Images
              </h2>
              <p className="text-xs text-gray-500">
                Upload a thumbnail and instructor avatar (optional)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Thumbnail */}
            <div>
              <label className={labelClass} htmlFor="thumbnail">
                Webinar Thumbnail
              </label>

              <div className="mt-2 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Webinar thumbnail preview"
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-48 flex-col items-center justify-center gap-2 text-gray-400">
                    <ImagePlus size={30} />
                    <span className="text-sm">
                      No thumbnail selected
                    </span>
                  </div>
                )}

                <div className="p-3">
                  <input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageChange(event, "thumbnail")
                    }
                    className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-xs text-gray-400">
                    Maximum file size: 5 MB
                  </p>
                </div>
              </div>
            </div>

            {/* Instructor avatar */}
            <div>
              <label className={labelClass} htmlFor="instructorAvatar">
                Instructor Avatar
              </label>

              <div className="mt-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5">
                <div className="flex min-h-40 flex-col items-center justify-center gap-3">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Instructor avatar preview"
                      className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <UserRound size={42} />
                    </div>
                  )}

                  <input
                    id="instructorAvatar"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageChange(event, "avatar")
                    }
                    className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-purple-700 hover:file:bg-purple-100"
                  />

                  <p className="text-xs text-gray-400">
                    Maximum file size: 5 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule and settings */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <CalendarDays size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Schedule & Settings
              </h2>
              <p className="text-xs text-gray-500">
                Configure the schedule, duration, and status
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="availability">
                Availability
              </label>

              <select
                id="availability"
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="scheduled">Scheduled</option>
                <option value="anytime">Anytime</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="status">
                Publication Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="date">
                Webinar Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="startTime">
                Start Time
              </label>

              <div className="relative">
                <Clock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={form.startTime}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="timezone">
                Timezone
              </label>

              <select
                id="timezone"
                name="timezone"
                value={form.timezone}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
                <option value="Asia/Singapore">Asia/Singapore</option>
                <option value="Australia/Sydney">Australia/Sydney</option>
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="duration">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>

              <input
                id="duration"
                name="duration"
                type="number"
                min="1"
                max="1440"
                step="1"
                value={form.duration}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* Instructor details */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <UserRound size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Instructor Details
              </h2>
              <p className="text-xs text-gray-500">
                Information about the webinar presenter
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="instructorName">
                Instructor Name <span className="text-red-500">*</span>
              </label>

              <input
                id="instructorName"
                name="instructorName"
                value={form.instructorName}
                onChange={handleChange}
                placeholder="Enter instructor name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                className={labelClass}
                htmlFor="instructorDesignation"
              >
                Designation <span className="text-red-500">*</span>
              </label>

              <input
                id="instructorDesignation"
                name="instructorDesignation"
                value={form.instructorDesignation}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/webinars")}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            <X size={17} />
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <RefreshCw size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {saving ? "Creating Webinar..." : "Create Webinar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddWebinar;
