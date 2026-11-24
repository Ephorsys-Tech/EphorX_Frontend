
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    Users,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    RefreshCw,
    X,
} from "lucide-react";

import {
    getAllSyllabusLeads,
    deleteSyllabusLead,
} from "../../api/syllabusLeadApi";

import RefreshButton from "../../../common/components/RefreshButton";
import Pagination from "../../../common/components/Pagination";

const extractLeads = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.downloads)) return response.downloads;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.syllabusLeads)) return response.syllabusLeads;

    return [];
};

const SyllabusLeads = () => {
    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [openActionId, setOpenActionId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch syllabus leads
    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getAllSyllabusLeads();
            setLeads(extractLeads(response));
        } catch (err) {
            console.error("Fetch Syllabus Leads Error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to fetch syllabus leads."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    // Search leads
    const filteredLeads = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();

        if (!term) return leads;

        return leads.filter((lead) =>
            [
                lead.fullName,
                lead.email,
                lead.phoneNumber,
                lead.whatsappNumber,
                lead.qualification,
                lead.courseName,
            ]
                .filter(Boolean)
                .some((value) =>
                    String(value).toLowerCase().includes(term)
                )
        );
    }, [leads, searchTerm]);

    // Reset pagination when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredLeads.length / itemsPerPage
    );

    const paginatedLeads = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;

        return filteredLeads.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [filteredLeads, currentPage]);

    // Adjust page after deleting
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // Delete lead
    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            setDeleting(true);
            setError("");

            await deleteSyllabusLead(deleteTarget._id);

            setLeads((previous) =>
                previous.filter(
                    (lead) => lead._id !== deleteTarget._id
                )
            );

            setDeleteTarget(null);
            setOpenActionId(null);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to delete lead."
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">

                {/* Page Header - Fixed */}
                <div className="mb-5 flex shrink-0 flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Syllabus Leads
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Manage people who requested course syllabuses.
                        </p>
                    </div>

                    <RefreshButton
                        onClick={fetchLeads}
                        loading={loading}
                    />
                </div>

                {/* Error Message - Fixed */}
                {error && (
                    <div className="mb-5 flex shrink-0 items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="shrink-0 rounded p-1 transition hover:bg-red-100"
                            aria-label="Dismiss error"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Search - Fixed */}
                <div className="mb-5 shrink-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
                    <div className="relative">
                        <Search
                            size={19}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="Search by name, email, phone or course..."
                            aria-label="Search syllabus leads"
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-11 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                        />

                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => setSearchTerm("")}
                                aria-label="Clear search"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                            >
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Leads Table Container - Fixed Outer Header */}
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                    {/* Table Header - Fixed */}
                    <div className="flex shrink-0 flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="font-semibold text-gray-900">
                            All Syllabus Leads
                        </h2>

                        <span className="text-sm text-gray-500">
                            Total Leads:{" "}
                            <span className="font-semibold text-indigo-600">
                                {leads.length}
                            </span>
                        </span>
                    </div>

                    {/* Scrollable Table Content */}
                    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">

                        {/* Loading */}
                        {loading ? (
                            <div className="flex min-h-64 flex-col items-center justify-center gap-3">
                                <RefreshCw
                                    size={28}
                                    className="animate-spin text-blue-600"
                                />

                                <p className="text-sm text-gray-500">
                                    Loading syllabus leads...
                                </p>
                            </div>
                        ) : filteredLeads.length === 0 ? (

                            /* Empty State */
                            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                                    <Users size={26} className="text-gray-400" />
                                </div>

                                <h3 className="text-base font-semibold text-gray-800">
                                    {leads.length === 0
                                        ? "No syllabus leads found"
                                        : "No matching leads"}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    {leads.length === 0
                                        ? "New syllabus requests will appear here."
                                        : "Try changing your search term."}
                                </p>

                                {leads.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="mt-4 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>

                        ) : (
                            <>
                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-237.5 border-collapse text-left">
                                        <thead className="sticky top-0 z-10 bg-gray-50/95">
                                            <tr className="border-b border-gray-100">
                                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Name
                                                </th>

                                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Course
                                                </th>

                                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Email
                                                </th>

                                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Phone
                                                </th>

                                                <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    WhatsApp
                                                </th>

                                                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-100">
                                            {paginatedLeads.map((lead) => (
                                                <tr
                                                    key={lead._id}
                                                    className="transition hover:bg-gray-50/70"
                                                >
                                                    {/* Lead */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-600">
                                                                {lead.fullName
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() || "L"}
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="text-sm font-semibold text-gray-900">
                                                                    {lead.fullName || "—"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Course */}
                                                    <td className="px-5 py-4">
                                                        <p className="text-sm font-medium text-gray-800">
                                                            {lead.courseName || "—"}
                                                        </p>
                                                    </td>

                                                    {/* Email */}
                                                    <td className="px-5 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            {lead.email || "—"}
                                                        </div>
                                                    </td>

                                                    {/* Phone */}
                                                    <td className="px-5 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            {lead.phoneNumber || "—"}
                                                        </div>
                                                    </td>

                                                    {/* WhatsApp */}
                                                    <td className="px-5 py-4">
                                                        <div className="text-sm text-gray-600">
                                                            {lead.whatsappNumber || "—"}
                                                        </div>
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4 text-right">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setOpenActionId(
                                                                        openActionId === lead._id
                                                                            ? null
                                                                            : lead._id
                                                                    )
                                                                }
                                                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                                                aria-label={`Actions for ${lead.fullName}`}
                                                                aria-expanded={openActionId === lead._id}
                                                            >
                                                                <MoreVertical size={20} />
                                                            </button>

                                                            {openActionId === lead._id && (
                                                                <>
                                                                    <button
                                                                        type="button"
                                                                        aria-label="Close actions menu"
                                                                        className="fixed inset-0 z-10 cursor-default"
                                                                        onClick={() =>
                                                                            setOpenActionId(null)
                                                                        }
                                                                    />

                                                                    <div className="absolute right-8 -top-12 z-20 w-28 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setOpenActionId(null);
                                                                                navigate(`/admin/view-lead/${lead._id}`);
                                                                            }}
                                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
                                                                        >
                                                                            <Eye size={16} />
                                                                            View
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setOpenActionId(null);
                                                                                navigate(`/admin/edit-lead/${lead._id}`);
                                                                            }}
                                                                            className="flex w-full items-center gap-3 px-4  text-sm text-gray-700 transition hover:bg-gray-50"
                                                                        >
                                                                            <Pencil size={16} />
                                                                            Edit
                                                                        </button>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                setOpenActionId(null);
                                                                                setDeleteTarget(lead);
                                                                            }}
                                                                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                                                                        >
                                                                            <Trash2 size={16} />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="border-t border-gray-100">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalItems={filteredLeads.length}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
                    onMouseDown={(event) => {
                        if (
                            event.target === event.currentTarget &&
                            !deleting
                        ) {
                            setDeleteTarget(null);
                        }
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="delete-lead-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
                    >
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                            <Trash2 size={23} className="text-red-600" />
                        </div>

                        <h2
                            id="delete-lead-title"
                            className="text-lg font-bold text-gray-900"
                        >
                            Delete syllabus lead?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Are you sure you want to delete{" "}
                            <span className="font-semibold text-gray-800">
                                {deleteTarget.fullName}
                            </span>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                disabled={deleting}
                                onClick={() => setDeleteTarget(null)}
                                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={deleting}
                                onClick={handleDelete}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deleting && (
                                    <RefreshCw
                                        size={15}
                                        className="animate-spin"
                                    />
                                )}

                                {deleting ? "Deleting..." : "Delete Lead"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SyllabusLeads;
