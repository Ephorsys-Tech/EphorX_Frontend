import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

// Review data

const reviews = [
  {
    name: "Barsha Priyadarshini Sahoo",
    role: "MERN Stack & AI DevOps Student",
    initials: "BS",
    rating: 5,
    text: "The learning experience was very good and informative. The course helped me improve my technical knowledge and practical skills. The concepts were explained clearly, and the practical sessions helped me understand the topics better. Overall, it was a valuable experience that will help me in my future career.",
    course: "MERN Stack & AI DevOps",
  },
   {
    name: "Mandakini Das",
    role: "MERN Stack & DevOps Student",
    initials: "MD",
    rating: 5,
    text: "Your teaching style is really good, and the way you explain every concept makes it easy to understand. You always focus on clearing the basics and explaining topics in a simple and practical way. Your classes are very helpful and make learning more interesting. Thank you so much Sir, for your guidance, patience, and support. I really appreciate your efforts. 🙏🏻",
    course: "MERN Stack & DevOps",
  },
  {
    name: "Bibhuti Bhusan Sahoo",
    role: "MERN Stack Development Student",
    initials: "BS",
    rating: 5,
    text: "My learning experience has been very good. The concepts are explained clearly with practical examples, which makes learning easier. I have improved my knowledge of HTML, CSS, JavaScript, React.js, and other MERN Stack technologies. The teaching approach is helpful and interactive. Thank you, Sir, for your guidance and support.",
    course: "MERN Stack Development",
  },
  {
    name: "Arpeet pattanaik",
    role: "MERN Stack & AI DevOps Student",
    initials: "AP",
    rating: 5,
    text: "Teacher is best in teaching better then my collage teachers. He helps all the time and clear doubts and help to improve knowledge. Thank you 🫡",
    course: "MERN Stack & AI DevOps",
  },
  {
    name: "Sonalita Behera",
    role: "MERN Stack & AI DevOps Student",
    initials: "SB",
    rating: 5,
    text: "The best Teacher in every possible way. Thank you 😊",
    course: "MERN Stack & AI DevOps",
  },
  {
    name: "SATYAPRIYABRAT PRADHAN",
    role: "MERN Stack & AI DevOps Student",
    initials: "SP",
    rating: 5,
    text: "The teaching experience was excellent! The teacher explains every topic in a clear, simple, and understandable way. The teaching methods are very effective, interactive, and engaging. They are always supportive, patient, and helpful in clearing doubts. I really appreciate their dedication, knowledge, and friendly approach towards students. Overall, it was a wonderful learning experience, and I would highly recommend this teacher. Truly deserving of a 5-star rating!",
    course: "MERN Stack & AI DevOps",
  },
  {
    name: "Prativa Priyadarshini",
    role: "MERN Stack & AI DevOps Student",
    initials: "PP",
    rating: 5,
    text: "Very good learning experience, concepts were easy to understand and very helpful. Special thanks to Manoj Sir for his guidance and support. Thank you sir 😊",
    course: "MERN Stack & AI DevOps",
  },
  {
    name: "Kiranjit Mahunta",
    role: "MERN Stack & AI DevOps Student",
    initials: "KM",
    rating: 5,
    text: "Excellent explanation skills and very professional and conceptual or fundamental clear and easy to understand every concept through the Monaj sir it’s very helpful for me",
    course: "MERN Stack & AI DevOps",
  },
 
  {
    name: "Loni Swain",
    role: "MERN Stack & DevOps Student",
    initials: "LS",
    rating: 5,
    text: "Your teaching style is really good, and the way you explain every concept makes it easy to understand. You always focus on clearing the basics and explaining topics in a simple and practical way. Your classes are very helpful and make learning more interesting. Thank you so much Sir, for your guidance, patience, and support. I really appreciate your efforts. 🙏🏻",
    course: "MERN Stack & DevOps",
  },
  {
    name: "Sonali Parida",
    role: "MERN Stack Student",
    initials: "SP",
    rating: 5,
    text: "Your teaching style is really good, and the way you explain every concept makes it easy to understand. You always focus on clearing the basics and explaining topics in a simple and practical way. Your classes are very helpful and make learning more interesting. Thank you so much Sir, for your guidance, patience, and support. I really appreciate your efforts. 🙏🏻",
    course: "MERN Stack",
  },
  {
    name: "ROHAN PRADHAN",
    role: "MERN Stack Student",
    initials: "RP",
    rating: 5,
    text: "The teaching was good and easy to understand. The teachers explained everything clearly and helped us whenever we had doubts. Overall, it was a good learning experience.",
    course: "MERN Stack",
  },
  {
    name: "Pragyan paramita Rout",
    role: "MERN Stack & AI DevOps Student",
    initials: "PR",
    rating: 5,
    text: "Special thanks to Manoj sir, his teaching style is very good. He explain everything perfectly and he is very supportive person. Thank you 😊 Thank you sir 🙏🏻",
    course: "MERN Stack & AI DevOps",
  },
];


// TODO: replace with your real rating
const AVERAGE_RATING = '4.9'

function Stars ({ rating = 5, size = 16 }) {
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

function ReviewCard ({ review, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.06 }}
      className='flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/5'
    >
      <Stars rating={review.rating} />

      <p className='mt-4 flex-1 text-base leading-7 text-slate-700'>
        &ldquo;{review.text}&rdquo;
      </p>

      <div className='mt-6 flex items-center gap-3 border-t border-slate-100 pt-5'>
        <div
          aria-hidden='true'
          className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white'
        >
          {review.initials}
        </div>

        <div className='min-w-0 flex-1'>
          <h3 className='truncate text-sm font-semibold text-slate-900'>
            {review.name}
          </h3>
          <p className='truncate text-xs text-slate-500'>{review.role}</p>
        </div>

        <span className='hidden shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 sm:inline'>
          {review.course}
        </span>
      </div>
    </motion.article>
  )
}

export default function ReviewsSection () {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

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
  }, [updateArrows])

  const scrollByAmount = direction => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' })
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

      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
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
            <p className='text-4xl font-bold text-blue-800'>{AVERAGE_RATING}</p>
            <div>
              <Stars />
              <p className='mt-1 text-xs text-slate-500'>
                Average student rating
              </p>
            </div>
          </div>

          <div className='p-5'>
            <p className='font-semibold text-slate-900'>Project-led learning</p>
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

        {/* Reviews heading and arrows */}
        <div className='mb-6 flex items-center justify-between gap-4'>
          <h3 className='text-xl font-semibold text-slate-900 sm:text-2xl'>
            What our students say
          </h3>

          <div className='flex gap-2'>
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

        {/* Review cards */}
        <div
          ref={scrollRef}
          onScroll={updateArrows}
          className='-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
        >
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className='w-[85%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
            >
              <ReviewCard review={review} index={index} />
            </div>
          ))}
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
