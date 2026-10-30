import { X, UserRound } from "lucide-react";

const WebEnrollViewModal = ({
  enrollment,
  activeTab,
  onClose,
}) => {
  if (!enrollment) return null;

  const details = [
    {
      label: "Full Name",
      value: enrollment.fullName,
    },
    {
      label: "Email Address",
      value: enrollment.email,
    },
    {
      label: "Phone Number",
      value: enrollment.phoneNumber,
    },
    {
      label: "WhatsApp Number",
      value: enrollment.whatsappNumber,
    },
    {
      label: "Profession",
      value: enrollment.profession,
    },
    {
      label: activeTab === "webinar" ? "Webinar ID" : "Course ID",
      value:
        activeTab === "webinar"
          ? enrollment.webinarId
          : enrollment.courseId,
    },
    {
      label: "Enrollment ID",
      value: enrollment._id,
    },
    {
      label: "Enrollment Date",
      value: enrollment.createdAt
        ? new Date(enrollment.createdAt).toLocaleDateString()
        : "Not available",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Enrollment Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete participant information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={21} />
          </button>
        </div>

        {/* Participant */}
        <div className="flex items-center gap-4 bg-slate-50 p-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600">
            <UserRound size={30} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">
              {enrollment.fullName}
            </h3>

            <p className="text-sm text-slate-500">
              {activeTab === "webinar"
                ? "Webinar Participant"
                : "Course Participant"}
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {detail.label}
              </p>

              <p className="break-all text-sm font-medium text-slate-700">
                {detail.value || "Not available"}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 p-5">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default WebEnrollViewModal;