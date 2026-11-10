import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import { categoryApi } from '../../admin/api/categoryApi.js'
import { courseApi } from '../../admin/api/courseApi.js'

// Find the category image from whichever field your backend uses
const getCategoryImage = category => {
  const value =
    category.image ??
    category.imageUrl ??
    category.image_url ??
    category.thumbnail ??
    category.icon ??
    category.logo ??
    ''
  if (typeof value === 'string') return value
  return value?.url ?? value?.secure_url ?? ''
}

// Thumbnail: category image, or a clean initial tile if there is no image
function Thumb ({ src, title }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt=''
        loading='lazy'
        onError={() => setFailed(true)}
        className='h-[88px] w-[88px] shrink-0 rounded-lg object-cover'
      />
    )
  }

  return (
    <div
      aria-hidden='true'
      className='flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#0b2a5b] to-blue-700 text-3xl font-bold text-white'
    >
      {title.trim().charAt(0).toUpperCase()}
    </div>
  )
}

function CategoryCard ({ title, image, courses, to, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className='h-full'
    >
      <Link
        to={to}
        className='group relative flex h-full min-h-[130px] gap-4 overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-sky-50 via-blue-50 to-blue-100 p-3 transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
      >
        {/* Card background design */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 overflow-hidden'
        >
          {/* Soft diagonal light streaks */}
          <div className='absolute -top-10 left-[18%] h-52 w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0 transition-transform duration-500 group-hover:translate-x-3' />
          <div className='absolute -top-10 left-[42%] h-52 w-12 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0 transition-transform duration-500 group-hover:translate-x-4' />
          <div className='absolute -top-10 left-[62%] h-52 w-28 -skew-x-[28deg] bg-gradient-to-b from-white/50 to-white/0 transition-transform duration-500 group-hover:translate-x-2' />
          {/* Corner shapes */}
          <div className='absolute -bottom-10 -left-8 h-20 w-44 -rotate-[16deg] bg-blue-200/60' />
          <div className='absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-200/50 blur-xl' />
          <div className='absolute -bottom-12 right-6 h-24 w-24 rounded-full bg-sky-200/50 blur-xl' />
        </div>

        <div className='relative z-10'>
          <Thumb src={image} title={title} />
        </div>

        <div className='relative z-10 flex min-w-0 flex-1 flex-col justify-between py-0.5'>
          <h3 className='line-clamp-2 text-[17px] font-semibold leading-snug text-[#0b2a5b] transition-colors group-hover:text-blue-700'>
            {title}
          </h3>

          <div className='mt-3 flex items-center justify-between gap-2'>
            <span className='rounded-full border border-slate-300 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700'>
              {courses} {courses === 1 ? 'Course' : 'Courses'}
            </span>
            <ArrowRight
              size={16}
              className='text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-blue-700'
            />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function CardSkeleton () {
  return (
    <div className='flex animate-pulse gap-4 rounded-xl border border-slate-200 bg-white p-3'>
      <div className='h-[88px] w-[88px] rounded-lg bg-slate-100' />
      <div className='flex-1 space-y-3 py-1'>
        <div className='h-4 w-3/4 rounded bg-slate-100' />
        <div className='h-5 w-1/3 rounded-full bg-slate-100' />
      </div>
    </div>
  )
}

export default function CoursesByCategory ({
  title = 'Courses by',
  highlight = 'Category',
  description = 'Discover your next skill with expert-led courses designed to help you learn, grow, and move forward.',
  buttonText = 'Explore all courses',
  buttonTo = '/Courses',
  showButton = true,
  columns = 3,
  fullWidth = false
}) {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const [categoryResponse, courseResponse] = await Promise.all([
          categoryApi.getAll(),
          courseApi.getAll()
        ])

        const categoryData = Array.isArray(categoryResponse)
          ? categoryResponse
          : Array.isArray(categoryResponse?.categories)
          ? categoryResponse.categories
          : Array.isArray(categoryResponse?.data)
          ? categoryResponse.data
          : Array.isArray(categoryResponse?.data?.categories)
          ? categoryResponse.data.categories
          : []

        const courseData = Array.isArray(courseResponse)
          ? courseResponse
          : Array.isArray(courseResponse?.courses)
          ? courseResponse.courses
          : Array.isArray(courseResponse?.data?.courses)
          ? courseResponse.data.courses
          : []

        if (isMounted) {
          setCategories(categoryData)
          setCourses(courseData)
        }
      } catch (err) {
        console.error('Failed to fetch categories or courses:', err)
        if (isMounted) {
          setError(err.message || 'Failed to load categories and courses.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  const columnClasses = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4'
  }
  const grid = `grid grid-cols-1 gap-4 sm:gap-5 ${
    columnClasses[columns] || columnClasses[3]
  }`

  const getCourseCount = categoryId =>
    courses.filter(c => String(c.categoryId) === String(categoryId)).length

  return (
    <section className={`bg-white py-16 sm:py-20 ${fullWidth ? 'w-full' : ''}`}>
      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        {/* Section heading */}
        <div className='mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end'>
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

        {/* Category cards */}
        {loading ? (
          <div className={grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <p className='rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
            {error}
          </p>
        ) : categories.length === 0 ? (
          <p className='rounded-xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600'>
            No categories are available yet. Please check back soon.
          </p>
        ) : (
          <div className={grid}>
            {categories.map((category, index) => {
              const categoryId = category._id ?? category.id
              return (
                <CategoryCard
                  key={categoryId ?? index}
                  index={index}
                  title={
                    category.title ??
                    category.name ??
                    category.categoryName ??
                    category.category_name ??
                    'Untitled category'
                  }
                  image={getCategoryImage(category)}
                  courses={getCourseCount(categoryId)}
                  to='/Courses'
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
