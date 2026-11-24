
import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Review data
const reviews = [
  {
    name: 'Barsha Priyadarshini Sahoo',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'BS',
    rating: 5,
    text: 'The course was informative and helped me improve my technical and practical skills.',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'Mandakini Das',
    role: 'MERN Stack & DevOps Student',
    initials: 'MD',
    rating: 5,
    text: 'Concepts are explained simply and clearly. Thank you Sir for your guidance and support. 🙏🏻',
    course: 'MERN Stack & DevOps'
  },
  {
    name: 'Bibhuti Bhusan Sahoo',
    role: 'MERN Stack Development Student',
    initials: 'BS',
    rating: 5,
    text: 'Practical examples made learning MERN technologies easier. Thank you for your support.',
    course: 'MERN Stack Development'
  },
  {
    name: 'Arpeet pattanaik',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'AP',
    rating: 5,
    text: 'The teacher explains well, clears doubts, and always helps improve our knowledge. 🫡',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'Sonalita Behera',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'SB',
    rating: 5,
    text: 'The best teacher in every possible way. Thank you! 😊',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'SATYAPRIYABRAT PRADHAN',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'SP',
    rating: 5,
    text: 'Excellent teaching, clear explanations, and helpful guidance. A wonderful learning experience!',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'Prativa Priyadarshini',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'PP',
    rating: 5,
    text: 'Very helpful learning experience. Special thanks to Manoj Sir for his guidance. 😊',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'Kiranjit Mahunta',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'KM',
    rating: 5,
    text: 'Excellent explanation skills. Fundamentals are clear and easy to understand.',
    course: 'MERN Stack & AI DevOps'
  },
  {
    name: 'Loni Swain',
    role: 'MERN Stack & DevOps Student',
    initials: 'LS',
    rating: 5,
    text: 'The teaching style is simple and helpful. Thank you Sir for your patience and support. 🙏🏻',
    course: 'MERN Stack & DevOps'
  },
  {
    name: 'Sonali Parida',
    role: 'MERN Stack Student',
    initials: 'SP',
    rating: 5,
    text: 'The concepts are explained clearly and make learning interesting. Thank you for your support.',
    course: 'MERN Stack'
  },
  {
    name: 'ROHAN PRADHAN',
    role: 'MERN Stack Student',
    initials: 'RP',
    rating: 5,
    text: 'Good learning experience. Teachers explain clearly and help whenever we have doubts.',
    course: 'MERN Stack'
  },
  {
    name: 'Pragyan paramita Rout',
    role: 'MERN Stack & AI DevOps Student',
    initials: 'PR',
    rating: 5,
    text: 'Manoj Sir explains everything perfectly and is very supportive. Thank you Sir! 😊',
    course: 'MERN Stack & AI DevOps'
  }
]

// TODO: replace with your real rating
const AVERAGE_RATING = '4.9'

function Stars({ rating = 5, size = 16 }) {
  return (
    <div
      className='flex gap-0.5'
      role='img'
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={
            star <= rating
              ? 'fill-amber-400 text-amber-400'
              : 'fill-slate-200 text-slate-200'
          }
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index, compact = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index, 3) * 0.06
      }}
      className={`flex h-full flex-col rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/5 ${
        compact ? 'min-h-[136px] p-3' : 'p-6'
      }`}
    >
      <Stars rating={review.rating} size={compact ? 14 : 16} />

      <p
        className={`mt-4 flex-1 text-slate-700 ${
          compact
            ? 'mt-2 line-clamp-2 text-xs leading-4'
            : 'text-base leading-7'
        }`}
      >
        {review.text}
      </p>

      <div
        className={`mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 ${
          compact ? 'mt-3 pt-2' : ''
        }`}
      >
        <div
          aria-hidden='true'
          className={`flex shrink-0 items-center justify-center rounded-full bg-blue-700 font-bold text-white ${
            compact
              ? 'h-8 w-8 text-[10px]'
              : 'h-11 w-11 text-sm'
          }`}
        >
          {review.initials}
        </div>

        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-sm font-semibold text-slate-900'>
            {review.name}
          </h3>

          <p className='truncate text-xs text-slate-500'>
            {review.role}
          </p>
        </div>

        <span className='hidden shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 sm:inline'>
          {review.course}
        </span>
      </div>
    </motion.article>
  )
}

