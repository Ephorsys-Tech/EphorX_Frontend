
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";

import Modal from "../../ui/Modal";
import ExpertDetailsModal from "../modal/ExpertDetailsModal";
import { getAllTrainers } from "../../admin/api/trainerApi.js";

function ExpertCard({ expert, index, onViewDetails }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group relative isolate min-w-0 shrink-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_24px_55px_-24px_rgba(2,132,199,0.4)] basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] 2xl:basis-[calc(25%-18px)]"
    >
      {/* Expert photo */}
      <div className="relative h-85 overflow-hidden bg-slate-100 sm:h-92.5">
        <img
          src={expert.image}
          alt={expert.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Photo gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/10 to-black/10 transition-opacity duration-500 group-hover:opacity-0" />

        {/* Expertise tag */}
        <span className="absolute right-4 top-4 max-w-[65%] rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
          {expert.field}
        </span>

        {/* Visible identity */}
        <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-3 group-hover:opacity-0">
          <h3 className="text-2xl font-extrabold tracking-tight text-white">
            {expert.name}
          </h3>

          <p className="mt-1 text-sm text-white/75">
            {expert.role}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-3">
            <span className="text-xs font-medium text-white/80">
              {expert.experience} experience
            </span>

            <ArrowUpRight size={19} className="text-sky-300" />
          </div>
        </div>

      
{/* Hover cover */}
<div className="absolute inset-0 flex flex-col bg-linear-to-br from-[#050b14]/95 via-[#071521]/90 to-sky-950/95 p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-6">

  {/* Top label */}
  <div className="flex shrink-0 justify-end">
    <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300">
      Meet the expert
    </span>
  </div>

  {/* Content */}
  <div className="mt-6 flex min-h-0 flex-1 flex-col translate-y-3 transition-transform duration-500 group-hover:translate-y-0">
<div className="absolute bottom-15">
  
    <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
      Specializes in
    </p>

    <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white">
      {expert.role}
    </h3>

    <p className="mt-2 line-clamp-3 text-sm leading-5 text-slate-300">
      {expert.description}
    </p>

    <div className="mt-3 flex shrink-0 items-center gap-2 text-xs font-semibold text-white/70">
      <GraduationCap size={17} className="shrink-0 text-sky-300" />
      {expert.experience} of experience
    </div>

</div>
    {/* Button pushed towards bottom */}
    <button
      type="button"
      onClick={() => onViewDetails(expert)}
      className="mt-auto pt-4"
    >
      <span className="flex w-full items-center justify-between rounded-xl bg-sky-400 px-4 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-white">
        View Details
        <ArrowUpRight size={19} />
      </span>
    </button>

  </div>

  {/* Fixed bottom line */}
  <div className="mt-2 h-1 w-full shrink-0 overflow-hidden rounded-full bg-white/10">
    <div className="h-full w-0 rounded-full bg-sky-400 transition-all duration-700 group-hover:w-full" />
  </div>

</div>

      </div>

      {/* Bottom identity strip */}
      <div className="relative flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
        <div className="min-w-0">
          <h4 className="truncate text-base font-extrabold text-slate-950">
            {expert.name}
          </h4>

          <p className="mt-1 truncate text-xs font-medium text-slate-500">
            {expert.role}
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sky-300 transition-all duration-300 group-hover:bg-sky-400 group-hover:text-slate-950">
          <ArrowUpRight size={19} />
        </span>
      </div>
    </motion.article>
  );
}

export default function IndustryExperts() {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllTrainers();

        const trainerList = Array.isArray(data) ? data : [];

        const formattedTrainers = trainerList.map((trainer, index) => {
          const details =
            trainer.trainer && typeof trainer.trainer === "object"
              ? trainer.trainer
              : trainer;

          const avatar =
            typeof details.avatar === "string"
              ? details.avatar
              : typeof details.image === "string"
                ? details.image
                : typeof details.photo === "string"
                  ? details.photo
                  : "";

          const experience =
            details.experience ??
            details.experienceYears ??
            details.yearsOfExperience;

          return {
            ...details,
            id: details._id ?? details.id ?? index,
            name:
              (typeof details.name === "string" && details.name) ||
              (typeof details.fullName === "string" && details.fullName) ||
              "Expert Trainer",
            role:
              (typeof details.designation === "string" &&
                details.designation) ||
              (typeof details.role === "string" && details.role) ||
              "Instructor",
            field:
              (typeof details.field === "string" && details.field) ||
              (typeof details.specialization === "string" &&
                details.specialization) ||
              (typeof details.expertise === "string" &&
                details.expertise) ||
              "Professional Training",
            experience:
              experience != null && experience !== ""
                ? typeof experience === "number"
                  ? `${experience}+ Years`
                  : String(experience)
                : "Experienced Professional",
            description:
              (typeof details.description === "string" &&
                details.description) ||
              (typeof details.bio === "string" && details.bio) ||
              "Learn from an experienced industry professional.",
            image:
              avatar ||
              "https://placehold.co/600x800?text=Trainer",
            number: String(index + 1).padStart(2, "0"),
          };
        });

        setExperts(formattedTrainers);
      } catch (err) {
        setError(err.message || "Failed to load trainers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  const closeExpertModal = () => {
    setSelectedExpert(null);
  };

  return (
    <section
      id="industry-experts"
      className="relative overflow-hidden bg-white py-1 lg:px-28 lg:py-7"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto px-5 sm:px-8 lg:px-12">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end lg:mb-10"
        >
          <div className="max-w-2xl">
           

            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Our Industry{" "}
              <span className="relative inline-block text-blue-700">
                Experts
                <span className="absolute -bottom-1 left-0 h-1 w-2/3 rounded-full bg-sky-300" />
              </span>
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:self-auto">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sky-300">
              <GraduationCap size={23} />
            </span>

            <div>
              <p className="text-xl font-black text-slate-950">
                Expert-led
              </p>

              <p className="text-xs font-medium text-slate-500">
                Practical learning
              </p>
            </div>
          </div>
        </motion.div>

        {/* Expert cards */}
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            Loading trainers...
          </div>
        ) : error ? (
          <div className="col-span-full py-12 text-center text-red-600">
            {error}
          </div>
        ) : experts.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">
            No trainers available yet.
          </div>
        ) : (
          <div className="flex w-full gap-5 overflow-x-auto overflow-y-hidden pb-4 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {experts.map((expert, index) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                index={index}
                onViewDetails={setSelectedExpert}
              />
            ))}
          </div>
        )}

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-5"
        >
          <div>
            <p className="text-base font-bold text-slate-950">
              Real expertise. Practical knowledge. Better learning.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Discover the people behind your learning journey.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("industry-experts")
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
            }
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 hover:text-slate-950 sm:self-auto"
          >
            Meet our experts

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 -rotate-45"
            />
          </button>
        </motion.div>
      </div>

      {/* Reusable modal */}
      <Modal
        isOpen={Boolean(selectedExpert)}
        onClose={closeExpertModal}
        title="Expert Details"
        size="lg"
        theme="white"
      >
        <ExpertDetailsModal
          expert={selectedExpert}
          onClose={closeExpertModal}
        />
      </Modal>
    </section>
  );
}
