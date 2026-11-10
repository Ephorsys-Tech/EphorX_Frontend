import {
  X,
  Mail,
  Phone,
  UserRound,
  MessageSquare,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

export default function ContactDetailsModal({ contact, onClose }) {
  if (!contact) return null;

  const contactName =
    contact.name || contact.fullName || "Unnamed contact";

  const contactEmail =
    contact.email ||
    contact.emailAddress ||
    contact.email_address ||
    "";

  const contactPhone =
    contact.phone ||
    contact.phoneNumber ||
    contact.phone_number ||
    "";

 const contactWhatsApp = String(
  contact?.whatsApp ??
  contact?.wpno ??
  contact?.whatsapp ??
  contact?.whatsappNumber ??
  contact?.whatsapp_number ??
  ""
).trim();

  const contactCourse =
    contact.course ||
    contact.courseName ||
    contact.course_name ||
    "";

  const contactMessage =
    contact.message ||
    contact.messageRegarding ||
    contact.message_regarding ||
    "";

  const getContactDate = () => {
    const date =
      contact.createdAt ||
      contact.created_at ||
      contact.date;

    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="my-auto w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Modal header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="contact-modal-title"
              className="text-xl font-bold text-slate-800"
            >
              Contact Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Full information submitted through the contact form.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close contact details"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Contact name */}
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={23} />
            </div>

            <div className="min-w-0">
              <h3 className="wrap-break-word text-lg font-semibold text-slate-800">
                {contactName}
              </h3>

              <p className="text-sm text-slate-500">
                Contact submission
              </p>
            </div>
          </div>

          {/* Contact fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <Mail size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Email
                </span>
              </div>

              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all text-sm text-slate-700 hover:text-blue-600"
                >
                  {contactEmail}
                </a>
              ) : (
                <p className="text-sm text-slate-400">
                  Not provided
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <Phone size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Phone Number
                </span>
              </div>

              {contactPhone ? (
                <a
                  href={`tel:${contactPhone}`}
                  className="break-all text-sm text-slate-700 hover:text-blue-600"
                >
                  {contactPhone}
                </a>
              ) : (
                <p className="text-sm text-slate-400">
                  Not provided
                </p>
              )}
            </div>

            {/* WhatsApp */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <MessageSquare size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  WhatsApp Number
                </span>
              </div>

              {contactWhatsApp ? (
                <a
                  href={`https://wa.me/${contactWhatsApp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm text-slate-700 hover:text-blue-600"
                >
                  {contactWhatsApp}
                </a>
              ) : (
                <p className="text-sm text-slate-400">
                  Not provided
                </p>
              )}
            </div>

            {/* Course */}
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <GraduationCap size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Course
                </span>
              </div>

              <p className="wrap-break-word text-sm text-slate-700">
                {contactCourse || "Not provided"}
              </p>
            </div>
            {/* Message */}
            <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <MessageSquare size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Message Regarding
                </span>
              </div>

              <p className="whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-700">
                {contactMessage || "No message provided"}
              </p>
            </div>

            {/* Submission date */}
            <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
              <div className="mb-2 flex items-center gap-2 text-blue-600">
                <CalendarDays size={17} />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  Submission Date
                </span>
              </div>

              <p className="text-sm text-slate-700">
                {getContactDate()}
              </p>
            </div>
          </div>

          {/* Modal footer */}
          <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
