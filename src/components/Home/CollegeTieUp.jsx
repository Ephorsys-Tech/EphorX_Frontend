
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import collegeLogo from "../../assets/collegeLogo.jpeg";

const colleges = [
  { name: "GIFT Autonomous, Bhubaneswar", logo: collegeLogo },
  { name: "GIFT Autonomous, Bhubaneswar", logo: collegeLogo },
  { name: "GIFT Autonomous, Bhubaneswar", logo: collegeLogo },
  { name: "GIFT Autonomous, Bhubaneswar", logo: collegeLogo },
];

const CollegeTieUp = () => {
  return (
    <section className="bg-white py-16 sm:py-10">

      {/* Same container as CoursesByCategory */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-700">
              Our College Network
            </p>

            <h2 className="text-4xl font-bold text-gray-900 sm:text-[38px]">
              Building Stronger
              <span className="block text-blue-700">
                Academic Connections.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-gray-500">
            We work alongside colleges to connect academic learning with
            practical skills, industry exposure, and career opportunities.
          </p>

        </div>

        {/* College Boxes */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {colleges.map((college, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group flex min-h-44 flex-col items-center justify-center gap-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-700 hover:bg-white hover:shadow-lg hover:shadow-blue-700/10"
            >

              {/* College Logo */}
              {college.logo ? (
                <img
                  src={college.logo}
                  alt={college.name}
                  className="h-26 w-28 rounded-xl border border-blue-100 bg-white object-contain p-2 shadow-sm"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-blue-100 bg-white text-blue-700 shadow-sm transition-all duration-300 group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white">
                  <GraduationCap size={32} strokeWidth={1.8} />
                </div>
              )}

              {/* College Name */}
              <h3 className="text-center text-sm font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-700 sm:text-base">
                {college.name}
              </h3>

            </motion.div>
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 text-center">

          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Want to Partner With EphorX?
          </h3>

          <p className="text-sm text-gray-500">
            Let's create better learning opportunities together.
          </p>

          <a
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-700/20"
          >
            Connect With Us
            <span>→</span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default CollegeTieUp;
