import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Link as LinkIcon,
  LoaderCircle,
  CalendarDays,
  Clock,
} from "lucide-react";

import { getTrainerById } from "../../api/trainerApi";

const ViewTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTrainerById(id);

        if (!data) {
          throw new Error("Trainer not found.");
        }

        setTrainer(data);
      } catch (err) {
        console.error("Fetch trainer error:", err);
        setError(err.message || "Failed to load trainer details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTrainer();
    } else {
      setError("Trainer ID is missing from the URL.");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not available";
    }

    return parsedDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="mr-3 h-6 w-6 animate-spin text-indigo-600" />
        <span className="text-sm text-gray-600">
          Loading trainer details...
        </span>
      </div>
    );
  }

  if (error || !trainer) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <UserRound className="mx-auto h-12 w-12 text-gray-400" />

          <h1 className="mt-4 text-xl font-bold text-gray-900">
            Unable to Load Trainer
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {error || "Trainer not found."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/admin/trainers")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={17} />
            Back to Trainers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <button
              type="button"
              onClick={() => navigate("/admin/trainers")}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
              Back to Trainers
            </button>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Trainer Details
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              View the complete profile and information for this trainer.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(`/admin/edit-trainer/${trainer._id}`)
            }
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Pencil size={17} />
            Edit Trainer
          </button>
        </div>

        {/* Trainer Profile */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/30 bg-white/15 shadow-md">
                {trainer.avatar ? (
                  <img
                    src={trainer.avatar}
                    alt={trainer.name || "Trainer"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-14 w-14 text-white" />
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {trainer.name}
                </h2>

                <p className="mt-2 text-base text-indigo-100">
                  {trainer.designation}
                </p>

                <p className="mt-3 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white">
                  {trainer.category}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <h3 className="text-lg font-semibold text-gray-900">
              Professional Information
            </h3>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<BriefcaseBusiness size={20} />}
                label="Designation"
                value={trainer.designation}
              />

              <InfoCard
                icon={<GraduationCap size={20} />}
                label="Specialization"
                value={trainer.specialization}
              />

              <InfoCard
                icon={<CalendarDays size={20} />}
                label="Experience"
                value={`${trainer.experienceYears ?? 0} ${
                  Number(trainer.experienceYears) === 1
                    ? "year"
                    : "years"
                }`}
              />

              <InfoCard
                icon={<UserRound size={20} />}
                label="Category"
                value={trainer.category}
              />
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-100 pt-7">
              <h3 className="text-lg font-semibold text-gray-900">
                About the Trainer
              </h3>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                {trainer.description || "No description provided."}
              </p>
            </div>

            {/* Additional Details */}
            <div className="mt-8 border-t border-gray-100 pt-7">
              <h3 className="text-lg font-semibold text-gray-900">
                Additional Details
              </h3>

              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Trainer ID
                  </p>
                  <p className="mt-2 break-all font-mono text-sm text-gray-700">
                    {trainer._id}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Created On
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={16} className="text-gray-400" />
                    {formatDate(trainer.createdAt)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Last Updated
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={16} className="text-gray-400" />
                    {formatDate(trainer.updatedAt)}
                  </p>
                </div>

                {trainer.detailsUrl && (
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Details URL
                    </p>

                    <a
                      href={trainer.detailsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 break-all text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      <LinkIcon size={16} className="shrink-0" />
                      Open Trainer Link
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/admin/trainers")}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Back to List
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate(`/admin/edit-trainer/${trainer._id}`)
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <Pencil size={17} />
                Edit Trainer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-900">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

export default ViewTrainer;
