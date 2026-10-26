
import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Code2,
  GraduationCap,
  Headset,
  Lightbulb,
  Route,
  Star,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Practical Learning",
    description:
      "Strengthen your understanding through exercises, implementation, and hands-on practice.",
    icon: Code2,
    dark: true,
  },
  {
    number: "02",
    title: "Guided Learning",
    description:
      "Build your skills step by step with structured learning and opportunities to ask questions.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Project-Based Growth",
    description:
      "Turn concepts into working projects and learn how to approach real-world problems.",
    icon: Lightbulb,
  },
  {
    number: "04",
    title: "Structured Learning Paths",
    description:
      "Progress from essential concepts to advanced topics with a clear learning direction.",
    icon: Route,
  },
  {
    number: "05",
    title: "Career Preparation",
    description:
      "Develop problem-solving, communication, and technical skills useful for professional growth.",
    icon: BookOpenCheck,
    
  },
  {
    number: "06",
    title: "Learning Support",
    description:
      "Get guidance when you need help understanding concepts or moving forward with your work.",
    icon: Headset,
    dark: true,
  },
];

const WhyEphorX = () => {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-40 lg:py-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="relative w-full">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-6"
        >
          
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Why Learn With{" "}
            <span className="text-sky-500 animate-pulse">EphorX?</span>
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Learning should go beyond memorizing concepts. Explore how we
            encourage practical skills, independent thinking, and continuous
            growth.
          </p>
        </motion.div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                }}
                className="h-full"
              >
                <div
                  className={`group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                    benefit.dark
                      ? "border-gray-800 bg-gray-950 text-white hover:border-sky-400 hover:bg-gray-900"
                      : "border-gray-200 bg-white text-gray-900 hover:border-sky-300 hover:bg-sky-50/40"
                  }`}
                >
                  {/* Hover glow */}
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                      benefit.dark
                        ? "bg-sky-400/20 opacity-40"
                        : "bg-sky-400/15 opacity-0"
                    }`}
                  />

                  {/* Card top */}
                  <div className="relative flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                        benefit.dark
                          ? "border-white/10 bg-white/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white"
                          : "border-sky-100 bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white"
                      }`}
                    >
                      <Icon size={23} strokeWidth={1.8} />
                    </div>

                    <span
                      className={`text-sm font-semibold ${
                        benefit.dark ? "text-white/30" : "text-gray-300"
                      }`}
                    >
                      {benefit.number}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="relative mt-7">
                    <h3
                      className={`text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-sky-500 sm:text-xl ${
                        benefit.dark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {benefit.title}
                    </h3>

                    <p
                      className={`mt-2 max-w-xs text-sm leading-6 ${
                        benefit.dark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {benefit.description}
                    </p>
                  </div>

                  {/* Card footer */}
                                  <div className="mt-6 h-1 w-10 rounded-full bg-sky-400 transition-all duration-300 group-hover:w-20" />

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-gray-400 sm:mt-10 sm:text-sm"
        >
          <Star size={15} className="shrink-0 text-sky-500" />
          Building knowledge, confidence, and skills for the future.
        </motion.div>
      </div>
    </section>
  );
};

export default WhyEphorX;
