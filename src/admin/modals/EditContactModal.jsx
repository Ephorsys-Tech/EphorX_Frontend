import { useEffect, useState } from "react";
import {
  X,
  Mail,
  Phone,
  UserRound,
  MessageSquare,
  GraduationCap,
  BookOpen,
  Save,
} from "lucide-react";
import contactApi from "../api/contactApi";

export default function EditContactModal({
  contact,
  onClose,
  onUpdated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsApp: "",
    course: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!contact) return;

    setFormData({
      name: contact.name || contact.fullName || "",
      email:
        contact.email ||
        contact.emailAddress ||
        contact.email_address ||
        "",
      phone:
        contact.phone ||
        contact.phoneNumber ||
        contact.phone_number ||
        "",
      whatsApp:
        contact.whatsApp ||
        contact.wpno ||
        contact.whatsapp ||
        contact.whatsappNumber ||
        contact.whatsapp_number ||
        "",
      course:
        contact.course ||
        contact.courseName ||
        contact.course_name ||
        "",
      message:
        contact.message ||
        contact.messageRegarding ||
        contact.message_regarding ||
        "",
    });

    setError("");
  }, [contact]);

  if (!contact) return null;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const contactId = contact._id || contact.id;

    if (!contactId) {
      setError("Contact ID is missing. Unable to update contact.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in the required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        whatsApp: formData.whatsApp.trim(),
        course: formData.course.trim(),
        message: formData.message.trim(),
      };

      const response = await contactApi.update(
        contactId,
        payload
      );

      if (response?.success === false) {
        throw new Error(
          response.message || "Failed to update contact."
        );
      }

      onUpdated?.(response?.data || response);
      onClose();
    } catch (err) {
      console.error("Contact update failed:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update contact. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Name",
      icon: UserRound,
      required: true,
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      icon: Mail,
      required: true,
      type: "email",
    },
    {
      name: "phone",
      label: "Phone Number",
      icon: Phone,
      type: "tel",
    },
    {
      name: "whatsApp",
      label: "WhatsApp Number",
      icon: MessageSquare,
      type: "tel",
    },
    {
      name: "course",
      label: "Course",
      icon: GraduationCap,
      type: "text",
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-contact-title"
        className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="edit-contact-title"
              className="text-xl font-bold text-slate-800"
            >
              Edit Contact
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the submitted contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close edit contact"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contact name banner */}
          <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <UserRound size={23} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">
                Contact Information
              </h3>
              <p className="text-sm text-slate-500">
                Edit the fields below and save your changes.
              </p>
            </div>
          </div>

          {/* Editable fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.name}>
                  <label
                    htmlFor={`edit-${field.name}`}
                    className={labelClass}
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>

                  <div className="relative">
                    <Icon
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id={`edit-${field.name}`}
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required || false}
                      maxLength={
                        field.name === "email"
                          ? 254
                          : field.name === "name"
                            ? 100
                            : field.name === "course" ||
                                field.name === "subject"
                              ? 200
                              : 20
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="edit-message"
                className={labelClass}
              >
                Message Regarding
                <span className="ml-1 text-red-500">*</span>
              </label>

              <div className="relative">
                <MessageSquare
                  size={17}
                  className="absolute left-3.5 top-4 text-slate-400"
                />
                <textarea
                  id="edit-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={5000}
                  rows={5}
                  className={`${inputClass} resize-y pl-10`}
                />
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
