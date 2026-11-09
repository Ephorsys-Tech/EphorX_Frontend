
import { useState } from "react";
import { motion } from "framer-motion";
import faqImage from "../../assets/faqImage.png";
import {
  ArrowUpRight,
  MessageCircleQuestion,
  Send,
  UserRound,
  Mail,
  BookOpen,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import contactApi from "../../admin/api/contactApi";

const createInitialForm = () => ({
  name: "",
  email: "",
  phone: "",
  whatsApp: "",
  subject: "",
  course: "",
  message: "",
});

const ContactForm = () => {
  const [formData, setFormData] = useState(createInitialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const messageLength = String(formData?.message ?? "").length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...createInitialForm(),
      ...(prev || {}),
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.whatsApp.trim() ||
      !formData.message.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsApp: formData.whatsApp.trim(),
        course: formData.course.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };

      const response = await contactApi.create(payload);

      if (response?.success === false) {
        throw new Error(
          response.message || "Failed to submit your message."
        );
      }

      setSuccess(
        response?.message || "Your message has been sent successfully!"
      );

      setFormData(createInitialForm());
    } catch (err) {
      console.error("Contact form submission failed:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-blue-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100/70";

  const labelClass = "mb-1.5 block text-sm font-bold text-gray-800";

  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400";

  return (
    <section
      id="ask-question-section"
      className="relative overflow-hidden bg-white py-6 lg:py-8"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-5"
        >
          <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
            Have a Question?
            <br />
            <span className="text-blue-700">Ask EphorX.</span>
          </h2>
        </motion.div>

        {/* Contact form card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-[0_12px_40px_-18px_rgba(29,78,216,0.24)] lg:grid-cols-[0.85fr_1.15fr]"
        >

          {/* Left information panel */}
          <div className="relative isolate flex flex-col justify-between overflow-hidden bg-[#061521] p-5 sm:p-6 lg:p-7">
            <img
              src={faqImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute inset-0 -z-10 bg-blue-300/30" />
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-blue-700/30 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-56 w-56 rounded-full bg-blue-800/40 blur-2xl" />

            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/60 bg-slate-950/50 text-blue-400 shadow-[0_0_25px_rgba(29,78,216,0.2)] backdrop-blur-sm">
                <MessageCircleQuestion size={25} />
              </div>

              <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
                Your curiosity matters
              </p>

              <h3 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
                Every great
                <br />
                journey starts
                <br />
                with a <span className="text-black/50">question.</span>
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">
                Ask us about courses, admissions, fees or learning paths.
                Share what's on your mind and let us guide you.
              </p>
            </div>

            <div className="mt-5 border-t border-blue-500/60 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-700/20">
                  <BookOpen size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Learn with confidence
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    Get clarity before your next step.
                  </p>
                </div>

                <ArrowUpRight
                  className="ml-auto shrink-0 text-blue-400"
                  size={24}
                />
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="bg-white p-5 sm:p-6 lg:p-7">
            <div className="mb-5">
              <h3 className="text-xl font-black text-gray-950 sm:text-2xl">
                Send us your message
              </h3>
              <p className="mt-1.5 text-sm text-gray-500">
                Share your details and we'll get in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">

              {/* Name and Email */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>
                    Your name <span className="text-blue-700">*</span>
                  </label>

                  <div className="relative">
                    <UserRound size={17} className={iconClass} />

                    <input
                      id="contact-name"
                      name="name"
                      value={formData.name ?? ""}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className={labelClass}>
                    Email address <span className="text-blue-700">*</span>
                  </label>

                  <div className="relative">
                    <Mail size={17} className={iconClass} />

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email ?? ""}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      maxLength={254}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Phone and WhatsApp */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone number <span className="text-blue-700">*</span>
                  </label>

                  <div className="relative">
                    <Phone size={17} className={iconClass} />

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone ?? ""}
                      onChange={handleChange}
                      placeholder="Phone number"
                      autoComplete="tel"
                      required
                      maxLength={20}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-whatsapp" className={labelClass}>
                    WhatsApp number <span className="text-blue-700">*</span>
                  </label>

                  <div className="relative">
                    <MessageCircle size={17} className={iconClass} />

                    <input
                      id="contact-whatsapp"
                      name="whatsApp"
                      type="tel"
                      value={formData.whatsApp ?? ""}
                      onChange={handleChange}
                      placeholder="WhatsApp number"
                      required
                      maxLength={20}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              </div>

              {/* Course */}
              <div>
                <label htmlFor="contact-course" className={labelClass}>
                  Course
                </label>

                <input
                  id="contact-course"
                  name="course"
                  value={formData.course ?? ""}
                  onChange={handleChange}
                  placeholder="Which course are you interested in? (optional)"
                  maxLength={150}
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Your message <span className="text-blue-700">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message ?? ""}
                  onChange={handleChange}
                  placeholder="What would you like to know?"
                  rows={3}
                  required
                  minLength={10}
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                />

                <p className="mt-1.5 text-right text-xs text-gray-400">
                  {messageLength}/2000 characters
                </p>
              </div>

              {/* Error message */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Success message */}
              {success && (
                <p
                  role="status"
                  className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700"
                >
                  {success}
                </p>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                whileHover={{ scale: loading ? 1 : 1.015 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition-all duration-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}

                {!loading && (
                  <Send
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                )}
              </motion.button>

              <p className="text-center text-xs text-gray-400">
                Your information will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;