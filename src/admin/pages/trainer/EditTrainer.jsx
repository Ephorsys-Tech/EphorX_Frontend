import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Upload, UserRound, LoaderCircle } from "lucide-react";

import {
    getTrainerById,
    updateTrainer,
} from "../../api/trainerApi";

const initialForm = {
    name: "",
    designation: "",
    category: "",
    specialization: "",
    description: "",
    experienceYears: "",
    detailsUrl: "",
};

const EditTrainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialForm);
    const [avatar, setAvatar] = useState(null);
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Load the existing trainer
    useEffect(() => {
        const fetchTrainer = async () => {
            try {
                setLoading(true);
                setError("");

                const trainer = await getTrainerById(id);

                if (!trainer) {
                    throw new Error("Trainer not found.");
                }

                setFormData({
                    name: trainer.name || "",
                    designation: trainer.designation || "",
                    category: trainer.category || "",
                    specialization: trainer.specialization || "",
                    description: trainer.description || "",
                    experienceYears: trainer.experienceYears ?? "",
                    detailsUrl: trainer.detailsUrl || "",
                });

                setCurrentAvatar(trainer.avatar || "");
            } catch (err) {
                setError(err.message || "Failed to load trainer.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTrainer();
        } else {
            setError("Trainer ID is missing.");
            setLoading(false);
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            event.target.value = "";
            return;
        }

        setError("");
        setAvatar(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (
            !formData.name.trim() ||
            !formData.designation.trim() ||
            !formData.category.trim() ||
            !formData.specialization.trim() ||
            !formData.description.trim() ||
            formData.experienceYears === ""
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        const experienceYears = Number(formData.experienceYears);

        if (!Number.isFinite(experienceYears) || experienceYears < 0) {
            setError("Experience must be a valid number greater than or equal to 0.");
            return;
        }

        try {
            setSaving(true);

            const trainerData = new FormData();

            trainerData.append("name", formData.name.trim());
            trainerData.append("designation", formData.designation.trim());
            trainerData.append("category", formData.category.trim());
            trainerData.append(
                "specialization",
                formData.specialization.trim()
            );
            trainerData.append("description", formData.description.trim());
            trainerData.append("experienceYears", String(experienceYears));
            trainerData.append("detailsUrl", formData.detailsUrl.trim());

            // Only send an avatar when the user selects a replacement.
            if (avatar) {
                trainerData.append("avatar", avatar);
            }

            console.log("detailsUrl:", formData.detailsUrl);

            for (const [key, value] of trainerData.entries()) {
                console.log(key, value);
            }

            await updateTrainer(id, trainerData);

            setSuccess("Trainer updated successfully.");

            navigate("/admin/trainers", {
                state: { message: "Trainer updated successfully." },
            });
        } catch (err) {
            setError(err.message || "Failed to update trainer.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-indigo-600" />
                <span className="text-sm text-gray-600">Loading trainer...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-1 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/trainers")}
                            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
                        >
                            <ArrowLeft size={17} />
                            Back to Trainers
                        </button>

                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Edit Trainer
                        </h1>
                        <p className="mt-2 text-sm text-gray-500">
                            Update the trainer's information and profile image.
                        </p>
                    </div>
                </div>

                {/* Feedback */}
                {error && (
                    <div
                        role="alert"
                        className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        role="status"
                        className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    >
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Profile Image
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Keep the current image or upload a replacement.
                        </p>

                        <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                                {avatar ? (
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="Selected trainer"
                                        className="h-full w-full object-cover"
                                    />
                                ) : currentAvatar ? (
                                    <img
                                        src={currentAvatar}
                                        alt="Current trainer"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound className="h-10 w-10 text-gray-400" />
                                )}
                            </div>

                            <div>
                                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                                    <Upload size={17} />
                                    Choose New Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="hidden"
                                    />
                                </label>

                                {avatar && (
                                    <button
                                        type="button"
                                        onClick={() => setAvatar(null)}
                                        className="ml-3 text-sm font-medium text-red-600 hover:text-red-700"
                                    >
                                        Cancel
                                    </button>
                                )}

                                <p className="mt-2 text-xs text-gray-500">
                                    Optional. Select an image file to replace the current avatar.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Basic Information */}
                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Basic Information
                        </h2>

                        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Trainer Name *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter trainer name"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="designation"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Designation *
                                </label>
                                <input
                                    id="designation"
                                    name="designation"
                                    type="text"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Senior Fitness Trainer"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="category"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Category *
                                </label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Strength Training"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="specialization"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Specialization *
                                </label>
                                <input
                                    id="specialization"
                                    name="specialization"
                                    type="text"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Weight Loss, Yoga"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="experienceYears"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Experience (Years) *
                                </label>
                                <input
                                    id="experienceYears"
                                    name="experienceYears"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={formData.experienceYears}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. 5"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="detailsUrl"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Details URL
                                </label>
                                <input
                                    id="detailsUrl"
                                    name="detailsUrl"
                                    type="url"
                                    value={formData.detailsUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/trainer"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                required
                                placeholder="Describe the trainer's experience and approach..."
                                className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/trainers")}
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? (
                                <>
                                    <LoaderCircle size={17} className="animate-spin" />
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Save size={17} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTrainer;
