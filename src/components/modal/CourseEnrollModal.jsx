
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

const initialForm = {
  name: "",
  email: "",
  number: "",
  wpNumber: "",
  profession: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-900 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

const CourseEnrollModal = ({ course, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit?.(
      {
        ...form,
        phone: form.number,
        wpNumber: form.wpNumber,
        courseId: course?._id,
        courseTitle: course?.title,
      },
      course
    );

    setForm(initialForm);
    onClose?.();
  };

  return (
    <div className="-mt-6 w-full p-4 sm:p-6 md:p-6">
      {/* Selected course */}
      <div className="relative mb-4 overflow-hidden rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-slate-50 p-4 sm:p-5">
        <div className="absolute -right-8 -top-10 h-28 w-28 rounded-full bg-sky-200/30 blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-sky-400 shadow-md shadow-slate-900/10">
            <BookOpen size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Course selected
            </p>

            <h3 className="mt-1 break-words text-base font-bold leading-snug text-gray-950 sm:text-lg">
              {course?.title || "Enroll in a Course"}
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              Fill in your details to begin your learning journey.
            </p>
          </div>
        </div>
      </div>

      {/* Form heading */}
      <div className="mb-3">
        <h4 className="text-base font-bold text-gray-900">
          Your Details
        </h4>

        <p className="mt-1 text-sm leading-relaxed text-gray-500">
          Please provide your contact information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name and email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="course-enroll-name" className={labelClass}>
              Full Name <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <UserRound
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
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
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="course-enroll-email" className={labelClass}>
              Email Address <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <Mail
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
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
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>
        </div>

        {/* Phone and WhatsApp */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="min-w-0">
            <label htmlFor="course-enroll-number" className={labelClass}>
              Phone Number <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <Phone
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
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
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="course-enroll-whatsapp" className={labelClass}>
              WhatsApp Number <span className="text-sky-600">*</span>
            </label>

            <div className="relative">
              <MessageCircle
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="course-enroll-whatsapp"
                name="wpNumber"
                type="tel"
                placeholder="Enter WhatsApp number"
                value={form.wpNumber}
                onChange={handleChange}
                required
                className={`${inputClass} pl-10`}
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
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              id="course-enroll-profession"
              name="profession"
              value={form.profession}
              onChange={handleChange}
              required
              className={`${inputClass} appearance-none pl-10 ${
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
        <div className="border-t border-gray-100 pt-5">
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-600 transition duration-200 hover:border-gray-300 hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition duration-300 hover:bg-sky-600 hover:shadow-sky-500/40 focus:outline-none focus:ring-4 focus:ring-sky-100 active:scale-[0.99]"
            >
              Submit Enrollment

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <p className="mt-3 text-center text-xs leading-relaxed text-gray-400">
            Please ensure your contact details are correct.
          </p>
        </div>
      </form>
    </div>
  );
};

export default CourseEnrollModal;
