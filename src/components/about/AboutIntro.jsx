import { motion } from "framer-motion";

const points = [
  {
    number: "01",
    title: "Strong Foundations",
    description: "Build a solid understanding of your chosen field.",
  },
  {
    number: "02",
    title: "Practical Experience",
    description: "Connect theoretical knowledge with real-world projects.",
  },
  {
    number: "03",
    title: "Continuous Growth",
    description: "Develop problem-solving skills and independent thinking.",
  },
];

const AboutIntro = () => {
  return (
    <section id="about-intro" className="scroll-mt-28 bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Heading and text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            Learning that connects knowledge{" "}
            <span className="text-blue-700">with action.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            EphorX helps learners understand technology, develop useful
            skills, and gain the confidence to apply their knowledge. Through
            hands-on exploration, practical learning, and continuous
            improvement, we prepare learners to approach real-world
            challenges with confidence.
          </p>
        </motion.div>

        {/* Points */}
        <div className="space-y-4">
          {points.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-5 rounded-xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-900/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-sm font-bold text-white">
                {point.number}
              </span>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;