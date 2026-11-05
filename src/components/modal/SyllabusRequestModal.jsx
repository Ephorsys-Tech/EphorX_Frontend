import { useState } from 'react'
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MessageCircle,
  Download,
  LoaderCircle,
  FileText
} from 'lucide-react'

import { createSyllabusLead } from '../../admin/api/syllabusLeadApi.js'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  wpno: '',
  qualification: ''
}

const inputClass =
  'h-11 w-full rounded-lg border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

// Label + icon + input
function Field ({
  id,
  label,
  icon: Icon,
  required = false,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className='mb-2 block text-sm font-medium text-slate-700'
      >
        {label}
        {required && <span className='ml-0.5 text-red-500'>*</span>}
      </label>

      <div className='relative'>
        <Icon
          size={16}
          aria-hidden='true'
          className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
        />
        <input id={id} required={required} className={inputClass} {...props} />
      </div>
    </div>
  )
}

const SyllabusRequestModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = event => {
    const { name, value } = event.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!course) return

    setLoading(true)
    setError('')

    try {
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phoneNumber: formData.phone.trim(),
        whatsappNumber: formData.wpno.trim() || formData.phone.trim(),
        qualification: formData.qualification.trim(),
        courseId: course._id,
        courseName: course.title,
        syllabusUrl: course.syllabusUrl || course.syllabus
      }

      if (!payload.syllabusUrl) {
        throw new Error('Syllabus PDF is not available for this course.')
      }

      const response = await createSyllabusLead(payload)

      if (!response?.success) {
        throw new Error(response?.message || 'Unable to submit your request.')
      }

      // Open the syllabus after successful lead creation.
      const link = document.createElement('a')
      link.href = payload.syllabusUrl
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      link.download = `${course.title}-syllabus.pdf`

      document.body.appendChild(link)
      link.click()
      link.remove()

      setFormData(initialForm)
      onClose()
    } catch (err) {
      console.error('Syllabus request failed:', err)

      setError(
        err.response?.data?.message ||
          err.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!course) return null

  return (
    <form onSubmit={handleSubmit} className='space-y-6 px-6 pb-6 pt-3 sm:px-8'>
      {/* Selected course */}
      <div className='flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4'>
        <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white'>
          <FileText size={19} />
        </div>

        <div className='min-w-0'>
          <p className='text-xs text-slate-500'>Syllabus for</p>
          <h3 className='mt-0.5 break-words text-sm font-semibold leading-snug text-slate-900'>
            {course.title}
          </h3>
        </div>
      </div>

      <p className='text-sm leading-6 text-slate-600'>
        Please fill in your details. The syllabus PDF will download as soon as
        you submit.
      </p>

      {/* Fields */}
      <div className='grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2'>
        <Field
          id='syllabus-name'
          label='Full name'
          icon={User}
          required
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Your full name'
          autoComplete='name'
        />

        <Field
          id='syllabus-email'
          label='Email address'
          icon={Mail}
          required
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='you@example.com'
          autoComplete='email'
        />

        <Field
          id='syllabus-phone'
          label='Phone number'
          icon={Phone}
          required
          type='tel'
          inputMode='tel'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          placeholder='Phone number'
          autoComplete='tel'
        />

        <Field
          id='syllabus-wpno'
          label='WhatsApp number'
          icon={MessageCircle}
          type='tel'
          inputMode='tel'
          name='wpno'
          value={formData.wpno}
          onChange={handleChange}
          placeholder='Same as phone if blank'
        />

        <Field
          id='syllabus-qualification'
          label='Highest qualification'
          icon={GraduationCap}
          required
          className='sm:col-span-2'
          name='qualification'
          value={formData.qualification}
          onChange={handleChange}
          placeholder='e.g. B.Tech, BCA, Diploma'
        />
      </div>

      {/* Error */}
      {error && (
        <p
          role='alert'
          className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
        >
          {error}
        </p>
      )}

      {/* Actions */}
      <div className='flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end'>
        <button
          type='button'
          onClick={onClose}
          disabled={loading}
          className='rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          Cancel
        </button>

        <button
          type='submit'
          disabled={loading}
          className='inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className='animate-spin' />
              Processing...
            </>
          ) : (
            <>
              <Download size={17} />
              Submit &amp; download syllabus
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default SyllabusRequestModal
