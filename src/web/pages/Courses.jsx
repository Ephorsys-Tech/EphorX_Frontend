import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Clock3, FileText } from 'lucide-react'

import { categoryApi } from '../../admin/api/categoryApi.js'
import { courseApi } from '../../admin/api/courseApi.js'
import Modal from '../../ui/Modal.jsx'
import SyllabusRequestModal from '../../components/modal/SyllabusRequestModal.jsx'
import { createSyllabusLead } from '../../admin/api/syllabusLeadApi.js'

const getDiscountPercent = course => {
  const original = Number(course?.Originalprice)
  const discounted = Number(course?.discountPrice)
  if (!original || !discounted || discounted >= original) return 0
  return Math.round((1 - discounted / original) * 100)
}

const formatPrice = value => {
  const number = Number(value)
  return Number.isNaN(number) ? '0' : number.toLocaleString('en-IN')
}

// Course image with a clean fallback if missing or broken
function CourseImage ({ src, alt }) {
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
    <div className='flex h-full w-full items-center justify-center bg-linear-to-br from-[#0b2a5b] to-blue-600'>
      <BookOpen size={30} strokeWidth={1.5} className='text-white/70' />
    </div>
  )
}

function CardSkeleton () {
  return (
    <div className='animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white'>
      <div className='aspect-video bg-slate-100' />
      <div className='space-y-2.5 p-4'>
        <div className='h-3 w-1/3 rounded bg-slate-100' />
        <div className='h-4 w-3/4 rounded bg-slate-100' />
        <div className='h-3 w-full rounded bg-slate-100' />
        <div className='h-9 rounded-lg bg-slate-100' />
      </div>
    </div>
  )
}

const Courses = () => {
  const navigate = useNavigate()
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All Courses')
  const [fetchedCourses, setFetchedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [syllabusForm, setSyllabusForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    qualification: ''
  })

  const [syllabusLoading, setSyllabusLoading] = useState(false)
  const [syllabusError, setSyllabusError] = useState('')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        setError('')

        const categoryResponse = await categoryApi.getAll()

        const categoryList = Array.isArray(categoryResponse)
          ? categoryResponse
          : categoryResponse?.categories ??
            categoryResponse?.data?.categories ??
            categoryResponse?.data ??
            []

        const response = await courseApi.getAll()

        const courses = Array.isArray(response)
          ? response
          : response?.courses ?? response?.data?.courses ?? []

        const coursesWithCategory = courses.map(course => {
          const matchedCategory = categoryList.find(
            category => category._id === course.categoryId
          )

          return {
            ...course,
            categoryName: matchedCategory?.name ?? 'Other'
          }
        })

        setFetchedCourses(coursesWithCategory)
      } catch (err) {
        console.error('Failed to fetch courses:', err)
        setError(err.message || 'Failed to load courses.')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = [
    'All Courses',
    ...new Set(
      fetchedCourses.map(course => course.categoryName).filter(Boolean)
    )
  ]

  const filteredCourses =
    activeCategory === 'All Courses'
      ? fetchedCourses
      : fetchedCourses.filter(course => course.categoryName === activeCategory)

  const openCourseDetails = (course) => {
  navigate(`/course-details/${course._id}`);
};

  const handleSyllabusSubmit = async e => {
    e.preventDefault()
    setSyllabusError('')

    if (!selectedSyllabusCourse) return

    try {
      setSyllabusLoading(true)

      const payload = {
        ...syllabusForm,
        courseId: selectedSyllabusCourse._id,
        courseName: selectedSyllabusCourse.title,
        syllabusUrl: selectedSyllabusCourse.syllabusUrl
      }

      const response = await createSyllabusLead(payload)

      if (!response.success) {
        throw new Error(response.message || 'Unable to save your details.')
      }

      const syllabusUrl = response.syllabusUrl || response.download?.syllabusUrl

      if (!syllabusUrl) {
        throw new Error(
          'Your details were saved, but the syllabus URL is missing.'
        )
      }

      // Open the syllabus after successful submission
      window.open(syllabusUrl, '_blank', 'noopener,noreferrer')

      setSyllabusForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        whatsappNumber: '',
        qualification: ''
      })

      setSelectedSyllabusCourse(null)
    } catch (error) {
      console.error('SYLLABUS SUBMISSION ERROR:', error)

      setSyllabusError(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setSyllabusLoading(false)
    }
  }

  const pillBase =
    'rounded-full border px-4 py-1.5 text-[13px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
  const pillActive = 'border-blue-700 bg-blue-700 text-white'
  const pillIdle =
    'border-slate-300 bg-white text-slate-700 hover:border-blue-700 hover:text-blue-700'

  return (
    <section
      id='courses'
      className='relative isolate overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-white pb-16 pt-8 sm:pt-10'
    >
      {/* Background design */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
      >
        <div className='absolute -top-10 left-[16%] h-[45%] w-20 skew-x-[-28deg] bg-linear-to-b from-white/70 to-white/0' />
        <div className='absolute -top-10 left-[60%] h-[45%] w-24 skew-x-[-28deg] bg-linear-to-b from-white/60 to-white/0' />
        <div className='absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/70 bg-linear-to-br from-blue-200/50 to-sky-100/10' />
        <div className='absolute left-[5%] top-32 h-12 w-12 rounded-full bg-blue-200/40' />
      </div>

      <div className='mx-auto max-w-7xl px-5 sm:px-8'>
        {/* Heading */}
        <div className='max-w-2xl'>
          <h2 className='text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl'>
            Explore Our <span className='text-blue-700'>Top Courses</span>
          </h2>
          <p className='mt-3 text-sm leading-6 text-slate-600 sm:text-base'>
            Upgrade your skills with industry-focused IT training, hands-on
            projects, and practical learning designed for your career.
          </p>
        </div>

        {/* Category filters */}
        <div
          className='mt-7 flex flex-wrap gap-2'
          role='tablist'
          aria-label='Filter courses by category'
        >
          {categories.map(category => (
            <button
              key={category}
              type='button'
              role='tab'
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={`${pillBase} ${
                activeCategory === category ? pillActive : pillIdle
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {!loading && !error && (
          <p className='mt-5 text-[13px] text-slate-600'>
            Showing{' '}
            <span className='font-semibold text-slate-900'>
              {filteredCourses.length}
            </span>{' '}
            {filteredCourses.length === 1 ? 'course' : 'courses'}
          </p>
        )}

        {/* Courses grid */}
        <div className='mt-4'>
          {loading ? (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {Array.from({ length: 8 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <p className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
              {error}
            </p>
          ) : filteredCourses.length === 0 ? (
            <div className='rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center'>
              <BookOpen className='mx-auto mb-3 text-blue-700' size={26} />
              <p className='text-sm font-semibold text-slate-900'>
                No courses found
              </p>
              <p className='mt-1 text-[13px] text-slate-600'>
                Try selecting a different category.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {filteredCourses.map((course, index) => {
                const discount = getDiscountPercent(course)

                return (
                  <motion.article
                    key={course._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(index % 4, 3) * 0.05
                    }}
                    className='group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10'
                  >
                    {/* Image */}
                    <div className='relative aspect-video shrink-0 overflow-hidden bg-slate-100'>
                      <CourseImage
                        src={course.imageUrl}
                        alt={course.title || 'Course'}
                      />

                      {course.type && (
                        <span className='absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold capitalize text-slate-800 shadow-sm'>
                          {course.type}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className='flex flex-1 flex-col p-4'>
                      <div className='flex items-center justify-between gap-2'>
                        <span className='truncate text-xs font-semibold text-blue-700'>
                          {course.categoryName}
                        </span>

                        {course.duration && (
                          <span className='flex shrink-0 items-center gap-1 text-xs text-slate-500'>
                            <Clock3 size={12} />
                            {course.duration}
                          </span>
                        )}
                      </div>

                      <h3 className='mt-2 line-clamp-2 min-h-10 text-[15px] font-semibold leading-5 text-slate-900'>
                        {course.title}
                      </h3>

                      <p className='mt-1.5 line-clamp-2 text-[13px] leading-5 text-slate-600'>
                        {course.description}
                      </p>

                      {/* Price and actions */}
                      <div className='mt-auto pt-4'>
                        <div className='flex items-baseline gap-2 border-t border-slate-100 pt-3'>
                          <span className='text-lg font-bold text-blue-800'>
                            ₹{formatPrice(course.discountPrice)}
                          </span>

                          {course.Originalprice != null && (
                            <span className='text-xs text-slate-400 line-through'>
                              ₹{formatPrice(course.Originalprice)}
                            </span>
                          )}

                          {discount > 0 && (
                            <span className='ml-auto text-xs font-semibold text-emerald-700'>
                              {discount}% off
                            </span>
                          )}
                        </div>

                        <div className='mt-3 flex items-center gap-2'>
                          <button
                            type='button'
                            onClick={() => setSelectedSyllabusCourse(course)}
                            className='inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-medium text-slate-700 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
                          >
                            <FileText size={14} />
                            Syllabus
                          </button>

                          <button
                            type='button'
                            onClick={() => openCourseDetails(course)}
                            className='group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-700 px-3 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2'
                          >
                            Explore
                            <ArrowRight
                              size={14}
                              className='transition-transform duration-300 group-hover/btn:translate-x-0.5'
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Syllabus request modal */}
      <Modal
        isOpen={Boolean(selectedSyllabusCourse)}
        onClose={() => setSelectedSyllabusCourse(null)}
        title='Get Course Syllabus'
        size='lg'
        theme='white'
      >
        <SyllabusRequestModal
          course={selectedSyllabusCourse}
          onClose={() => setSelectedSyllabusCourse(null)}
        />
      </Modal>
    </section>
  )
}

export default Courses
