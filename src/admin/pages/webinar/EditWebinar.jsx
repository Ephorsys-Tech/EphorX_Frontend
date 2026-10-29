import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Save,
    Video,
    ImagePlus,
    UserRound,
    FileText,
    CalendarDays,
    Clock,
    RefreshCw,
    AlertCircle,
    X,
} from "lucide-react";

import {
    getWebinarById,
    updateWebinar,
} from "../../api/webinarApi";

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
    attendeeCount: "0",
};

const EditWebinar = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(initialForm);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchWebinar = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            if (!id) {
                throw new Error("Webinar ID is missing.");
            }

            const data = await getWebinarById(id);

            if (!data) {
                throw new Error("Webinar not found.");
            }

            setForm({
                title: data.title || "",
                description: data.description || "",
                category: data.category || "",
                type: data.type || "live",
                date: data.date ? String(data.date).slice(0, 10) : "",
                startTime: data.startTime || "",
                timezone: data.timezone || "Asia/Kolkata",
                duration: String(data.duration ?? 60),
                availability: data.availability || "scheduled",
                status: data.status || "draft",
                instructorName: data.instructor?.name || "",
                instructorDesignation: data.instructor?.designation || "",
                attendeeCount: String(data.attendeeCount ?? 0),
            });

            setThumbnailPreview(data.thumbnail || "");
            setAvatarPreview(data.instructor?.avatar || "");
        } catch (err) {
            setError(err.message || "Failed to load webinar.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchWebinar();
    }, [fetchWebinar]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid thumbnail image.");
            event.target.value = "";
            return;
        }

        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
        setError("");
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid instructor avatar image.");
            event.target.value = "";
            return;
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!form.title.trim()) {
            setError("Please enter the webinar title.");
            return;
        }

        if (!form.description.trim()) {
            setError("Please enter the webinar description.");
            return;
        }

        if (!form.category.trim()) {
            setError("Please enter the webinar category.");
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

        if (!Number.isFinite(Number(form.duration)) || Number(form.duration) < 1) {
            setError("Duration must be at least 1 minute.");
            return;
        }

        if (
            form.attendeeCount === "" ||
            !Number.isInteger(Number(form.attendeeCount)) ||
            Number(form.attendeeCount) < 0
        ) {
            setError("Attendee count must be a non-negative whole number.");
            return;
        }

        if (
            form.type === "live" &&
            form.availability === "scheduled" &&
            (!form.date || !form.startTime)
        ) {
            setError("Please select a date and start time for the scheduled live webinar.");
            return;
        }

        try {
            setSaving(true);

            const webinarData = new FormData();

            webinarData.append("title", form.title.trim());
            webinarData.append("description", form.description.trim());
            webinarData.append("category", form.category.trim());
            webinarData.append("type", form.type);
            webinarData.append("date", form.date || "");
            webinarData.append("startTime", form.startTime || "");
            webinarData.append("timezone", form.timezone);
            webinarData.append("duration", String(Number(form.duration)));
            webinarData.append("availability", form.availability);
            webinarData.append("status", form.status);

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
                webinarData.append("avatar", avatarFile);
            }

            await updateWebinar(id, webinarData);

            setSuccess("Webinar updated successfully.");

            navigate("/admin/webinars", {
                state: { message: "Webinar updated successfully." },
            });
        } catch (err) {
            setError(err.message || "Failed to update webinar.");
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    const labelClass = "text-sm font-medium text-gray-700";

    if (loading) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-gray-50">
                <RefreshCw size={30} className="animate-spin text-blue-600" />
                <p className="text-sm text-gray-500">Loading webinar details...</p>
            </div>
        );
    }

    if (error && !form.title && !form.description) {
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

                <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                    <AlertCircle size={36} className="mx-auto text-red-500" />
                    <h2 className="mt-4 text-xl font-bold text-gray-900">
                        Unable to load webinar
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">{error}</p>

                    <button
                        type="button"
                        onClick={fetchWebinar}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                        Edit Webinar
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Update webinar information and instructor details.
                    </p>
                </div>
            </div>

            {/* Alerts */}
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

            {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Webinar details */}
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <Video size={21} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">Webinar Information</h2>
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
                                <option value="pre-recorded">Pre-recorded</option>
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
                            <h2 className="font-semibold text-gray-900">Images</h2>
                            <p className="text-xs text-gray-500">
                                Replace the thumbnail or instructor avatar if needed
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                        <span className="text-sm">No thumbnail uploaded</span>
                                    </div>
                                )}

                                <div className="p-3">
                                    <input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="avatar">
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
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="block w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-purple-700 hover:file:bg-purple-100"
                                    />
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
                            <h2 className="font-semibold text-gray-900">Schedule & Settings</h2>
                            <p className="text-xs text-gray-500">
                                Set the duration, date, and publication settings
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
                                value={form.duration}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass} htmlFor="attendeeCount">
                                Attendee Count
                            </label>
                            <input
                                id="attendeeCount"
                                name="attendeeCount"
                                type="number"
                                min="0"
                                step="1"
                                value={form.attendeeCount}
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </div>
                    </div>
                </section>

                {/* Instructor */}
                <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <UserRound size={21} />
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-900">Instructor Details</h2>
                            <p className="text-xs text-gray-500">
                                Update the presenter information
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
                            <label className={labelClass} htmlFor="instructorDesignation">
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

                {/* Form actions */}
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
                        {saving ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditWebinar;
