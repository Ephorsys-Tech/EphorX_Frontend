
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil, DownloadCloud  } from "lucide-react";
import { getSyllabusLeadById } from "../../api/syllabusLeadApi";

const VSyllabusLead = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const response = await getSyllabusLeadById(id);
                const record =
                    response?.lead ||
                    response?.data ||
                    response?.syllabusLead ||
                    response?.download ||
                    response;

                setLead(record);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load lead details.");
            } finally {
                setLoading(false);
            }
        };

        fetchLead();
    }, [id]);

    const fields = [
        ["Full Name", lead?.fullName],
        ["Email Address", lead?.email],
        ["Phone Number", lead?.phoneNumber],
        ["WhatsApp Number", lead?.whatsappNumber],
        ["Qualification", lead?.qualification],
        ["Course Name", lead?.courseName],
        ["Course ID", lead?.courseId],
        ["Created At", lead?.createdAt ? new Date(lead.createdAt).toLocaleString() : ""],
    ];

    return (
        <div className="p-4 md:p-6">
            <button
                onClick={() => navigate("/admin/syllabus-lead")}
                className="mb-7 flex items-center gap-3 text-[17px] font-medium text-slate-600 transition hover:text-blue-600"
            >
                <ArrowLeft size={17} /> Back to Syllabus Leads
            </button>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Syllabus Lead Details
                    </h1>
                    <p className="text-gray-500 mt-1">
                        View the complete information submitted for this syllabus request.
                    </p>
                </div>

                {lead && (
                    <button
                        onClick={() => navigate(`/admin/edit-lead/${id}`)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                        <Pencil size={16} /> Edit Lead
                    </button>
                )}
            </div>

            {loading ? (
                <p className="text-gray-500 py-10">Loading lead details...</p>
            ) : error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
            ) : !lead ? (
                <p className="text-gray-500">Lead not found.</p>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {fields.map(([label, value]) => (
                            <div key={label} className="border-b border-gray-100 pb-4">
                                <p className="text-sm text-gray-500 mb-1">{label}</p>
                                <p className="font-medium text-gray-900 wrap-break-word">
                                    {value || "—"}
                                </p>
                            </div>
                        ))}
                    </div>


                    <div className="mt-6">
                        <p className="text-sm text-gray-500 mb-2">Syllabus PDF</p>

                        {lead.syllabusUrl ? (
                            <a
                                href={lead.syllabusUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                <DownloadCloud size={17} />
                                Download Syllabus PDF
                            </a>
                        ) : (
                            <p className="text-gray-500">No syllabus available.</p>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default VSyllabusLead;
