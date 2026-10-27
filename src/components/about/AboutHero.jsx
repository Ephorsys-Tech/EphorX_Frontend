
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ChartColumnIncreasing,
  Code2,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/aboutImage.png";

const AboutHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-8 pt-24 sm:px-8 sm:pt-28 md:px-10 lg:px-41 lg:pb-4 lg:pt-33">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-sky-100/70 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-blue-50 blur-[100px]" />

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 min-w-0"
        >
          {/* Eyebrow */}
           <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-sky-500" />
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-700">
               Discover EphorX
            </span>

            <ArrowUpRight size={13} className="text-sky-600" />
          </div>
         

          {/* Heading */}
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#081521] sm:text-5xl lg:text-[3.6rem] xl:text-6xl">
            We Turn
            <br />
            Curiosity Into
            <span className="block text-sky-500">
              Capability<span className="text-[#081521]">.</span>
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            At EphorX, we believe learning technology should be practical,
            engaging, and connected to real-world opportunities. We help
            learners build knowledge, develop skills, and move forward with
            confidence.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/Course"
              className="group inline-flex items-center gap-3 rounded-xl bg-sky-500 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#071927] hover:shadow-xl"
            >
              Explore Our Courses
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>

            <a
              href="#about-intro"
              className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              Get to Know Us
              <ArrowDown size={16} />
            </a>
          </div>

          {/* Trust points */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-100 pt-5 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Practical learning
            </span>

            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              Skill development
            </span>
          </div>
        </motion.div>

        {/* Right image panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative min-w-0 w-full"
        >
          <div className="group/panel relative isolate min-h-[360px] overflow-hidden rounded-[1.5rem] border border-sky-400/15 bg-[#071927] shadow-[0_25px_60px_rgba(7,15,39,0.16)] sm:min-h-[400px] sm:rounded-[1.75rem] lg:min-h-[390px]">
            {/* Background image */}
            <img
              src={aboutImage}
              alt="EphorX learning and technology"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-60 transition-transform duration-700 group-hover/panel:scale-105"
            />

            {/* Navy gradient overlay */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#061521]/55 via-[#071927]/70 to-[#0A1C2A]/45" />

            {/* Blue glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-sky-500/20 blur-[80px]" />

            <div className="relative flex min-h-[360px] flex-col justify-between p-5 sm:min-h-[400px] sm:p-7 lg:min-h-[390px] lg:p-8">
              {/* Panel header */}
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-400/10 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-300">
                    EphorX Learning Hub
                  </span>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-sky-300 backdrop-blur-sm">
                  <Code2 size={20} />
                </div>
              </div>

              {/* Panel content */}
              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-sky-300">
                  <span className="h-px w-8 bg-sky-400" />
                  LEARN. BUILD. GROW.
                </div>

                <h2 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                  Learn with purpose.
                  <span className="mt-1 block text-sky-400">
                    Build with confidence.
                  </span>
                </h2>

                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                  Transform what you learn into what you can create.
                </p>

                {/* Learning highlights */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-[#071927]/55 p-3 backdrop-blur-md transition-colors duration-300 hover:border-sky-400/40 hover:bg-white/10 sm:p-4">
                    <GraduationCap size={22} className="mb-2 text-sky-400" />
                    <p className="text-sm font-bold text-white">Learn</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Build strong foundations
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-[#071927]/55 p-3 backdrop-blur-md transition-colors duration-300 hover:border-sky-400/40 hover:bg-white/10 sm:p-4">
                    <Code2 size={22} className="mb-2 text-sky-400" />
                    <p className="text-sm font-bold text-white">Create</p>
                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      Put skills into practice
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom status */}
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/15 pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-300">
                    <ChartColumnIncreasing size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Keep Growing
                    </p>
                    <p className="mt-1 text-[11px] text-slate-300">
                      One skill at a time.
                    </p>
                  </div>
                </div>

                <ArrowUpRight size={20} className="shrink-0 text-sky-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
