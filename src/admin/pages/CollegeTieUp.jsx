
import React, { useEffect, useMemo, useState } from "react";
import collegeTieUpApi from "../api/collegeTieUpApi.js";
import { Cross, Eye, MoreVertical, Pencil, RefreshCcw, RefreshCw, Search, Trash2, X } from "lucide-react";

const CollegeTieUp = () => {
    const [colleges, setColleges] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);

    const [modal, setModal] = useState(null);
    const [selectedCollege, setSelectedCollege] = useState(null);

    const [collegeName, setCollegeName] = useState("");
    const [logo, setLogo] = useState(null);
    const [formError, setFormError] = useState("");
    const [notice, setNotice] = useState("");

    const imagePreview = useMemo(
        () => (logo ? URL.createObjectURL(logo) : ""),
        [logo]
    );

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const fetchColleges = async () => {
        try {
            setLoading(true);
            const response = await collegeTieUpApi.getAll();
            setColleges(response.data || []);
        } catch (error) {
            setNotice(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchColleges();
    }, []);

    const filteredColleges = colleges.filter((college) =>
        college.collegeName
            ?.toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    const resetForm = () => {
        setCollegeName("");
        setLogo(null);
        setSelectedCollege(null);
        setFormError("");
        setModal(null);
    };

    const openCreate = () => {
        setCollegeName("");
        setLogo(null);
        setSelectedCollege(null);
        setFormError("");
        setModal("create");
        setActiveMenu(null);
    };

    const openEdit = (college) => {
        setCollegeName(college.collegeName || "");
        setLogo(null);
        setSelectedCollege(college);
        setFormError("");
        setModal("edit");
        setActiveMenu(null);
    };

    const openView = async (college) => {
        setActiveMenu(null);
        setFormError("");

        try {
            const response = await collegeTieUpApi.getById(college._id);
            setSelectedCollege(response.data || college);
            setModal("view");
        } catch (error) {
            setNotice(error.message);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            setFormError("Please select a JPEG, PNG, or WebP image.");
            event.target.value = "";
            return;
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setFormError("Logo size must not exceed 5 MB.");
            event.target.value = "";
            return;
        }

        setFormError("");
        setLogo(selectedFile);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormError("");
        setNotice("");

        if (!collegeName.trim()) {
            setFormError("Please enter the college name.");
            return;
        }

        if (modal === "create" && !logo) {
            setFormError("Please select a college logo.");
            return;
        }

        const formData = new FormData();
        formData.append("collegeName", collegeName.trim());

        if (logo) {
            formData.append("collegeLogo", logo);
        }

        try {
            setSaving(true);

            if (modal === "edit") {
                await collegeTieUpApi.update(selectedCollege._id, formData);
                setNotice("College updated successfully.");
            } else {
                await collegeTieUpApi.create(formData);
                setNotice("College added successfully.");
            }

            resetForm();
            await fetchColleges();
        } catch (error) {
            setFormError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (college) => {
        setActiveMenu(null);

        const confirmed = window.confirm(
            `Are you sure you want to delete ${college.collegeName}?`
        );

        if (!confirmed) return;

        try {
            await collegeTieUpApi.delete(college._id);
            setNotice("College deleted successfully.");
            setColleges((current) =>
                current.filter((item) => item._id !== college._id)
            );
        } catch (error) {
            setNotice(error.message);
        }
    };

    return (
        <div
            className="min-h-screen bg-[#f7f9fc] px-4 text-[#141d35] sm:px-6 lg:px-8"
            onClick={() => activeMenu && setActiveMenu(null)}
        >
            {/* Page heading */}
            <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-lg font-bold tracking-tight sm:text-4xl">
                        College Tie-Ups
                    </h1>
                    <p className="mt-2 text-[#718096] ">
                        Manage, view, edit and delete your partner colleges.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreate}
                    className="flex items-center justify-center gap-1 rounded-xl bg-[#2563ff] px-3 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
                >
                    <span className="leading-none">＋</span>
                    Add New College
                </button>
            </div>

            {/* Search and refresh */}
            <div className="mb-8 rounded-2xl border border-[#e0e5ed] bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full items-center gap-3 rounded-xl border border-[#d0d7e2] px-4 sm:max-w-2xl">
                        <span className=" text-[#9aa6b8]"><Search size={14} /></span>
                        <input
                            type="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search colleges..."
                            className="w-full bg-transparent py-2 outline-none placeholder:text-[#9aa6b8]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={fetchColleges}
                        disabled={loading}
                        className=" flex items-center rounded-xl border border-[#d0d7e2] px-4 py-2 font-semibold text-[#344054] transition hover:bg-gray-50 disabled:opacity-50"
                    >
                        <RefreshCw size={14} /> &nbsp; Refresh
                    </button>
                </div>

                <div className="border-t border-[#edf0f5] pt-5 text-sm text-[#718096]">
                    Showing{" "}
                    <span className="font-semibold text-[#141d35]">
                        {filteredColleges.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#141d35]">
                        {colleges.length}
                    </span>{" "}
                    colleges
                </div>
            </div>

            {/* Success / error notice */}
            {notice && (
                <div className="mb-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-800">
                    <span>{notice}</span>
                    <button
                        type="button"
                        onClick={() => setNotice("")}
                        className="ml-4 text-xl"
                    >
                    <X size={12}/>
                    </button>
                </div>
            )}

            {/* College cards */}
            {loading ? (
                <div className="rounded-2xl border border-[#e0e5ed] bg-white p-12 text-center text-[#718096] shadow-sm">
                    Loading colleges...
                </div>
            ) : filteredColleges.length === 0 ? (
                <div className="rounded-2xl border border-[#e0e5ed] bg-white px-5 py-16 text-center shadow-sm">
                    <h3 className="text-lg font-semibold text-[#141d35]">
                        No colleges found
                    </h3>
                    <p className="mt-2 text-sm text-[#718096]">
                        {search
                            ? "Try searching with another college name."
                            : "Add your first college tie-up to get started."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredColleges.map((college) => (
                        <article
                            key={college._id}
                            className="rounded-2xl border border-[#e0e5ed] bg-white py-3 px-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex min-w-0 items-center gap-4">
                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eff5ff]">
                                        {college.collegeLogo ? (
                                            <img
                                                src={college.collegeLogo}
                                                alt={college.collegeName}
                                                className="h-full w-full object-contain p-2"
                                            />
                                        ) : (
                                            <span className="text-xl text-blue-600">🏛</span>
                                        )}
                                    </div>

                                    <div className="min-w-0">
                                        <h2 className="wrap-break-word text-xl font-bold leading-7 text-[#141d35]">
                                            {college.collegeName}
                                        </h2>
                                        <p className="mt-1 text-sm text-[#718096]">
                                            College Partner
                                        </p>
                                    </div>
                                </div>
                                {/* Three-dot action menu */}
                                <div className="relative shrink-0">
                                    <button
                                        type="button"
                                        aria-label={`Actions for ${college.collegeName}`}
                                        aria-expanded={activeMenu === college._id}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setActiveMenu(
                                                activeMenu === college._id ? null : college._id
                                            );
                                        }}
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-[#718096] transition hover:bg-[#f0f4fa] hover:text-[#141d35]"
                                    >
                                        <MoreVertical size={17} strokeWidth={2} />
                                    </button>

                                    {activeMenu === college._id && (
                                        <div
                                            onClick={(event) => event.stopPropagation()}
                                            className="absolute top-0 right-5 z-50 w-28 overflow-hidden rounded-xl border border-[#e0e5ed] bg-white py-1 shadow-xl"
                                        >
                                            {/* View */}
                                            <button
                                                type="button"
                                                onClick={() => openView(college)}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#344054] transition hover:bg-[#f5f7fb]"
                                            >
                                                <Eye size={15} />
                                                <span>View</span>
                                            </button>

                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() => openEdit(college)}
                                                className="flex w-full items-center gap-3 px-4  text-left text-sm text-[#344054] transition hover:bg-[#f5f7fb]"
                                            >
                                                <Pencil size={15} />
                                                <span>Edit</span>
                                            </button>

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(college)}
                                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                                            >
                                                <Trash2 size={15} />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Add / Edit / View modal */}
            {modal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#101828]/50 p-4"
                    onClick={resetForm}
                >
                    <div
                        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                                    College Management
                                </p>
                                <h2 className="mt-2 text-2xl font-bold text-[#141d35]">
                                    {modal === "create"
                                        ? "Add New College"
                                        : modal === "edit"
                                            ? "Edit College"
                                            : "College Details"}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-lg px-2 text-2xl text-[#718096] hover:bg-gray-100"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>

                        {modal === "view" ? (
                            <div>
                                <div className="mb-6 flex justify-center rounded-xl bg-[#f5f8ff] p-6">
                                    <img
                                        src={selectedCollege?.collegeLogo}
                                        alt={selectedCollege?.collegeName}
                                        className="h-36 w-36 object-contain"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-[#8a96a8]">College Name</p>
                                        <p className="mt-1 font-semibold text-[#141d35]">
                                            {selectedCollege?.collegeName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-[#8a96a8]">College ID</p>
                                        <p className="mt-1 break-all text-sm text-[#596579]">
                                            {selectedCollege?._id}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="mt-7 w-full rounded-xl bg-[#2563ff] px-5 py-3 font-semibold text-white hover:bg-blue-700"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <label className="mb-2 block text-sm font-semibold text-[#344054]">
                                    College Name
                                </label>
                                <input
                                    type="text"
                                    value={collegeName}
                                    onChange={(event) => setCollegeName(event.target.value)}
                                    placeholder="Enter college name"
                                    className="mb-5 w-full rounded-xl border border-[#d0d7e2] px-4 py-3.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <label className="mb-2 block text-sm font-semibold text-[#344054]">
                                    College Logo{" "}
                                    {modal === "edit" && (
                                        <span className="font-normal text-[#8a96a8]">
                                            (Optional)
                                        </span>
                                    )}
                                </label>

                                <label
                                    htmlFor="collegeLogo"
                                    className="flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d0d7e2] bg-[#f8faff] p-5 transition hover:border-blue-400"
                                >
                                    {imagePreview || selectedCollege?.collegeLogo ? (
                                        <img
                                            src={imagePreview || selectedCollege?.collegeLogo}
                                            alt="College logo preview"
                                            className="h-28 max-w-full object-contain"
                                        />
                                    ) : (
                                        <>
                                            <span className="text-3xl text-blue-600">＋</span>
                                            <span className="mt-2 text-sm font-semibold text-[#344054]">
                                                Choose college logo
                                            </span>
                                            <span className="mt-1 text-xs text-[#8a96a8]">
                                                JPEG, PNG or WebP · Maximum 5 MB
                                            </span>
                                        </>
                                    )}
                                </label>

                                <input
                                    id="collegeLogo"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />

                                {formError && (
                                    <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                                        {formError}
                                    </p>
                                )}

                                <div className="mt-7 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 rounded-xl border border-[#d0d7e2] px-5 py-3 font-semibold text-[#596579] hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 rounded-xl bg-[#2563ff] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : modal === "edit"
                                                ? "Save Changes"
                                                : "Add College"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollegeTieUp;
