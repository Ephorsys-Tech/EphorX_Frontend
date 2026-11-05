import { motion } from "framer-motion";
import {
  BookOpenCheck,
  Code2,
  GraduationCap,
  Headset,
  Lightbulb,
  Route,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Practical Learning",
    description:
      "Strengthen your understanding through exercises, implementation, and hands-on practice.",
    icon: Code2,
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
  },
];

const WhyEphorX = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-sky-50 py-16 sm:py-20">
      {/* Background design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-10 left-[18%] h-[130%] w-24 -skew-x-[28deg] bg-gradient-to-b from-white/70 to-white/0" />
        <div className="absolute -top-10 left-[62%] h-[130%] w-28 -skew-x-[28deg] bg-gradient-to-b from-white/60 to-white/0" />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full border border-white/70 bg-gradient-to-br from-blue-200/50 to-sky-100/10" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full border border-white/70 bg-gradient-to-tl from-blue-200/50 to-sky-100/10" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Learn With <span className="text-blue-700">EphorX?</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Learning should go beyond memorizing concepts. Explore how we
            encourage practical skills, independent thinking, and continuous
            growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors duration-300 group-hover:bg-blue-700 group-hover:text-white">
                    <Icon size={22} strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-semibold text-slate-300">
                    {benefit.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold text-slate-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyEphorX;