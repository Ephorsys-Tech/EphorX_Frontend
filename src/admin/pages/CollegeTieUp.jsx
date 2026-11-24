
import React, { useEffect, useMemo, useState } from "react";
import collegeTieUpApi from "../api/collegeTieUpApi.js";
import {
  Eye,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

import RefreshButton from "../../common/components/RefreshButton.jsx";
import Button from "../../common/components/Button.jsx";
import Pagination from "../../common/components/Pagination.jsx";

const ITEMS_PER_PAGE = 10;

const CollegeTieUp = () => {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

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
      setNotice(error.message || "Failed to load colleges.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // Filter colleges
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) =>
      college.collegeName
        ?.toLowerCase()
        .includes(search.trim().toLowerCase())
    );
  }, [colleges, search]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Keep current page valid if colleges are deleted
  const totalPages = Math.ceil(
    filteredColleges.length / ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Current page colleges
  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredColleges.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredColleges, currentPage]);

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
      setNotice(error.message || "Failed to load college details.");
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
        setCurrentPage(1);
      }

      resetForm();
      await fetchColleges();
    } catch (error) {
      setFormError(error.message || "Failed to save college.");
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
      setNotice(error.message || "Failed to delete college.");
    }
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f7f9fc] px-4 text-[#141d35] sm:px-6 lg:px-8"
      onClick={() => activeMenu && setActiveMenu(null)}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">

        {/* Fixed Page Heading */}
        <div className="mb-5 flex shrink-0 flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              College Tie-Ups
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage, view, edit and delete your partner colleges.
            </p>
          </div>

          <Button
            text="Add New College"
            icon={Plus}
            onClick={openCreate}
          />
        </div>

        {/* Fixed Search, Refresh and College Count */}
        <div className="mb-4 shrink-0 rounded-2xl border border-[#e0e5ed] bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Input */}
            <div className="relative w-full flex-1 sm:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa6b8]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search colleges..."
                aria-label="Search colleges"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-10 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            {/* Right-side Actions */}
            <div className="flex items-center justify-end gap-4">
              <RefreshButton
                onClick={fetchColleges}
                loading={loading}
              />

              <div className="flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-indigo-50 px-5 py-3">
                <span className="text-sm font-medium text-gray-600">
                  Total Colleges:
                </span>

                <span className="text-lg font-bold text-indigo-700">
                  {colleges.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Success / Error Notice */}
        {notice && (
          <div className="mb-4 flex shrink-0 items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-5 py-3 text-sm text-blue-800">
            <span>{notice}</span>

            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notice"
              className="ml-4"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Only this section scrolls */}
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-5">

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl border border-[#e0e5ed] bg-white p-12 text-center text-[#718096] shadow-sm">
              Loading colleges...
            </div>
          ) : filteredColleges.length === 0 ? (
            /* Empty State */
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
            <>
              {/* College Cards */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedColleges.map((college) => (
                  <article
                    key={college._id}
                    className="rounded-2xl border border-[#e0e5ed] bg-white px-2 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eff5ff]">
                          {college.collegeLogo ? (
                            <img
                              src={college.collegeLogo}
                              alt={college.collegeName}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <span className="text-xl text-blue-600">
                              🏛
                            </span>
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

                      {/* Three-dot Action Menu */}
                      <div className="relative shrink-0">
                        <button
                          type="button"
                          aria-label={`Actions for ${college.collegeName}`}
                          aria-expanded={activeMenu === college._id}
                          onClick={(event) => {
                            event.stopPropagation();
                            setActiveMenu(
                              activeMenu === college._id
                                ? null
                                : college._id
                            );
                          }}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-[#718096] transition hover:bg-[#f0f4fa] hover:text-[#141d35]"
                        >
                          <MoreVertical size={17} strokeWidth={2} />
                        </button>

                        {activeMenu === college._id && (
                          <div
                            onClick={(event) => event.stopPropagation()}
                            className="absolute right-5 top-0 z-50 w-30 overflow-hidden rounded-xl border border-[#e0e5ed] bg-white py-1 shadow-xl"
                          >
                            <button
                              type="button"
                              onClick={() => openView(college)}
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-[#344054] transition hover:bg-[#f5f7fb]"
                            >
                              <Eye size={15} />
                              <span>View</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => openEdit(college)}
                              className="flex w-full items-center gap-3 px-3 text-left text-sm text-[#344054] transition hover:bg-[#f5f7fb]"
                            >
                              <Pencil size={15} />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(college)}
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
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

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalItems={filteredColleges.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>

      {/* Add / Edit / View Modal */}
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
                <X size={16} />
              </button>
            </div>

            {modal === "view" ? (
              <div>
                <div className="mb-6 flex justify-center rounded-xl bg-[#f5f8ff] p-6">
                  {selectedCollege?.collegeLogo ? (
                    <img
                      src={selectedCollege.collegeLogo}
                      alt={selectedCollege?.collegeName}
                      loading="eager"
                      decoding="async"
                      className="h-25 w-25 object-contain"
                    />
                  ) : (
                    <span className="text-4xl text-blue-600">🏛</span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-[#8a96a8]">
                      College Name
                    </p>

                    <p className="mt-1 font-semibold text-[#141d35]">
                      {selectedCollege?.collegeName}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#8a96a8]">
                      College ID
                    </p>

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
                  onChange={(event) =>
                    setCollegeName(event.target.value)
                  }
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
                      src={
                        imagePreview ||
                        selectedCollege?.collegeLogo
                      }
                      alt="College logo preview"
                      loading="eager"
                      decoding="async"
                      className="h-28 max-w-full object-contain"
                    />
                  ) : (
                    <>
                      <span className="text-3xl text-blue-600">
                        <Plus/>
                      </span>

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

                  <Button
                    text={
                      saving
                        ? "Saving..."
                        : modal === "edit"
                          ? "Save Changes"
                          : "Add College"
                    }
                    type="submit"
                    disabled={saving}
                  />
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
