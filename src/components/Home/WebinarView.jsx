import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import Modal from '../../ui/Modal'
import WebinarEnrollModal from '../modal/WebinarEnrollModal'
import { getAllWebinars } from '../../admin/api/webinarApi.js'

// Webinar image with fallback
function WebinarImage ({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className='h-full w-full object-cover'
      />
    )
  }

  return (
    <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a5b] to-blue-600'>
      <span className='text-sm font-semibold uppercase tracking-wider text-white/70'>
        EphorX Webinar
      </span>
    </div>
  )
}

// Speaker photo with initial fallback
function SpeakerPhoto ({ src, name }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className='h-[72px] w-[72px] shrink-0 rounded-full border border-slate-200 object-cover'
      />
    )
  }

  return (
    <div
      aria-hidden='true'
      className='flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-700'
    >
      {name.trim().charAt(0).toUpperCase()}
    </div>
  )
}

function DetailRow ({ label, value }) {
  return (
    <div className='flex items-start justify-between gap-4 py-3'>
      <dt className='text-sm text-slate-500'>{label}</dt>
      <dd className='min-w-0 break-words text-right text-sm font-semibold text-slate-900'>
        {value}
      </dd>
    </div>
  )
}

const backLink =
  'inline-flex items-center text-sm font-medium text-slate-600 transition hover:text-blue-700'

