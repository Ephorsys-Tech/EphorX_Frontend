
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const courses = [
    "Web Development",
    "MERN Stack Development",
    "Python Programming",
    "Java Programming",
    "Data Analytics",
    "Other",
  ];

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

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      // Connect your demo booking API here.
      console.log("Demo booking:", formData);

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData(initialForm);
    setSubmitted(false);
    setError("");
  };

  return (
    <>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <BookOpen size={30} />
          </div>

          <h3 className="mt-5 text-2xl font-bold text-slate-900">
            Thank You!
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Your demo request has been submitted successfully.
            Our team will contact you soon.
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="mt-6 rounded-xl bg-[#071927] px-7 py-3 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="px-9 py-2">
          <div className="mb-2">
            <p className="text-sm leading-6 text-sky-500">
              Interested in learning with EphorX? Share your details
              and we'll help you get started with a free demo session.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="demo-name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="demo-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="demo-email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="demo-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Phone Numbers */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="demo-phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="demo-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    autoComplete="tel"
                    required
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="demo-wpno"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  WhatsApp Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="demo-wpno"
                    type="tel"
                    name="wpno"
                    value={formData.wpno}
                    onChange={handleChange}
                    placeholder="WhatsApp number"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div>
              <label
                htmlFor="demo-qualification"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Highest Qualification
              </label>

              <div className="relative">
                <GraduationCap
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  id="demo-qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="Enter your highest qualification"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-600 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>
            </div>

            {/* Course */}
            <div>
              <label
                htmlFor="demo-course"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Interested Course <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <BookOpen
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  id="demo-course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-600 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#156fb4] px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Book My Free Demo"}
            </button>

            <p className="text-center text-xs text-slate-400 -mt-3">
              Our team will contact you to discuss your demo session.
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default BookDemoModal;
