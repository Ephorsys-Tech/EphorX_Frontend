
import { useMemo, useState, useEffect } from "react";
import {
    Search,
    UserRound,
    Eye,
    Inbox,
    MoreVertical,
    Pencil,
    Trash2,
    X,
} from "lucide-react";

import contactApi from "../api/contactApi.js";
import ContactDetailsModal from "../modals/ContactDetailsModal.jsx";
import EditContactModal from "../modals/EditContactModal.jsx";
import RefreshButton from "../../common/components/RefreshButton.jsx";
import Pagination from "../../common/components/Pagination.jsx";

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [selectedContact, setSelectedContact] = useState(null);
    const [openActionId, setOpenActionId] = useState(null);
    const [editingContact, setEditingContact] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch contacts
    const loadContacts = async () => {
        setLoading(true);
        setError("");

        try {
            const result = await contactApi.getAll();

            const possibleLists = [
                result,
                result?.data,
                result?.data?.contacts,
                result?.contacts,
                result?.data?.data,
            ];

            const list = possibleLists.find(Array.isArray);

            if (!list) {
                console.error(
                    "Unexpected contacts API response:",
                    result
                );

                throw new Error(
                    "Could not read contacts from the API. Check the backend response."
                );
            }

            setContacts(list);
        } catch (err) {
            setError(
                err.message || "Failed to load contact submissions."
            );
        } finally {
            setLoading(false);
        }
    };

    // Initial API call
    useEffect(() => {
        loadContacts();
    }, []);

    // Search and filter contacts
    const filteredContacts = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) return contacts;

        return contacts.filter((contact) =>
            [
                contact.name,
                contact.fullName,
                contact.email,
                contact.phone,
                contact.whatsApp,
                contact.message,
            ]
                .filter(Boolean)
                .some((value) =>
                    String(value).toLowerCase().includes(term)
                )
        );
    }, [contacts, search]);

    // Reset pagination when searching
    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    // Pagination calculations
    const totalPages = Math.ceil(
        filteredContacts.length / itemsPerPage
    );

    // Get contacts for current page
    const paginatedContacts = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;

        return filteredContacts.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [filteredContacts, currentPage, itemsPerPage]);

    // Adjust page if contacts are deleted
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    // Contact name
    const getContactName = (contact) =>
        contact.name ||
        contact.fullName ||
        "Unnamed contact";

    // Contact date
    const getContactDate = (contact) => {
        const date =
            contact.createdAt ||
            contact.created_at ||
            contact.date;

        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "—";
        }

        return parsedDate.toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    // Delete contact
    const handleDeleteContact = async (contact) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete the message from ${
                getContactName(contact)
            }?`
        );

        if (!confirmed) return;

        try {
            await contactApi.delete(
                contact._id || contact.id
            );

            setContacts((previous) =>
                previous.filter(
                    (item) =>
                        (item._id || item.id) !==
                        (contact._id || contact.id)
                )
            );

            setOpenActionId(null);
        } catch (err) {
            setError(
                err.message || "Failed to delete contact."
            );
        }
    };

    return (
        <div className="min-h-full bg-slate-50 px-3 sm:px-6 lg:px-5">
            <div className="mx-auto max-w-7xl">

                {/* Page header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Contact Messages
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            View and manage messages submitted through your website.
                        </p>
                    </div>
                </div>

                {/* Error message */}
                {error && (
                    <div
                        role="alert"
                        className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={loadContacts}
                            className="font-semibold underline"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Search and actions */}
                <div className="mb-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        {/* Search input */}
                        <div className="relative w-full flex-1 sm:max-w-md">
                            <Search
                                size={19}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search name, email or message..."
                                aria-label="Search contact messages"
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

                        {/* Right-side actions */}
                        <div className="flex items-center justify-end gap-4">
                            <RefreshButton
                                onClick={loadContacts}
                                loading={loading}
                            />

                            <div className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 px-5 py-3 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-600">
                                    Total Messages:
                                </span>

                                <span className="text-lg font-bold text-indigo-700">
                                    {filteredContacts.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact messages */}
                {loading ? (
                    <div className="rounded-xl border border-slate-200 bg-white px-5 py-16 text-center text-sm text-slate-500">
                        Loading contact messages...
                    </div>
                ) : filteredContacts.length > 0 ? (
                    <>
                        {/* Contacts table */}
                        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-190 text-left">

                                    {/* Table header */}
                                    <thead className="border-b border-slate-200 bg-slate-50">
                                        <tr>
                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Contact
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Message
                                            </th>

                                            <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Submitted
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Table body */}
                                    <tbody className="divide-y divide-slate-100">
                                        {paginatedContacts.map((contact, index) => {
                                            const contactId =
                                                contact._id ||
                                                contact.id ||
                                                index;

                                            return (
                                                <tr
                                                    key={contactId}
                                                    className="transition hover:bg-slate-50"
                                                >
                                                    {/* Contact details */}
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                                                <UserRound size={19} />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="max-w-48 truncate text-sm font-semibold text-slate-800">
                                                                    {getContactName(contact)}
                                                                </p>

                                                                <p className="mt-1 max-w-48 truncate text-xs text-slate-500">
                                                                    {contact.email || "No email provided"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Message */}
                                                    <td className="px-5 py-4">
                                                        <p className="max-w-64 truncate text-sm text-slate-500">
                                                            {contact.message || "No message"}
                                                        </p>
                                                    </td>

                                                    {/* Submitted date */}
                                                    <td className="px-5 py-4 text-sm text-slate-500">
                                                        {getContactDate(contact)}
                                                    </td>

                                                    {/* Actions */}
                                                    <td className="px-5 py-4 text-right">
                                                        <div className="relative inline-block text-left">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setOpenActionId(
                                                                        (current) =>
                                                                            current === contactId
                                                                                ? null
                                                                                : contactId
                                                                    )
                                                                }
                                                                aria-label="Open contact actions"
                                                                aria-expanded={
                                                                    openActionId === contactId
                                                                }
                                                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                                                            >
                                                                <MoreVertical size={20} />
                                                            </button>

                                                            {openActionId === contactId && (
                                                                <div className="absolute right-0 z-30 mt-2 min-w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 text-left shadow-lg">

                                                                    {/* View */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedContact(contact);
                                                                            setOpenActionId(null);
                                                                        }}
                                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                                                    >
                                                                        <Eye
                                                                            size={16}
                                                                            className="text-emerald-600"
                                                                        />
                                                                        View
                                                                    </button>

                                                                    {/* Edit */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setEditingContact(contact);
                                                                            setOpenActionId(null);
                                                                        }}
                                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                                                    >
                                                                        <Pencil
                                                                            size={16}
                                                                            className="text-blue-600"
                                                                        />
                                                                        Edit
                                                                    </button>

                                                                    <div className="border-t border-slate-100" />

                                                                    {/* Delete */}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDeleteContact(contact)
                                                                        }
                                                                        className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                                                                    >
                                                                        <Trash2 size={16} />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Reusable pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredContacts.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </>
                ) : (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            <Inbox size={30} />
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-slate-800">
                            {search
                                ? "No messages found"
                                : "No contact messages yet"}
                        </h2>

                        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                            {search
                                ? "Try searching with a different name, email or keyword."
                                : "Messages submitted through your website will appear here after you connect your contact API."}
                        </p>

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="mt-5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Contact details modal */}
            <ContactDetailsModal
                contact={selectedContact}
                onClose={() => setSelectedContact(null)}
            />

            {/* Edit contact modal */}
            <EditContactModal
                contact={editingContact}
                onClose={() => setEditingContact(null)}
                onUpdated={(updatedContact) => {
                    const updatedId =
                        updatedContact?._id ||
                        updatedContact?.id;

                    if (updatedId) {
                        setContacts((previous) =>
                            previous.map((item) =>
                                (item._id || item.id) === updatedId
                                    ? updatedContact
                                    : item
                            )
                        );
                    } else {
                        loadContacts();
                    }

                    setEditingContact(null);
                }}
            />
        </div>
    );
}
