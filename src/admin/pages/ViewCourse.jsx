
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Pencil,
  FileText,
  Image as ImageIcon,
  Tag,
  CalendarDays,
  LoaderCircle,
  ExternalLink,
} from "lucide-react";
import courseApi from "../api/courseApi";
import { categoryApi } from "../api/categoryApi";



// Extract the course from common API response formats.
const getCourseFromResponse = (response) => {
  let result = response?.data ?? response;

  if (result?.course) {
    return result.course;
  }

  if (result?.data?.course) {
    return result.data.course;
  }

  if (result?.data && !Array.isArray(result.data)) {
    result = result.data;
  }

  return result;
};

// Extract categories from common API response formats.
const getCategoriesFromResponse = (response) => {
  const result = response?.data ?? response;

  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.categories)) return result.categories;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.categories)) {
    return result.data.categories;
  }

  return [];
};

// Convert a file field into a usable URL.
const getFileUrl = (value) => {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value === "object") {
    return (
      value.url ||
      value.secure_url ||
      value.path ||
      value.location ||
      value.fileUrl ||
      ""
    );
  }

  return "";
};

const getCategoryId = (course) => {
  const category =
    course?.categoryId ??
    course?.category ??
    course?.categoryID;

  if (typeof category === "string") return category;

  return (
    category?._id ||
    category?.id ||
    category?.categoryId ||
    ""
  );
};

export default function ViewCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchCourse = async () => {
      if (!id) {
        setError("Course ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [courseResponse, categoryResult] =
          await Promise.allSettled([
            courseApi.getById(id),
            categoryApi.getAll(),
          ]);

        if (cancelled) return;

        if (courseResponse.status === "rejected") {
          throw courseResponse.reason;
        }

        const courseData = getCourseFromResponse(
          courseResponse.value
        );

        const fetchedCourse =
          courseData?.course || courseData;

        if (
          !fetchedCourse ||
          typeof fetchedCourse !== "object" ||
          !(
            fetchedCourse._id ||
            fetchedCourse.id ||
            fetchedCourse.title
          )
        ) {
          throw new Error(
            "Course details were not found in the API response."
          );
        }

        setCourse({
          ...fetchedCourse,
          _id: fetchedCourse._id || fetchedCourse.id || id,
          courseImage: getFileUrl(
            fetchedCourse.courseImage ||
              fetchedCourse.image ||
              fetchedCourse.imageUrl ||
              fetchedCourse.imageURL
          ),
          syllabusPdf: getFileUrl(
            fetchedCourse.syllabusPdf ||
              fetchedCourse.syllabus ||
              fetchedCourse.syllabusUrl ||
              fetchedCourse.syllabusURL
          ),
        });

        if (categoryResult.status === "fulfilled") {
          setCategories(
            getCategoriesFromResponse(categoryResult.value)
          );
        } else {
          // Course details can still be displayed if categories fail.
          setCategories([]);
        }
      } catch (err) {
        if (!cancelled) {
          setCourse(null);
          setError(
            err?.message || "Failed to load course details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCourse();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const categoryId = getCategoryId(course);

  const categoryName =
    (typeof course?.category === "object"
      ? course.category?.name
      : "") ||
    (typeof course?.categoryId === "object"
      ? course.categoryId?.name
      : "") ||
    categories.find(
      (category) =>
        String(category._id || category.id) ===
        String(categoryId)
    )?.name ||
    course?.categoryName ||
    "Uncategorized";

  const courseImage = course?.courseImage || "";
  const syllabusPdf = course?.syllabusPdf || "";

  const backToCourses = () => navigate("/admin/course");

  const editCourse = () => {
    navigate(`/admin/edit-course/${course._id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center bg-slate-50">
        <LoaderCircle
          className="animate-spin text-indigo-600"
          size={28}
        />
        <span className="ml-3 text-sm text-slate-500">
          Loading course details...
        </span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-64 bg-slate-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8">
          <p className="text-sm text-red-600">
            {error || "Course not found."}
          </p>

          <button
            type="button"
            onClick={backToCourses}
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation */}
        <button
          type="button"
          onClick={backToCourses}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>

        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              View Course
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Review the course information and learning materials.
            </p>
          </div>

          <button
            type="button"
            onClick={editCourse}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Pencil size={17} />
            Edit Course
          </button>
        </div>

        {/* Course content */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Course image */}
          <div className="flex min-h-56 items-center justify-center bg-slate-100 sm:min-h-72">
            {courseImage ? (
              <img
                src={courseImage}
                alt={course.title || "Course image"}
                className="h-56 w-full object-cover sm:h-72"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <ImageIcon size={52} strokeWidth={1.3} />
                <span className="text-sm">
                  No course image available
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            {/* Title and category */}
            <div className="border-b border-slate-100 pb-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                <Tag size={14} />
                {categoryName}
              </span>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                {course.title || "Untitled Course"}
              </h2>

              {course.type && (
                <p className="mt-3 text-sm text-slate-500">
                  Course type:{" "}
                  <span className="font-medium capitalize text-slate-700">
                    {course.type}
                  </span>
                </p>
              )}

              {course.createdAt && (
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  Created{" "}
                  {Number.isNaN(
                    new Date(course.createdAt).getTime()
                  )
                    ? "date unavailable"
                    : new Date(
                        course.createdAt
                      ).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Description */}
            <section className="py-6">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                Course Description
              </h3>

              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {course.description || "No description provided."}
              </p>
            </section>

            {/* Syllabus */}
            <section className="border-t border-slate-100 py-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Course Syllabus
              </h3>

              {syllabusPdf ? (
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-3 text-red-600">
                      <FileText size={25} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Course Syllabus PDF
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        View the course learning materials
                      </p>
                    </div>
                  </div>

                  <a
                    href={syllabusPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    View PDF
                    <ExternalLink size={15} />
                  </a>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                  <FileText
                    size={30}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-3 text-sm font-medium text-slate-600">
                    No syllabus PDF uploaded
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    You can add one by editing this course.
                  </p>

                  <button
                    type="button"
                    onClick={editCourse}
                    className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Upload Syllabus
                  </button>
                </div>
              )}
            </section>

            {/* Bottom actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={backToCourses}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Back to Courses
              </button>

              <button
                type="button"
                onClick={editCourse}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Pencil size={17} />
                Edit Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
