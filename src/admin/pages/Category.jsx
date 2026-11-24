
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  FolderOpen,
  Eye,
  Edit,
} from "lucide-react";

import { categoryApi } from "../api/categoryApi";
import RefreshButton from "../../common/components/RefreshButton";
import Button from "../../common/components/Button";

export default function Category() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Load categories
  const loadCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await categoryApi.getAll();

      if (result?.success && Array.isArray(result.categories)) {
        setCategories(
          result.categories.map((category) => ({
            ...category,
            id: category.id ?? category._id,
            name: category.name ?? "",
            description: category.description ?? "",
          }))
        );
      } else {
        throw new Error("Invalid category response.");
      }
    } catch (error) {
      console.error("Category loading error:", error);
      setError(error.message || "Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Filter categories
  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term)
    );
  }, [categories, search]);

  // Open create form
  const openCreateForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setShowForm(true);
  };

  // Open edit form
  const openEditForm = async (category) => {
    try {
      setError("");

      const id = category.id ?? category._id;

      if (!id) {
        throw new Error("Category ID is missing.");
      }

      const result = await categoryApi.getById(id);

      const item =
        result?.category ??
        result?.data?.category ??
        result?.data ??
        result;

      if (!item || typeof item !== "object") {
        throw new Error(
          "Category details were not returned by the server."
        );
      }

      setEditingId(item.id ?? item._id ?? id);
      setName(item.name ?? category.name ?? "");
      setDescription(
        item.description ?? category.description ?? ""
      );

      setShowForm(true);
    } catch (err) {
      setError(err.message || "Failed to load category details.");
    }
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setName("");
    setDescription("");
  };

  // Submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) return;

    const duplicate = categories.some(
      (category) =>
        String(category.id) !== String(editingId) &&
        category.name.trim().toLowerCase() ===
          trimmedName.toLowerCase()
    );

    if (duplicate) {
      window.alert("A category with this name already exists.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        name: trimmedName,
        description: trimmedDescription,
      };

      if (editingId !== null) {
        await categoryApi.update(editingId, payload);
      } else {
        await categoryApi.create(payload);
      }

      closeForm();
      await loadCategories();
    } catch (err) {
      setError(err.message || "Failed to save category.");
    } finally {
      setSaving(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
      await categoryApi.remove(id);
      await loadCategories();
    } catch (err) {
      setError(err.message || "Failed to delete category.");
    } finally {
      setDeletingId(null);
    }
  };

  // View category courses
  const handleViewCourses = (category) => {
    const categoryId = category.id ?? category._id;

    if (!categoryId) {
      setError("Category ID is missing.");
      return;
    }

    navigate(
      `/admin/category-details/${encodeURIComponent(categoryId)}`
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-slate-50 px-4 sm:px-6 lg:px-8">

      {/* Fixed Page Header */}
      <div className="mb-5 flex shrink-0 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Categories
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage and organize your course categories.
          </p>
        </div>

        <Button
          text="Create Category"
          icon={Plus}
          onClick={openCreateForm}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex shrink-0 flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{error}</span>

          <button
            type="button"
            onClick={loadCategories}
            className="self-start font-semibold underline sm:self-auto"
          >
            Retry
          </button>
        </div>
      )}

      {/* Main Category Container */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {/* Fixed Search and Actions */}
        <div className="flex shrink-0 flex-col gap-3 border-b border-gray-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">

          {/* Search Input */}
          <div className="relative w-full flex-1 sm:max-w-md">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              aria-label="Search categories"
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Refresh and Count */}
          <div className="flex shrink-0 items-center justify-end gap-4">
            <RefreshButton
              onClick={loadCategories}
              loading={loading}
            />

            <div className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-indigo-50 px-5 py-3">
              <span className="text-sm font-medium text-gray-600">
                Total Categories:
              </span>

              <span className="text-lg font-bold text-indigo-700">
                {categories.length}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Category Content */}
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-5">

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-sm text-slate-500">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

              <p className="mt-4">
                Loading categories...
              </p>
            </div>
          ) : filteredCategories.length > 0 ? (

            /* Category Cards */
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">

              {filteredCategories.map((category) => (
                <article
                  key={category.id}
                  className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6"
                >

                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FolderOpen size={24} />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                      Category
                    </span>
                  </div>

                  <h2 className="wrap-break-word text-lg font-semibold text-slate-800">
                    {category.name}
                  </h2>

                  <p className="mt-2 min-h-12 flex-1 wrap-break-word text-sm leading-6 text-slate-500">
                    {category.description || "No description added."}
                  </p>

                  {/* Category Actions */}
                  <div className="mt-6 grid grid-cols-3 gap-1 border-t border-slate-100 pt-4">

                    {/* View */}
                    <button
                      type="button"
                      onClick={() => handleViewCourses(category)}
                      title="View Category Details and Courses"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      <Eye size={18} />
                      View
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => openEditForm(category)}
                      title="Edit Category"
                      aria-label={`Edit ${category.name}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-2 py-2.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                    >
                      <Edit size={15} />
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      disabled={deletingId !== null}
                      title="Delete Category"
                      aria-label={`Delete ${category.name}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2 py-2.5 text-sm text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === category.id ? (
                        <span className="text-xs">Deleting...</span>
                      ) : (
                        <>
                          <Trash2 size={15} />
                          Delete
                        </>
                      )}
                    </button>

                  </div>
                </article>
              ))}

            </div>

          ) : (

            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <FolderOpen size={30} />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-slate-800">
                No categories found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                {search
                  ? "Try searching with a different keyword."
                  : "Create your first category to get started."}
              </p>

              {!search && (
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus size={17} />
                  Create Category
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeForm();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="category-modal-title"
                  className="text-xl font-bold text-slate-800"
                >
                  {editingId !== null
                    ? "Edit Category"
                    : "Create Category"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingId !== null
                    ? "Update the category details below."
                    : "Add a new category to your collection."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Category Name */}
              <div className="mb-5">
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Category Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="category-name"
                  type="text"
                  placeholder="e.g. Surgical Courses"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* Description */}
              <div className="mb-7">
                <label
                  htmlFor="category-description"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Description{" "}
                  <span className="font-normal text-slate-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="category-description"
                  placeholder="Write a short description..."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <Button
                 text={saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Save Changes"
                      : "Create Category"}
                  type="submit"
                  disabled={saving}
                />
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
