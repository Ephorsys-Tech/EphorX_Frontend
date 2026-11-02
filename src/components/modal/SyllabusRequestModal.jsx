
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MessageCircle,
  Download,
  LoaderCircle,
} from "lucide-react";

import { createSyllabusLead } from "../../admin/api/syllabusLeadApi.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  wpno: "",
  qualification: "",
};

const SyllabusRequestModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!course) return;

  setLoading(true);
  setError("");

  try {
    const payload = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      whatsappNumber: formData.wpno.trim() || formData.phone.trim(),
      qualification: formData.qualification.trim(),
      courseId: course._id,
      courseName: course.title,
      syllabusUrl: course.syllabusUrl,
    };

    const response = await createSyllabusLead(payload);

    if (!response.success) {
      throw new Error(
        response.message || "Unable to submit your request."
      );
    }

    const pdfUrl =
      response.syllabusUrl ||
      response.download?.syllabusUrl ||
      course.syllabusUrl;

    if (!pdfUrl) {
      throw new Error(
        "Your details were submitted, but the syllabus URL was not found."
      );
    }

    // Open the syllabus PDF.
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.download = `${course.title}-syllabus.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    setFormData(initialForm);
    onClose();
  } catch (err) {
    console.error("Syllabus request failed:", err);

    setError(
      err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  if (!course) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-3 px-6">
      {/* Selected course */}
      <div className="flex items-center gap-3 rounded-xl border border-sky-100 bg-sky-50 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600">
          <BookOpen size={21} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold text-sky-600">
            Selected Course
          </p>
          <h3 className="mt-1 break-words font-bold text-slate-900">
            {course.title}
          </h3>
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-500">
        Fill in your details to receive the course syllabus PDF.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="syllabus-name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Full Name *
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="syllabus-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="syllabus-email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email Address *
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="syllabus-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="syllabus-phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Phone Number *
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="syllabus-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div>
          <label
            htmlFor="syllabus-wpno"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            WhatsApp Number
          </label>

          <div className="relative">
            <MessageCircle
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="syllabus-wpno"
              type="tel"
              name="wpno"
              value={formData.wpno}
              onChange={handleChange}
              placeholder="Enter WhatsApp number"
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Qualification */}
        <div className="sm:col-span-2">
          <label
            htmlFor="syllabus-qualification"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Highest Qualification *
          </label>

          <div className="relative">
            <GraduationCap
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              id="syllabus-qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Enter your highest qualification"
              required
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Download size={18} />
            Submit & Download Syllabus
          </>
        )}
      </button>
    </form>
  );
};

export default SyllabusRequestModal;
