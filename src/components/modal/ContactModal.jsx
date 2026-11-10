
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Send,
  UserRound,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react";
import contactApi from "../../admin/api/contactApi";



const initialForm = {
  name: "",
  email: "",
  phone: "",
  wpno: "",
  subject: "",
  course: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100";

const FieldLabel = ({ children, required = false }) => (
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    {children}
    {required && <span className="ml-1 text-sky-600">*</span>}
  </label>
);

const ContactModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  if (loading) return;

  setLoading(true);
  setError("");

  try {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      wpno: formData.wpno.trim(),
      subject: formData.subject.trim(),
      course: formData.course.trim(),
      message: formData.message.trim(),
    };

    const response = await contactApi.create(payload);

    if (response?.success === false) {
      throw new Error(
        response.message || "Failed to send your message."
      );
    }

    if (onSubmit) {
      await onSubmit(formData);
    }

    setSubmitted(true);
  } catch (err) {
    console.error("Contact form submission failed:", err);

    setError(
      err.message || "Unable to send your message. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  if (submitted) {
    return (
      <div className="px-6 py-14 text-center sm:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
          <CheckCircle2 size={32} />
        </div>

        <h3 className="mt-5 text-xl font-bold text-slate-900">
          Thank you for reaching out!
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Your message has been received. We appreciate your interest.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-3 sm:px-9">
      <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rotate-12 rounded-2xl bg-sky-100/70" />
      <div className="pointer-events-none absolute bottom-20 right-8 h-24 w-24 rounded-full bg-blue-50" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sky-100/60 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-7">
          <h3 className="mt-1 text-2xl font-black text-slate-950">
            Send us a message
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Share your details and we'll get in touch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Name</FieldLabel>

              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={`${inputClass} pl-10`}
                  required
                  maxLength={100}
                />
              </div>
            </div>

            <div>
              <FieldLabel required>Email Address</FieldLabel>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={`${inputClass} pl-10`}
                  required
                  maxLength={254}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel required>Phone Number</FieldLabel>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  autoComplete="tel"
                  className={`${inputClass} pl-10`}
                  required
                  maxLength={20}
                />
              </div>
            </div>

            <div>
              <FieldLabel required>WhatsApp Number</FieldLabel>

              <div className="relative">
                <MessageCircle
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="tel"
                  name="wpno"
                  value={formData.wpno}
                  onChange={handleChange}
                  placeholder="WhatsApp number"
                  className={`${inputClass} pl-10`}
                  required
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          <div>
            <FieldLabel>Course</FieldLabel>
            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Which course are you interested in? (optional)"
              maxLength={150}
              className={inputClass}
            />
          </div>

          <div>
            <FieldLabel required>Message Regarding</FieldLabel>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What would you like to know?"
              rows={4}
              maxLength={2000}
              className={`${inputClass} resize-y`}
              required
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {formData.message.length}/2000
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: loading ? 1 : 1.015 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-colors duration-300 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
            <Send size={16} />
          </motion.button>

          <p className="text-center text-xs text-slate-400">
            Your information will be used to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactModal;
