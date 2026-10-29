import { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  X,
} from "lucide-react";
import { deleteTrainer, getAllTrainers } from "../../api/trainerApi";

const Trainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllTrainers();
      setTrainers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load trainers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, [location.key]);

  const filteredTrainers = trainers.filter((trainer) => {
    const searchTerm = search.trim().toLowerCase();

    if (!searchTerm) return true;

    return [
      trainer.name,
      trainer.email,
      trainer.designation,
      trainer.specialization,
      trainer.expertise,
      trainer._id,
    ].some((value) =>
      String(value || "").toLowerCase().includes(searchTerm)
    );
  });

  const handleDelete = async (trainer) => {
    setActiveMenu(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );

    if (!confirmed) return;

    try {
      await deleteTrainer(trainer._id);

      setTrainers((previous) =>
        previous.filter((item) => item._id !== trainer._id)
      );
    } catch (err) {
      window.alert(err.message || "Failed to delete trainer");
    }
  };

 const handleAction = (action, trainer) => {
  setActiveMenu(null);

  if (action === "view") {
    navigate(`/admin/view-trainer/${trainer._id}`);
  } else if (action === "edit") {
    navigate(`/admin/edit-trainer/${trainer._id}`);
  } else if (action === "delete") {
    handleDelete(trainer);
  }
};


  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Trainers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your trainers and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/add-trainer")}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:self-auto"
        >
          <Plus size={18} />
          Add Trainer
        </button>
      </div>

      {/* Trainers Table Container */}
      <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Search, Refresh & Count - Single Row */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md sm:flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, specialization..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={fetchTrainers}
            disabled={loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition  disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          {/* Trainer Count */}
          <p className="whitespace-nowrap text-sm font-medium text-slate-600 sm:ml-2">
            {trainers.length} Trainers
          </p>
        </div>

        {/* Search Results Count */}
        {search && (
          <div className="border-b border-slate-100 px-5 py-2 sm:px-6">
            <p className="text-xs text-slate-500">
              Found {filteredTrainers.length} matching trainer
              {filteredTrainers.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading trainers...
            </p>
          </div>
        ) : error ? (
          /* Error State */
          <div className="px-6 py-16 text-center">
            <p className="font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchTrainers}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredTrainers.length === 0 ? (
          /* Empty State */
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Search size={25} />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {search ? "No matching trainers" : "No trainers yet"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              {search
                ? "Try another name, email, or specialization."
                : "Add your first trainer to get started."}
            </p>

            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Clear search
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate("/admin/trainers/add")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Trainer
              </button>
            )}
          </div>
        ) : (
          /* Trainers Table */
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-left">
              <thead className="bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Trainer</th>
                  <th className="px-6 py-4">Designation</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Experience</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredTrainers.map((trainer) => (
                  <tr
                    key={trainer._id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Trainer Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {trainer.avatar ? (
                          <img
                            src={trainer.avatar}
                            alt={trainer.name || "Trainer"}
                            className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
                            {trainer.name?.charAt(0)?.toUpperCase() || "T"}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-slate-800">
                            {trainer.name || "Unnamed Trainer"}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            ID: {trainer._id?.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Designation */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {trainer.designation || "—"}
                    </td>

                    {/* Specialization */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {trainer.specialization || trainer.expertise || "—"}
                    </td>

                    {/* Experience */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {trainer.experienceYears != null
                        ? `${trainer.experienceYears} years`
                        : "—"}
                    </td>

                    {/* Actions Menu */}
                    <td className="py-4 text-center">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          aria-label={`Actions for ${trainer.name || "trainer"}`}
                          aria-expanded={activeMenu === trainer._id}
                          onClick={() =>
                            setActiveMenu((current) =>
                              current === trainer._id
                                ? null
                                : trainer._id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 transition hover:border-slate-200 hover:bg-white hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >
                          <MoreHorizontal size={21} />
                        </button>

                        {activeMenu === trainer._id && (
                          <div className="absolute right-0 z-20 w-25 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                            <button
                              type="button"
                              onClick={() =>
                                handleAction("view", trainer)
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <Eye
                                size={16}
                                className="text-slate-500"
                              />
                              View
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleAction("edit", trainer)
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3  text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                              <Pencil
                                size={16}
                                className="text-slate-500"
                              />
                              Edit
                            </button>

                            <div className="border-t border-slate-100" />

                            <button
                              type="button"
                              onClick={() =>
                                handleAction("delete", trainer)
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trainer;
