
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import {
    getDemoBookingById,
    updateDemoBooking,
} from "../../api/demoBookingApi";
import Button from "../../../common/components/Button";

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
            <div className="w-full p-6 text-center text-gray-500">
                Loading demo session...
            </div>
        );
    }

    return (
       
<div className="min-h-screen w-full bg-slate-50 px-4 py-3 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-none">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <button
                    type="button"
                    onClick={() => navigate("/admin/book-demo")}
                    className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                >
                    <ArrowLeft size={17} />
                    Back to Demo Sessions
                </button>

                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    Edit Demo Request
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Edit complete demo booking details.
                </p>
            </div>
        </div>
    

            {/* Full Width Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-none rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7 lg:p-9"
            >
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">

                    {/* Full Name */}
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

                    {/* Email */}
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

                    {/* Phone Number */}
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

                    {/* WhatsApp Number */}
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

                    {/* Qualification */}
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

                    {/* Course ID */}
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

                    {/* Course Name */}
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

                {/* Action Buttons */}
                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={() => navigate("/admin/book-demo")}
                        className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <Button
                        text={saving ? "Updating..." : "Update Demo Session"}
                        type="submit"
                        disabled={saving}
                        icon={Save}
                    />
                </div>
            </form>
        </div>
        </div>

    );
};

export default EditDemoSession;
