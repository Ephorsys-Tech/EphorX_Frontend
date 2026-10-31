
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BriefcaseBusiness } from "lucide-react";
import Modal from "../../ui/Modal";
import JobInformation from "../../components/modal/JobInformation";
import JobApplicationForm from "../../components/modal/JobApplicationForm";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    type: "Full-time",
    location: "Odisha",
    experience: "Fresher / 0–1 Year",
    shortDescription:
      "Build responsive and interactive web applications using modern frontend technologies.",
    description:
      "We are looking for a motivated Frontend Developer who enjoys creating attractive and user-friendly web experiences.",
    responsibilities: [
      "Develop responsive user interfaces.",
      "Build reusable React components.",
      "Integrate frontend applications with REST APIs.",
      "Identify and fix UI issues.",
    ],
    requirements: [
      "Knowledge of HTML, CSS and JavaScript.",
      "Basic understanding of React.js.",
      "Familiarity with REST APIs.",
      "Good problem-solving skills.",
    ],
  },
  {
    id: 2,
    title: "MERN Stack Developer",
    type: "Full-time",
    location: "Odisha",
    experience: "0–2 Years",
    shortDescription:
      "Work on full-stack applications using MongoDB, Express, React and Node.js.",
    description:
      "We are looking for a developer interested in building full-stack web applications and learning modern development practices.",
    responsibilities: [
      "Develop frontend features using React.",
      "Build backend APIs using Node.js and Express.",
      "Work with MongoDB databases.",
      "Collaborate with the development team.",
    ],
    requirements: [
      "Knowledge of JavaScript.",
      "Basic understanding of React.js and Node.js.",
      "Familiarity with MongoDB.",
      "Understanding of REST API concepts.",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Odisha",
    experience: "Fresher / 0–1 Year",
    shortDescription:
      "Design intuitive interfaces and engaging digital experiences.",
    description:
      "We are looking for a creative designer who can turn ideas into clear and user-friendly digital experiences.",
    responsibilities: [
      "Create wireframes and prototypes.",
      "Design website and application interfaces.",
      "Collaborate with developers.",
      "Improve designs based on feedback.",
    ],
    requirements: [
      "Understanding of UI/UX principles.",
      "Basic knowledge of Figma.",
      "Good visual and creative skills.",
      "Understanding of responsive design.",
    ],
  },
];

const OpenPositions = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [search, setSearch] = useState("");

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.type}`
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
    // Backend API integration will go here.
    console.log("Application for:", job.title);
    console.log("Application data:", Object.fromEntries(applicationData));
  };

  return (
    <section
      id="open-positions"
      className="bg-slate-50 px-4 py-5 sm:px-6 md:px-8 lg:px-41"
    >
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
          Explore <span className="text-sky-600">Open Positions</span>
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-500 sm:text-base">
          Discover opportunities and find a role that matches your skills.
        </p>
      </div>

      {/* Position Count + Search */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <BriefcaseBusiness size={19} className="text-sky-600" />
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
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex"
            >
              <div className="group flex w-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-900/10">
                {/* Job Type */}
                <span className="w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 transition group-hover:bg-sky-100">
                  {job.type}
                </span>

                {/* Job Content */}
                <h3 className="mt-5 text-xl font-extrabold text-slate-950 transition group-hover:text-sky-600">
                  {job.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-500">
                  {job.shortDescription}
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
                    className="rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 transition duration-300 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-600"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => openModal(job, "apply")}
                    className="rounded-xl bg-[#071927] px-3 py-3 text-sm font-bold text-white transition duration-300 hover:bg-sky-600"
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
    </section>
  );
};

export default OpenPositions;
