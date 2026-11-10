import { useState } from 'react'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  resume: null
}

const inputClass =
  'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

const labelClass = 'mb-2 block text-sm font-medium text-slate-700'

const JobApplicationForm = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    const { name, value, files } = e.target

    if (name === 'resume') {
      const file = files?.[0]

      if (!file) return

      const isPdf =
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf')

      if (!isPdf) {
        setError('Please upload your resume in PDF format.')
        e.target.value = ''
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Resume size must be less than 5 MB.')
        e.target.value = ''
        return
      }

      setError('')
      setFormData(prev => ({ ...prev, resume: file }))
      return
    }

    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')

    if (!onSubmit) {
      setError(
        'Application submission is not connected yet. Please try again later.'
      )
      return
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError('Please enter a valid phone number.')
      return
    }

    if (!formData.resume) {
      setError('Please upload your resume.')
      return
    }

    const applicationData = new FormData()
    applicationData.append('name', formData.name.trim())
    applicationData.append('email', formData.email.trim())
    applicationData.append('phone', formData.phone.trim())
    applicationData.append('resume', formData.resume)
    applicationData.append('jobTitle', job.title)

    try {
      setLoading(true)
      await onSubmit(applicationData, job)
      setSubmitted(true)
    } catch (err) {
      setError(
        err?.message || 'Unable to submit your application. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className='px-6 pb-6 pt-3 sm:px-8'>
        <div className='rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-10 text-center'>
          <h3 className='text-xl font-bold text-slate-900'>
            Application submitted
          </h3>

          <p className='mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600'>
            Thank you for applying for the {job.title} position. Your
            application has been submitted successfully.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 px-6 pb-6 pt-3 sm:px-8'>
      {/* Selected position */}
      <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
        <p className='text-xs text-slate-500'>Applying for</p>
        <h3 className='mt-0.5 break-words text-base font-semibold text-slate-900'>
          {job.title}
        </h3>
      </div>

      <p className='text-sm leading-6 text-slate-600'>
        Fill in your details and upload your latest resume.
      </p>

      <div className='space-y-5'>
        {/* Full name */}
        <div>
          <label htmlFor='application-name' className={labelClass}>
            Full name <span className='text-red-500'>*</span>
          </label>
          <input
            id='application-name'
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter your full name'
            autoComplete='name'
            required
            className={inputClass}
          />
        </div>

        {/* Email and phone */}
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
          <div>
            <label htmlFor='application-email' className={labelClass}>
              Email address <span className='text-red-500'>*</span>
            </label>
            <input
              id='application-email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              autoComplete='email'
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor='application-phone' className={labelClass}>
              Phone number <span className='text-red-500'>*</span>
            </label>
            <input
              id='application-phone'
              type='tel'
              inputMode='tel'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter your phone number'
              autoComplete='tel'
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Resume */}
        <div>
          <label htmlFor='application-resume' className={labelClass}>
            Resume <span className='text-red-500'>*</span>
            <span className='ml-1 font-normal text-slate-500'>
              (PDF, max 5 MB)
            </span>
          </label>

          <label
            htmlFor='application-resume'
            className='flex cursor-pointer items-center gap-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-blue-600 hover:bg-blue-50/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-blue-600'
          >
            <span className='shrink-0 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white'>
              Choose file
            </span>

            <span className='min-w-0 flex-1'>
              <span className='block truncate text-sm font-medium text-slate-800'>
                {formData.resume?.name || 'No file chosen'}
              </span>
              <span className='mt-0.5 block text-xs text-slate-500'>
                {formData.resume
                  ? `${(formData.resume.size / (1024 * 1024)).toFixed(2)} MB`
                  : 'Click here to browse PDF files'}
              </span>
            </span>

            <input
              id='application-resume'
              type='file'
              name='resume'
              accept='.pdf,application/pdf'
              onChange={handleChange}
              className='sr-only'
            />
          </label>
        </div>
      </div>

      {error && (
        <p
          role='alert'
          className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'
        >
          {error}
        </p>
      )}

      <div className='border-t border-slate-200 pt-6'>
        <button
          type='submit'
          disabled={loading}
          className='w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? 'Submitting...' : 'Submit application'}
        </button>

        <p className='mt-3 text-center text-xs text-slate-500'>
          Please make sure your contact details are correct before submitting.
        </p>
      </div>
    </form>
  )
}

export default JobApplicationForm
