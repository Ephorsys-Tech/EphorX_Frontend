import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Pencil,
    User,
    Mail,
    Phone,
    GraduationCap,
    BookOpen,
    MessageCircle,
    Calendar,
} from "lucide-react";

import { getDemoBookingById } from "../../api/demoBookingApi";

const ViewDemoSession = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDemoSession = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await getDemoBookingById(id);

                const bookingData =
                    response.demoBooking ||
                    response.booking ||
                    response.data?.demoBooking ||
                    response.data?.booking ||
                    response.data;

                if (!bookingData || !bookingData._id) {
                    throw new Error("Demo session not found.");
                }

                setBooking(bookingData);
            } catch (err) {
                console.error("Fetch demo session error:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load demo session."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDemoSession();
    }, [id]);

    const detailClass =
        "flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4";

    const DetailItem = ({ icon: Icon, label, value }) => (
        <div className={detailClass}>
            <div className="rounded-lg bg-white p-2 text-blue-600 shadow-sm">
                <Icon size={19} />
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {label}
                </p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-800">
                    {value || "Not provided"}
                </p>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading demo session...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>

                <button
                    onClick={() => navigate("/admin/demo-sessions")}
                    className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600"
                >
                    <ArrowLeft size={17} />
                    Back to Demo Sessions
                </button>
            </div>
        );
    }

    if (!booking) return null;

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <button
                        onClick={() => navigate("/admin/book-demo")}
                        className="mb-7 flex items-center gap-3 text-[17px] font-medium text-slate-600 transition hover:text-blue-600"
                    >
                        <ArrowLeft size={22} />
                        Back to Demo Sessions
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            View Demo Request
                        </h1>
                        <p className="text-sm text-gray-500">
                            View complete demo booking details.
                        </p>
                    </div>
                </div>

                <button
                    onClick={() =>
                        navigate(`/admin/edit-demo/${booking._id}`)
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Pencil size={17} />
                    Edit Demo Request
                </button>
            </div>

            {/* Details Card */}
            <div className="max-w-4xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {booking.fullName}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {booking.courseName}
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-600">
                        Demo Request
                    </span>
                </div>

                <h3 className="mb-4 text-sm font-semibold text-gray-700">
                    Personal Information
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DetailItem
                        icon={User}
                        label="Full Name"
                        value={booking.fullName}
                    />

                    <DetailItem
                        icon={Mail}
                        label="Email Address"
                        value={booking.email}
                    />

                    <DetailItem
                        icon={Phone}
                        label="Phone Number"
                        value={booking.phoneNumber}
                    />

                    <DetailItem
                        icon={MessageCircle}
                        label="WhatsApp Number"
                        value={booking.whatsappNumber}
                    />

                    <DetailItem
                        icon={GraduationCap}
                        label="Qualification"
                        value={booking.qualification}
                    />
                </div>

                <h3 className="mb-4 mt-8 text-sm font-semibold text-gray-700">
                    Course Information
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DetailItem
                        icon={BookOpen}
                        label="Course Name"
                        value={booking.courseName}
                    />

                    <DetailItem
                        icon={GraduationCap}
                        label="Course ID"
                        value={booking.courseId}
                    />
                </div>

                <h3 className="mb-4 mt-8 text-sm font-semibold text-gray-700">
                    Booking Information
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DetailItem
                        icon={Calendar}
                        label="Created At"
                        value={
                            booking.createdAt
                                ? new Date(booking.createdAt).toLocaleString()
                                : "Not available"
                        }
                    />

                    <DetailItem
                        icon={Calendar}
                        label="Last Updated"
                        value={
                            booking.updatedAt
                                ? new Date(booking.updatedAt).toLocaleString()
                                : "Not available"
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewDemoSession;