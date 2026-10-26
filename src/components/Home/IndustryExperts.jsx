
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  X,
} from "lucide-react";

const experts = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Full Stack Development",
    field: "Web Technologies",
    experience: "8+ Years",
    description:
      "Helps learners master modern web development through practical projects, real-world applications, and industry-focused guidance.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85",
    number: "01",
  },
  {
    id: 2,
    name: "Priya Mishra",
    role: "Data Science & AI",
    field: "Artificial Intelligence",
    experience: "7+ Years",
    description:
      "Makes complex data concepts easier to understand through hands-on learning, analytical thinking, and practical case studies.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    number: "02",
  },
  {
    id: 3,
    name: "Arjun Patel",
    role: "Cloud & DevOps",
    field: "Cloud Computing",
    experience: "9+ Years",
    description:
      "Guides aspiring professionals through cloud infrastructure, deployment workflows, automation, and modern development practices.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    number: "03",
  },
  {
    id: 4,
    name: "Sneha Das",
    role: "UI/UX Design",
    field: "Product Design",
    experience: "6+ Years",
    description:
      "Helps students develop a strong design foundation through user research, interface design, prototyping, and portfolio projects.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    number: "04",
  },
  
];

function ExpertCard({ expert, index, onViewDetails }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group relative isolate min-w-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_8px_30px_-18px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 hover:border-sky-300 hover:shadow-[0_24px_55px_-24px_rgba(2,132,199,0.4)]"
    >
      {/* Expert photo */}
      <div className="relative h-[340px] overflow-hidden bg-slate-100 sm:h-[370px]">
        <img
          src={expert.image}
          alt={expert.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Photo gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/10 transition-opacity duration-500 group-hover:opacity-0" />

       

        {/* Expertise tag */}
        <span className="absolute right-4 top-4 max-w-[65%] rounded-full border border-white/30 bg-white/15 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:opacity-0">
          {expert.field}
        </span>

        {/* Always-visible name */}
        <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:translate-y-3 group-hover:opacity-0">
         

          <h3 className="text-2xl font-extrabold tracking-tight text-white">
            {expert.name}
          </h3>

          <p className="mt-1 text-sm text-white/75">{expert.role}</p>

          <div className="mt-4 flex items-center justify-between border-t border-white/25 pt-3">
            <span className="text-xs font-medium text-white/80">
              {expert.experience} experience
            </span>

            <ArrowUpRight size={19} className="text-sky-300" />
          </div>
        </div>

        {/* Hover cover */}
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-[#050b14]/95 via-[#071521]/90 to-sky-950/95 p-5 opacity-0 transition-all duration-500 group-hover:opacity-100 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-sky-300">
              Meet the expert
            </span>

           
          </div>

          <div className="translate-y-5 transition-transform duration-500 group-hover:translate-y-0">
           

            <p className="text-xs font-semibold uppercase tracking-widest text-sky-300">
              Specializes in
            </p>

            <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white">
              {expert.role}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-300">
              {expert.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/70">
              <GraduationCap size={17} className="text-sky-300" />
              {expert.experience} of experience
            </div>

            <button
              type="button"
              onClick={() => onViewDetails(expert)}
              className="mt-6 flex w-full items-center justify-between rounded-xl bg-sky-400 px-4 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-white"
            >
              View Details
              <ArrowUpRight size={19} />
            </button>
          </div>

          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
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

function ExpertDetailsModal({ expert, onClose }) {
  return (
    <AnimatePresence>
      {expert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="relative h-56 bg-slate-100">
              <img
                src={expert.image}
                alt={expert.name}
                className="h-full w-full object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <button
                type="button"
                onClick={onClose}
                aria-label="Close expert details"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-sky-400 hover:text-black"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-5 left-5">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-300">
                  Industry Expert
                </p>

                <h3 className="mt-1 text-2xl font-extrabold text-white">
                  {expert.name}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
                <BriefcaseBusiness size={15} />
                {expert.field}
              </span>

              <h4 className="mt-4 text-lg font-bold text-slate-950">
                {expert.role}
              </h4>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {expert.description}
              </p>

              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">
                  Professional experience
                </span>

                <span className="font-extrabold text-slate-950">
                  {expert.experience}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-sky-400 hover:text-slate-950"
              >
                Close Details
                <X size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function IndustryExperts() {
  const [selectedExpert, setSelectedExpert] = useState(null);

  return (
    <section
      id="industry-experts"
      className="relative overflow-hidden bg-white py-1 sm:py-4 lg:py-7"
    >
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1465px] px-5 sm:px-8 lg:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end lg:mb-10"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-sky-700">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Learn from the best
            </span>

            <h2 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Our Industry{" "}
              <span className="relative inline-block text-sky-500">
                Experts
                <span className="absolute -bottom-1 left-0 h-1 w-2/3 rounded-full bg-sky-200" />
              </span>
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:self-auto">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-sky-300">
              <GraduationCap size={23} />
            </span>

            <div>
              <p className="text-xl font-black text-slate-950">Expert-led</p>
              <p className="text-xs font-medium text-slate-500">
                Practical learning
              </p>
            </div>
          </div>
        </motion.div>

        {/* Expert cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {experts.map((expert, index) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              index={index}
              onViewDetails={setSelectedExpert}
            />
          ))}
        </div>

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
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400 hover:text-slate-950 sm:self-auto"
          >
            Meet our experts
            <ArrowDownRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </button>
        </motion.div>
      </div>

      <ExpertDetailsModal
        expert={selectedExpert}
        onClose={() => setSelectedExpert(null)}
      />
    </section>
  );
}
