
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  Tag,
} from "lucide-react";
import Courses from "../../web/pages/Courses";

const slugify = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CourseDetails() {
  const { courseId } = useParams();

  const course = Courses.find(
    (item) => slugify(item.title) === courseId
  );

  if (!course) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-5 text-center">
        <h1 className="text-2xl font-extrabold text-slate-950">
          Course not found
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          The course you are looking for does not exist.
        </p>
        <Link
          to="/Course"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-500"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
      </section>
    );
  }

  const categoryId = slugify(course.category);
  const originalPrice = Number(
    String(course.oldPrice).replace(/[^\d.]/g, "")
  );
  const discountedPrice = Number(
    String(course.price).replace(/[^\d.]/g, "")
  );
  const discount =
    originalPrice > 0
      ? Math.round(
          ((originalPrice - discountedPrice) / originalPrice) * 100
        )
      : 0;

  const CourseIcon = course.icon;

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white px-5 pb-16 pt-28 sm:px-8 sm:pt-32 md:px-10 lg:px-41 lg:pb-20">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-36 -z-10 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

      {/* Back navigation */}
      <Link
        to="/Course"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-sky-600"
      >
        <ArrowLeft size={17} />
        All Courses
      </Link>

      {/* Course overview */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
      >
        <div className="min-w-0">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${
                course.accent || "bg-sky-50 text-sky-700"
              }`}
            >
              {CourseIcon && <CourseIcon size={15} />}
              {course.category}
            </span>

            <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
              {course.level || course.type || "Professional Training"}
            </span>
          </div>

          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {course.title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            {course.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Clock3 size={17} className="text-sky-600" />
              {course.duration}
            </span>

            {course.level && (
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-sky-600" />
                {course.level}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Course Fee
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                {course.price}
              </span>

              <span className="text-base text-slate-400 line-through">
                {course.oldPrice}
              </span>

              {discount > 0 && (
                <span className="rounded-lg bg-sky-50 px-2.5 py-1.5 text-xs font-bold text-sky-700">
                  {discount}% OFF
                </span>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-sky-500"
              >
                Enquire Now
                <ArrowUpRight size={17} />
              </Link>

              <a
                href={course.syllabus}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              >
                <FileText size={17} />
                View Syllabus
              </a>
            </div>
          </div>
        </div>

        {/* Course image */}
        <div className="relative min-w-0">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-sky-100 via-blue-50 to-transparent blur-xl" />

          <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-xl shadow-slate-900/10 sm:rounded-3xl">
            <img
              src={course.image}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/5" />

            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/95 px-3 py-2 text-xs font-bold text-slate-800 backdrop-blur">
                <Clock3 size={14} className="text-sky-600" />
                {course.duration}
              </span>
              <h2 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                Start learning with EphorX
              </h2>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Course information */}
      <section className="mt-12 border-t border-slate-200 pt-8 sm:mt-16 sm:pt-10">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
            Course Information
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            Course <span className="text-sky-500">Overview</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Tag size={19} />
            </div>
            <p className="text-xs font-medium text-slate-500">
              Category
            </p>
            <p className="mt-1 break-words text-base font-bold text-slate-950">
              {course.category}
            </p>
            <p className="mt-1 break-all text-xs text-slate-400">
              Category ID: {categoryId}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Clock3 size={19} />
            </div>
            <p className="text-xs font-medium text-slate-500">
              Duration
            </p>
            <p className="mt-1 text-base font-bold text-slate-950">
              {course.duration}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-200">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <FileText size={19} />
            </div>
            <p className="text-xs font-medium text-slate-500">
              Syllabus
            </p>
            <p className="mt-1 text-base font-bold text-slate-950">
              Course Curriculum
            </p>
            <a
              href={course.syllabus}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-slate-950"
            >
              Open syllabus
              <Download size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Course description */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <h2 className="text-xl font-extrabold text-slate-950">
          About This Course
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
          {course.description}
        </p>
      </section>

      {/* Bottom CTA */}
      <section className="relative mt-8 overflow-hidden rounded-2xl bg-slate-950 p-5 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white sm:text-2xl">
              Ready to get started?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Contact EphorX to learn more about this course.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-white hover:text-slate-950 sm:self-auto"
          >
            Contact Us
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
