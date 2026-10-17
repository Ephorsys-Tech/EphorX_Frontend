import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Video,
  Play,
  UsersRound,
  Radio,
} from "lucide-react";
import webinar from "../../assets/webinar.png"
import webinar1 from "../../assets/webinar1.png"
import webinar2 from "../../assets/webinar2.png"


const defaultWebinars = [
  {
    id: 1,
    title: "Build Real-World Apps with MERN Stack",
    description:
      "Learn how to build scalable full-stack applications with practical project insights.",
    trainer: "Rahul Sharma",
    role: "Senior Full Stack Developer",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
    image:webinar,
    date: "24 Oct 2026",
    time: "6:00 PM IST",
    duration: "90 min",
    attendees: "250+",
    type: "live",
    category: "WEB DEVELOPMENT",
    to: "/Course",
  },
  {
    id: 2,
    title: "Getting Started with AI & Machine Learning",
    description:
      "Understand AI fundamentals, practical applications, and your first machine learning workflow.",
    trainer: "Priya Sharma",
    role: "AI & Data Science Mentor",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=faces",
    image:webinar1,
    date: "26 Oct 2026",
    time: "5:30 PM IST",
    duration: "60 min",
    attendees: "180+",
    type: "live",
    category: "ARTIFICIAL INTELLIGENCE",
    to: "/Course",
  },
  {
    id: 3,
    title: "UI/UX Design: From Idea to Interface",
    description:
      "Explore design thinking, wireframes, and modern interface design through practical examples.",
    trainer: "Aditi Das",
    role: "Product Designer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces",
    image:webinar2,
    date: "Watch Anytime",
    time: "On Demand",
    duration: "75 min",
    attendees: "500+",
    type: "recorded",
    category: "DESIGN & CREATIVITY",
    to: "/Course",
  },
  {
    id: 4,
    title: "UI/UX Design: From Idea to Interface",
    description:
      "Explore design thinking, wireframes, and modern interface design through practical examples.",
    trainer: "Aditi Das",
    role: "Product Designer",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces",
     image:webinar,
    date: "Watch Anytime",
    time: "On Demand",
    duration: "75 min",
    attendees: "500+",
    type: "recorded",
    category: "DESIGN & CREATIVITY",
    to: "/Course",
  },
];

function WebinarCard({ webinar, index }) {
  const isLive = webinar.type === "live";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white  hover:border-sky-300 hover:shadow-[0_18px_45px_-25px_rgba(14,165,233,0.35)]"
    >
      {/* Card header */}
     
{/* Image Header */}
<div className="group/image relative h-64 overflow-hidden bg-[#111318] sm:h-72">
  <img
    src={webinar.image || webinar.photo}
    alt={webinar.title}
    loading="lazy"
    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:duration-800 ease-out group-hover:scale-110"
  />

  {/* Dark overlay for readable text */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

  {/* Category and status */}
  <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-2 p-5">
    <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold tracking-wider text-sky-200 backdrop-blur-sm">
      {webinar.category}
    </span>

    <span
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-bold backdrop-blur-sm ${
        isLive
          ? "bg-red-500/80 text-white"
          : "bg-sky-500/80 text-white"
      }`}
    >
      {isLive ? <Radio size={12} /> : <Play size={12} fill="currentColor" />}
      {isLive ? "LIVE SESSION" : "PRE-RECORDED"}
    </span>
  </div>

  {/* Title and description */}
  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-sm">
      {isLive ? <Video size={20} /> : <Play size={20} />}
    </div>

    <h3 className="text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
      {webinar.title}
    </h3>

    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-200">
      {webinar.description}
    </p>
  </div>
</div>

      {/* Date and duration */}
      <div className="grid grid-cols-2 gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-4 sm:px-6">
        <div className="flex items-start gap-2.5">
          <CalendarDays
            size={17}
            className="mt-0.5 shrink-0 text-sky-600"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              {isLive ? "Webinar Date" : "Availability"}
            </p>
            <p className="mt-1 text-xs font-bold text-gray-800 sm:text-sm">
              {webinar.date}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Clock3
            size={17}
            className="mt-0.5 shrink-0 text-sky-600"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              {isLive ? "Starting At" : "Duration"}
            </p>
            <p className="mt-1 text-xs font-bold text-gray-800 sm:text-sm">
              {isLive ? webinar.time : webinar.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Trainer and action */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <img
            src={webinar.photo}
            alt={webinar.trainer}
            loading="lazy"
            className="h-11 w-11 rounded-full border-2 border-sky-100 object-cover"
          />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-gray-900">
              {webinar.trainer}
            </p>
            <p className="mt-1 truncate text-xs text-gray-500">
              {webinar.role}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-xs text-gray-400">
            <UsersRound size={14} className="text-sky-600" />
            {webinar.attendees}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <span className="text-xs font-medium text-gray-500">
            {webinar.duration}
          </span>

          <Link
            to={webinar.to || "/Course"}
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-sky-500 sm:text-sm"
          >
            {isLive ? "Enroll Now" : "Watch Now"}
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function WebinarsSection({
  eyebrow = "LEARN FROM THE BEST",
  title = "Live Webinars",
  highlight = "By Industry Experts.",
  description = "Learn directly from experienced professionals, explore new technologies, and gain insights you can put into practice.",
  webinars = defaultWebinars,
  buttonText = "Explore All Webinars",
  buttonTo = "/Course",
  showButton = true,
}) {


  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-40 lg:py-4">
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative mx-auto w-full ">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                {eyebrow}
              </div>
            )}

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
              {title}{" "}
              <span className="text-sky-500">{highlight}</span>
            </h2>

            {description && (
              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                {description}
              </p>
            )}
          </div>

          {showButton && (
            <Link
              to={buttonTo}
              className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-500"
            >
              {buttonText}
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </motion.div>

        {/* Webinar cards */}
        <div className="relative">
          <div
            className="
      flex gap-5 overflow-x-auto overflow-y-hidden
      pb-5
      snap-x snap-mandatory
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden
    "
          >
            {webinars.map((webinar, index) => (
              <div
                key={webinar.id ?? `${webinar.title}-${index}`}
                className="
          w-[85%] shrink-0 snap-start
          sm:w-[calc(50%-10px)]
          lg:w-[calc(33.333%-14px)]
          xl:w-[calc(33.333%-14px)]
        "
              >
                <WebinarCard
                  webinar={webinar}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {webinars.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
            <Video className="mx-auto mb-3 text-sky-500" size={28} />
            <p className="font-semibold text-gray-800">
              No webinars available yet
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Check back soon for upcoming sessions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}