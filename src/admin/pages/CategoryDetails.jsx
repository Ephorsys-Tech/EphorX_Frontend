
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FolderOpen,
  GraduationCap,
  Search,
  X,
} from "lucide-react";

import { categoryApi } from "../api/categoryApi";
import { courseApi } from "../api/courseApi";

export default function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [categoryResult, courseResult] = await Promise.all([
          categoryApi.getById(id),
          courseApi.getAll(),
        ]);

        const categoryData =
          categoryResult?.category ??
          categoryResult?.data?.category ??
          categoryResult?.data ??
          categoryResult;

        const courseList = Array.isArray(courseResult)
          ? courseResult
          : Array.isArray(courseResult?.courses)
          ? courseResult.courses
          : Array.isArray(courseResult?.data)
          ? courseResult.data
          : Array.isArray(courseResult?.data?.courses)
          ? courseResult.data.courses
          : [];

        if (!active) return;

        setCategory(categoryData);

        // Match courses assigned to this category.
        const matchingCourses = courseList.filter((course) => {
          const courseCategory =
            course.categoryId ??
            course.category_id ??
            course.category ??
            course.courseCategory;

          const courseCategoryId =
            typeof courseCategory === "object"
              ? courseCategory?._id ?? courseCategory?.id
              : courseCategory;

          return (
            String(courseCategoryId ?? "") === String(id)
          );
        });

        setCourses(matchingCourses);
      } catch (err) {
        if (active) {
          setError(
            err.message || "Failed to load category details."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadDetails();
    } else {
      setError("Category ID is missing.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  const filteredCourses = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return courses;

    return courses.filter((course) => {
      const title =
        course.title ??
        course.name ??
        course.courseName ??
        "";

      const description = course.description ?? "";

      return `${title} ${description}`
        .toLowerCase()
        .includes(term);
    });
  }, [courses, search]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-500">
          Loading category details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-xl border border-red-200 bg-white p-6">
          <p className="text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/admin/category")}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <p className="text-slate-600">Category not found.</p>

        <button
          type="button"
          onClick={() => navigate("/admin/category")}
          className="mt-4 rounded-lg border border-slate-200 px-4 py-2 text-sm"
        >
          Back to Categories
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate("/admin/category")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Categories
        </button>

        {/* Category details */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-blue-600">
                Category Details
              </p>

              <h1 className="mt-1 wrap-break-word text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                {category.name || "Untitled Category"}
              </h1>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                {category.description ||
                  "No description added."}
              </p>
            </div>
          </div>

          {/* Course count below the description */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <BookOpen size={22} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Courses
                </p>

                <p className="mt-1 text-xl font-bold text-slate-800">
                  {courses.length}{" "}
                  {courses.length === 1 ? "Course" : "Courses"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses section */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Courses under {category.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Browse all courses assigned to this category.
              </p>
            </div>

            {courses.length > 0 && (
              <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 sm:w-80">
                <Search
                  size={18}
                  className="shrink-0 text-slate-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="rounded p-1 text-slate-400 hover:bg-slate-100"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Course cards */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course, index) => {
                const courseId = course._id ?? course.id;

                const courseTitle =
                  course.title ??
                  course.name ??
                  course.courseName ??
                  "Untitled Course";

                return (
                  <article
                    key={courseId ?? index}
                    className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <GraduationCap size={23} />
                    </div>

                    <h3 className="wrap-break-word text-lg font-semibold text-slate-800">
                      {courseTitle}
                    </h3>

                    <p className="mt-2 flex-1 whitespace-pre-wrap text-sm leading-6 text-slate-500">
                      {course.description ||
                        "No course description available."}
                    </p>

                    {courseId && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin/view-course/${encodeURIComponent(courseId)}`
                          )
                        }
                        className="mt-5 border-t border-slate-100 pt-4 text-left text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        View Course Details →
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <BookOpen size={28} />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                {search
                  ? "No matching courses found"
                  : "No courses found in this category"}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                {search
                  ? "Try searching with a different keyword."
                  : "Courses assigned to this category will appear here."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
