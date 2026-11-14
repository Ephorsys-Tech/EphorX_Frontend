import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../../ui/Modal";
import JobInformation from "../../components/modal/JobInformation";
import JobApplicationForm from "../../components/modal/JobApplicationForm";
import { getAllJobs } from "../../admin/api/jobApi.js";
import { createJobApplication } from "../../admin/api/jobApplicationApi.js";

function JobSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
      <div className="h-5 w-24 rounded-full bg-slate-100" />
      <div className="mt-5 h-6 w-3/4 rounded bg-slate-100" />
      <div className="mt-3 h-3 w-full rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/3 rounded bg-slate-100" />
      <div className="mt-6 h-10 rounded-lg bg-slate-100" />
    </div>
  );
}

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

      const email = applicationData.get?.("email") || applicationData.email;

      const phoneNumber =
        applicationData.get?.("phoneNumber") ||
        applicationData.get?.("phone") ||
        applicationData.phoneNumber ||
        applicationData.phone;

      const resume = applicationData.get?.("resume") || applicationData.resume;

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

      await createJobApplication(formData);

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
    <section id="open-positions" className="scroll-mt-28 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading and search */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Explore <span className="text-blue-700">Open Positions</span>
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Discover opportunities and find a role that matches your skills.
            </p>
          </div>

          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search positions"
              aria-label="Search positions"
              className="w-full rounded-full border border-slate-300 bg-white py-2.5 pl-5 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 transition hover:text-blue-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {!loading && !error && (
          <p className="mt-8 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {filteredJobs.length}
            </span>{" "}
            {filteredJobs.length === 1 ? "position" : "positions"} available
          </p>
        )}

        <div className="mt-4">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <JobSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
              <button
                type="button"
                onClick={fetchJobs}
                className="font-semibold text-blue-700 hover:underline"
              >
                Retry
              </button>
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job, index) => (
                <motion.article
                  key={job._id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10"
                >
                  {job.employmentType && (
                    <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {job.employmentType}
                    </span>
                  )}

                  <h3 className="mt-4 text-xl font-bold leading-snug text-slate-900">
                    {job.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {job.jobDescription}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-sm">
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500">Location</dt>
                      <dd className="mt-0.5 truncate font-medium text-slate-800">
                        {job.location || "Not specified"}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="text-xs text-slate-500">Experience</dt>
                      <dd className="mt-0.5 truncate font-medium text-slate-800">
                        {job.experience || "Not specified"}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                    <button
                      type="button"
                      onClick={() => openModal(job, "details")}
                      className="cursor-pointer rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      View details
                    </button>

                    <button
                      type="button"
                      onClick={() => openModal(job, "apply")}
                      className="cursor-pointer rounded-lg bg-blue-700 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      Apply now
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-14 text-center">
              <h3 className="text-lg font-semibold text-slate-900">
                No positions found
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Try searching with a different job title.
              </p>
            </div>
          )}
        </div>

        {/* Details / Application Modal */}
        <Modal
          isOpen={Boolean(selectedJob && modalType)}
          onClose={closeModal}
          title={modalType === "details" ? "Job Details" : "Apply for Position"}
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