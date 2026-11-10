import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowRight, Video } from 'lucide-react'
import { getAllWebinars } from '../../admin/api/webinarApi.js'

// Webinar image
function Cover({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    )
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0b2a5b] to-blue-700">
      <Video size={36} className="text-white/70" />
    </div>
  )
}

// Webinar Card
function WebinarCard({ webinar, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Cover src={webinar.image || webinar.thumbnail} alt={webinar.title} />
      </div>

      {/* Title and View Button */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900">
          {webinar.title || 'Untitled webinar'}
        </h3>

        <div className="mt-auto pt-5">
          <Link
            to={`/webinar/${webinar._id ?? webinar.id}`}
            state={{ webinar }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            View Details
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

// Skeleton
function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="aspect-[16/10] bg-slate-100" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-100" />
        <div className="h-9 w-32 rounded-full bg-slate-100" />
      </div>
    </div>
  )
}

export default function WebinarsSection({
  title = 'Live Webinars',
  highlight = 'By Industry Experts',
  description = 'Learn directly from experienced professionals, explore new technologies, and gain insights you can put into practice.',
  buttonText = 'Explore all webinars',
  buttonTo = '/webinars',
  showButton = true
}) {
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
        if (isMounted) {
          setError(err.message || 'Failed to load webinars')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchWebinars()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              {title}{' '}
              <span className="text-blue-700">{highlight}</span>
            </h2>

            {description && (
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                {description}
              </p>
            )}
          </div>

          {showButton && (
            <Link
              to={buttonTo}
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {buttonText}

              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        {/* Webinar Cards */}
        {!loading && !error && webinars.length > 0 && (
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {webinars.map((webinar, index) => (
              <div
                key={webinar._id ?? webinar.id ?? `${webinar.title}-${index}`}
                className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
              >
                <WebinarCard
                  webinar={webinar}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && webinars.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-12 text-center">
            <Video className="mx-auto mb-3 text-blue-700" size={28} />

            <p className="font-semibold text-slate-900">
              No webinars available yet
            </p>

            <p className="mt-1 text-sm text-slate-600">
              Check back soon for upcoming sessions.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}