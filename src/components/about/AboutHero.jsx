import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, CheckCircle2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/aboutImage.png";

const AboutHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-sky-50 via-blue-50/40 to-white pb-16 pt-8 sm:pt-10 lg:pb-20">
      {/* Background design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-10 left-[16%] h-[60%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0" />
        <div className="absolute -top-10 left-[44%] h-[60%] w-14 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-tr from-sky-200/40 to-white/10" />
        <div className="absolute left-[6%] top-1/2 h-10 w-10 rounded-full bg-blue-200/40" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-w-0"
        >

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            We Turn Curiosity Into{" "}
            <span className="text-blue-700">Capability.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            At EphorX, we believe learning technology should be practical,
            engaging, and connected to real-world opportunities. We help
            learners build knowledge, develop skills, and move forward with
            confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/Courses"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-700 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/25 transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Explore our courses
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#about-intro"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Get to know us
              <ArrowDown size={16} />
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-slate-200 pt-6 text-sm font-medium text-slate-700">
            {["Practical learning", "Skill development"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-700" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-xl min-w-0 lg:max-w-none"
        >
          <div className="absolute -right-3 -top-4 h-32 w-32 rounded-[38%_62%_54%_46%] bg-blue-100 sm:h-44 sm:w-44" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-[35%_65%_42%_58%] bg-sky-200 sm:h-28 sm:w-28" />

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white bg-slate-100 shadow-2xl shadow-blue-950/15">
            <img
              src={aboutImage}
              alt="EphorX learning and technology"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Floating card */}
          <div className="absolute -bottom-5 left-4 z-10 max-w-[260px] rounded-xl border border-slate-100 bg-white p-4 shadow-xl shadow-blue-950/10 sm:-left-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Learn. Build. Grow.
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Turn what you learn into what you create.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;