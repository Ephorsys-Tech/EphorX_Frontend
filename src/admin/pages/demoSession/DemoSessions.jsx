
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  CalendarDays,
  Users,
  BookOpen,
  RefreshCw,
  X,
  Trash2,
  AlertCircle,
} from "lucide-react";

import DemoBookingCard from "../../components/DemoBookingCard.jsx";
import {
  getAllDemoBookings,
  deleteDemoBooking,
} from "../../api/demoBookingApi";

const DemoSessions = () => {
  const navigate = useNavigate();

  const [demoBookings, setDemoBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all demo sessions
  const fetchDemoBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllDemoBookings();

      const bookings =
        response.demoBookings ||
        response.bookings ||
        response.data?.demoBookings ||
        response.data?.bookings ||
        response.data;

      setDemoBookings(Array.isArray(bookings) ? bookings : []);
    } catch (err) {
      console.error("Fetch demo sessions error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to fetch demo sessions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemoBookings();
  }, []);

  // Search demo sessions
  const filteredBookings = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) return demoBookings;

    return demoBookings.filter((booking) => {
      return (
        booking.fullName?.toLowerCase().includes(search) ||
        booking.email?.toLowerCase().includes(search) ||
        booking.phoneNumber?.toLowerCase().includes(search) ||
        booking.whatsappNumber?.toLowerCase().includes(search) ||
        booking.courseName?.toLowerCase().includes(search) ||
        booking.courseId?.toLowerCase().includes(search) ||
        booking.qualification?.toLowerCase().includes(search)
      );
    });
  }, [demoBookings, searchTerm]);

  // Statistics
  const totalBookings = demoBookings.length;

  // Delete demo session
  const handleDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleting(true);

      await deleteDemoBooking(deleteTarget._id);

      setDemoBookings((prev) =>
        prev.filter((booking) => booking._id !== deleteTarget._id)
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete demo session error:", err);

      alert(
        err.response?.data?.message ||
        "Failed to delete demo session. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Demo Sessions
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all demo session booking requests.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchDemoBookings}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={() => navigate("/admin/add-demo")}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Demo Session
          </button>
        </div>
      </div>

      {/* Search */}

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone, qualification or course..."
              className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 rounded-lg bg-indigo-50 px-5 py-3 whitespace-nowrap">
            <span className="text-sm font-medium text-gray-600">
              Total Bookings:            </span>
            <span className="text-lg font-bold text-indigo-700">
              {totalBookings}
            </span>
          </div>
        </div>
      </div>


      {/* Section Heading */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <CalendarDays size={20} />
          All Demo Sessions
        </h2>

        <span className="text-sm text-gray-500">
          {filteredBookings.length} results
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <RefreshCw
            size={28}
            className="mx-auto animate-spin text-blue-600"
          />

          <p className="mt-3 text-sm text-gray-500">
            Loading demo sessions...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
          <AlertCircle
            size={28}
            className="mx-auto text-red-500"
          />

          <p className="mt-3 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={fetchDemoBookings}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Demo Booking Cards */}
      {!loading && !error && filteredBookings.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBookings.map((booking) => (
            <DemoBookingCard
              key={booking._id}
              booking={booking}
              onView={(booking) =>
                navigate(
                  `/admin/view-demo/${booking._id}`
                )
              }
              onEdit={(booking) =>
                navigate(
                  `/admin/edit-demo/${booking._id}`
                )
              }
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredBookings.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-12 text-center">
          <CalendarDays
            size={40}
            className="mx-auto text-gray-300"
          />

          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            {searchTerm
              ? "No matching demo sessions found"
              : "No demo sessions yet"}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? "Try searching with a different keyword."
              : "Add a demo session to get started."}
          </p>

          {!searchTerm && (
            <button
              onClick={() =>
                navigate("/admin/add-demo")
              }
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Demo Session
            </button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={23} />
            </div>

            <h3 className="mt-4 text-center text-lg font-bold text-gray-800">
              Delete Demo Session?
            </h3>

            <p className="mt-2 text-center text-sm text-gray-500">
              Are you sure you want to delete the demo booking
              for{" "}
              <span className="font-semibold text-gray-700">
                {deleteTarget.fullName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoSessions;
