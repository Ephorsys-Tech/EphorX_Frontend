import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import {
    getDemoBookingById,
    updateDemoBooking,
} from "../../api/demoBookingApi";

const EditDemoSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        qualification: "",
        courseId: "",
        courseName: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDemoBooking = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getDemoBookingById(id);

                const booking =
                    response.demoBooking ||
                    response.booking ||
                    response.data?.demoBooking ||
                    response.data?.booking ||
                    response.data;

                if (!booking || !booking._id) {
                    throw new Error("Demo session not found.");
                }

                setFormData({
                    fullName: booking.fullName || "",
                    email: booking.email || "",
                    phoneNumber: booking.phoneNumber || "",
                    whatsappNumber: booking.whatsappNumber || "",
                    qualification: booking.qualification || "",
                    courseId: booking.courseId || "",
                    courseName: booking.courseName || "",
                });
            } catch (err) {
                console.error("Fetch demo session error:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load demo session."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDemoBooking();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setSaving(true);

    console.log("Sending Update Data:", formData);

    await updateDemoBooking(id, formData);

    alert("Demo session updated successfully!");
    navigate("/admin/book-demo");
  } catch (err) {
    console.error("Update demo session error:", err);

    setError(
      err.response?.data?.message ||
        "Failed to update demo session."
    );
  } finally {
    setSaving(false);
  }
};

    const inputClass =
        "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading demo session...
            </div>
        );
    }

    return (
        <div className="px-4 md:px-6">
            <div>
                <button
                    onClick={() => navigate("/admin/book-demo")}
                    className="mb-7 flex items-center gap-3 text-[17px] font-medium text-slate-600 transition hover:text-blue-600"
                >
                    <ArrowLeft size={22} />
                    Back to Demo Sessions
                </button>

                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Edit Demo Session
                    </h1>
                    <p className="text-sm text-gray-500">
                        Update the demo session booking details.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="max-w-4xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
            >
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            WhatsApp Number *
                        </label>
                        <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Qualification *
                        </label>
                        <input
                            type="text"
                            name="qualification"
                            value={formData.qualification}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Course ID *
                        </label>
                        <input
                            type="text"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Course Name *
                        </label>
                        <input
                            type="text"
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                    </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/book-demo")}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <Save size={18} />
                        {saving ? "Updating..." : "Update Demo Session"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditDemoSession;