
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Send,
  UserRound,
  MessageSquare,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  wpno: '',
  subject: '',
  course: '',
  message: '',
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'

const FieldLabel = ({ children, required = false }) => (
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    {children}
    {required && <span className="ml-1 text-sky-600">*</span>}
  </label>
)

const ContactModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        console.log('Contact form data:', formData)
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Contact form submission failed:', error)
    }
  }

  // Success screen
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
    )
  }

  return (
    <section className="relative overflow-hidden bg-white p-6 sm:p-9">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute right-5 top-5 h-16 w-16 rotate-12 rounded-2xl bg-sky-100/70" />
      <div className="pointer-events-none absolute bottom-20 right-8 h-24 w-24 rounded-full bg-blue-50" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-sky-100/60 blur-2xl" />

      <div className="relative z-10">
        {/* Form heading */}
        <div className="mb-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-700">
            <MessageSquare size={13} />
            Contact form
          </span>

          <h3 className="mt-4 text-2xl font-black text-slate-950">
            Send us a message
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Share your details and we'll get in touch.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student name */}
          <div>
            <FieldLabel required>Student Name</FieldLabel>

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

          {/* Email */}
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

          {/* Phone numbers */}
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

          {/* Message */}
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

          {/* Submit button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-colors duration-300 hover:bg-sky-500"
          >
            Send Message
            <Send size={16} />
          </motion.button>

          <p className="text-center text-xs text-slate-400">
            Your information will be used to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
  )
}

export default ContactModal
