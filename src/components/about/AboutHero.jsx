
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-white px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32 md:px-10 lg:px-41 lg:pb-24">
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="min-w-0"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            <Sparkles size={15} />
            Discover EphorX
          </div>

          <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            We Turn
            <span className="block">Curiosity Into</span>
            <span className="block text-sky-500">
              Capability<span className="text-gray-950">.</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            At EphorX, we believe learning technology should be practical,
            engaging, and connected to real-world opportunities. We help
            learners build knowledge, develop skills, and move forward with
            confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/Course"
              className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gray-950 px-6 py-4 text-sm font-bold text-white transition-colors duration-300 hover:bg-sky-500"
            >
              Explore Our Courses
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <a
              href="#about-intro"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 text-sm font-bold text-gray-800 transition-colors duration-300 hover:border-sky-300 hover:bg-sky-50"
            >
              Get to Know Us
              <ArrowDown size={17} />
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-gray-600">
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

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="relative min-w-0"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-sky-100/80 blur-xl" />

          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#030b12] via-[#071927] to-[#0b3450] p-5 text-white sm:p-8 lg:p-9">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-12 h-52 w-52 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400 text-gray-950">
                  <Code2 size={23} />
                </div>
                <div>
                  <p className="font-bold tracking-wide">
                    Ephor<span className="text-sky-400">X</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Learn. Build. Grow.
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1.5 text-xs font-semibold text-sky-300">
                Learning Hub
              </span>
            </div>

            <div className="relative py-9 sm:py-12">
              <div className="mb-5 flex items-center gap-2 text-sm text-sky-300">
                <span className="h-px w-8 bg-sky-400" />
                THE FUTURE STARTS HERE
              </div>

              <h2 className="text-3xl font-black leading-tight sm:text-4xl">
                Learn with purpose.
                <span className="mt-1 block text-sky-400">
                  Build with confidence.
                </span>
              </h2>

              <p className="mt-5 max-w-sm text-sm leading-7 text-gray-300">
                Transform what you learn into what you can create.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <GraduationCap
                    size={23}
                    className="mb-3 text-sky-400"
                  />
                  <p className="font-bold">Learn</p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Build strong foundations
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <Code2 size={23} className="mb-3 text-sky-400" />
                  <p className="font-bold">Create</p>
                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Put skills into practice
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <p className="text-xs text-gray-400">
                Your journey. Your potential.
              </p>
              <ArrowUpRight size={20} className="text-sky-400" />
            </div>
          </div>

          <div className="absolute -bottom-4 right-4 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:flex lg:-right-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-950">
                Keep Growing
              </p>
              <p className="text-xs text-gray-500">
                One skill at a time
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
