import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  UsersRound,
  Video
} from 'lucide-react'
import Modal from '../../ui/Modal'
import WebinarEnrollModal from '../modal/WebinarEnrollModal'
import { getAllWebinars } from '../../admin/api/webinarApi.js'

// Cover image with a clean fallback if missing or broken
function Cover ({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading='lazy'
        onError={() => setFailed(true)}
        className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
      />
    )
  }

  return (
    <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a5b] to-blue-700'>
      <Video size={36} className='text-white/70' />
    </div>
  )
}

// Trainer avatar with initial fallback
function Avatar ({ src, name }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        loading='lazy'
        onError={() => setFailed(true)}
        className='h-10 w-10 shrink-0 rounded-full border border-slate-200 object-cover'
      />
    )
  }

  return (
    <div
      aria-hidden='true'
      className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700'
    >
      {name.trim().charAt(0).toUpperCase()}
    </div>
  )
}

function WebinarCard ({ webinar, index, onEnroll }) {
  const isLive = webinar.type === 'live'

  const buttonClass =
    'inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.08 }}
      className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10'
    >
      {/* Cover */}
      <div className='relative aspect-[16/10] overflow-hidden bg-slate-100'>
        <Cover src={webinar.image} alt={webinar.title} />

        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
            isLive ? 'bg-red-600 text-white' : 'bg-white text-slate-800'
          }`}
        >
          {isLive && (
            <span className='h-1.5 w-1.5 animate-pulse rounded-full bg-white' />
          )}
          {isLive ? 'Live session' : 'Recorded'}
        </span>
      </div>

      {/* Content */}
      <div className='flex flex-1 flex-col p-5'>
        <span className='w-fit rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700'>
          {webinar.category}
        </span>

        <h3 className='mt-3 line-clamp-2 text-lg font-semibold leading-snug text-slate-900'>
          {webinar.title}
        </h3>

        {webinar.description && (
          <p className='mt-2 line-clamp-2 text-sm leading-6 text-slate-600'>
            {webinar.description}
          </p>
        )}

        {/* Date and time */}
        <div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-700'>
          <span className='flex items-center gap-2'>
            <CalendarDays size={16} className='text-blue-700' />
            {webinar.date}
          </span>
          <span className='flex items-center gap-2'>
            <Clock3 size={16} className='text-blue-700' />
            {isLive ? webinar.time : webinar.duration}
          </span>
        </div>

        {/* Trainer */}
        <div className='mt-5 flex items-center gap-3 border-t border-slate-100 pt-4'>
          <Avatar src={webinar.photo} name={webinar.trainer} />
          <div className='min-w-0 flex-1'>
            <p className='truncate text-sm font-semibold text-slate-900'>
              {webinar.trainer}
            </p>
            <p className='truncate text-xs text-slate-500'>{webinar.role}</p>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-auto flex items-center justify-between gap-3 pt-5'>
          <span className='flex items-center gap-1.5 text-xs text-slate-500'>
            <UsersRound size={14} className='text-slate-400' />
            {webinar.attendees} enrolled
          </span>

          {isLive ? (
            <button
              type='button'
              onClick={() => onEnroll(webinar)}
              className={buttonClass}
            >
              Enroll now
              <ArrowRight size={15} />
            </button>
          ) : (
            <Link to={webinar.to || '/Courses'} className={buttonClass}>
              Watch now
              <ArrowRight size={15} />
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function CardSkeleton () {
  return (
    <div className='animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white'>
      <div className='aspect-[16/10] bg-slate-100' />
      <div className='space-y-3 p-5'>
        <div className='h-4 w-20 rounded-full bg-slate-100' />
        <div className='h-5 w-3/4 rounded bg-slate-100' />
        <div className='h-3 w-full rounded bg-slate-100' />
        <div className='h-3 w-2/3 rounded bg-slate-100' />
      </div>
    </div>
  )
}

export default function WebinarsSection ({
  title = 'Live Webinars',
  highlight = 'By Industry Experts',
  description = 'Learn directly from experienced professionals, explore new technologies, and gain insights you can put into practice.',
  buttonText = 'Explore all webinars',
  buttonTo = '/webinars',
  showButton = true
}) {
  const [selectedWebinar, setSelectedWebinar] = useState(null)
  const [webinars, setWebinars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchWebinars = async () => {
      try {
        setLoading(true)
        const data = await getAllWebinars()
        if (isMounted) setWebinars(data || [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load webinars')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchWebinars()
    return () => {
      isMounted = false
    }
  }, [])

  const handleEnrollment = (formData, webinarData) => {
    console.log('Webinar enrollment:', {
      ...formData,
      webinarId: webinarData?.id,
      webinarTitle: webinarData?.title
    })
  }

  // Normalise backend data for the card
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

  return (
    <>
      <section className='bg-slate-50 py-16 sm:py-20'>
        <div className='mx-auto max-w-7xl px-5 sm:px-8'>
          {/* Heading */}
          <div className='mb-10 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end'>
            <div className='max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
                {title} <span className='text-blue-700'>{highlight}</span>
              </h2>
              {description && (
                <p className='mt-3 max-w-xl text-base leading-7 text-slate-600'>
                  {description}
                </p>
              )}
            </div>

            {showButton && (
              <Link
                to={buttonTo}
                className='group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
              >
                {buttonText}
                <ArrowRight
                  size={16}
                  className='transition-transform duration-300 group-hover:translate-x-1'
                />
              </Link>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {error}
            </p>
          )}

          {/* Webinar cards */}
          {!loading && !error && webinars.length > 0 && (
            <div className='-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'>
              {webinars.map((webinar, index) => (
                <div
                  key={webinar._id ?? webinar.id ?? `${webinar.title}-${index}`}
                  className='w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]'
                >
                  <WebinarCard
                    webinar={mapWebinar(webinar)}
                    index={index}
                    onEnroll={setSelectedWebinar}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && webinars.length === 0 && (
            <div className='rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center'>
              <Video className='mx-auto mb-3 text-blue-700' size={28} />
              <p className='font-semibold text-slate-900'>
                No webinars available yet
              </p>
              <p className='mt-1 text-sm text-slate-600'>
                Check back soon for upcoming sessions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Enrollment modal */}
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
