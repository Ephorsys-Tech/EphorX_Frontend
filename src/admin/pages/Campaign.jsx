
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  ImagePlus,
} from "lucide-react";

import campaignApi from "../api/campaignApi";

const getCampaignList = (response) => {
  const result =
    response?.data?.data ??
    response?.data?.campaigns ??
    response?.data ??
    response;

  return Array.isArray(result) ? result : [];
};

const formatDateForInput = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);
  const timezoneOffset = parsedDate.getTimezoneOffset() * 60000;

  return new Date(parsedDate.getTime() - timezoneOffset)
    .toISOString()
    .slice(0, 16);
};

const getCampaignStatus = (campaign) => {
  const now = new Date();
  const start = new Date(campaign.startDate);
  const end = new Date(campaign.endDate);

  if (!campaign.isActive) return "Inactive";
  if (now < start) return "Scheduled";
  if (now > end) return "Expired";

  return "Active";
};

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Expired: "bg-red-100 text-red-700",
  Inactive: "bg-gray-100 text-gray-600",
};

const initialForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  isActive: true,
};

const CampaignManagement = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await campaignApi.getAll();
      setCampaigns(getCampaignList(response));
    } catch (err) {
      setError(err.message || "Failed to fetch campaigns.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const openCreateModal = () => {
    setEditingCampaign(null);
    setForm(initialForm);
    setImage(null);
    setImagePreview("");
    setError("");
    setShowModal(true);
  };

  const openEditModal = (campaign) => {
    setEditingCampaign(campaign);

    setForm({
      title: campaign.title || "",
      description: campaign.description || "",
      startDate: formatDateForInput(campaign.startDate),
      endDate: formatDateForInput(campaign.endDate),
      isActive: campaign.isActive ?? true,
    });

    setImage(null);
    setImagePreview(campaign.campaignImage || "");
    setError("");
    setShowModal(true);
    setMenuOpen(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCampaign(null);
    setForm(initialForm);
    setImage(null);
    setImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Please select a JPEG, PNG, or WebP image.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image size must not exceed 5MB.");
      return;
    }

    setError("");
    setImage(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!editingCampaign && !image) {
      setError("Please upload a campaign image.");
      return;
    }

    if (
      new Date(form.endDate) <= new Date(form.startDate)
    ) {
      setError("End date must be after the start date.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append(
        "startDate",
        new Date(form.startDate).toISOString()
      );
      formData.append(
        "endDate",
        new Date(form.endDate).toISOString()
      );
      formData.append("isActive", String(form.isActive));

      if (image) {
        formData.append("campaignImage", image);
      }

      if (editingCampaign) {
        await campaignApi.update(editingCampaign._id, formData);
      } else {
        await campaignApi.create(formData);
      }

      closeModal();
      await fetchCampaigns();
    } catch (err) {
      setError(err.message || "Failed to save campaign.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );

    if (!confirmed) return;

    try {
      setError("");
      await campaignApi.delete(id);
      setMenuOpen(null);
      await fetchCampaigns();
    } catch (err) {
      setError(err.message || "Failed to delete campaign.");
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 text-gray-900 sm:px-6">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-bold sm:text-3xl">
            Campaign Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Create, schedule, and manage your website campaigns.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2563ff] px-3 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <Plus size={18} />
          Create Campaign
        </button>
      </div>

      {/* Search and Count */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-black"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total campaigns:{" "}
          <span className="font-semibold text-black">
            {campaigns.length}
          </span>
        </p>
      </div>

      {/* Error */}
      {error && !showModal && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Campaign Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[850px] text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-xs uppercase tracking-wider text-gray-500">
              <th className="px-5 py-4">Campaign</th>
              <th className="px-5 py-4">Start Date</th>
              <th className="px-5 py-4">End Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-sm text-gray-500">
                  Loading campaigns...
                </td>
              </tr>
            ) : filteredCampaigns.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-12 text-center text-sm text-gray-500">
                  No campaigns found.
                </td>
              </tr>
            ) : (
              filteredCampaigns.map((campaign) => {
                const status = getCampaignStatus(campaign);

                return (
                  <tr key={campaign._id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {campaign.campaignImage ? (
                          <img
                            src={campaign.campaignImage}
                            alt={campaign.title}
                            className="h-12 w-16 rounded-lg border border-gray-200 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100">
                            <ImagePlus size={20} className="text-gray-400" />
                          </div>
                        )}

                        <div className="max-w-xs">
                          <p className="font-semibold text-gray-900">
                            {campaign.title}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {campaign.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setMenuOpen(
                            menuOpen === campaign._id
                              ? null
                              : campaign._id
                          )
                        }
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-black"
                      >
                        <MoreVertical size={19} />
                      </button>

                      {menuOpen === campaign._id && (
                        <div className="absolute right-8 top-14 z-20 w-40 rounded-lg border border-gray-200 bg-white py-2 text-left shadow-xl">
                          <button
                            onClick={() => {
                              setSelectedCampaign(campaign);
                              setMenuOpen(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          <button
                            onClick={() => openEditModal(campaign)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(campaign._id)}
                            className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold">
                  {editingCampaign ? "Edit Campaign" : "Create Campaign"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter your campaign details below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Campaign Title
                </label>

                <input
                  type="text"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter campaign title"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  name="description"
                  required
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter campaign description"
                  className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Campaign Image
                </label>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-5 transition hover:border-black">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Campaign preview"
                      className="mb-3 h-36 w-full rounded-lg object-contain"
                    />
                  ) : (
                    <ImagePlus size={32} className="mb-2 text-gray-400" />
                  )}

                  <span className="text-sm font-medium text-gray-700">
                    {image ? image.name : "Click to upload campaign image"}
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    JPEG, PNG or WebP (maximum 5MB)
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Start Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    name="startDate"
                    required
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    End Date & Time
                  </label>

                  <input
                    type="datetime-local"
                    name="endDate"
                    required
                    value={form.endDate}
                    onChange={handleChange}
                    min={form.startDate || undefined}
                    className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-black"
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 accent-[#2563ff]"
                />

                <div>
                  <p className="text-sm font-semibold">Enable Campaign</p>
                  <p className="text-xs text-gray-500">
                    Campaign will be eligible to display during its scheduled dates.
                  </p>
                </div>
              </label>

              <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#2563ff] px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingCampaign
                      ? "Update Campaign"
                      : "Create Campaign"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* View Campaign Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Campaign Details</h2>

              <button
                onClick={() => setSelectedCampaign(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {selectedCampaign.campaignImage && (
              <img
                src={selectedCampaign.campaignImage}
                alt={selectedCampaign.title}
                className="mb-5 h-52 w-full rounded-xl object-cover"
              />
            )}

            <h3 className="text-lg font-bold">
              {selectedCampaign.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {selectedCampaign.description}
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <p>
                <span className="font-semibold">Start:</span>{" "}
                {new Date(selectedCampaign.startDate).toLocaleString()}
              </p>

              <p>
                <span className="font-semibold">End:</span>{" "}
                {new Date(selectedCampaign.endDate).toLocaleString()}
              </p>

              <p>
                <span className="font-semibold">Status:</span>{" "}
                {getCampaignStatus(selectedCampaign)}
              </p>
            </div>

            <button
              onClick={() => setSelectedCampaign(null)}
              className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default CampaignManagement;
