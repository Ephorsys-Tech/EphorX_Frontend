
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Layers3,
  MonitorPlay,
} from "lucide-react";

import Modal from "../../ui/Modal";
import CourseEnrollModal from "../modal/CourseEnrollModal";
import SyllabusRequestModal from "../modal/SyllabusRequestModal";
import courseApi from "../../admin/api/courseApi.js"; 

const formatPrice = (value) => {
  const number = Number(String(value ?? "").replace(/[^\d.]/g, ""));
  return Number.isNaN(number)
    ? String(value)
    : number.toLocaleString("en-IN");
};

// Course image with fallback
function CourseImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#0b2a5b] to-blue-600">
      <BookOpen
        size={48}
        strokeWidth={1.5}
        className="text-white/70"
      />
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-0.5 wrap-break-word text-sm font-semibold capitalize text-slate-900">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSyllabusCourse, setSelectedSyllabusCourse] =
    useState(null);

  const [selectedEnrollment, setSelectedEnrollment] =
    useState(null);

  // Fetch course details using URL ID
  useEffect(() => {
    let isMounted = true;

    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setCourse(null);

        if (!id) {
          throw new Error("Course ID is missing.");
        }

        const response = await courseApi.getById(id);

        // Support common API response structures
        const selectedCourse =
          response?.data?.course ||
          response?.data ||
          response?.course ||
          response;

        if (!selectedCourse || typeof selectedCourse !== "object") {
          throw new Error("Course not found.");
        }

        if (isMounted) {
          setCourse({
            ...selectedCourse,
            category: selectedCourse.categoryName || "Other",
            image: selectedCourse.imageUrl,
            syllabus: selectedCourse.syllabusUrl,
            price: selectedCourse.discountPrice,
            oldPrice: selectedCourse.Originalprice,
          });
        }
      } catch (error) {
        console.error("Failed to fetch course details:", error);

        if (isMounted) {
          setCourse(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourseDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleEnrollment = (enrollmentData) => {
    console.log("Course enrollment details:", enrollmentData);
    setSelectedEnrollment(null);
  };

  const originalPrice = Number(
    String(course?.oldPrice ?? "").replace(/[^\d.]/g, "")
  );

  const discountedPrice = Number(
    String(course?.price ?? "").replace(/[^\d.]/g, "")
  );

  const discount =
    originalPrice > 0 && discountedPrice >= 0
      ? Math.max(
          0,
          Math.round(
            ((originalPrice - discountedPrice) / originalPrice) * 100
          )
        )
      : 0;

  const backLink =
    "inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-700";

  // Loading state
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading course details...
          </p>
        </div>
      </main>
    );
  }

  // Course not found
  if (!course) {
    return (
      <main className="min-h-screen bg-slate-50 pb-16 pt-8 sm:pt-10">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Link to="/Courses" className={backLink}>
            <ArrowLeft size={16} />
            Back to courses
          </Link>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <BookOpen size={22} />
            </div>

            <h1 className="mt-4 text-xl font-bold text-slate-900">
              Course details unavailable
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              The requested course could not be found.
              Please browse courses and try again.
            </p>

            <button
              type="button"
              onClick={() => navigate("/Courses")}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Browse courses
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative isolate overflow-hidden bg-linear-to-b from-sky-50 via-blue-50/40 to-white pb-20 pt-8 sm:pt-10">
      {/* Background design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-10 left-[16%] h-[40%] w-20 skew-x-[-28deg] bg-linear-to-b from-white/70 to-white/0" />
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/70 bg-linear-to-br from-blue-200/50 to-sky-100/10" />
        <div className="absolute left-[4%] top-40 h-12 w-12 rounded-full bg-blue-200/40" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link to="/Courses" className={`${backLink} mb-6`}>
          <ArrowLeft size={16} />
          Back to courses
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          {/* Main content */}
          <div className="min-w-0 space-y-8">
            <div className="aspect-16/8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <CourseImage
                src={course.image}
                alt={course.title || "Course"}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {course.category}
                </span>

                {course.type && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                    {course.type}
                  </span>
                )}

                {course.duration && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock3 size={14} />
                    {course.duration}
                  </span>
                )}
              </div>

              <h1 className="mt-4 wrap-break-word text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {course.title}
              </h1>

              <p className="mt-4 wrap-break-word text-base leading-7 text-slate-600">
                {course.description}
              </p>
            </div>

            {/* Course information */}
            <section>
              <h2 className="text-lg font-bold text-slate-900">
                Course information
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Detail
                  icon={Layers3}
                  label="Category"
                  value={course.category}
                />

                <Detail
                  icon={Clock3}
                  label="Duration"
                  value={course.duration}
                />

                <Detail
                  icon={MonitorPlay}
                  label="Course type"
                  value={course.type}
                />
              </div>
            </section>

            {/* Syllabus */}
            <section className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <FileText size={22} />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-slate-900">
                    Course syllabus
                  </h2>

                  <p className="mt-0.5 text-sm text-slate-600">
                    View the complete curriculum and topics covered.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSyllabusCourse(course)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-blue-700 px-6 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                View syllabus
                <ArrowRight size={16} />
              </button>
            </section>
          </div>

          {/* Pricing panel */}
          <aside className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-blue-900/5 lg:sticky lg:top-32">
            <p className="text-sm font-medium text-slate-500">
              Course fee
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="wrap-break-word text-3xl font-bold tracking-tight text-blue-800">
                {course.price != null
                  ? `₹${formatPrice(course.price)}`
                  : "Contact us"}
              </span>

              {discount > 0 && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  {discount}% off
                </span>
              )}
            </div>

            {course.oldPrice != null && discount > 0 && (
              <p className="mt-1 text-sm text-slate-400 line-through">
                ₹{formatPrice(course.oldPrice)}
              </p>
            )}

            {discount > 0 && (
              <div className="mt-5 flex items-center gap-2.5 rounded-lg bg-slate-50 px-4 py-3">
                <CheckCircle2
                  size={17}
                  className="shrink-0 text-emerald-600"
                />

                <span className="text-sm text-slate-700">
                  You save ₹
                  {(originalPrice - discountedPrice).toLocaleString("en-IN")}
                </span>
              </div>
            )}

            <div className="mt-6 space-y-3">
              {/* Enrollment */}
              <button
                type="button"
                onClick={() => setSelectedEnrollment(course)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                Enroll now
                <ArrowRight size={16} />
              </button>

              {/* Enquire */}
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700"
              >
                Enquire now
              </Link>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Interested in joining? Our team will guide you.
            </p>
          </aside>
        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/Courses" className={backLink}>
            Explore more courses
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Enrollment modal */}
      <Modal
        isOpen={Boolean(selectedEnrollment)}
        onClose={() => setSelectedEnrollment(null)}
        title="Enroll in Course"
        size="lg"
        theme="white"
      >
        <CourseEnrollModal
          course={selectedEnrollment}
          onClose={() => setSelectedEnrollment(null)}
          onSubmit={handleEnrollment}
        />
      </Modal>

      {/* Syllabus modal */}
      <Modal
        isOpen={Boolean(selectedSyllabusCourse)}
        onClose={() => setSelectedSyllabusCourse(null)}
        title="Get Course Syllabus"
        size="lg"
        theme="white"
      >
        <SyllabusRequestModal
          course={selectedSyllabusCourse}
          onClose={() => setSelectedSyllabusCourse(null)}
        />
      </Modal>
    </main>
  );
}
