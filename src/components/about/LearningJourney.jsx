
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Rocket,
  Trophy,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    number: "01",
    title: "Explore",
    description:
      "Discover your interests, understand your goals, and choose a direction for learning.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Learn",
    description:
      "Understand core concepts and develop the knowledge needed to move forward.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Build",
    description:
      "Apply what you learn through practice, projects, and problem-solving exercises.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Review your progress, strengthen your portfolio, and prepare for new opportunities.",
    icon: Trophy,
  },
];

const LearningJourney = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-41 lg:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
          Your Path Forward
        </p>

        <h2 className="text-3xl font-black text-gray-950 sm:text-4xl lg:text-5xl">
          From Learning to
          <span className="block text-sky-500">Real-World Skills.</span>
        </h2>

        <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
          A meaningful learning journey combines knowledge, consistent
          practice, feedback, and the confidence to take the next step.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, index) => {
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group relative min-w-0 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-sky-300 hover:bg-sky-50/60 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-sky-400 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <span className="text-3xl font-black text-gray-100 transition-colors duration-300 group-hover:text-sky-100">
                  {stage.number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-black text-gray-950">
                {stage.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                {stage.description}
              </p>

              {index < stages.length - 1 && (
                <ArrowRight
                  size={19}
                  className="mt-6 hidden text-sky-500 xl:block"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LearningJourney;
