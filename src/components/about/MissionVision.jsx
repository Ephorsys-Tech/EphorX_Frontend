
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Eye,
  Lightbulb,
  Target,
} from "lucide-react";

const content = {
  mission: {
    label: "OUR MISSION",
    title: "Make Learning",
    highlight: "Meaningful.",
    description:
      "At EphorX, our mission is to make technology education practical, engaging, and accessible to learners who want to build their future with confidence. We aim to simplify complex concepts through structured learning, guided practice, and hands-on projects that encourage learners to think independently and solve problems creatively.",
    extra:
      "By connecting foundational knowledge with practical application, we encourage every learner to develop useful skills, explore new possibilities, and take meaningful steps toward personal and professional growth.",
    footer: "Learn with purpose",
    icon: Target,
    smallIcon: Lightbulb,
  },
  vision: {
    label: "OUR VISION",
    title: "Inspire the",
    highlight: "Next Generation.",
    description:
      "Our vision is to contribute to a future where learners feel confident exploring technology, adapting to change, and turning their ideas into meaningful solutions. We aspire to create a learning environment that encourages curiosity, creativity, and a commitment to lifelong learning.",
    extra:
      "Through practical education and continuous improvement, we want to help learners prepare for evolving industry needs, discover their potential, and pursue their professional ambitions with confidence.",
    footer: "Grow beyond limits",
    icon: Eye,
    smallIcon: Compass,
  },
};

const MissionVision = () => {
  const [showVision, setShowVision] = useState(false);

  const active = showVision ? content.vision : content.mission;
  const Icon = active.icon;
  const FooterIcon = active.smallIcon;

  const toggleCard = () => setShowVision((current) => !current);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-sky-700">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            What Drives Us
          </div>

          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Our Mission & <span className="text-sky-500">Vision</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Every learning journey needs a purpose and a direction. Discover
            the principles that guide our approach to education, practical
            learning, and future growth.
          </p>
        </motion.div>

        {/* Wider fixed-height 3D card */}
        <div
          className="mx-auto w-full max-w-6xl"
          style={{ perspective: "1600px" }}
        >
          <motion.button
            type="button"
            onClick={toggleCard}
            aria-label={
              showVision
                ? "Flip back to our mission"
                : "Flip to our vision"
            }
            aria-pressed={showVision}
            className="group relative block h-[470px] w-full cursor-pointer rounded-[1.75rem] text-left outline-none focus-visible:ring-4 focus-visible:ring-sky-400/40 sm:h-[440px] lg:h-[410px]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: showVision ? 180 : 0 }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Front: Mission */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] border border-gray-800 bg-gradient-to-br from-[#030b12] via-[#071927] to-[#0c3049] p-6 text-white shadow-xl shadow-sky-950/10 sm:p-8 lg:p-10 "
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl transition-all duration-500 group-hover:bg-sky-400/25" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative flex shrink-0 items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-400 text-gray-950 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Target size={26} />
                </div>

              
              </div>

              <div className="relative my-auto grid min-h-0 gap-5 py-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                    {content.mission.label}
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {content.mission.title}
                    <span className="mt-1 block text-sky-400">
                      {content.mission.highlight}
                    </span>
                  </h3>

                  <div className="mt-4 hidden h-1 w-14 rounded-full bg-sky-400 lg:block" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs leading-6 text-gray-300 sm:text-sm sm:leading-7 lg:text-[15px]">
                    {content.mission.description}
                  </p>

                  <p className="mt-3 text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7 lg:text-[15px]">
                    {content.mission.extra}
                  </p>
                </div>
              </div>

              <div className="relative flex shrink-0 items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-300 sm:gap-3 sm:text-sm">
                  <Lightbulb size={18} />
                  {content.mission.footer}
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:text-gray-950 sm:h-10 sm:w-10">
                  <ArrowRight size={18} />
                </span>
              </div>
            </div>

            {/* Back: Vision */}
            <div
              className="absolute inset-0 flex flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 text-gray-950 shadow-xl shadow-sky-900/5 sm:p-8 lg:p-10"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

              <div className="relative flex shrink-0 items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-950 text-sky-400 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Eye size={26} />
                </div>

                <span className="text-4xl font-black text-gray-950/[0.07] sm:text-5xl">
                  02
                </span>
              </div>

              <div className="relative my-auto grid min-h-0 gap-5 py-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                    {content.vision.label}
                  </p>

                  <h3 className="mt-3 text-2xl font-black leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {content.vision.title}
                    <span className="mt-1 block text-sky-600">
                      {content.vision.highlight}
                    </span>
                  </h3>

                  <div className="mt-4 hidden h-1 w-14 rounded-full bg-sky-500 lg:block" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs leading-6 text-gray-600 sm:text-sm sm:leading-7 lg:text-[15px]">
                    {content.vision.description}
                  </p>

                  <p className="mt-3 text-xs leading-6 text-gray-500 sm:text-sm sm:leading-7 lg:text-[15px]">
                    {content.vision.extra}
                  </p>
                </div>
              </div>

              <div className="relative flex shrink-0 items-center justify-between gap-3 border-t border-gray-200 pt-4 sm:pt-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 sm:gap-3 sm:text-sm">
                  <Compass size={18} className="text-sky-600" />
                  {content.vision.footer}
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white transition-all duration-300 group-hover:bg-sky-500 sm:h-10 sm:w-10">
                  <ArrowLeft size={18} />
                </span>
              </div>
            </div>
          </motion.button>
        </div>

        
      </div>
    </section>
  );
};

export default MissionVision;
