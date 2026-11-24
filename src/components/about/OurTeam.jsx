
import { motion } from "framer-motion";

import pc from "../../assets/pc.png";
import pm from "../../assets/pm.png";
import ceo from "../../assets/ceo.png";

const teamMembers = [
  {
    name: "Dipti Ranjan Sahoo",
    position: "Founder and CEO",
    image: ceo,
  },
  {
    name: "Swapnajit Acharya",
    position: "Program Coordinator",
    image: pc,
  },
  {
    name: "Pradyumna Sahoo",
    position: "Program Manager",
    image: pm,
  },
];

const OurTeam = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="relative mx-auto max-w-7xl px-5 pb-9 sm:px-8">

        {/* Blue background */}
        <div
          className="
            absolute inset-x-5 top-0 h-full
            rounded-b-sm bg-[#05258f]
            sm:inset-x-8
            lg:h-[330px]
          "
        />

        {/* Heading */}
        <div className="relative z-10 px-2 pt-12 text-center sm:pt-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-white sm:text-4xl"
          >
            Our Team Members
          </motion.h2>

          <p className="mx-auto mt-3 max-w-md text-sm italic leading-6 text-white/90">
            Meet the experienced leadership team behind EphorX,
            guiding our vision and growth.
          </p>
        </div>

        {/* Team members */}
        <div className="relative z-10 mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-8 lg:grid-cols-3 lg:gap-8">

          {teamMembers.map((member, index) => (
            <motion.div
              key={member.position}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {/* Square profile image */}
              <div className="h-52 w-52 overflow-hidden rounded-xl border-4 border-white/70 bg-slate-100 shadow-md transition-transform duration-300 hover:scale-105 sm:h-56 sm:w-56 lg:h-52 lg:w-52 xl:h-56 xl:w-56">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="mt-4 text-lg font-semibold text-sky-400 lg:text-slate-900">
                {member.name}
              </h3>

              <p className="mt-2 text-sm font-medium text-white lg:text-blue-700">
                {member.position}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
