
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Target,
} from "lucide-react";

const points = [
  "Build a strong foundation in your chosen field.",
  "Connect theoretical knowledge with practical work.",
  "Develop problem-solving and independent learning skills.",
];

const AboutIntro = () => {
  return (
    <section
      id="about-intro"
      className="relative overflow-hidden bg-gray-50 px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-41 lg:py-24"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="min-w-0"
        >
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
            <span className="h-0.5 w-7 bg-sky-500" />
            Who We Are
          </p>

          <h2 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
            More Than Learning.
            <span className="mt-2 block text-sky-500">
              A Step Toward Your Future.
            </span>
          </h2>

          <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            EphorX is focused on helping learners understand technology,
            develop useful skills, and gain the confidence to apply their
            knowledge. We believe education becomes more meaningful when
            learning connects with real challenges and practical outcomes.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Our approach encourages curiosity, hands-on exploration, continuous
            improvement, and a mindset that prepares learners for a changing
            professional world.
          </p>

          <div className="mt-7 space-y-4">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-sky-500"
                />
                <p className="text-sm leading-6 text-gray-700 sm:text-base">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative min-w-0"
        >
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-3xl border-2 border-sky-200" />

          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#030b12] via-[#071927] to-[#0c3049] p-6 text-white sm:p-9 lg:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

            <div className="relative">
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400 text-gray-950">
                <BookOpen size={27} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sky-300">
                Our Philosophy
              </p>

              <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">
                Knowledge matters.
                <span className="block text-sky-400">
                  Application makes it powerful.
                </span>
              </h3>

              <p className="mt-5 text-sm leading-7 text-gray-300">
                We encourage learners to ask questions, experiment with ideas,
                build projects, and grow through practice.
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sky-300">
                  <Target size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">Learning with direction</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Skills that have a purpose.
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-sky-400"
                />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 right-5 h-16 w-16 rounded-2xl bg-sky-400/20 blur-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutIntro;