export default function WebinarView () {
  const { id } = useParams()
  const location = useLocation()

  const [webinar, setWebinar] = useState(location.state?.webinar || null)

  const [loading, setLoading] = useState(!location.state?.webinar)
  const [error, setError] = useState('')
  const [selectedWebinar, setSelectedWebinar] = useState(null)

  // Fetch webinar details
  useEffect(() => {
    let isMounted = true

    const fetchWebinar = async () => {
      try {
        setLoading(true)

        const data = await getAllWebinars()

        const foundWebinar = (data || []).find(
          item => String(item._id ?? item.id) === String(id)
        )

        if (!foundWebinar) {
          if (isMounted) {
            setError('Webinar not found')
          }
          return
        }

        if (isMounted) {
          setWebinar(foundWebinar)
          setError('')
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load webinar details')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchWebinar()

    return () => {
      isMounted = false
    }
  }, [id])

  // Existing webinar data mapping
  const mapWebinar = webinar => ({
    ...webinar,

    id: webinar._id ?? webinar.id,

    image: webinar.image || webinar.thumbnail,

    title: webinar.title || 'Untitled webinar',

    description: webinar.description || '',

    trainer:
      webinar.trainer?.name || webinar.instructor?.name || 'Expert trainer',

    role:
      webinar.trainer?.designation ||
      webinar.instructor?.designation ||
      webinar.designation ||
      'Instructor',

    photo:
      webinar.trainer?.avatar ||
      webinar.instructor?.avatar ||
      webinar.photo ||
      webinar.avatar ||
      webinar.instructorAvatar,

    date: webinar.date
      ? new Date(webinar.date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          timeZone: 'Asia/Kolkata'
        })
      : 'Date not announced',

    time: webinar.startTime || 'To be announced',

    duration: webinar.duration || 'Duration not specified',

    attendees:
      webinar.attendeeCount ??
      webinar.attendees ??
      webinar.attendeesCount ??
      webinar.registeredUsers?.length ??
      webinar.enrolledUsers?.length ??
      0,

    type: webinar.type || 'recorded',

    category: webinar.category || 'Webinar'
  })

  // Existing enrollment handler
  const handleEnrollment = (formData, webinarData) => {
    console.log('Webinar enrollment:', {
      ...formData,
      webinarId: webinarData?.id,
      webinarTitle: webinarData?.title
    })
  }

  // Loading
  if (loading) {
    return (
      <section className='min-h-[70vh] bg-white pb-16 pt-8 sm:pt-10'>
        <div className='mx-auto max-w-7xl animate-pulse space-y-8 px-5 sm:px-8'>
          <div className='h-4 w-36 rounded bg-slate-200' />
          <div className='h-9 w-3/4 rounded bg-slate-200' />

          <div className='grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]'>
            <div className='space-y-6'>
              <div className='aspect-[16/9] rounded-2xl bg-slate-200' />
              <div className='h-28 rounded-xl bg-slate-100' />
            </div>
            <div className='h-[380px] rounded-2xl bg-slate-100' />
          </div>
        </div>
      </section>
    )
  }

  // Error
  if (error || !webinar) {
    return (
      <section className='flex min-h-[60vh] flex-col items-center justify-center bg-white px-5 text-center'>
        <h2 className='text-2xl font-bold text-slate-900'>
          {error || 'Webinar not found'}
        </h2>

        <p className='mt-2 text-sm text-slate-600'>
          The webinar you&rsquo;re looking for may not be available.
        </p>

        <Link
          to='/'
          className='mt-6 inline-flex items-center rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800'
        >
          Back to home
        </Link>
      </section>
    )
  }

  const details = mapWebinar(webinar)
  const isLive = details.type === 'live'

  return (
    <>
      <section className='relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white pb-20 pt-8 sm:pt-10'>
        {/* Background design */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
        >
          <div className='absolute -top-10 left-[16%] h-[40%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />
          <div className='absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10' />
          <div className='absolute left-[4%] top-40 h-12 w-12 rounded-full bg-blue-200/40' />
        </div>

        <div className='mx-auto max-w-7xl px-5 sm:px-8'>
          <Link to='/' className={backLink}>
            &larr; Back to webinars
          </Link>

          {/* Page title */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className='mb-8 mt-5'
          >
            <div className='flex flex-wrap items-center gap-2'>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  isLive
                    ? 'bg-red-50 text-red-700'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isLive && (
                  <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-red-600' />
                )}
                {isLive ? 'Live session' : 'Recorded webinar'}
              </span>

              <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700'>
                {details.category}
              </span>
            </div>

            <h1 className='mt-4 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl'>
              {details.title}
            </h1>
          </motion.div>

          {/* Two-column layout */}
          <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)] lg:gap-10'>
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className='min-w-0 space-y-8'
            >
              <div className='aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100'>
                <WebinarImage src={details.image} alt={details.title} />
              </div>

              <section className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-7'>
                <h2 className='text-lg font-bold text-slate-900'>
                  About this webinar
                </h2>
                <p className='mt-3 whitespace-pre-line text-[15px] leading-7 text-slate-600'>
                  {details.description ||
                    'No description available for this webinar.'}
                </p>
              </section>

              <section className='rounded-2xl border border-slate-200 bg-white p-6 sm:p-7'>
                <h2 className='text-lg font-bold text-slate-900'>Speaker</h2>

                <div className='mt-5 flex flex-wrap items-center gap-4'>
                  <SpeakerPhoto src={details.photo} name={details.trainer} />

                  <div className='min-w-0'>
                    <h3 className='text-base font-semibold text-slate-900'>
                      {details.trainer}
                    </h3>
                    <p className='mt-0.5 text-sm text-blue-700'>
                      {details.role}
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>

            {/* Right content */}
            <motion.aside
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className='min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-900/5 lg:sticky lg:top-32'
            >
              <h2 className='text-xl font-bold text-slate-900'>
                Ready to join?
              </h2>
              <p className='mt-2 text-sm leading-6 text-slate-600'>
                Reserve your place and take the next step in your learning
                journey.
              </p>

              <button
                type='button'
                onClick={() => setSelectedWebinar(details)}
                className='cursor-pointer mt-5 w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
              >
                Enroll now
              </button>

              <h3 className='mb-1 mt-7 text-sm font-semibold text-slate-900'>
                Webinar details
              </h3>

              <dl className='divide-y divide-slate-100 border-t border-slate-100'>
                <DetailRow label='Date' value={details.date} />
                <DetailRow
                  label={isLive ? 'Starts at' : 'Duration'}
                  value={isLive ? details.time : details.duration}
                />
                <DetailRow label='Participants' value={details.attendees} />
                <DetailRow label='Category' value={details.category} />
                <DetailRow
                  label='Format'
                  value={isLive ? 'Live webinar' : 'Recorded webinar'}
                />
              </dl>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Existing enrollment modal */}
      <Modal
        isOpen={Boolean(selectedWebinar)}
        onClose={() => setSelectedWebinar(null)}
        title='Enroll in Webinar'
        size='lg'
        theme='white'
      >
        <WebinarEnrollModal
          webinar={selectedWebinar}
          onClose={() => setSelectedWebinar(null)}
          onSubmit={handleEnrollment}
        />
      </Modal>
    </>
  )
}
