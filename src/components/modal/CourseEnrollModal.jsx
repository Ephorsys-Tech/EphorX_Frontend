
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Mail,
  MessageCircle,
  Phone,
  UserRound,
} from "lucide-react";

import { createCourseEnrollment } from "../../admin/api/courseEnrollApi.js";

const initialForm = {
  name: "",
  email: "",
  number: "",
  wpNumber: "",
  profession: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-2 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100";

const labelClass = "mb-1 block text-xs font-semibold text-gray-700";

const CourseEnrollModal = ({ course, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!course?._id && !course?.courseId) {
      setError("Course ID is missing. Please try again.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = {
      courseId: course.courseId || course._id,
      fullName: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phoneNumber: form.number.trim(),
      whatsappNumber: form.wpNumber.trim(),
      profession: form.profession,
    };

    try {
      const result = await createCourseEnrollment(formData);

      if (result?.alreadyEnrolled) {
        setError("This email is already enrolled in this course.");
        return;
      }

      // Optional parent callback
      await onSubmit?.(result, course);

      alert("Course enrollment saved successfully!");

      setForm(initialForm);
      onClose?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save enrollment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="-mt-6 w-full p-3 sm:p-4">
      {/* Selected course */}
      <div className="relative mb-3 overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-3">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl" />

        <div className="relative flex items-start gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 shadow-md shadow-slate-900/10">
            <BookOpen size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
              Course selected
            </p>

            <h3 className="mt-0.5 break-words text-sm font-bold leading-snug text-gray-950 sm:text-base">
              {course?.title || "Enroll in a Course"}
            </h3>

            <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
              Fill in your details to begin your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Form heading */}
      <div className="mb-2">
        <h4 className="text-sm font-bold text-gray-900">
          Your Details
        </h4>

        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
          Please provide your contact information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name and email */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="course-enroll-name" className={labelClass}>
              Full Name <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <UserRound
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="course-enroll-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="course-enroll-email" className={labelClass}>
              Email Address <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="course-enroll-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>
        </div>

        {/* Phone and WhatsApp */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="course-enroll-number" className={labelClass}>
              Phone Number <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <Phone
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="course-enroll-number"
                name="number"
                type="tel"
                autoComplete="tel"
                placeholder="Enter phone number"
                value={form.number}
                onChange={handleChange}
                required
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="course-enroll-whatsapp" className={labelClass}>
              WhatsApp Number <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <MessageCircle
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="course-enroll-whatsapp"
                name="wpNumber"
                type="tel"
                placeholder="Enter WhatsApp number"
                value={form.wpNumber}
                onChange={handleChange}
                required
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>
        </div>

        {/* Profession */}
        <div className="min-w-0">
          <label htmlFor="course-enroll-profession" className={labelClass}>
            Your Profession <span className="text-sky-600">*</span>
          </label>

          <div className="relative">
            <BriefcaseBusiness
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="course-enroll-profession"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              required
              className={`${inputClass} appearance-none pl-9 ${
                form.profession ? "" : "text-gray-400"
              }`}
            >
              <option value="" disabled>
                Select your profession
              </option>
              <option value="Student">Student</option>
              <option value="Fresher">Fresher</option>
              <option value="Working Professional">
                Working Professional
              </option>
              <option value="Developer">Developer</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Submit and cancel */}
        <div className="border-t border-gray-100 pt-3">
          {error && (
            <p className="mb-2 text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-600 transition duration-200 hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition duration-300 hover:bg-sky-600 hover:shadow-sky-500/40 focus:outline-none focus:ring-2 focus:ring-sky-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Enrollment"}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="mt-2 text-center text-xs leading-relaxed text-gray-400">
            Please ensure your contact details are correct.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CourseEnrollModal;
