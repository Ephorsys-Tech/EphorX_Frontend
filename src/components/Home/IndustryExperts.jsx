import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

import Modal from '../../ui/Modal'
import ExpertDetailsModal from '../modal/ExpertDetailsModal'
import { getAllTrainers } from '../../admin/api/trainerApi.js'

// Trainer item: round photo on a light-blue background, name and role below
function ExpertItem ({ expert, index, onViewDetails }) {
  const [failed, setFailed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: Math.min(index, 4) * 0.06 }}
      className='w-1/2 shrink-0 snap-start px-2 sm:w-1/3 lg:w-1/5'
    >
      <button
        type='button'
        onClick={() => onViewDetails(expert)}
        aria-label={`View details of ${expert.name}`}
        className='group flex w-full flex-col items-center rounded-2xl py-2 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
      >
        <div className='h-32 w-32 overflow-hidden rounded-full bg-sky-200 ring-4 ring-transparent transition duration-300 group-hover:ring-blue-200 sm:h-36 sm:w-36 lg:h-40 lg:w-40'>
          {expert.image && !failed ? (
            <img
              src={expert.image}
              alt={expert.name}
              loading='lazy'
              onError={() => setFailed(true)}
              className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-4xl font-bold text-blue-800'>
              {expert.name.trim().charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h3 className='mt-5 text-lg font-semibold text-slate-800 transition-colors group-hover:text-blue-700'>
          {expert.name}
        </h3>
        <p className='mt-1 line-clamp-2 text-base text-slate-600'>
          {expert.role}
        </p>
      </button>
    </motion.div>
  )
}

function ExpertSkeleton () {
  return (
    <div className='flex animate-pulse flex-col items-center'>
      <div className='h-36 w-36 rounded-full bg-slate-200 lg:h-40 lg:w-40' />
      <div className='mt-5 h-5 w-28 rounded bg-slate-200' />
      <div className='mt-2 h-4 w-20 rounded bg-slate-200' />
    </div>
  )
}

export default function IndustryExperts ({
  eyebrow = 'TOP SELECTED',
  title = 'Trainers from Industry',
  buttonText = 'Become a trainer',
  buttonTo = '/careers',
  showButton = true
}) {
  const [selectedExpert, setSelectedExpert] = useState(null)
  const [experts, setExperts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    const fetchTrainers = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getAllTrainers()
        const trainerList = Array.isArray(data) ? data : []

        const formattedTrainers = trainerList.map((trainer, index) => {
          const details =
            trainer.trainer && typeof trainer.trainer === 'object'
              ? trainer.trainer
              : trainer

          const avatar =
            typeof details.avatar === 'string'
              ? details.avatar
              : typeof details.image === 'string'
              ? details.image
              : typeof details.photo === 'string'
              ? details.photo
              : ''

          const experience =
            details.experience ??
            details.experienceYears ??
            details.yearsOfExperience

          return {
            ...details,
            id: details._id ?? details.id ?? index,
            name:
              (typeof details.name === 'string' && details.name) ||
              (typeof details.fullName === 'string' && details.fullName) ||
              'Expert Trainer',
            role:
              (typeof details.designation === 'string' &&
                details.designation) ||
              (typeof details.role === 'string' && details.role) ||
              'Instructor',
            field:
              (typeof details.field === 'string' && details.field) ||
              (typeof details.specialization === 'string' &&
                details.specialization) ||
              (typeof details.expertise === 'string' && details.expertise) ||
              'Professional Training',
            experience:
              experience != null && experience !== ''
                ? typeof experience === 'number'
                  ? `${experience}+ Years`
                  : String(experience)
                : 'Experienced Professional',
            description:
              (typeof details.description === 'string' &&
                details.description) ||
              (typeof details.bio === 'string' && details.bio) ||
              'Learn from an experienced industry professional.',
            image: avatar
          }
        })

        if (isMounted) setExperts(formattedTrainers)
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load trainers.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchTrainers()
    return () => {
      isMounted = false
    }
  }, [])

  // Enable / disable the arrow buttons
  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener('resize', updateArrows)
    return () => window.removeEventListener('resize', updateArrows)
  }, [experts, updateArrows])

  const scrollByAmount = direction => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const arrowClass =
    'absolute top-[72px] z-10 hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-md transition hover:border-blue-700 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-800 sm:flex lg:top-20'

  return (
    <section
      id='industry-experts'
      className='relative overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/70 to-white py-16 sm:py-16'
    >
      {/* Background design: bubbles and soft diagonal streaks */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 overflow-hidden'
      >
        {/* Diagonal light streaks (same style as the category cards) */}
        <div className='absolute -top-10 left-[12%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[38%] h-[130%] w-14 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />
        <div className='absolute -top-10 left-[66%] h-[130%] w-32 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />

        {/* Large bubbles */}
        <div className='absolute -left-24 -top-24 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/60 to-sky-100/10' />
        <div className='absolute -bottom-28 -right-20 h-96 w-96 rounded-full border border-white/70 bg-gradient-to-tl from-blue-200/60 to-sky-100/10' />

        {/* Medium bubbles */}
        <div className='absolute right-[9%] top-10 h-36 w-36 rounded-full border border-white/70 bg-gradient-to-br from-sky-200/60 to-white/10' />
        <div className='absolute bottom-24 left-[6%] h-28 w-28 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-white/10' />

        {/* Small bubbles */}
        <div className='absolute left-[27%] top-24 h-8 w-8 rounded-full bg-blue-300/40' />
        <div className='absolute right-[26%] top-[58%] h-10 w-10 rounded-full bg-sky-300/40' />
        <div className='absolute bottom-16 left-[44%] h-5 w-5 rounded-full bg-blue-400/30' />
        <div className='absolute right-[4%] top-[48%] h-6 w-6 rounded-full bg-blue-300/40' />
        <div className='absolute left-[3%] top-[45%] h-4 w-4 rounded-full bg-sky-400/40' />
      </div>

      <div className='relative z-10 mx-auto max-w-7xl px-5 sm:px-8'>
        {/* Heading */}
        <div className='mb-12 text-center'>
          <p className='text-base font-semibold tracking-wide text-blue-800'>
            {eyebrow}
          </p>
          <h2 className='mt-2 text-3xl font-bold tracking-tight text-[#0b2a5b] sm:text-4xl lg:text-5xl'>
            {title}
          </h2>
        </div>

        {loading ? (
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5'>
            {Array.from({ length: 5 }).map((_, i) => (
              <ExpertSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700'>
            {error}
          </p>
        ) : experts.length === 0 ? (
          <p className='py-8 text-center text-slate-600'>
            No trainers available yet.
          </p>
        ) : (
          <div className='relative sm:px-14'>
            <button
              type='button'
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
              aria-label='Previous trainers'
              className={`${arrowClass} left-0`}
            >
              <ChevronLeft size={22} />
            </button>

            <div
              ref={scrollRef}
              onScroll={updateArrows}
              className='-mx-2 flex snap-x snap-mandatory overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'
            >
              {experts.map((expert, index) => (
                <ExpertItem
                  key={expert.id}
                  expert={expert}
                  index={index}
                  onViewDetails={setSelectedExpert}
                />
              ))}
            </div>

            <button
              type='button'
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
              aria-label='Next trainers'
              className={`${arrowClass} right-0`}
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}

        {/* Call to action */}
        {showButton && (
          <div className='mt-12 text-center'>
            <Link
              to={buttonTo}
              className='group inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
            >
              {buttonText}
              <ArrowRight
                size={17}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </Link>
          </div>
        )}
      </div>

      {/* Expert details modal */}
      <Modal
        isOpen={Boolean(selectedExpert)}
        onClose={() => setSelectedExpert(null)}
        title='Expert Details'
        size='lg'
        theme='white'
      >
        <ExpertDetailsModal
          expert={selectedExpert}
          onClose={() => setSelectedExpert(null)}
        />
      </Modal>
    </section>
  )
}
