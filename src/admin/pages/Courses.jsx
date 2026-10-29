import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  X,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import courseApi from "../api/courseApi";
import { categoryApi } from "../api/categoryApi";

const getId = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return String(value._id || value.id || "");
  }

  return String(value);
};

const getResponseArray = (response, keys = []) => {
  if (Array.isArray(response)) return response;

  for (const key of keys) {
    if (Array.isArray(response?.[key])) return response[key];
    if (Array.isArray(response?.data?.[key])) {
      return response.data[key];
    }
  }

  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.results)) return response.results;

  return [];
};

// Match the backend Course model
const getCourseImage = (course) => {
  return course?.imageUrl || "";
};

const getSyllabusUrl = (course) => {
  return course?.syllabusUrl || "";
};

export default function Course() {
  const navigate = useNavigate();
  const location = useLocation();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [courseResponse, categoryResponse] = await Promise.all([
        courseApi.getAll(),
        categoryApi.getAll(),
      ]);

      const courseList = getResponseArray(courseResponse, [
        "courses",
        "data",
      ]);

      const categoryList = getResponseArray(categoryResponse, [
        "categories",
        "data",
      ]);

      setCourses(courseList);
      setCategories(categoryList);
    } catch (err) {
      console.error("Failed to load courses:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load courses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, location.key]);

  const getCategoryName = useCallback(
    (course) => {
      const category = course?.categoryId || course?.category;

      if (category && typeof category === "object") {
        return (
          category.name ||
          category.title ||
          categories.find(
            (item) => getId(item) === getId(category)
          )?.name ||
          "Uncategorized"
        );
      }

      const foundCategory = categories.find(
        (item) => getId(item) === getId(category)
      );

      return (
        foundCategory?.name ||
        foundCategory?.title ||
        course?.categoryName ||
        "Uncategorized"
      );
    },
    [categories]
  );

  const filteredCourses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return courses.filter((course) => {
      const title = String(course?.title || "").toLowerCase();
      const description = String(
        course?.description || ""
      ).toLowerCase();
      const categoryName = getCategoryName(course).toLowerCase();

      const matchesSearch =
        !query ||
        title.includes(query) ||
        description.includes(query) ||
        categoryName.includes(query);

      const courseCategoryId = getId(
        course?.categoryId || course?.category
      );

      const matchesCategory =
        selectedCategory === "all" ||
        courseCategoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory, getCategoryName]);

  const handleDelete = async () => {
    if (!deletingCourse?._id) return;

    setDeleting(true);
    setError("");

    try {
      await courseApi.delete(deletingCourse._id);

      setCourses((currentCourses) =>
        currentCourses.filter(
          (course) => getId(course) !== getId(deletingCourse)
        )
      );

      setDeletingCourse(null);
    } catch (err) {
      console.error("Failed to delete course:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete course. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (course) => {
    navigate(`/admin/view-course/${course._id}`);
  };

  const handleEdit = (course) => {
    navigate(`/admin/edit-course/${course._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Courses
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your courses, categories, images, and syllabus files.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/add-course")}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />

            <div className="flex-1 text-sm">{error}</div>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
              className="rounded p-1 hover:bg-red-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Search and filters */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <select
                value={selectedCategory}
                onChange={(event) =>
                  setSelectedCategory(event.target.value)
                }
                className="min-w-48 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All Categories</option>

                {categories.map((category) => (
                  <option
                    key={getId(category)}
                    value={getId(category)}
                  >
                    {category.name ||
                      category.title ||
                      "Unnamed Category"}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Summary */}
        {!loading && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {courses.length}
              </span>{" "}
              courses
            </p>
          </div>
        )}

        {/* Loading, empty state, or course cards */}
        {loading ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-gray-200 bg-white">
            <RefreshCw
              size={30}
              className="animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm text-gray-500">
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <BookOpen size={26} className="text-blue-600" />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              {courses.length === 0
                ? "No courses yet"
                : "No matching courses"}
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              {courses.length === 0
                ? "Create your first course to get started."
                : "Try changing your search or category filter."}
            </p>

            {courses.length === 0 ? (
              <button
                type="button"
                onClick={() => navigate("/admin/add-course")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add Course
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="mt-5 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => {
              const categoryName = getCategoryName(course);
              const imageUrl = getCourseImage(course);
              const syllabusUrl = getSyllabusUrl(course);

              return (
                <article
                  key={getId(course)}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Course image */}
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gray-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={course.title || "Course"}
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center text-gray-400">
                        <ImageIcon size={38} strokeWidth={1.5} />

                        <span className="mt-2 text-xs">
                          No course image
                        </span>
                      </div>
                    )}

                    <span className="absolute left-3 top-3 max-w-[80%] truncate rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                      {categoryName}
                    </span>
                  </div>

                  {/* Course details */}
                  <div className="p-5">
                    <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
                      {course.title || "Untitled Course"}
                    </h2>

                    <p className="mt-2 min-h-10 line-clamp-2 text-sm leading-5 text-gray-500">
                      {course.description ||
                        "No description provided."}
                    </p>

                    {/* Prices */}
                    <div className="mt-4">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xl font-bold text-blue-700">
                          ₹{course.discountPrice || "0"}
                        </span>

                        {course.Originalprice && (
                          <span className="text-sm text-gray-400 line-through">
                            ₹{course.Originalprice}
                          </span>
                        )}
                      </div>

                      {course.duration && (
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium">
                            Duration:
                          </span>{" "}
                          {course.duration}
                        </p>
                      )}
                    </div>

                    {/* Course type and syllabus */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      {course.type && (
                        <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-700">
                          {course.type}
                        </span>
                      )}

                      {syllabusUrl ? (
                        <a
                          href={syllabusUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                          className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-200"
                        >
                          <FileText size={13} />
                          View syllabus
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-500">
                          <FileText size={13} />
                          No syllabus
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleView(course)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <Eye size={16} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(course)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                      >
                        <Edit size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingCourse(course)}
                        aria-label={`Delete ${
                          course.title || "course"
                        }`}
                        className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-red-600 transition hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deletingCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !deleting
            ) {
              setDeletingCourse(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-course-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">
                <Trash2 size={21} className="text-red-600" />
              </div>

              <button
                type="button"
                onClick={() => setDeletingCourse(null)}
                disabled={deleting}
                aria-label="Close delete dialog"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            <h2
              id="delete-course-title"
              className="mt-4 text-lg font-bold text-gray-900"
            >
              Delete course?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deletingCourse.title || "this course"}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingCourse(null)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting && (
                  <RefreshCw
                    size={15}
                    className="animate-spin"
                  />
                )}

                {deleting ? "Deleting..." : "Delete Course"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
