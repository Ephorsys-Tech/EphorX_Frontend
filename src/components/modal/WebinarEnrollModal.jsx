
import { useState } from 'react'

import { createWebinarEnrollment } from '../../admin/api/webEnrollApi.js'

const initialForm = {
  name: '',
  email: '',
  number: '',
  wpNumber: '',
  profession: ''
}

const inputClass =
  'h-10 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'

const required = <span className='ml-0.5 text-red-500'>*</span>

export default function WebinarEnrollModal ({ onClose, webinar, onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!webinar?._id && !webinar?.webinarId) {
      setError('Webinar ID is missing. Please try again.')
      return
    }

    setLoading(true)
    setError('')

    const formData = {
      webinarId: webinar.webinarId || webinar._id,
      fullName: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phoneNumber: form.number.trim(),
      whatsappNumber: form.wpNumber.trim(),
      profession: form.profession
    }

    try {
      const result = await createWebinarEnrollment(formData)

      if (result?.alreadyEnrolled) {
        setError('This email is already enrolled in this webinar.')
        return
      }

      await onSubmit?.(result)

      alert('Webinar enrollment saved successfully!')

      setForm(initialForm)

      onClose?.()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to save enrollment. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full space-y-4 px-5 pb-5 pt-2 sm:px-7'
    >
      {/* Webinar information */}
      <div className='relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-white px-4 py-3'>
        <div className='absolute left-0 top-0 h-full w-1 bg-blue-700' />

        <p className='text-[11px] font-semibold uppercase tracking-wider text-blue-700'>
          Webinar Registration
        </p>

        <h3 className='mt-1 break-words text-lg font-bold leading-snug text-slate-900'>
          {webinar?.title || 'Webinar'}
        </h3>
      </div>

      <p className='text-sm leading-5 text-slate-600'>
        Fill in your details to reserve your place.
      </p>

      <div className='space-y-3'>
        {/* Name and email */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='min-w-0'>
            <label htmlFor='webinar-name' className={labelClass}>
              Full name{required}
            </label>
            <input
              id='webinar-name'
              name='name'
              type='text'
              autoComplete='name'
              placeholder='Enter your full name'
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className='min-w-0'>
            <label htmlFor='webinar-email' className={labelClass}>
              Email address{required}
            </label>
            <input
              id='webinar-email'
              name='email'
              type='email'
              autoComplete='email'
              placeholder='you@example.com'
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone numbers */}
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          <div className='min-w-0'>
            <label htmlFor='webinar-number' className={labelClass}>
              Phone number{required}
            </label>
            <input
              id='webinar-number'
              name='number'
              type='tel'
              inputMode='tel'
              autoComplete='tel'
              placeholder='Enter phone number'
              value={form.number}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className='min-w-0'>
            <label htmlFor='webinar-whatsapp' className={labelClass}>
              WhatsApp number{required}
            </label>
            <input
              id='webinar-whatsapp'
              name='wpNumber'
              type='tel'
              inputMode='tel'
              placeholder='Enter WhatsApp number'
              value={form.wpNumber}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Profession */}
        <div>
          <label htmlFor='webinar-profession' className={labelClass}>
            Your profession{required}
          </label>
          <select
            id='webinar-profession'
            name='profession'
            value={form.profession}
            onChange={handleChange}
            required
            className={`cursor-pointer ${inputClass} ${
              form.profession ? '' : 'text-slate-400'
            }`}
          >
            <option value='' disabled>
              Select your profession
            </option>
            <option value='Student'>Student</option>
            <option value='Fresher'>Fresher</option>
            <option value='Working Professional'>Working Professional</option>
            <option value='Developer'>Developer</option>
            <option value='Business Owner'>Business Owner</option>
            <option value='Other'>Other</option>
          </select>
        </div>
      </div>

      {error && (
        <p
          role='alert'
          className='rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700'
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <div className='border-t border-slate-200 pt-4'>
        <button
          type='submit'
          disabled={loading}
          className='w-full cursor-pointer rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {loading ? 'Submitting...' : 'Submit enrollment'}
        </button>

        <p className='mt-2 text-center text-xs text-slate-500'>
          Please ensure your contact details are correct.
        </p>
      </div>
    </form>
  )
}
