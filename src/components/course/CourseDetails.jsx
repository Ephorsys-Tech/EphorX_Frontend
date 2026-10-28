
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  FileText,
  Layers3,
  Tag,
  CheckCircle2,
} from "lucide-react";

import Modal from "../../ui/Modal";
import SyllabusModal from "../modal/SyllabusModal";
import CourseEnrollModal from "../modal/CourseEnrollModal";

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}

export default function CourseDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCourse = location.state?.course;

  const [selectedSyllabus, setSelectedSyllabus] = useState(null);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  // No backend changes: use the selected course returned by the existing API.
  const course = selectedCourse
    ? {
        ...selectedCourse,
        category: selectedCourse.categoryName || "Other",
        image: selectedCourse.imageUrl,
        syllabus: selectedCourse.syllabusUrl,
        price: selectedCourse.discountPrice,
        oldPrice: selectedCourse.Originalprice,
      }
    : null;

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

  // Handle opening the details page without a selected course.
  if (!course) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-41">
        <Link
          to="/Course"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-sky-600"
        >
          <ArrowLeft size={16} />
          Back to courses
        </Link>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-center sm:p-10">
          <h1 className="text-xl font-bold text-slate-950">
            Course details unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Please select a course from the courses page to view its details.
          </p>

          <button
            type="button"
            onClick={() => navigate("/Course")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-sky-500"
          >
            Browse Courses
            <ArrowUpRight size={16} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-41">
      <Link
        to="/Courses"
        className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-sky-600"
      >
        <ArrowLeft size={16} />
        Back to courses
      </Link>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Course image */}
        <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-72 lg:h-80">
          {course.image && (
            <img
              src={course.image}
              alt={course.title || "Course"}
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

          <span className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm">
            <Layers3 size={15} className="shrink-0 text-sky-600" />
            <span className="break-words">{course.category}</span>
          </span>
        </div>

        <div className="grid min-w-0 lg:grid-cols-[minmax(0,1fr)_290px]">
          {/* Main information */}
          <div className="min-w-0 p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="max-w-full break-words rounded-md bg-sky-50 px-2.5 py-1.5 text-xs font-semibold text-sky-700">
                {course.type || "Course"}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Clock3 size={14} />
                {course.duration || "Duration not specified"}
              </span>
            </div>

            <h1 className="mt-4 break-words text-2xl font-bold leading-snug tracking-tight text-slate-950 sm:text-3xl">
              {course.title}
            </h1>

            <p className="mt-3 break-words text-sm leading-6 text-slate-600">
              {course.description}
            </p>

            {/* Course information */}
            <div className="mt-7 border-t border-slate-100 pt-6">
              <h2 className="text-base font-bold text-slate-950">
                Course information
              </h2>

              <div className="mt-5 grid gap-x-6 gap-y-6 sm:grid-cols-2">
                <Detail
                  icon={Layers3}
                  label="Category"
                  value={course.category}
                />

                <Detail
                  icon={Tag}
                  label="Category ID"
                  value={course.categoryId}
                />

                <Detail
                  icon={Clock3}
                  label="Duration"
                  value={course.duration}
                />

                <Detail
                  icon={CheckCircle2}
                  label="Course type"
                  value={course.type}
                />
              </div>
            </div>

            {/* Course syllabus */}
            <div className="mt-6 flex gap-59.5 border-t border-slate-100 pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
                  <FileText size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    Course syllabus
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    View curriculum and topics
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSyllabus(course)}
                className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-950 sm:self-auto"
              >
                <FileText size={16} />
                View Syllabus
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Pricing panel */}
          <aside className="min-w-0 border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Course fee
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="break-words text-3xl font-bold tracking-tight text-slate-950">
                ₹{course.price ?? "Contact us"}
              </span>

              {discount > 0 && (
                <span className="rounded-md bg-sky-100 px-2 py-1 text-xs font-bold text-sky-700">
                  {discount}% OFF
                </span>
              )}
            </div>

            {course.oldPrice != null && (
              <p className="mt-1 text-sm text-slate-400 line-through">
                ₹{course.oldPrice}
              </p>
            )}

            {discount > 0 && (
              <div className="mt-5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-3">
                <CheckCircle2 size={17} className="shrink-0 text-sky-600" />

                <span className="text-xs leading-5 text-slate-600">
                  Save ₹
                  {(originalPrice - discountedPrice).toLocaleString("en-IN")}
                  {" "}on this course
                </span>
              </div>
            )}

            {/* Enroll button: opens the existing enrollment modal */}
            <button
              type="button"
              onClick={() => setSelectedEnrollment(course)}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-900"
            >
              Enroll Now
              <ArrowUpRight size={17} />
            </button>

            {/* Enquire button: navigates to Contact */}
            <Link
              to="/contact"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              Enquire Now
              <ArrowUpRight size={17} />
            </Link>

            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Interested in joining? Contact our team.
            </p>
          </aside>
        </div>
      </motion.div>

      <div className="mt-6 text-center">
        <Link
          to="/Course"
          className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-sky-600"
        >
          Explore more courses
        </Link>
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
        isOpen={Boolean(selectedSyllabus)}
        onClose={() => setSelectedSyllabus(null)}
        title="Course Syllabus"
        size="xl"
        theme="white"
      >
        <SyllabusModal course={selectedSyllabus} />
      </Modal>
    </main>
  );
}
