
import { useState } from "react";
import { X, Plus, LoaderCircle } from "lucide-react";
import { createCourseEnrollment } from "../../api/courseEnrollApi.js";

const AddCourseEnrollment = ({
    courseId = "",
    onClose,
    onCreated,
}) => {
    const [formData, setFormData] = useState({
        courseId,
        fullName: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        profession: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#4935F5] focus:ring-2 focus:ring-[#4935F5]/10";

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await createCourseEnrollment({
                ...formData,
                email: formData.email.trim().toLowerCase(),
            });

            if (response?.alreadyEnrolled) {
                setError(
                    response.message || "This participant is already enrolled in this course."
                );
                return;
            }

            setSuccess("Course participant added successfully.");

            await onCreated?.();
            onClose?.();

        } catch (err) {
            console.error("Add course enrollment failed:", err);

            setError(
                err.response?.data?.message ||
                "Unable to add course participant. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget && !loading) {
                    onClose?.();
                }
            }}
        >
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold text-[#111A30]">
                            Add Course Participant
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Enter the participant's enrollment details.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 p-6">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Course ID
                        </label>
                        <input
                            type="text"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            placeholder="Enter course ID"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            WhatsApp Number
                        </label>
                        <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            placeholder="Enter WhatsApp number"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Profession
                        </label>
                        <input
                            type="text"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            placeholder="Enter profession"
                            className={inputClass}
                            required
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {success}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl bg-[#4935F5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3826DB] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <LoaderCircle size={18} className="animate-spin" />
                                    Adding...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />
                                    Add Participant
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCourseEnrollment;
