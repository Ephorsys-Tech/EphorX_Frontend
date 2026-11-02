
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Star,
  FileText,
  Code2,
} from "lucide-react";

import { categoryApi } from "../../admin/api/categoryApi.js";
import { courseApi } from "../../admin/api/courseApi.js";
import Modal from "../../ui/Modal.jsx";
import SyllabusRequestModal from "../../components/modal/SyllabusRequestModal.jsx";
import { createSyllabusLead } from "../../admin/api/syllabusLeadApi.js";

const Courses = () => {
  const navigate = useNavigate();
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [fetchedCourses, setFetchedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [syllabusForm, setSyllabusForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    qualification: "",
  });

  const [syllabusLoading, setSyllabusLoading] = useState(false);
  const [syllabusError, setSyllabusError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const categoryResponse = await categoryApi.getAll();

        const categoryList = Array.isArray(categoryResponse)
          ? categoryResponse
          : categoryResponse?.categories ??
          categoryResponse?.data?.categories ??
          categoryResponse?.data ??
          [];

        const response = await courseApi.getAll();

        console.log("Courses API response:", response);

        const courses = Array.isArray(response)
          ? response
          : response?.courses ??
          response?.data?.courses ??
          [];

        const coursesWithCategory = courses.map((course) => {
          const matchedCategory = categoryList.find(
            (category) => category._id === course.categoryId
          );

          return {
            ...course,
            categoryName: matchedCategory?.name ?? "Other",
          };
        });

        setFetchedCourses(coursesWithCategory);

        console.log("Categories API response:", categoryList);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    "All Courses",
    ...new Set(
      fetchedCourses
        .map((course) => course.categoryName)
        .filter(Boolean)
    ),
  ];

  const filteredCourses =
    activeCategory === "All Courses"
      ? fetchedCourses
      : fetchedCourses.filter(
        (course) => course.categoryName === activeCategory
      );

  const openCourseDetails = (course) => {
    navigate("/CourseDetails", {
      state: { course },
    });
  };

  const handleSyllabusSubmit = async (e) => {
  e.preventDefault();
  setSyllabusError("");

  if (!selectedSyllabusCourse) return;

  try {
    setSyllabusLoading(true);

    const payload = {
      ...syllabusForm,
      courseId: selectedSyllabusCourse._id,
      courseName: selectedSyllabusCourse.title,
      syllabusUrl: selectedSyllabusCourse.syllabusUrl,
    };

    const response = await createSyllabusLead(payload);

    if (!response.success) {
      throw new Error(response.message || "Unable to save your details.");
    }

    const syllabusUrl =
      response.syllabusUrl || response.download?.syllabusUrl;

    if (!syllabusUrl) {
      throw new Error("Your details were saved, but the syllabus URL is missing.");
    }

    // Open the syllabus after successful submission
    window.open(syllabusUrl, "_blank", "noopener,noreferrer");

    setSyllabusForm({
      fullName: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
      qualification: "",
    });

    setSelectedSyllabusCourse(null);
  } catch (error) {
    console.error("SYLLABUS SUBMISSION ERROR:", error);

    setSyllabusError(
      error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
    );
  } finally {
    setSyllabusLoading(false);
  }
};

  return (
    <section
      id="courses"
      className="relative isolate overflow-hidden bg-white px-5 py-22 sm:px-8 md:px-10 lg:px-41 lg:pb-10 lg:pt-20"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 -z-10 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-40 -z-10 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 sm:mb-10"
        >
          <div className="max-w-162.5">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Explore Our{" "}
              <span className="text-sky-500">Top Courses</span>
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
              Upgrade your skills with industry-focused IT training, hands-on
              projects, and practical learning designed for your career.
            </p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-2 sm:mb-9 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-colors duration-200 sm:px-5 sm:text-sm ${activeCategory === category
                ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                : "border-slate-200 bg-white/90 text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {loading ? (
            <p className="col-span-full py-12 text-center text-gray-500">
              Loading courses...
            </p>
          ) : error ? (
            <p className="col-span-full wrap-break-word py-12 text-center text-red-500">
              {error}
            </p>
          ) : filteredCourses.length === 0 ? (
            <p className="col-span-full py-12 text-center text-gray-500">
              No courses found.
            </p>
          ) : (
            filteredCourses.map((course, index) => {
              const CourseIcon = Code2;

              return (
                <motion.article
                  layout
                  key={course._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    opacity: { duration: 0.25, ease: "easeOut" },
                    layout: { duration: 0.25, ease: "easeOut" },
                  }}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/10"
                >
                  {/* Course Image */}
                  <div className="relative h-48 shrink-0 overflow-hidden sm:h-52">
                    <img
                      src={course.imageUrl}
                      alt={course.title || "Course"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-slate-950/10" />

                    <span className="absolute left-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full border border-white/40 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-slate-800 shadow-sm">
                      {course.type}
                    </span>


                  </div>

                  {/* Course Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
                        <CourseIcon size={15} className="shrink-0" />
                        <span className="wrap-break-word">
                          {course.categoryName}
                        </span>
                      </span>

                      <span className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-slate-500">
                        <Clock3 size={14} className="text-sky-600" />
                        {course.duration}
                      </span>
                    </div>

                    <h3 className="wrap-break-word text-lg font-extrabold leading-snug text-slate-950 transition-colors duration-200 group-hover:text-sky-600 sm:text-xl">
                      {course.title}
                    </h3>

                    <p className="mt-3 flex-1 wrap-break-word text-sm leading-6 text-slate-600">
                      {course.description}
                    </p>

                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => setSelectedSyllabusCourse(course)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                      >
                        <FileText size={16} />
                        View Syllabus
                        <ArrowRight size={14} />
                      </button>
                    </div>

                    <div className="my-4 border-t border-slate-100" />

                    {/* Price and CTA */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-slate-500">
                          Course Fee
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-xl font-extrabold tracking-tight text-slate-950">
                            ₹{course.discountPrice}
                          </span>

                          {course.Originalprice != null && (
                            <span className="text-sm text-slate-400 line-through">
                              ₹{course.Originalprice}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openCourseDetails(course)}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-sky-50 px-3.5 py-3 text-sm font-bold text-sky-700 transition-colors duration-200 hover:bg-slate-950 hover:text-white sm:px-4"
                      >
                        Explore
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
        </motion.div>


      </div>
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
    </section>
  );
};

export default Courses;
