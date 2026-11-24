import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  UserRound,
  X,
  Save,
  Eye,
  Link as LinkIcon,
  BriefcaseBusiness,
  Layers,
  FileText,
} from "lucide-react";
import { createTrainer } from "../../api/trainerApi";
import Button from "../../../common/components/Button";

const AddTrainer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    specialization: "",
    description: "",
    experienceYears: "",
    status: "draft",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      e.target.value = "";
      return;
    }

    setError("");
    setAvatar(file);

    setAvatarPreview(URL.createObjectURL(file));
  };

  const removeAvatar = () => {
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatar(null);
    setAvatarPreview("");

    const input = document.getElementById("trainer-avatar");
    if (input) input.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.designation.trim() ||
      !formData.specialization.trim() ||
      !formData.description.trim() ||
      formData.experienceYears === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const experience = Number(formData.experienceYears);

    if (!Number.isFinite(experience) || experience < 0) {
      setError("Experience must be a valid number greater than or equal to 0.");
      return;
    }

    try {
      setLoading(true);

      const trainerData = new FormData();

      trainerData.append("name", formData.name.trim());
      trainerData.append("designation", formData.designation.trim());
      trainerData.append("specialization", formData.specialization.trim());
      trainerData.append("description", formData.description.trim());
      trainerData.append("experienceYears", String(experience));
      trainerData.append("status", formData.status);

      if (avatar) {
        trainerData.append("avatar", avatar);
      }

      await createTrainer(trainerData);

      navigate("/admin/trainers");
    } catch (err) {
      setError(err.message || "Failed to create trainer.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-screen w-full  bg-slate-50 px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-none">
        {/* Page Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/admin/trainers")}
            className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />
            Back to Trainers
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Add Trainer
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a trainer's profile and professional information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-none">
          <div className="space-y-6">
            {/* Profile Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserRound size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Profile Information
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Trainer's name, designation, and profile image.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">
                {/* Avatar Upload */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Profile Image
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          alt="Trainer preview"
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <UserRound
                          size={35}
                          className="text-slate-300"
                        />
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="trainer-avatar"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <Upload size={16} />
                        Upload Image
                      </label>

                      <input
                        id="trainer-avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="sr-only"
                      />

                      <p className="mt-2 text-xs text-slate-400">
                        JPG, PNG, or WebP. Maximum size 5 MB.
                      </p>

                      {avatarPreview && (
                        <button
                          type="button"
                          onClick={removeAvatar}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                          Remove image
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className={labelClass}>
                    Designation <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. Senior Fitness Trainer"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Professional Information */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Professional Information
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Specialization and experience.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-7">

                {/* Specialization */}
                <div>
                  <label htmlFor="specialization" className={labelClass}>
                    Specialization <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g. Strength Training"
                    required
                    className={inputClass}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experienceYears"
                    className={labelClass}
                  >
                    Experience (Years){" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="experienceYears"
                    name="experienceYears"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* Description */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Trainer Description
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Describe the trainer's background and expertise.
                  </p>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <label htmlFor="description" className={labelClass}>
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write a short description about the trainer..."
                  required
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {formData.description.length}/2000 characters
                </p>
              </div>
            </section>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/trainers")}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <Button
                text={loading ? "Saving Trainer..." : "Save Trainer"}
                type="submit"
                disabled={loading}
                icon={Save}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;
