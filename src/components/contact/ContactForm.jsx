import { useState } from 'react'
import { motion } from 'framer-motion'
import contactApi from '../../admin/api/contactApi'

const createInitialForm = () => ({
  name: '',
  email: '',
  phone: '',
  whatsApp: '',
  subject: '',
  course: '',
  message: ''
})

const topics = ['Courses', 'Admissions', 'Fees', 'Learning paths']

const ContactForm = () => {
  const [formData, setFormData] = useState(createInitialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const messageLength = String(formData?.message ?? '').length

  const handleChange = e => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...createInitialForm(),
      ...(prev || {}),
      [name]: value
    }))

    setError('')
    setSuccess('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.whatsApp.trim() ||
      !formData.message.trim()
    ) {
      setError('Please complete all required fields.')
      return
    }

    setLoading(true)
    setSuccess('')
    setError('')

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsApp: formData.whatsApp.trim(),
        course: formData.course.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      }

      const response = await contactApi.create(payload)

      if (response?.success === false) {
        throw new Error(response.message || 'Failed to submit your message.')
      }

      setSuccess(
        response?.message || 'Your message has been sent successfully!'
      )

      setFormData(createInitialForm())
    } catch (err) {
      console.error('Contact form submission failed:', err)

      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Unable to send your message. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

  const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

  const required = <span className='ml-0.5 text-red-500'>*</span>

  return (
    <section
      id='ask-question-section'
      className='relative isolate scroll-mt-28 overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-sky-50 py-16 sm:py-20'
    >
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[18%] h-[130%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[62%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />
        <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-tl from-blue-200/50 to-sky-100/10' />
      </div>

      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-900/5 lg:grid-cols-[0.8fr_1.2fr]'
        >
          {/* Left information panel */}
          <div className='relative isolate flex flex-col justify-between overflow-hidden bg-[#0b2a5b] p-6 text-white sm:p-8'>
            <div
              aria-hidden='true'
              className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
            >
              <div className='absolute -top-10 left-[30%] h-[140%] w-20 -skew-x-[28deg] bg-gradient-to-b from-white/[0.07] to-transparent' />
              <div className='absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10 bg-gradient-to-br from-blue-500/25 to-transparent' />
              <div className='absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-white/10 bg-gradient-to-tr from-sky-400/15 to-transparent' />
            </div>

            <div>
              <p className='text-sm font-semibold uppercase tracking-wider text-sky-300'>
                Your curiosity matters
              </p>

              <h2 className='mt-3 text-3xl font-bold leading-tight sm:text-4xl'>
                Every great journey starts with a{' '}
                <span className='text-sky-300'>question.</span>
              </h2>

              <p className='mt-4 text-sm leading-6 text-blue-100/90 sm:text-base sm:leading-7'>
                Ask us about courses, admissions, fees or learning paths. Share
                what&rsquo;s on your mind and let us guide you.
              </p>
            </div>

            <ul className='mt-8 divide-y divide-white/15 border-y border-white/15 text-sm'>
              {topics.map(topic => (
                <li key={topic} className='py-3 text-blue-100'>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form panel */}
          <div className='p-6 sm:p-8'>
            <div className='mb-6'>
              <h3 className='text-2xl font-bold text-slate-900'>
                Send us your message
              </h3>
              <p className='mt-1.5 text-sm text-slate-600'>
                Share your details and we&rsquo;ll get in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                <div>
                  <label htmlFor='contact-name' className={labelClass}>
                    Your name{required}
                  </label>
                  <input
                    id='contact-name'
                    name='name'
                    value={formData.name ?? ''}
                    onChange={handleChange}
                    placeholder='Enter your full name'
                    autoComplete='name'
                    required
                    minLength={2}
                    maxLength={100}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor='contact-email' className={labelClass}>
                    Email address{required}
                  </label>
                  <input
                    id='contact-email'
                    name='email'
                    type='email'
                    value={formData.email ?? ''}
                    onChange={handleChange}
                    placeholder='you@example.com'
                    autoComplete='email'
                    required
                    maxLength={254}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor='contact-phone' className={labelClass}>
                    Phone number{required}
                  </label>
                  <input
                    id='contact-phone'
                    name='phone'
                    type='tel'
                    inputMode='tel'
                    value={formData.phone ?? ''}
                    onChange={handleChange}
                    placeholder='Phone number'
                    autoComplete='tel'
                    required
                    maxLength={20}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor='contact-whatsapp' className={labelClass}>
                    WhatsApp number{required}
                  </label>
                  <input
                    id='contact-whatsapp'
                    name='whatsApp'
                    type='tel'
                    inputMode='tel'
                    value={formData.whatsApp ?? ''}
                    onChange={handleChange}
                    placeholder='WhatsApp number'
                    required
                    maxLength={20}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='contact-course' className={labelClass}>
                  Course
                </label>
                <input
                  id='contact-course'
                  name='course'
                  value={formData.course ?? ''}
                  onChange={handleChange}
                  placeholder='Which course are you interested in? (optional)'
                  maxLength={150}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor='contact-message' className={labelClass}>
                  Your message{required}
                </label>
                <textarea
                  id='contact-message'
                  name='message'
                  value={formData.message ?? ''}
                  onChange={handleChange}
                  placeholder='What would you like to know?'
                  rows={4}
                  required
                  minLength={10}
                  maxLength={2000}
                  className={`${inputClass} resize-y`}
                />
                <p className='mt-1.5 text-right text-xs text-slate-400'>
                  {messageLength}/2000 characters
                </p>
              </div>

              {error && (
                <p
                  role='alert'
                  className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
                >
                  {error}
                </p>
              )}

              {success && (
                <p
                  role='status'
                  className='rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'
                >
                  {success}
                </p>
              )}

              <button
                type='submit'
                disabled={loading}
                className=' cursor-pointer w-full rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
              >
                {loading ? 'Sending...' : 'Send message'}
              </button>

              <p className='text-center text-xs text-slate-500'>
                Your information will be used to respond to your enquiry.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactForm
