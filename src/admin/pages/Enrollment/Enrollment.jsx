
import { useState, useEffect, useCallback } from "react";
import { RefreshCw, Plus } from "lucide-react";

import EnrollmentTabs from "../../components/enrollments/EnrollmentTabs.jsx";
import EnrollmentSearch from "../../components/enrollments/EnrollmentSearch.jsx";
import EnrollmentCard from "../../components/enrollments/EnrollmentCard.jsx";
import EnrollmentDetailsModal from "../../modals/WebEnrollViewModal.jsx";

import { deleteWebinarEnrollment, getWebinarEnrollments } from "../../api/webEnrollApi.js";
import { deleteCourseEnrollment, getCourseEnrollments } from "../../api/courseEnrollApi.js";

import EditEnrollmentModal from "../../modals/EditEnrollModal.jsx";

import AddCourseEnrollment from "./AddCourseEnrollment.jsx";
import AddWebinarEnrollment from "./AddWebinarEnrollment.jsx";

const Enrollment = ({ onAddWebinar, onAddCourse }) => {

    // Active tab and UI states
    const [activeTab, setActiveTab] = useState("webinar");
    const [search, setSearch] = useState("");
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);

    // Enrollment data
    const [webinarEnrollments, setWebinarEnrollments] = useState([]);
    const [courseEnrollments, setCourseEnrollments] = useState([]);

    const [editingEnrollment, setEditingEnrollment] = useState(null);

    const [showAddWebinar, setShowAddWebinar] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);

    // Loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch enrollments from API
    const fetchEnrollments = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            let response;

            if (activeTab === "webinar") {
                response = await getWebinarEnrollments();

                const records = Array.isArray(response)
                    ? response
                    : response?.data || response?.enrollments || [];

                setWebinarEnrollments(records);
            } else {
                response = await getCourseEnrollments();

                const records = Array.isArray(response)
                    ? response
                    : response?.data || response?.enrollments || [];

                setCourseEnrollments(records);
            }

        } catch (err) {
            console.error("Fetching enrollments failed:", err);

            setError(
                err.response?.data?.message ||
                "Failed to fetch enrollments. Please try again."
            );

        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    // Fetch data when component loads or tab changes
    useEffect(() => {
        fetchEnrollments();
    }, [fetchEnrollments]);

    // Select enrollments according to active tab
    const enrollments =
        activeTab === "webinar"
            ? webinarEnrollments
            : courseEnrollments;

    // Search functionality
    const filteredEnrollments = enrollments.filter((item) => {
        const value = search.toLowerCase();

        return (
            item.fullName?.toLowerCase().includes(value) ||
            item.email?.toLowerCase().includes(value) ||
            item.phoneNumber?.includes(value)
        );
    });

    // Add enrollment
    const handleAdd = () => {
        if (activeTab === "webinar") {
            setShowAddWebinar(true);
        } else {
            setShowAddCourse(true);
        }
    };

    // Edit enrollment - will connect to PUT API later
    const handleEdit = (enrollment) => {
        setEditingEnrollment(enrollment);
    };

    // Delete enrollment - will connect to DELETE API later
    const handleDelete = async (enrollment) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete the enrollment of ${enrollment.fullName}?`
  );

  if (!confirmDelete) return;

  try {
    if (activeTab === "webinar") {
      await deleteWebinarEnrollment(enrollment._id);
    } else {
      await deleteCourseEnrollment(enrollment._id);
    }

    alert("Enrollment deleted successfully!");

    await fetchEnrollments();
  } catch (error) {
    console.error("Delete enrollment error:", error);

    alert(
      error.response?.data?.message ||
        "Unable to delete enrollment. Please try again."
    );
  }
};

    return (
        <div className="min-h-screen bg-[#F6F8FC] px-3 md:px-8">

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                    <h1 className="text-3xl font-bold text-[#111A30]">
                        Enrollment Management
                    </h1>

                    <p className="mt-2 text-base text-slate-500">
                        Manage your webinar and course participants.
                    </p>
                </div>

                {/* Add Webinar / Add Course */}
                <button
                    onClick={handleAdd}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#4935F5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3826DB]"
                >
                    <Plus size={20} />

                    {activeTab === "webinar"
                        ? "Add Webinar"
                        : "Add Course"}
                </button>

            </div>

            {/* Main Card */}
            <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Tabs */}
                <div className="px-6 pt-5">
                    <EnrollmentTabs
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setSearch("");
                            setSelectedEnrollment(null);
                        }}
                    />
                </div>

                {/* Search and Refresh */}
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center">

                    <EnrollmentSearch
                        search={search}
                        setSearch={setSearch}
                    />

                    <div className="flex items-center justify-between gap-6">

                        {/* Refresh Button */}
                        <button
                            onClick={fetchEnrollments}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl bg-[#4935F5] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3826DB] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw
                                size={18}
                                className={loading ? "animate-spin" : ""}
                            />

                            {loading ? "Refreshing..." : "Refresh"}
                        </button>

                        {/* Enrollment Count */}
                        <span className="whitespace-nowrap text-sm font-semibold text-slate-600">
                            {filteredEnrollments.length} Enrollments
                        </span>

                    </div>
                </div>

                {/* Enrollment Cards */}
                <div className="p-6">

                    {/* Loading State */}
                    {loading ? (

                        <div className="py-16 text-center">
                            <RefreshCw
                                size={28}
                                className="mx-auto animate-spin text-[#4935F5]"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                                Loading enrollments...
                            </p>
                        </div>

                    ) : error ? (

                        /* Error State */
                        <div className="py-16 text-center">
                            <p className="text-sm font-medium text-red-500">
                                {error}
                            </p>

                            <button
                                onClick={fetchEnrollments}
                                className="mt-4 rounded-lg bg-[#4935F5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#3826DB]"
                            >
                                Try Again
                            </button>
                        </div>

                    ) : filteredEnrollments.length > 0 ? (

                        /* Enrollment Cards */
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {filteredEnrollments.map((enrollment) => (
                                <EnrollmentCard
                                    key={enrollment._id}
                                    enrollment={enrollment}
                                    onView={() => setSelectedEnrollment(enrollment)}
                                    onEdit={() => handleEdit(enrollment)}
                                    onDelete={() => handleDelete(enrollment)}
                                />
                            ))}

                        </div>

                    ) : (

                        /* Empty State */
                        <div className="py-16 text-center">

                            <h3 className="text-lg font-semibold text-slate-700">
                                No Enrollments Found
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                {search
                                    ? "Try searching with another name or email."
                                    : "Participant registrations will appear here."}
                            </p>

                        </div>

                    )}

                </div>
            </div>

            {/* Enrollment Details Modal */}
            <EnrollmentDetailsModal
                enrollment={selectedEnrollment}
                activeTab={activeTab}
                onClose={() => setSelectedEnrollment(null)}
            />

            {/* Edit Enrollment Modal */}
            <EditEnrollmentModal
                enrollment={editingEnrollment}
                activeTab={activeTab}
                onClose={() => setEditingEnrollment(null)}
                onUpdated={fetchEnrollments}
            />

            {/* Add Webinar Participant Modal */}
            {showAddWebinar && (
                <AddWebinarEnrollment
                    onClose={() => setShowAddWebinar(false)}
                    onCreated={fetchEnrollments}
                />
            )}

            {/* Add Course Participant Modal */}
            {showAddCourse && (
                <AddCourseEnrollment
                    onClose={() => setShowAddCourse(false)}
                    onCreated={fetchEnrollments}
                />
            )}
        </div>
    );
};

export default Enrollment;