export default function ReviewsSection() {
  const scrollRef = useRef(null)

  // Desktop carousel arrows
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Mobile manual + automatic scrolling
  const mobileScrollRef = useRef(null)
  const mobileGroupRefs = useRef([])
  const activeGroupRef = useRef(0)

  const mobileGroupCount = Math.ceil(reviews.length / 3)

  // Automatically scroll to the next group every 3 seconds
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (!window.matchMedia('(max-width: 639px)').matches) {
        return
      }

      const container = mobileScrollRef.current
      if (!container) return

      const nextGroup =
        (activeGroupRef.current + 1) % mobileGroupCount

      activeGroupRef.current = nextGroup

      const target = mobileGroupRefs.current[nextGroup]
      if (!target) return

      container.scrollTo({
        left: target.offsetLeft,
        behavior: 'smooth'
      })
    }, 3000)

    return () => window.clearInterval(interval)
  }, [mobileGroupCount])

  // Keep automatic scrolling in sync with manual scrolling
  const handleMobileScroll = useCallback(() => {
    const container = mobileScrollRef.current
    if (!container) return

    let closestGroup = 0
    let smallestDistance = Infinity

    mobileGroupRefs.current.forEach((group, index) => {
      if (!group) return

      const distance = Math.abs(
        group.offsetLeft - container.scrollLeft
      )

      if (distance < smallestDistance) {
        smallestDistance = distance
        closestGroup = index
      }
    })

    activeGroupRef.current = closestGroup
  }, [])

  // Desktop carousel arrow state
  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 4)

    setCanScrollRight(
      el.scrollLeft + el.clientWidth < el.scrollWidth - 4
    )
  }, [])

  useEffect(() => {
    updateArrows()

    window.addEventListener('resize', updateArrows)

    return () => {
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByAmount = direction => {
    const el = scrollRef.current
    if (!el) return

    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: 'smooth'
    })
  }

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition hover:border-blue-700 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer'

  return (
    <section className='relative isolate overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-sky-50 py-16 sm:py-12'>
      {/* Background design: soft bubbles and streaks */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[16%] h-[130%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0' />

        <div className='absolute -top-10 left-[58%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0' />

        <div className='absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10' />

        <div className='absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-tl from-blue-200/50 to-sky-100/10' />

        <div className='absolute right-[10%] top-14 h-24 w-24 rounded-full border border-white/70 bg-sky-200/40' />

        <div className='absolute bottom-24 left-[7%] h-6 w-6 rounded-full bg-blue-300/40' />
      </div>

      {/* Section content - aligned with CoursesByCategory */}
      <div className='mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-8'>
        {/* Heading */}
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-[#0b2a5b] sm:text-4xl lg:text-5xl'>
            Real learning. Real growth.
          </h2>

          <p className='mt-4 text-base leading-7 text-slate-600'>
            Hear from students who built practical skills and confidence with
            EphorX.
          </p>
        </div>

        {/* Rating overview */}
        <div className='mx-auto mb-12 grid max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0'>
          <div className='flex items-center gap-4 p-5'>
            <p className='text-4xl font-bold text-blue-800'>
              {AVERAGE_RATING}
            </p>

            <div>
              <Stars />

              <p className='mt-1 text-xs text-slate-500'>
                Average student rating
              </p>
            </div>
          </div>

          <div className='p-5'>
            <p className='font-semibold text-slate-900'>
              Project-led learning
            </p>

            <p className='mt-1 text-sm text-slate-600'>
              Build real projects as you learn.
            </p>
          </div>

          <div className='p-5'>
            <p className='font-semibold text-slate-900'>
              Student-first support
            </p>

            <p className='mt-1 text-sm text-slate-600'>
              Mentors who guide you at every step.
            </p>
          </div>
        </div>

        {/* Reviews heading and desktop arrows */}
        <div className='mb-6 flex items-center justify-between gap-4'>
          <h3 className='text-xl font-semibold text-slate-900 sm:text-2xl'>
            What our students say
          </h3>

          <div className='hidden gap-2 sm:flex'>
            <button
              type='button'
              onClick={() => scrollByAmount(-1)}
              disabled={!canScrollLeft}
              aria-label='Previous reviews'
              className={arrowClass}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type='button'
              onClick={() => scrollByAmount(1)}
              disabled={!canScrollRight}
              aria-label='Next reviews'
              className={arrowClass}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Desktop review cards - horizontal carousel */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className='hidden snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className='w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
            >
              <ReviewCard
                review={review}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Mobile reviews - horizontal manual + auto scroll */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className='flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden sm:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {Array.from({ length: mobileGroupCount }).map((_, groupIndex) => {
            const groupReviews = reviews.slice(
              groupIndex * 3,
              groupIndex * 3 + 3
            )

            return (
              <div
                key={groupIndex}
                ref={element => {
                  mobileGroupRefs.current[groupIndex] = element
                }}
                className='flex w-full shrink-0 snap-start flex-col gap-3'
              >
                {groupReviews.map((review, index) => (
                  <ReviewCard
                    key={review.name}
                    review={review}
                    index={index}
                    compact
                  />
                ))}
              </div>
            )
          })}
        </div>

        {/* Call to action */}
        <div className='mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-[#0b2a5b] p-6 text-white sm:flex-row sm:items-center sm:px-8'>
          <div>
            <h3 className='text-lg font-semibold'>
              Your journey could be next.
            </h3>

            <p className='mt-1 text-sm text-blue-100/90'>
              Find a learning path that matches your goals.
            </p>
          </div>

          <Link
            to='/Courses'
            className='group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b2a5b]'
          >
            Explore courses

            <ArrowRight
              size={16}
              className='transition-transform duration-300 group-hover:translate-x-1'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
