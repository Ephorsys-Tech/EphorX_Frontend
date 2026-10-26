
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      "To support learners in building relevant knowledge and practical skills through engaging learning experiences, guided practice, and a commitment to continuous improvement.",
    footer: "Learn with purpose",
    number: "01",
    icon: Target,
    smallIcon: Lightbulb,
    dark: true,
  },
  vision: {
    label: "OUR VISION",
    title: "Inspire the",
    highlight: "Next Generation.",
    description:
      "To contribute to a future where learners can access meaningful technology education, adapt to new challenges, and confidently pursue their professional ambitions.",
    footer: "Grow beyond limits",
    number: "02",
    icon: Eye,
    smallIcon: Compass,
    dark: false,
  },
};

const MissionVision = () => {
  const [showVision, setShowVision] = useState(false);

  const active = showVision ? content.vision : content.mission;
  const Icon = active.icon;
  const FooterIcon = active.smallIcon;

  const toggleCard = () => {
    setShowVision((current) => !current);
  };

  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-41 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
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
            the principles that guide the EphorX learning experience.
          </p>
        </motion.div>

        {/* 3D flipping card */}
        <div className="mx-auto w-full max-w-2xl">
          <div
            className="relative"
            style={{ perspective: "1400px" }}
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
              className="group relative block w-full cursor-pointer rounded-[1.75rem] text-left outline-none focus-visible:ring-4 focus-visible:ring-sky-400/40"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateY: showVision ? 180 : 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Mission: front face */}
              <div
                className="relative flex min-h-[440px] flex-col overflow-hidden rounded-[1.75rem] border border-gray-800 bg-gradient-to-br from-[#030b12] via-[#071927] to-[#0c3049] p-6 text-white shadow-xl shadow-sky-950/10 sm:min-h-[460px] sm:p-10 lg:p-12"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Glow decorations */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl transition-all duration-500 group-hover:bg-sky-400/25" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-400 text-gray-950 transition-transform duration-500 group-hover:rotate-6">
                    <Target size={27} />
                  </div>

                  <span className="text-5xl font-black text-white/[0.08] sm:text-6xl">
                    01
                  </span>
                </div>

                <div className="relative my-auto py-9">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-300">
                    Our Mission
                  </p>

                  <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    Make Learning
                    <span className="mt-1 block text-sky-400">
                      Meaningful.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                    {content.mission.description}
                  </p>
                </div>

                <div className="relative flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-sky-300">
                    <Lightbulb size={19} />
                    Learn with purpose
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-300 group-hover:border-sky-400 group-hover:bg-sky-400 group-hover:text-gray-950">
                    <ArrowRight size={19} />
                  </span>
                </div>
              </div>

              {/* Vision: back face */}
              <div
                className="absolute inset-0 flex min-h-[440px] flex-col overflow-hidden rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 p-6 text-gray-950 shadow-xl shadow-sky-900/5 sm:min-h-[460px] sm:p-10 lg:p-12"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-sky-400 transition-transform duration-500 group-hover:rotate-6">
                    <Eye size={27} />
                  </div>

                  <span className="text-5xl font-black text-gray-950/[0.07] sm:text-6xl">
                    02
                  </span>
                </div>

                <div className="relative my-auto py-9">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                    Our Vision
                  </p>

                  <h3 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    Inspire the
                    <span className="mt-1 block text-sky-600">
                      Next Generation.
                    </span>
                  </h3>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {content.vision.description}
                  </p>
                </div>

                <div className="relative flex items-center justify-between gap-4 border-t border-gray-200 pt-5">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <Compass size={19} className="text-sky-600" />
                    Grow beyond limits
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-950 text-white transition-all duration-300 group-hover:bg-sky-500">
                    <ArrowLeft size={19} />
                  </span>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Flip controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={toggleCard}
              className="inline-flex items-center gap-3 rounded-full bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-500 hover:text-gray-950"
            >
              {showVision ? "Explore Our Mission" : "Discover Our Vision"}
              {showVision ? (
                <ArrowLeft size={17} />
              ) : (
                <ArrowRight size={17} />
              )}
            </button>

            <div className="flex items-center gap-2">
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  !showVision ? "w-8 bg-sky-500" : "w-3 bg-gray-300"
                }`}
              />
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
