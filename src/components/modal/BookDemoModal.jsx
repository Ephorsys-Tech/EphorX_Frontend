
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import { courseApi } from "../../admin/api/courseApi";
import { createDemoBooking } from "../../admin/api/demoBookingApi";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  wpno: "",
  qualification: "",
  course: "",
};

const BookDemoModal = ({ onClose }) => {
  const [formData, setFormData] = useState(initialForm);
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);

        const response = await courseApi.getAll();

        const courseData = Array.isArray(response)
          ? response
          : response?.courses ||
            response?.data?.courses ||
            response?.data ||
            [];

        setCourses(courseData);
      } catch (err) {
        console.error("FETCH COURSES ERROR:", err);
        setError(err.message || "Unable to load courses.");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const selectedCourse = courses.find(
      (course) => course._id === formData.course
    );

    if (!selectedCourse) {
      setError("Please select a valid course.");
      return;
    }

    try {
      setLoading(true);

      const bookingData = {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        whatsappNumber: formData.wpno.trim() || formData.phone.trim(),
        qualification: formData.qualification.trim(),
        courseId: selectedCourse._id,
        courseName: selectedCourse.title,
      };

      const response = await createDemoBooking(bookingData);

      if (response?.success === false) {
        throw new Error(
          response.message || "Unable to submit your demo request."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error("DEMO BOOKING ERROR:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(initialForm);
    setSubmitted(false);
    setError("");
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100";

  const labelClass =
    "mb-1.5 block text-sm font-semibold text-slate-700";

  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400";

  return (
    <>
      {submitted ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <BookOpen size={26} />
          </div>

          <h3 className="mt-4 text-2xl font-bold text-slate-900">
            Thank You!
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your demo request has been submitted successfully.
            Our team will contact you soon.
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="mt-5 rounded-xl bg-[#071927] px-7 py-2.5 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="px-5 py-1 sm:px-7">
          <div className="mb-3">
            <p className="text-sm leading-5 font-semibold text-blue-700">
              Interested in learning with EphorX? Share your details
              and we'll help you get started with a free demo session.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Full Name */}
            <div>
              <label htmlFor="demo-name" className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User size={17} className={iconClass} />

                <input
                  id="demo-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="demo-email" className={labelClass}>
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Mail size={17} className={iconClass} />

                <input
                  id="demo-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="demo-phone" className={labelClass}>
                  Phone Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone size={17} className={iconClass} />

                  <input
                    id="demo-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    autoComplete="tel"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="demo-wpno" className={labelClass}>
                  WhatsApp Number
                </label>

                <div className="relative">
                  <Phone size={17} className={iconClass} />

                  <input
                    id="demo-wpno"
                    type="tel"
                    name="wpno"
                    value={formData.wpno}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label htmlFor="demo-qualification" className={labelClass}>
                Highest Qualification
              </label>

              <div className="relative">
                <GraduationCap size={18} className={iconClass} />

                <input
                  type="text"
                  id="demo-qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="Enter your highest qualification"
                  className={`${inputClass} bg-white text-slate-600 placeholder:text-slate-400`}
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label htmlFor="demo-course" className={labelClass}>
                Interested Course <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <BookOpen size={17} className={iconClass} />

                <select
                  id="demo-course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  disabled={coursesLoading || courses.length === 0}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-600 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  <option value="">
                    {coursesLoading
                      ? "Loading courses..."
                      : courses.length === 0
                        ? "No courses available"
                        : "Select a course"}
                  </option>

                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading || coursesLoading || courses.length === 0}
                className="w-full rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Book My Free Demo"}
              </button>

              <p className="mt-2 text-center text-xs text-slate-400">
                Our team will contact you to discuss your demo session.
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default BookDemoModal;
