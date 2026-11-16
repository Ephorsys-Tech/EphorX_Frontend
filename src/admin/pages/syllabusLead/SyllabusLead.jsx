
import { useEffect, useMemo, useState } from "react";
import { Search, Users, X } from "lucide-react";
import SyllabusLeadCard from "../../components/SyllabusLeadCard";
import {
    getAllSyllabusLeads,
    deleteSyllabusLead,
} from "../../api/syllabusLeadApi";
import RefreshButton from "../../../common/components/RefreshButton";

const extractLeads = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.downloads)) return response.downloads;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.syllabusLeads)) return response.syllabusLeads;

    return [];
};

const SyllabusLeads = () => {
    const [leads, setLeads] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLeads = async () => {
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
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    const filteredLeads = useMemo(() => {
        const term = search.toLowerCase().trim();

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
    }, [leads, search]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this syllabus lead?"
        );

        if (!confirmed) return;

        try {
            await deleteSyllabusLead(id);

            setLeads((previous) =>
                previous.filter((lead) => lead._id !== id)
            );
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Failed to delete lead."
            );
        }
    };

    return (
        <div className="px-4 md:px-6 space-y-6">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Syllabus Leads
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View and manage people who requested course syllabuses.
                    </p>
                </div>
            </div>

            {/* Search, Refresh and Count */}
            <div className="mb-6 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    {/* Search Input */}
                    <div className="relative w-full flex-1 sm:max-w-md">
                        <Search
                            size={19}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, email, phone or course..."
                            aria-label="Search syllabus leads"
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

                    {/* Right-side Actions */}
                    <div className="flex items-center justify-end gap-4">

                        <RefreshButton
                            onClick={fetchLeads}
                            loading={loading}
                        />

                        {/* Lead Count */}
                        <div className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-50 px-5 py-3 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-600">
                                Total Leads:
                            </span>

                            <span className="text-lg font-bold text-indigo-700">
                                {leads.length}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Loading, Empty State and Leads */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">
                    Loading syllabus leads...
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl text-center py-14">
                    <Users
                        size={38}
                        className="mx-auto text-gray-300 mb-3"
                    />

                    <h3 className="font-semibold text-gray-800">
                        No syllabus leads found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {search
                            ? "Try another search term."
                            : "New syllabus requests will appear here."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredLeads.map((lead) => (
                        <SyllabusLeadCard
                            key={lead._id}
                            lead={lead}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export default SyllabusLeads;
