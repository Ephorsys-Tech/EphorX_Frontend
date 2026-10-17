
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Quote,
  ArrowUpRight,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

// Review data
const reviews = [
  {
    name: "Priya Das",
    role: "MERN Stack Student",
    initials: "PD",
    color: "from-sky-400 to-blue-600",
    rating: 5,
    text: "The practical sessions made web development much easier to understand. I loved building projects instead of only learning theory.",
    course: "Full Stack Development",
  },
  {
    name: "Rahul Mohanty",
    role: "Frontend Developer",
    initials: "RM",
    color: "from-indigo-400 to-sky-600",
    rating: 5,
    text: "The learning path was clear, the mentors were supportive, and the projects helped me become more confident with React.",
    course: "Frontend Development",
  },
  {
    name: "Sneha Patel",
    role: "UI/UX Learner",
    initials: "SP",
    color: "from-cyan-400 to-blue-600",
    rating: 5,
    text: "I loved the balance between design concepts and practical work. It helped me think more carefully about user experience.",
    course: "UI/UX Design",
  },
  {
    name: "Amit Kumar",
    role: "Python Student",
    initials: "AK",
    color: "from-blue-500 to-indigo-600",
    rating: 5,
    text: "Complex concepts felt manageable because they were explained step by step. The hands-on exercises were my favorite part.",
    course: "Python Programming",
  },
  {
    name: "Anjali Sahoo",
    role: "Web Development Student",
    initials: "AS",
    color: "from-sky-500 to-cyan-600",
    rating: 5,
    text: "I enjoyed the supportive environment and project-based learning. The experience helped me focus on developing real skills.",
    course: "Web Development",
  },
  {
    name: "Karan Singh",
    role: "Java Learner",
    initials: "KS",
    color: "from-violet-500 to-blue-600",
    rating: 5,
    text: "The structured lessons helped me build a stronger foundation. I now feel more comfortable solving problems on my own.",
    course: "Java Programming",
  },
];

// Animated stars
function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star * 0.15,
          }}
        >
          <Star
            size={14}
            className={
              star <= rating
                ? "fill-sky-400 text-sky-400"
                : "text-gray-300"
            }
          />
        </motion.span>
      ))}
    </div>
  );
}

// Single review card
function ReviewCard({ review }) {
  return (
    <motion.article
      whileHover={{ y: -9, scale: 1.015 }}
      className="group relative flex min-h-[270px] w-[310px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-sky-300 hover:shadow-xl sm:w-[350px]"
    >
      <motion.div
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-100 blur-2xl"
        animate={{ scale: [0.8, 1.25, 0.8], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${review.color} font-bold text-white`}
          >
            {review.initials}
          </div>

          <div>
            <h3 className="font-bold text-gray-950">{review.name}</h3>
            <p className="text-xs text-gray-500">{review.role}</p>
          </div>
        </div>

        <Quote className="text-sky-300 transition-all group-hover:rotate-12 group-hover:text-sky-500" />
      </div>

      <div className="relative mt-5 flex items-center justify-between gap-2">
        <Stars rating={review.rating} />
        <span className="rounded-full bg-sky-50 px-2 py-1 text-[9px] font-bold text-sky-700">
          STUDENT REVIEW
        </span>
      </div>

      <p className="relative mt-4 flex-1 text-sm leading-6 text-gray-600">
        “{review.text}”
      </p>

      <div className="relative mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-xs font-semibold text-gray-500">
          {review.course}
        </span>

        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowUpRight
            size={18}
            className="text-sky-500 group-hover:text-black"
          />
        </motion.span>
      </div>
    </motion.article>
  );
}

// Continuously moving review row
function ReviewRow({ items, reverse = false, paused }) {
  const repeatedReviews = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#f8fbff] to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#f8fbff] to-transparent sm:w-16" />

      <motion.div
        className="flex w-max gap-5 py-3"
        animate={
          paused
            ? {}
            : { x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }
        }
        transition={{
          duration: reverse ? 32 : 28,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {repeatedReviews.map((review, index) => (
          <ReviewCard key={`${review.initials}-${index}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}

// Main reviews section
export default function ReviewsSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-[#f8fbff] py-12 sm:py-16">
      {/* Animated background */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 -z-10 h-80 w-80 rounded-full bg-sky-200/50 blur-[100px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-blue-100 blur-[110px]"
        animate={{ x: [0, -60, 0], y: [0, -35, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-40">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
         

          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-4xl">
            Real learning.{" "}
            <span className="relative inline-block text-sky-500">
              Real growth.
              <motion.span
                className="absolute -bottom-2 left-0 h-1 rounded-full bg-sky-400"
                animate={{ width: ["20%", "100%", "20%"] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
            </span>
          </h2>
        </motion.div>

        {/* Rating overview */}
        <div className="mx-auto mb-12 grid gap-4 sm:grid-cols-3">
          <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl bg-[#080b12] p-5 text-white">
            <motion.div
              className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-500/30 blur-2xl"
              animate={{ scale: [0.8, 1.5, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-sky-400/40">
              <motion.div
                className="absolute inset-1 rounded-full border-2 border-t-sky-400 border-r-sky-400 border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
              <div className="text-center">
                <p className="text-2xl font-black">4.9</p>
                <p className="text-[9px] text-sky-300">OUT OF 5</p>
              </div>
            </div>

            <div className="relative">
              <Stars />
              <p className="mt-2 text-xs text-gray-300">
                Learning with confidence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white p-5">
            <GraduationCap size={28} className="text-sky-500" />
            <div>
              <p className="font-extrabold text-gray-950">Project-led</p>
              <p className="mt-1 text-xs text-gray-500">Learn by doing</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-sky-200 bg-white p-5">
            <MessageCircle size={26} className="text-sky-500" />
            <div>
              <p className="font-extrabold text-gray-950">Student-first</p>
              <p className="mt-1 text-xs text-gray-500">Support that matters</p>
            </div>
          </div>
        </div>

        {/* Review slider heading and pause button */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-sky-700">
              From our learning community
            </p>
            <h3 className="mt-1 text-xl font-extrabold text-gray-950 sm:text-2xl">
              Voices that inspire
            </h3>
          </div>

          <button
            onClick={() => setPaused(!paused)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-700 hover:border-sky-400 hover:text-sky-600"
          >
            {paused ? "Resume" : "Pause"}
          </button>
        </div>

        {/* Two continuously moving review rows */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
        >
          <div className="mb-3">
            <ReviewRow items={reviews.slice(0, 3)} paused={paused} />
          </div>

          <ReviewRow
            items={reviews.slice(3, 6)}
            reverse
            paused={paused}
          />
        </div>

        {/* Bottom call to action */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-lg sm:flex-row sm:px-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white"
            >
              <Star size={22} />
            </motion.div>

            <div>
              <h3 className="font-extrabold text-gray-950">
                Your journey could be next.
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Find a learning path that matches your goals.
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/Course"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-500"
            >
              Explore courses
              <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
