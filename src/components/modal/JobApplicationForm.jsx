
import { useState } from "react";
import { Upload, User, Mail, Phone, FileText, CheckCircle2 } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  resume: null,
};

const JobApplicationForm = ({ job, onSubmit }) => {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "resume") {
      const file = files?.[0];

      if (!file) return;

      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");

      if (!isPdf) {
        setError("Please upload your resume in PDF format.");
        e.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Resume size must be less than 5 MB.");
        e.target.value = "";
        return;
      }

      setError("");
      setFormData((prev) => ({ ...prev, resume: file }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!onSubmit) {
      setError("Application submission is not connected yet. Please try again later.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!formData.resume) {
      setError("Please upload your resume.");
      return;
    }

    const applicationData = new FormData();
    applicationData.append("name", formData.name.trim());
    applicationData.append("email", formData.email.trim());
    applicationData.append("phone", formData.phone.trim());
    applicationData.append("resume", formData.resume);
    applicationData.append("jobTitle", job.title);

    try {
      setLoading(true);
      await onSubmit(applicationData, job);
      setSubmitted(true);
    } catch (err) {
      setError(err?.message || "Unable to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 py-10 text-center sm:px-9 ">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 size={32} className="text-emerald-600" />
        </div>

        <h3 className="mt-5 text-2xl font-black text-slate-950">
          Application Submitted!
        </h3>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
          Thank you for applying for the {job.title} position.
          Your application has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm sm:px-7">
      <div className="mb-">
        
        <h3 className="mt-2 text-xl font-black text-sky-500 sm:text-2xl">
          Apply for this Position
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Fill in your details and upload your latest resume.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="application-name" className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name
          </label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="application-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="application-email" className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="application-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="application-phone" className="mb-2 block text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="application-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        {/* Resume */}
        <div>
          <label htmlFor="application-resume" className="mb-2 block text-sm font-semibold text-slate-700">
            Upload Resume <span className="text-slate-400">(PDF, max 5 MB)</span>
          </label>

          <label
            htmlFor="application-resume"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-sky-500 hover:bg-sky-50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <Upload size={20} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-700">
                {formData.resume?.name || "Choose your resume"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {formData.resume
                  ? `${(formData.resume.size / (1024 * 1024)).toFixed(2)} MB`
                  : "Click here to browse PDF files"}
              </p>
            </div>

            <FileText size={20} className="shrink-0 text-slate-400" />
          </label>

          <input
            id="application-resume"
            type="file"
            name="resume"
            accept=".pdf,application/pdf"
            onChange={handleChange}
            className="sr-only"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f90db] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition duration-300 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>

        <p className="text-center text-xs text-slate-400 mb-1">
          Please make sure your contact details are correct before submitting.
        </p>
      </form>
    </div>
  );
};

export default JobApplicationForm;
