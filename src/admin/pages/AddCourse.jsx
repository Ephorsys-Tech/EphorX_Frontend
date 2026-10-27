
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  FileText,
} from "lucide-react";
import { categoryApi } from "../api/categoryApi";
import courseApi from "../api/courseApi";

export default function AddCourse() {
  const navigate = useNavigate();

  const initialForm = {
    title: "",
    description: "",
    categoryId: "",
    type: "",
    Originalprice: "",
    discountPrice: "",
    duration: "",
    courseImage: null,
    syllabusPdf: null,
  };

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        setLoadingCategories(true);

        const result = await categoryApi.getAll();

        const list = Array.isArray(result)
          ? result
          : result?.categories ??
            result?.data?.categories ??
            result?.data ??
            [];

        if (active) {
          setCategories(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Failed to load categories."
          );
        }
      } finally {
        if (active) {
          setLoadingCategories(false);
        }
      }
    }

    loadCategories();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    setForm((previous) => ({
      ...previous,
      courseImage: file,
    }));

    setError("");
    setSuccess("");
  };

  const handleSyllabusChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    setForm((previous) => ({
      ...previous,
      syllabusPdf: file,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Course title is required.");
      return;
    }

    if (!form.description.trim()) {
      setError("Course description is required.");
      return;
    }

    if (!form.categoryId) {
      setError("Please select a category.");
      return;
    }

    if (!form.type) {
      setError("Please select a course type.");
      return;
    }

    if (
      !form.Originalprice.trim() ||
      !form.discountPrice.trim() ||
      !form.duration.trim()
    ) {
      setError(
        "Original price, discount price, and duration are required."
      );
      return;
    }

    if (
      Number(form.Originalprice) < 0 ||
      Number(form.discountPrice) < 0
    ) {
      setError("Prices cannot be negative.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("categoryId", form.categoryId);
    formData.append("type", form.type);
    formData.append("Originalprice", form.Originalprice.trim());
    formData.append("discountPrice", form.discountPrice.trim());
    formData.append("duration", form.duration.trim());

    if (form.courseImage) {
      formData.append("image", form.courseImage);
    }

    if (form.syllabusPdf) {
      formData.append("syllabus", form.syllabusPdf);
    }

    try {
      setSubmitting(true);

      await courseApi.create(formData);

      setSuccess("Course created successfully.");
      setForm({ ...initialForm });

      event.target.reset();

      setTimeout(() => {
        navigate("/admin/course");
      }, 800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to create course."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate("/admin/course")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Courses
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Add New Course
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter the course details, pricing, duration, and learning materials.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {success && (
            <div
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
            >
              {success}
            </div>
          )}

          {/* Course title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Course Title *
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter course title"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Course Description *
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe what students will learn"
              rows={5}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="categoryId"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category *
            </label>

            <select
              id="categoryId"
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              disabled={loadingCategories}
              required
            >
              <option value="">
                {loadingCategories
                  ? "Loading categories..."
                  : "Select a category"}
              </option>

              {categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.name || category.title || "Unnamed Category"}
                </option>
              ))}
            </select>

            {!loadingCategories && categories.length === 0 && (
              <p className="mt-2 text-xs text-amber-700">
                No categories were returned. Check your category API response.
              </p>
            )}
          </div>

          {/* Course type */}
          <div>
            <label
              htmlFor="type"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Course Type *
            </label>

            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            >
              <option value="">Select course type</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Pricing and duration */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Originalprice"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Original Price (₹) *
              </label>

              <input
                id="Originalprice"
                name="Originalprice"
                type="number"
                min="0"
                step="0.01"
                value={form.Originalprice}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="discountPrice"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Discount Price (₹) *
              </label>

              <input
                id="discountPrice"
                name="discountPrice"
                type="number"
                min="0"
                step="0.01"
                value={form.discountPrice}
                onChange={handleChange}
                placeholder="e.g. 3500"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="duration"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Course Duration *
              </label>

              <input
                id="duration"
                name="duration"
                type="text"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 8 weeks or 40 hours"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                required
              />
            </div>
          </div>

          {/* Image and syllabus uploads */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="courseImage"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Course Image
              </label>

              <label
                htmlFor="courseImage"
                className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                {form.courseImage ? (
                  <>
                    <ImageIcon size={25} className="text-indigo-600" />
                    <span className="mt-2 max-w-full break-all text-sm font-medium text-slate-700">
                      {form.courseImage.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={25} className="text-slate-400" />
                    <span className="mt-2 text-sm font-medium text-slate-600">
                      Upload course image
                    </span>
                    <span className="mt-1 text-xs text-slate-400">
                      Image files only
                    </span>
                  </>
                )}
              </label>

              <input
                id="courseImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>

            <div>
              <label
                htmlFor="syllabusPdf"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Syllabus PDF
              </label>

              <label
                htmlFor="syllabusPdf"
                className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-4 text-center transition hover:border-indigo-300 hover:bg-indigo-50"
              >
                <FileText size={25} className="text-slate-400" />

                <span className="mt-2 max-w-full break-all text-sm font-medium text-slate-600">
                  {form.syllabusPdf
                    ? form.syllabusPdf.name
                    : "Upload syllabus PDF"}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  PDF files only
                </span>
              </label>

              <input
                id="syllabusPdf"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleSyllabusChange}
                className="sr-only"
              />
            </div>
          </div>

          {/* Form actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/course")}
              disabled={submitting}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting || loadingCategories}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Creating Course..." : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
