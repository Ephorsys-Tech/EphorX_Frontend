
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, BriefcaseBusiness } from "lucide-react";
import Modal from "../../ui/Modal";
import JobInformation from "../../components/modal/JobInformation";
import JobApplicationForm from "../../components/modal/JobApplicationForm";
import { getAllJobs } from "../../admin/api/jobApi.js";
import { createJobApplication } from "../../admin/api/jobApplicationApi.js";

const OpenPositions = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllJobs();

      const jobData = Array.isArray(response)
        ? response
        : response?.jobs || response?.data || [];

      setJobs(jobData);
    } catch (error) {
      console.error("FETCH JOBS ERROR:", error);
      setError("Unable to load job positions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) =>
    `${job.title || ""} ${job.location || ""} ${job.employmentType || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openModal = (job, type) => {
    setSelectedJob(job);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setModalType(null);
  };

  const handleApplicationSubmit = async (applicationData, job) => {
    try {
      const formData = new FormData();

      const fullName =
        applicationData.get?.("fullName") ||
        applicationData.get?.("name") ||
        applicationData.fullName ||
        applicationData.name;

      const email =
        applicationData.get?.("email") ||
        applicationData.email;

      const phoneNumber =
        applicationData.get?.("phoneNumber") ||
        applicationData.get?.("phone") ||
        applicationData.phoneNumber ||
        applicationData.phone;

      const resume =
        applicationData.get?.("resume") ||
        applicationData.resume;

      if (!fullName || !email || !phoneNumber || !resume) {
        alert("Please complete all fields and upload your resume.");
        return;
      }

      if (!job?._id || !job?.title) {
        alert("Invalid job selection. Please select a job again.");
        return;
      }

      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phoneNumber", phoneNumber.trim());
      formData.append("jobId", job._id);
      formData.append("jobTitle", job.title);
      formData.append("resume", resume);

      console.log("Submitting application:");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await createJobApplication(formData);

      console.log("Application submitted successfully:", response);

      alert("Your application has been submitted successfully!");

      closeModal();
    } catch (error) {
      console.error("Application submission failed:", error);
      console.error("Backend response:", error.response?.data);

      alert(
        error.response?.data?.message ||
        error.response?.data?.errors?.map((item) => item.msg).join(", ") ||
        "Failed to submit your application. Please try again."
      );
    }
  };

  return (
    <section
      id="open-positions"
      className="bg-slate-50 py-16 sm:py-1"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Heading */}
        <div className="mb-5">
          <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
            Explore <span className="text-blue-700">Open Positions</span>
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-500 sm:text-base">
            Discover opportunities and find a role that matches your skills.
          </p>
        </div>

        {/* Position Count + Search */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <BriefcaseBusiness size={19} className="text-blue-700" />
            <span>
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "Position" : "Positions"} Available
            </span>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search positions..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Loading open positions...
          </div>
        ) : error ? (
          <div className="py-12 text-center text-red-500">
            {error}
            <button
              onClick={fetchJobs}
              className="ml-3 font-bold text-blue-700"
            >
              Retry
            </button>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex"
              >
                <div className="group flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/10">

                  {/* Job Type */}
                  <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 transition group-hover:bg-blue-100">
                    {job.employmentType}
                  </span>

                  {/* Job Content */}
                  <h3 className="mt-5 text-xl font-extrabold text-slate-950 transition group-hover:text-blue-700">
                    {job.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                    {job.jobDescription}
                  </p>

                  {/* Job Info */}
                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                    <span className="rounded-lg bg-slate-100 px-3 py-2">
                      {job.location}
                    </span>

                    <span className="rounded-lg bg-slate-100 px-3 py-2">
                      {job.experience}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-3 border-t border-slate-100 pt-6">
                    <button
                      type="button"
                      onClick={() => openModal(job, "details")}
                      className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 transition duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                    >
                      View Details
                    </button>

                    <button
                      type="button"
                      onClick={() => openModal(job, "apply")}
                      className="rounded-xl bg-blue-700 px-3 py-3 text-sm font-bold text-white transition duration-300 hover:bg-blue-800"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <BriefcaseBusiness size={35} className="mx-auto text-slate-400" />

            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No Positions Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different job title.
            </p>
          </div>
        )}

        {/* Details / Application Modal */}
        <Modal
          isOpen={Boolean(selectedJob && modalType)}
          onClose={closeModal}
          title={
            modalType === "details"
              ? "Job Details"
              : "Apply for Position"
          }
          size="lg"
          theme="white"
        >
          {selectedJob && modalType === "details" && (
            <JobInformation job={selectedJob} />
          )}

          {selectedJob && modalType === "apply" && (
            <JobApplicationForm
              job={selectedJob}
              onSubmit={handleApplicationSubmit}
            />
          )}
        </Modal>

      </div>
    </section>
  );
};

export default OpenPositions;
