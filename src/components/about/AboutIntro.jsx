
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const points = [
  {
    number: "01",
    title: "Strong Foundations",
    description:
      "Build a solid understanding of your chosen field.",
  },
  {
    number: "02",
    title: "Practical Experience",
    description:
      "Connect theoretical knowledge with real-world projects.",
  },
  {
    number: "03",
    title: "Continuous Growth",
    description:
      "Develop problem-solving skills and independent thinking.",
  },
];

const AboutIntro = () => {
  return (
    <section
      id="about-intro"
      className="relative overflow-hidden bg-gray-50 px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-41 lg:pt-14 lg:pb-6"
    >
      <div className="relative">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
         

          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            Learning that connects knowledge
            <br />
            <span className="text-sky-500"> with action.</span>
          </h2>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            EphorX helps learners understand technology, develop useful skills,
            and gain the confidence to apply their knowledge. Through hands-on
            exploration, practical learning, and continuous improvement, we
            prepare learners to approach real-world challenges with confidence.
          </p>
        </motion.div>

        {/* Three horizontal feature cards */}
        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((point, index) => (
            <motion.div
              key={point.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-2xl hover:shadow-slate-900/15 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-sky-600">
                  {point.number}
                </span>

                <ArrowUpRight
                  size={18}
                  className="text-gray-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-500"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-950">
                {point.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default AboutIntro;
