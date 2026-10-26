
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CodeXml,
  UsersRound,
} from "lucide-react";

const highlights = [
  {
    number: "01",
    title: "Technical Knowledge",
    subtitle:
      "Understand the fundamentals and build a strong foundation for your learning journey.",
    icon: BrainCircuit,
    dark: false,
  },
  {
    number: "02",
    title: "Practical Projects",
    subtitle:
      "Turn your knowledge into practical projects and gain confidence through hands-on experience.",
    icon: CodeXml,
    dark: true,

  },
  {
    number: "03",
    title: "Career Readiness",
    subtitle:
      "Develop problem-solving, communication, and technical skills for professional challenges.",
    icon: BriefcaseBusiness,
    dark: false,
  },
  {
    number: "04",
    title: "Continuous Growth",
    subtitle:
      "Keep exploring, learning, and improving as technology and opportunities evolve.",
    icon: UsersRound,
        dark: true,

  },
];

const AboutHighlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const active = highlights[activeIndex];
  const Icon = active.icon;

  const changeCard = (step) => {
    setDirection(step);
    setActiveIndex(
      (current) => (current + step + highlights.length) % highlights.length
    );
  };

  return (
    <section className="relative overflow-hidden bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-41 lg:py-7">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="min-w-0"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-sky-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            What We Work Toward
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Build Skills.
            <span className="mt-2 block text-sky-500">
              Create Possibilities.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Education is about more than completing a course. It is about
            developing the knowledge, practical experience, and mindset to
            continue learning in a world that never stops changing.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            At EphorX, our focus is on helping learners take meaningful steps
            toward their personal and professional goals.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-1 w-12 rounded-full bg-sky-500" />
            <div className="h-1 w-5 rounded-full bg-gray-300" />
            <div className="h-1 w-2 rounded-full bg-gray-200" />
          </div>
        </motion.div>

        {/* Right: One-card slider */}
        <div className="min-w-0">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={active.number}
                custom={direction}
                initial={{ opacity: 0, x: direction * 55 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -55 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`relative flex min-h-[310px] flex-col overflow-hidden rounded-3xl border p-7 sm:min-h-[340px] sm:p-9 ${
                  active.dark
                    ? "border-gray-100 bg-gradient-to-br from-sky-600 via-black to-sky-700 text-white"
                    : "border-gray-200 bg-gray-200/50 text-gray-950 shadow-sm"
                }`}
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
                      active.dark
                        ? "border-white/10 bg-white/10 text-sky-400"
                        : "border-sky-100 bg-sky-50 text-sky-600"
                    }`}
                  >
                    <Icon size={27} strokeWidth={1.7} />
                  </div>

                  <span
                    className={`text-sm font-bold tracking-[0.2em] ${
                      active.dark ? "text-white/40" : "text-gray-300"
                    }`}
                  >
                    {active.number} / 04
                  </span>
                </div>

                <div className="relative mt-10">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
                    The EphorX Advantage
                  </p>

                  <h3
                    className={`text-2xl font-extrabold leading-tight sm:text-3xl ${
                      active.dark ? "text-white" : "text-gray-950"
                    }`}
                  >
                    {active.title}
                  </h3>

                  <p
                    className={`mt-4 max-w-md text-sm leading-7 sm:text-base ${
                      active.dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {active.subtitle}
                  </p>
                </div>

                <div
                  className={`relative mt-auto flex items-center justify-between border-t pt-5 ${
                    active.dark ? "border-white/10" : "border-gray-100"
                  }`}
                >
                  <span
                    className={`text-xs font-semibold ${
                      active.dark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    Building skills for tomorrow
                  </span>

                  <span className="h-2 w-2 rounded-full bg-sky-500" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {highlights.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  aria-label={`Show ${item.title}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-9 bg-sky-500"
                      : "w-3 bg-gray-300 hover:bg-sky-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeCard(-1)}
                aria-label="Previous card"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-all duration-300 hover:border-gray-950 hover:bg-gray-950 hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() => changeCard(1)}
                aria-label="Next card"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-950 text-white transition-all duration-300 hover:bg-sky-500"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHighlights;
