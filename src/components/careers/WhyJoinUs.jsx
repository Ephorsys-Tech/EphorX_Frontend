
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  TrendingUp,
  Rocket,
  GraduationCap,
  Target,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Innovation & Ideas",
    description:
      "Bring your ideas to life and contribute to meaningful projects.",
  },
  {
    icon: GraduationCap,
    number: "02",
    title: "Continuous Learning",
    description:
      "Explore new technologies and keep improving your skills.",
  },
  {
    icon: Users,
    number: "03",
    title: "Collaborative Team",
    description:
      "Work together, exchange ideas and learn from others.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "Professional Growth",
    description:
      "Take on new challenges and develop your career.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Real-world Experience",
    description:
      "Get opportunities to work on practical projects.",
  },
  {
    icon: Target,
    number: "06",
    title: "Meaningful Work",
    description:
      "Contribute your skills towards useful solutions.",
  },
];

const WhyJoinUs = () => {
  // Duplicate cards for seamless automatic scrolling
  const scrollingBenefits = [...benefits, ...benefits];

  return (
    <section
      id="why-join-us"
      className="relative overflow-hidden bg-white py-20 sm:pt-28 sm:pb-13 "
    >
      <div className="px-5 sm:px-6 md:px-8 lg:px-41">

        {/* Heading and Description */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
         
          <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
           Your Next Chapter
            Starts Here.
            <span className="block text-sky-600 text-3xl mt-2">
              A Place to Grow
            </span>
          </h2>

          <p className="mt-5 max-w-[900px] text-sm leading-8 text-slate-600 sm:text-base">
            A great career is built through learning, collaboration and
            opportunities. At EphorX, we aim to create an environment where
            people can share ideas, develop their abilities and contribute
            to meaningful work. Whether you're beginning your professional journey or bringing
            valuable experience, we believe that curiosity and dedication
            make a difference.
          </p>
           
           <button
  type="button"
  onClick={() =>
    document.getElementById("open-positions")?.scrollIntoView({
      behavior: "smooth",
    })
  }
  className="group inline-flex items-center gap-3 rounded-xl  py-3 text-sm font-bold text-black transition-all duration-300 hover:text-sky-400"
>
  Explore Open Positions
  <ArrowRight
    size={18}
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45"
  />
</button>
         
        </motion.div>
      </div>

      {/* Automatically Scrolling Benefit Cards */}
      <div className="relative mt-3  lg:mx-40 md:mx-10">

        {/* Left fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />

        {/* Right fade */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <div className="group overflow-hidden">
          <div className="career-scroll-track flex w-max gap-5 px-3 py-5">

            {scrollingBenefits.map((item, index) => {
              const Icon = item.icon;
              const isBlue = index % benefits.length % 2 === 1;

              return (
                <motion.div
                  key={`${item.number}-${index}`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`group/card relative flex min-h-[230px] w-[270px] shrink-0 flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all duration-500 hover:border-slate-950 hover:bg-[#071927] hover:shadow-xl sm:w-[300px] ${
                    isBlue
                      ? "border-sky-300 bg-sky-500"
                      : "border-slate-200 bg-white"
                  }`}
                >

                  {/* Card top */}
                  <div className="relative flex items-center justify-between">
                   
                     {/* Icon */}
                  <div
                    className={`relative mt-1 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover/card:bg-sky-500 group-hover/card:text-white ${
                      isBlue
                        ? "bg-white/20 text-white"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </div>
                    <ArrowUpRight
                      size={19}
                      className={`transition-all duration-300 group-hover/card:rotate-45 ${
                        isBlue
                          ? "text-white group-hover/card:text-sky-400"
                          : "text-slate-400 group-hover/card:text-sky-400"
                      }`}
                    />
                  </div>

                 

                  {/* Content */}
                  <div className="relative mt-auto pt-5">
                    <h3
                      className={`text-lg font-extrabold transition-colors duration-300 ${
                        isBlue
                          ? "text-white group-hover/card:text-white"
                          : "text-slate-950 group-hover/card:text-white"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p
                      className={`mt-2 text-sm leading-6 transition-colors duration-300 ${
                        isBlue
                          ? "text-sky-50 group-hover/card:text-slate-300"
                          : "text-slate-500 group-hover/card:text-slate-300"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-sky-400 transition-all duration-500 group-hover/card:w-full" />
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>

      {/* Scrolling animation */}
      <style>{`
        @keyframes career-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .career-scroll-track {
          animation: career-scroll 35s linear infinite;
        }

        .group:hover .career-scroll-track {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .career-scroll-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyJoinUs;
