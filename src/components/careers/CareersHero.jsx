
import { motion } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CareersHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#071927] px-4 pb-20 pt-32 sm:px-6 md:px-8 lg:px-41 lg:pb-24 lg:pt-36">

      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-sky-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative grid items-center gap-12 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm font-semibold text-sky-300">
            <Sparkles size={16} />
            Build Your Future With Us
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Grow Your Career.
            <span className="mt-2 block text-sky-400">
              Create Your Impact.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            At EphorX, we believe great work starts with great people.
            Explore exciting opportunities, develop your skills, and grow
            with a team that values creativity, learning and innovation.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#open-positions"
              className="group inline-flex items-center gap-3 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400"
            >
              Explore Open Positions
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <Link
  to="#open-positions"
  className="group inline-flex items-center gap-3 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400"
>
  Explore Open Positions
  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</Link>
<button
  type="button"
  onClick={() =>
    document.getElementById("open-positions")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="group inline-flex items-center gap-3 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:bg-sky-400"
>
  Explore Open Positions
  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1"
  />
</button>

            <a
              href="#why-join-us"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-sky-400 hover:bg-white/10"
            >
              Why Join Us?
            </a>
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/20 via-[#102C40] to-[#071927] p-8 sm:p-10">

            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full border border-sky-300/20" />
            <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full border border-sky-300/10" />

            <div className="relative flex min-h-[300px] flex-col items-center justify-center text-center sm:min-h-[350px]">

              <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-3xl border border-sky-300/30 bg-sky-400/10 text-sky-300 shadow-xl shadow-sky-500/10">
                <BriefcaseBusiness size={48} strokeWidth={1.5} />
              </div>

              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Your Next Chapter
                <span className="block text-sky-400">Starts Here.</span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                Bring your ideas, passion and talent. Let's build something
                meaningful together.
              </p>

              <div className="mt-7 h-1 w-20 rounded-full bg-sky-400" />
            </div>
          </div>

          {/* Floating label */}
          <div className="absolute -bottom-5 -left-3 rounded-xl border border-white/10 bg-[#102C40] px-5 py-3 shadow-xl sm:-left-6">
            <p className="text-xs font-medium text-slate-400">
              Your potential
            </p>
            <p className="text-sm font-bold text-sky-400">
              Has no limits.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersHero;
