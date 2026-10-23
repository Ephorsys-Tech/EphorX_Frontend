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
} from "lucide-react";
import { categoryApi } from "../api/categoryApi";

export default function Category() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const loadCategories = async ({ showLoader = true } = {}) => {
        if (showLoader) setLoading(true);
        setError("");

        try {
            const result = await categoryApi.getAll();

            const list = Array.isArray(result)
                ? result
                : Array.isArray(result?.categories)
                    ? result.categories
                    : Array.isArray(result?.data)
                        ? result.data
                        : Array.isArray(result?.data?.categories)
                            ? result.data.categories
                            : [];

            setCategories(
                list.map((category) => ({
                    ...category,
                    id: category.id ?? category._id,
                    name: category.name ?? "",
                    description: category.description ?? "",
                }))
            );
        } catch (err) {
            setError(err.message || "Failed to load categories.");
        } finally {
            if (showLoader) setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const filteredCategories = useMemo(() => {
        const term = search.trim().toLowerCase();

        return categories.filter(
            (category) =>
                category.name.toLowerCase().includes(term) ||
                category.description.toLowerCase().includes(term)
        );
    }, [categories, search]);

    const openCreateForm = () => {
        setEditingId(null);
        setName("");
        setDescription("");
        setShowForm(true);
    };

    
const openEditForm = async (category) => {
    try {
        setError("");

        // Fetch category details using the getById API
        const id = category.id ?? category._id;

        if (!id) {
            throw new Error("Category ID is missing.");
        }

        const result = await categoryApi.getById(id);

        // Extract category from the API response
        const item =
            result?.category ??
            result?.data?.category ??
            result?.data ??
            result;

        if (!item || typeof item !== "object") {
            throw new Error("Category details were not returned by the server.");
        }

        // Populate the edit form
        setEditingId(item.id ?? item._id ?? id);
        setName(item.name ?? category.name ?? "");
        setDescription(item.description ?? category.description ?? "");
        setShowForm(true);

    } catch (err) {
        setError(err.message || "Failed to load category details.");
    }
};


    const closeForm = () => {
        setShowForm(false);
        setEditingId(null);
        setName("");
        setDescription("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName) return;

        const duplicate = categories.some(
            (category) =>
                String(category.id) !== String(editingId) &&
                category.name.trim().toLowerCase() === trimmedName.toLowerCase()
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

    
const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmed) return;

    setDeletingId(id);
    setError("");

    try {
        // Call DELETE API from categoryApi.js
        await categoryApi.remove(id);

        // Refresh categories after successful deletion
        await loadCategories();
    } catch (err) {
        setError(err.message || "Failed to delete category.");
    } finally {
        setDeletingId(null);
    }
};


    const handleViewCourses = (category) => {
        navigate(
            `/admin/courses?categoryId=${encodeURIComponent(category.id)}`
        );
    };

    return (
        <div className="bg-slate-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <span>{error}</span>
                        <button
                            type="button"
                            onClick={() => loadCategories()}
                            className="self-start font-semibold underline sm:self-auto"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Page header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Categories
                        </h1>
                        <p className="mt-2 text-sm text-slate-500">
                            Manage and organize your course categories.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openCreateForm}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                        <Plus size={18} />
                        Create Category
                    </button>
                </div>

                {/* Search bar */}
                <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 sm:max-w-xl">
                        <Search size={19} className="shrink-0 text-slate-400" />

                        <input
                            type="search"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            aria-label="Search categories"
                            className="h-12 w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                aria-label="Clear search"
                                className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={17} />
                            </button>
                        )}
                    </div>

                    <span className="text-sm text-slate-500 sm:text-right">
                        {filteredCategories.length}{" "}
                        {filteredCategories.length === 1 ? "category" : "categories"}
                    </span>
                </div>

                {/* Category cards */}
                {loading ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-5 py-16 text-center text-sm text-slate-500">
                        Loading categories...
                    </div>
                ) : filteredCategories.length > 0 ? (
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

                                {/* Category actions */}
                                {/* Category actions */}
                                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                                    {/* View Courses */}
                                    <button
                                        type="button"
                                        onClick={() => handleViewCourses(category)}
                                        title="View Courses"
                                        aria-label={`View courses for ${category.name}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 p-2.5 text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    >
                                        <Eye size={18} />
                                        View
                                    </button>

                                    {/* Edit Category */}
                                    <button
                                        type="button"
                                        onClick={() => openEditForm(category)}
                                        title="Edit Category"
                                        aria-label={`Edit ${category.name}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-200 px-3 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                                    >
                                        <Pencil size={15} />
                                        Edit
                                    </button>

                                    {/* Delete Category */}
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(category.id)}
                                        disabled={deletingId !== null}
                                        title="Delete Category"
                                        aria-label={`Delete ${category.name}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <Trash2 size={15} />
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
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

            {/* Create / Edit modal */}
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
                                    {editingId !== null ? "Edit Category" : "Create Category"}
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

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId !== null
                                            ? "Save Changes"
                                            : "Create Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}