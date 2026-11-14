
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionHeading from "./SectionHeading";

export default function BookedDemoSessions({
  bookings,
  loading,
  error,
  onViewAll,
}) {
  const navigate = useNavigate();

  const handleViewBooking = (booking) => {
    const bookingId = booking._id || booking.id;

    if (!bookingId) {
      console.error("Booking ID not found:", booking);
      return;
    }

    navigate(`/admin/view-demo/${bookingId}`, {
      state: { booking },
    });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <SectionHeading
        icon={CalendarDays}
        title="Booked Demo Sessions"
        action="View All"
        onClick={onViewAll}
      />

      <div className="space-y-5">
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-400">
            Loading demo bookings...
          </p>
        ) : bookings.length > 0 ? (
          bookings.map(({ booking }, index) => {
            const studentName =
              booking.fullName ||
              booking.student?.fullName ||
              [booking.firstName, booking.lastName].filter(Boolean).join(" ") ||
              [booking.student?.firstName, booking.student?.lastName]
                .filter(Boolean)
                .join(" ") ||
              booking.studentName ||
              booking.student?.name ||
              booking.name ||
              "Student";

            const courseName =
              booking.courseName ||
              booking.course?.name ||
              booking.course?.title ||
              "Course not specified";

            const email = booking.email || booking.student?.email;

            const phone =
              booking.phone ||
              booking.phoneNumber ||
              booking.student?.phone;

            const status = booking.status || "Pending";

            const initials = studentName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={booking._id || booking.id || index}
                className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                  {initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-800">
                    {studentName}
                  </p>

                  <p className="mt-1 truncate text-[11px] text-blue-600">
                    {courseName}
                  </p>

                  {email && (
                    <p className="mt-1 truncate text-[11px] text-slate-500">
                      {email}
                    </p>
                  )}

                  {phone && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      {phone}
                    </p>
                  )}

                  <span className="mt-2 inline-block rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                    {status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleViewBooking(booking)}
                  className="shrink-0 rounded-lg bg-blue-600 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            );
          })
        ) : (
          <p className="py-8 text-center text-sm text-slate-400">
            {error || "No students have booked demo sessions yet."}
          </p>
        )}
      </div>
    </div>
  );
}
