
import { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    UsersRound,
    Video,
    UserRound,
    GraduationCap,
    CheckCircle2,
    BookOpen,
} from 'lucide-react'

import Modal from '../../ui/Modal'
import WebinarEnrollModal from '../modal/WebinarEnrollModal'
import { getAllWebinars } from '../../admin/api/webinarApi.js'

// Webinar image with fallback
function WebinarImage({ src, alt }) {
    const [failed, setFailed] = useState(false)

    if (src && !failed) {
        return (
            <img
                src={src}
                alt={alt}
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
            />
        )
    }

    return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#071D3B] to-blue-700">
            <Video size={55} className="text-white/70" />
        </div>
    )
}

export default function WebinarView() {
    const { id } = useParams()
    const location = useLocation()

    const [webinar, setWebinar] = useState(
        location.state?.webinar || null
    )

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
            webinar.trainer?.name ||
            webinar.instructor?.name ||
            'Expert trainer',

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
                timeZone: 'Asia/Kolkata',
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

        category: webinar.category || 'Webinar',
    })

    // Existing enrollment handler
    const handleEnrollment = (formData, webinarData) => {
        console.log('Webinar enrollment:', {
            ...formData,
            webinarId: webinarData?.id,
            webinarTitle: webinarData?.title,
        })
    }

    // Loading
    if (loading) {
        return (
            <section className="min-h-screen bg-white px-5 py-16 sm:px-8 lg:px-41">
                <div className="mx-auto animate-pulse space-y-8">
                    <div className="h-5 w-36 rounded bg-slate-200" />

                    <div className="h-10 w-3/4 rounded bg-slate-200" />

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,0.95fr)]">
                        <div className="space-y-6">
                            <div className="aspect-[16/9] rounded-xl bg-slate-200" />
                            <div className="h-28 rounded bg-slate-200" />
                        </div>

                        <div className="h-[400px] rounded-xl bg-slate-200" />
                    </div>
                </div>
            </section>
        )
    }

    // Error
    if (error || !webinar) {
        return (
            <section className="flex min-h-screen flex-col items-center justify-center bg-white px-5 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Video size={32} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                    {error || 'Webinar not found'}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    The webinar you're looking for may not be available.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </section>
        )
    }

    const details = mapWebinar(webinar)
    const isLive = details.type === 'live'

    return (
        <>
            <section className="min-h-screen bg-white py-8 sm:py-10 lg:py-6">
                <div className="mx-auto px-5 sm:px-8 lg:px-41">

                    {/* Breadcrumb / Back */}
                    <div className="mb-1">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
                        >
                            <ArrowLeft size={15} />
                            Back to Webinars
                        </Link>
                    </div>

                    {/* Page Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="mb-7"
                    >


                        <h1 className="max-w-4xl text-2xl font-bold leading-tight tracking-tight text-[#101828] sm:text-3xl lg:text-[34px]">
                            {details.title}
                        </h1>
                    </motion.div>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(300px,0.95fr)] lg:gap-9">

                        {/* LEFT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="min-w-0"
                        >
                            {/* Webinar Image */}
                            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                                <WebinarImage
                                    src={details.image}
                                    alt={details.title}
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                                <span
                                    className={`absolute left-4 top-4 rounded-md px-3 py-1.5 text-xs font-bold ${isLive
                                            ? 'bg-red-600 text-white'
                                            : 'bg-white text-slate-800'
                                        }`}
                                >
                                    {isLive ? 'LIVE SESSION' : 'RECORDED WEBINAR'}
                                </span>

                                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                                    <Video size={17} />
                                    <span className="text-sm font-semibold">
                                        {details.category}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-7">
                                <div className="mb-4 flex items-center gap-2.5">
                                    <BookOpen size={19} className="text-blue-700" />

                                    <h2 className="text-lg font-bold text-slate-900">
                                        Description
                                    </h2>
                                </div>

                                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                                    {details.description || 'No description available for this webinar.'}
                                </p>
                            </div>

                            {/* Instructor */}
                            <div className="mt-9 border-t border-slate-200 pt-7">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <UserRound size={19} className="text-blue-700" />

                                    <h2 className="text-lg font-bold text-slate-900">
                                        Speaker
                                    </h2>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    {details.photo ? (
                                        <img
                                            src={details.photo}
                                            alt={details.trainer}
                                            className="h-[76px] w-[76px] shrink-0 rounded-full border-2 border-slate-100 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                                            <UserRound size={32} />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-slate-900">
                                            {details.trainer}
                                        </h3>

                                        <p className="mt-1 text-sm text-blue-700">
                                            {details.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* RIGHT CONTENT */}
                        <motion.aside
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="min-w-0"
                        >
                            {/* Registration Panel */}
                            <div className="rounded-xl border border-blue-100 bg-[#F5F9FF] p-5 sm:p-6">
                                <div className="text-center">
                                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                                        Join Webinar
                                    </span>

                                    <h2 className="mt-2 text-xl font-bold text-[#102A4C]">
                                        Ready to Join?
                                    </h2>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        Reserve your place and take the next step in your learning journey.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedWebinar(details)}
                                    className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-700/15 transition duration-300 hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                                >
                                    Enroll Now

                                    <ArrowRight
                                        size={17}
                                        className="transition-transform duration-300 group-hover:translate-x-1"
                                    />
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <CheckCircle2 size={14} className="text-blue-700" />
                                    Join this webinar with EphorX
                                </div>
                            </div>

                            {/* Webinar Details */}
                            <div className="mt-7">
                                <h2 className="mb-4 text-lg font-bold text-slate-900">
                                    Webinar Details
                                </h2>

                                <div className="space-y-4">
                                    {/* Date */}
                                    <div className="flex items-center gap-3">
                                        <CalendarDays
                                            size={18}
                                            className="shrink-0 text-blue-700"
                                        />

                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-700">
                                                {details.date}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Time / Duration */}
                                    <div className="flex items-center gap-3">
                                        <Clock3
                                            size={18}
                                            className="shrink-0 text-blue-700"
                                        />

                                        <p className="text-sm font-medium text-slate-700">
                                            {isLive ? details.time : details.duration}
                                        </p>
                                    </div>

                                    {/* Attendees */}
                                    <div className="flex items-center gap-3">
                                        <UsersRound
                                            size={18}
                                            className="shrink-0 text-blue-700"
                                        />

                                        <p className="text-sm font-medium text-slate-700">
                                            {details.attendees} Participants
                                        </p>
                                    </div>

                                    {/* Category */}
                                    <div className="flex items-center gap-3">
                                        <GraduationCap
                                            size={18}
                                            className="shrink-0 text-blue-700"
                                        />

                                        <p className="text-sm font-medium text-slate-700">
                                            {details.category}
                                        </p>
                                    </div>
                                </div>

                                {/* Category Label */}

                                <div className="mb-3 mt-5 flex flex-wrap items-center gap-2">
                                    <span className="rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                        {details.category}
                                    </span>

                                    <span
                                        className={`rounded-md px-3 py-1 text-xs font-semibold ${isLive
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-slate-100 text-slate-600'
                                            }`}
                                    >
                                        {isLive ? 'Live Webinar' : 'Recorded Webinar'}
                                    </span>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </section>

            {/* Existing Enrollment Modal */}
            <Modal
                isOpen={Boolean(selectedWebinar)}
                onClose={() => setSelectedWebinar(null)}
                title="Enroll in Webinar"
                size="lg"
                theme="white"
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
