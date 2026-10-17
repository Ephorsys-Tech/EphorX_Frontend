import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Star,
} from "lucide-react";

function CategoryCard({
  title,
  description,
  courses,
  icon: Icon,
  to = "/Course",
  featured = false,
  index = 0,
}) {
  const isDark = featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        to={to}
        className={`group relative flex h-full min-h-[230px] flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
          isDark
            ? "border-gray-800 bg-[#111318] text-white hover:border-sky-400/60"
            : "border-gray-200 bg-white text-gray-900 hover:border-sky-300 hover:bg-sky-50/40"
        }`}
      >
        {/* Decorative glow */}
        <div
          className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sky-400/15 blur-3xl transition-opacity duration-500 ${
            isDark
              ? "opacity-60 group-hover:opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        />

        {/* Icon and arrow */}
        <div className="relative flex items-start justify-between gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-105 ${
              isDark
                ? "border-sky-400/20 bg-sky-400/10 text-sky-300 group-hover:bg-sky-400 group-hover:text-black"
                : "border-sky-100 bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white"
            }`}
          >
            {Icon ? <Icon size={23} strokeWidth={1.8} /> : <Sparkles size={23} />}
          </div>

          {featured ? (
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 text-[9px] font-bold tracking-wider text-sky-300">
              FEATURED
            </span>
          ) : (
            <ArrowUpRight
              size={19}
              className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-sky-500"
            />
          )}
        </div>

        {/* Category information */}
        <div className="relative mt-7">
          <h3
            className={`text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-sky-500 sm:text-xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`mt-2 max-w-xs text-sm leading-6 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          className={`relative mt-auto flex items-center justify-between gap-2 border-t pt-4 ${
            isDark ? "border-white/10" : "border-gray-100"
          }`}
        >
          <span
            className={`text-xs font-medium ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <span
              className={`mr-1 font-bold ${
                isDark ? "text-sky-300" : "text-gray-900"
              }`}
            >
              {courses ?? 0}+
            </span>
            courses available
          </span>

          <span
            className={`flex shrink-0 items-center gap-1 text-xs font-semibold transition-all duration-300 group-hover:gap-2 ${
              isDark ? "text-sky-300" : "text-sky-600"
            }`}
          >
            Explore
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CoursesByCategory({
  eyebrow = "LEARN BY INTEREST",
  title = "Courses by",
  highlight = "Category.",
  description = "Discover your next skill. Explore expert-led courses designed to help you learn, grow, and move forward with confidence.",
  categories = [],
  buttonText = "Explore All Courses",
  buttonTo = "/Course",
  showButton = true,
  showBottomNote = true,
  bottomNote = "Find the right course for your next big step.",
  columns = 3,
  fullWidth = false,
}) {
  const columnClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      className={`relative overflow-hidden bg-white px-4 py-3 sm:px-1 sm:py-20 lg:px-40 lg:py-5 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-sky-100/50 blur-3xl" />

      <div
        className={`relative mx-auto w-full ${
          fullWidth ? "max-w-none" : "max-w-none"
        }`}
      >
        {/* Section heading */}
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

        {/* Reusable category cards */}
        <div
          className={`grid grid-cols-1 gap-4 sm:gap-5 ${
            columnClasses[columns] || columnClasses[3]
          }`}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id ?? category.title}
              {...category}
              index={index}
            />
          ))}
        </div>

        {/* Optional bottom note */}
        {showBottomNote && bottomNote && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-gray-400 sm:mt-10 sm:text-sm">
            <Star size={15} className="text-sky-500" />
            {bottomNote}
          </div>
        )}
      </div>
    </section>
  );
}
