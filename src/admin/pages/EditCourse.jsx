
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  FileText,
  X,
  Clock,
  IndianRupee,
} from "lucide-react";
import courseApi from "../api/courseApi";
import { categoryApi } from "../api/categoryApi";

const getCourseFromResponse = (response) => {
  let result = response?.data ?? response;

  if (result?.course) return result.course;
  if (result?.data?.course) return result.data.course;

  if (result?.data && !Array.isArray(result.data)) {
    result = result.data;
  }

  return result;
};

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

export default function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    categoryId: "",
    type: "online",
    Originalprice: "",
    discountPrice: "",
    duration: "",
    courseImage: null,
    syllabusPdf: null,
  });

  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState("");
  const [existingSyllabus, setExistingSyllabus] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useEffect(() => {
    let active = true;

    const fetchDetails = async () => {
      if (!id) {
        setError("Course ID is missing from the URL.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const [courseResponse, categoryResponse] =
          await Promise.all([
            courseApi.getById(id),
            categoryApi.getAll(),
          ]);

        if (!active) return;

        const course = getCourseFromResponse(courseResponse);
        const categoryList =
          getCategoriesFromResponse(categoryResponse);

        if (
          !course ||
          typeof course !== "object" ||
          course.success === false
        ) {
          throw new Error(
            course?.message || "Course details were not found."
          );
        }

        setCategories(categoryList);

        const categoryValue =
          course.categoryId?._id ||
          course.categoryId ||
          course.category?._id ||
          course.category ||
          "";

        setForm({
          title: course.title || "",
          description: course.description || "",
          categoryId: String(categoryValue),
          type: course.type || "online",
          Originalprice: course.Originalprice ?? "",
          discountPrice: course.discountPrice ?? "",
          duration: course.duration ?? "",
          courseImage: null,
          syllabusPdf: null,
        });

        setExistingImage(
          getFileUrl(
            course.imageUrl ||
              course.courseImage ||
              course.image ||
              course.imageURL
          )
        );

        setExistingSyllabus(
          getFileUrl(
            course.syllabusUrl ||
              course.syllabusPdf ||
              course.syllabus ||
              course.syllabusURL
          )
        );
      } catch (err) {
        if (active) {
          setError(
            err?.response?.data?.message ||
              err.message ||
              "Failed to load course details."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      active = false;
    };
  }, [id]);

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

    if (!id) {
      setError("Course ID is missing.");
      return;
    }

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

    if (!form.Originalprice.toString().trim()) {
      setError("Original price is required.");
      return;
    }

    if (
      !Number.isFinite(Number(form.Originalprice)) ||
      Number(form.Originalprice) < 0
    ) {
      setError("Please enter a valid original price.");
      return;
    }

    if (!form.discountPrice.toString().trim()) {
      setError("Discount price is required.");
      return;
    }

    if (
      !Number.isFinite(Number(form.discountPrice)) ||
      Number(form.discountPrice) < 0
    ) {
      setError("Please enter a valid discount price.");
      return;
    }

    if (!form.duration.trim()) {
      setError("Course duration is required.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("categoryId", form.categoryId);
      formData.append("type", form.type);
      formData.append(
        "Originalprice",
        form.Originalprice.toString().trim()
      );
      formData.append(
        "discountPrice",
        form.discountPrice.toString().trim()
      );
      formData.append("duration", form.duration.trim());

      // Match these file field names to the backend Multer config.
      if (form.courseImage) {
        formData.append("image", form.courseImage);
      }

      if (form.syllabusPdf) {
        formData.append("syllabus", form.syllabusPdf);
      }

      await courseApi.update(id, formData);

      setSuccess("Course updated successfully.");

      setTimeout(() => {
        navigate("/admin/course");
      }, 800);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to update course. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center bg-slate-50">
        <p className="text-sm font-medium text-slate-500">
          Loading course details...
        </p>
      </div>
    );
  }

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
            Edit Course
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Update course details, pricing, duration, image, and syllabus.
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Course ID: {id}
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
              required
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option
                  key={category._id || category.id}
                  value={category._id || category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
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
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
              <IndianRupee size={19} />
              Course Pricing
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  placeholder="Enter original price"
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
                  placeholder="Enter discount price"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
            >
              <Clock size={17} />
              Course Duration *
            </label>

            <input
              id="duration"
              name="duration"
              type="text"
              value={form.duration}
              onChange={handleChange}
              placeholder="e.g. 8 weeks, 3 months, 40 hours"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          {/* File uploads */}
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
                ) : existingImage ? (
                  <>
                    <img
                      src={existingImage}
                      alt="Current course"
                      className="mb-2 h-24 w-full rounded-lg object-cover"
                    />
                    <span className="text-sm text-slate-600">
                      Click to replace image
                    </span>
                  </>
                ) : (
                  <>
                    <Upload size={25} className="text-slate-400" />
                    <span className="mt-2 text-sm font-medium text-slate-600">
                      Upload a course image
                    </span>
                    <span className="mt-1 text-xs text-slate-400">
                      Leave unchanged to keep the current image
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

              {form.courseImage && (
                <button
                  type="button"
                  onClick={() => {
                    setForm((previous) => ({
                      ...previous,
                      courseImage: null,
                    }));
                    const input = document.getElementById("courseImage");
                    if (input) input.value = "";
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600"
                >
                  <X size={14} />
                  Remove selected replacement
                </button>
              )}
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
                <FileText size={25} className="text-indigo-500" />

                <span className="mt-2 max-w-full break-all text-sm font-medium text-slate-600">
                  {form.syllabusPdf
                    ? form.syllabusPdf.name
                    : existingSyllabus
                      ? "Current syllabus available"
                      : "Upload a syllabus PDF"}
                </span>

                <span className="mt-1 text-xs text-slate-400">
                  Select a PDF to replace the current syllabus
                </span>
              </label>

              <input
                id="syllabusPdf"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleSyllabusChange}
                className="sr-only"
              />

              {form.syllabusPdf && (
                <button
                  type="button"
                  onClick={() => {
                    setForm((previous) => ({
                      ...previous,
                      syllabusPdf: null,
                    }));
                    const input = document.getElementById("syllabusPdf");
                    if (input) input.value = "";
                  }}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600"
                >
                  <X size={14} />
                  Remove selected replacement
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/course")}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
