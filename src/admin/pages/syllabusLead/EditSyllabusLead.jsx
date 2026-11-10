
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, ExternalLink } from "lucide-react";
import {
  getSyllabusLeadById,
  updateSyllabusLead,
} from "../../api/syllabusLeadApi";

const EditSyllabusLead = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    qualification: "",
    courseId: "",
    courseName: "",
  });

  const [syllabusUrl, setSyllabusUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await getSyllabusLeadById(id);
        const lead =
          response?.lead ||
          response?.data ||
          response?.syllabusLead ||
          response?.download ||
          response;

        setForm({
          fullName: lead.fullName || "",
          email: lead.email || "",
          phoneNumber: lead.phoneNumber || "",
          whatsappNumber: lead.whatsappNumber || "",
          qualification: lead.qualification || "",
          courseId: lead.courseId || "",
          courseName: lead.courseName || "",
        });

        setSyllabusUrl(lead.syllabusUrl || "");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load lead.");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await updateSyllabusLead(id, form);

      alert("Syllabus lead updated successfully.");
      navigate(`/admin/view-lead/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update syllabus lead.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500";

  if (loading) {
    return <div className="p-6 text-gray-500">Loading lead details...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => navigate(`/admin/view-lead/${id}`)}
        className="mb-7 flex items-center gap-3 text-[17px] font-medium text-slate-600 transition hover:text-blue-600"
                    >
        <ArrowLeft size={17} /> Back to Lead Details
      </button>

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Edit Syllabus Lead
        </h1>
        <p className="text-gray-500 mt-1">
          Update the information associated with this syllabus request.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-xl p-5 md:p-7 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            ["fullName", "Full Name"],
            ["email", "Email Address"],
            ["phoneNumber", "Phone Number"],
            ["whatsappNumber", "WhatsApp Number"],
            ["qualification", "Qualification"],
            ["courseName", "Course Name"],
            ["courseId", "Course ID"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          ))}
        </div>

        {syllabusUrl && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Existing Syllabus
            </p>
            <a
              href={syllabusUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-indigo-600 hover:underline break-all text-sm"
            >
              Open Syllabus <ExternalLink size={15} />
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(`/admin/view-lead/${id}`)}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSyllabusLead;
