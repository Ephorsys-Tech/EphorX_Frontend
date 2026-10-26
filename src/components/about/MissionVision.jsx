
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
      "At EphorX, our mission is to make technology education practical, engaging, and accessible. We help learners build relevant knowledge through structured lessons, guided practice, and hands-on projects that encourage independent thinking and creative problem-solving.",
    extra:
      "We aim to connect foundational knowledge with practical application, helping learners strengthen their abilities, explore new opportunities, and take meaningful steps toward personal and professional growth.",
    footer: "Learn with purpose",
    icon: Target,
    smallIcon: Lightbulb,
  },
  vision: {
    label: "OUR VISION",
    title: "Inspire the",
    highlight: "Next Generation.",
    description:
      "Our vision is to contribute to a future where learners feel confident exploring technology, adapting to change, and turning ideas into meaningful solutions. We aspire to create an environment that encourages curiosity, creativity, and lifelong learning.",
    extra:
      "Through practical education and continuous improvement, we want learners to prepare for evolving industry needs, discover their potential, and pursue professional ambitions with confidence.",
    footer: "Grow beyond limits",
    icon: Eye,
    smallIcon: Compass,
  },
};

const MissionVision = () => {
  const [showVision, setShowVision] = useState(false);

  const toggleCard = () => {
    setShowVision((current) => !current);
  };

  return (
    <section className="relative bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-16 lg:py-7 ">
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
        >
         

          <h2 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Our Mission & <span className="text-sky-500">Vision</span>
          </h2>

          <p className="mx-auto mt-1.5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
            Every learning journey needs a purpose and a direction. Discover
            the principles that guide our approach to education and future
            growth.
          </p>
        </motion.div>

        <div
          className="mx-auto w-full max-w-6xl"
          style={{ perspective: "1600px" }}
        >
          <motion.div
            className="relative h-[410px] w-full cursor-pointer rounded-[1.5rem] sm:rounded-[1.75rem]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: showVision ? 180 : 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={toggleCard}
            role="button"
            tabIndex={0}
            aria-label={
              showVision
                ? "Flip back to our mission"
                : "Flip to our vision"
            }
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleCard();
              }
            }}
          >
            <CardFace data={content.mission} dark rotate={0} />
            <CardFace data={content.vision} dark={false} rotate={180} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CardFace = ({ data, dark, rotate }) => {
  const Icon = data.icon;
  const FooterIcon = data.smallIcon;

  return (
    <div
      className={`absolute inset-0 flex flex-col overflow-hidden rounded-[1.5rem] border p-5 sm:rounded-[1.75rem] sm:p-7 lg:p-9 ${
        dark
          ? "border-gray-800 bg-gradient-to-br from-[#030b12] via-[#071927] to-[#0c3049] text-white"
          : "border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50 text-gray-950 shadow-2xl"
      }`}
      style={{
        transform: `rotateY(${rotate}deg)`,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full blur-3xl ${
          dark ? "bg-sky-400/15" : "bg-sky-300/30"
        }`}
      />

      <div className="relative flex shrink-0 items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl ${
            dark
              ? "bg-sky-400 text-gray-950"
              : "bg-gray-950 text-sky-400"
          }`}
        >
          <Icon size={24} />
        </div>

        <span
          className={`text-4xl font-black sm:text-5xl ${
            dark ? "text-white/[0.08]" : "text-gray-950/[0.07]"
          }`}
        >
          {data.number || (rotate === 0 ? "01" : "02")}
        </span>
      </div>

      <div className="relative my-3 grid min-h-0 flex-1 grid-cols-1 items-center gap-3 overflow-y-auto overscroll-contain sm:my-4 sm:gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div className="min-w-0">
          <p
            className={`text-[10px] font-bold uppercase tracking-[0.2em] sm:text-xs ${
              dark ? "text-sky-300" : "text-sky-700"
            }`}
          >
            {data.label}
          </p>

          <h3 className="mt-2 text-xl font-black leading-tight sm:text-2xl lg:text-4xl">
            {data.title}

            <span
              className={`mt-1 block ${
                dark ? "text-sky-400" : "text-sky-600"
              }`}
            >
              {data.highlight}
            </span>
          </h3>
        </div>

        <div className="min-w-0">
          <p
            className={`text-xs leading-5 sm:text-sm sm:leading-6 lg:text-[15px] lg:leading-7 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {data.description}
          </p>

          <p
            className={`mt-2 text-xs leading-5 sm:mt-3 sm:text-sm sm:leading-6 lg:text-[15px] lg:leading-7 ${
              dark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {data.extra}
          </p>
        </div>
      </div>

      <div
        className={`relative mt-1 flex shrink-0 items-center justify-between gap-3 border-t pt-3 sm:pt-4 ${
          dark ? "border-white/10" : "border-gray-200"
        }`}
      >
        <div
          className={`flex items-center gap-2 text-xs font-semibold sm:gap-3 sm:text-sm ${
            dark ? "text-sky-300" : "text-gray-800"
          }`}
        >
          <FooterIcon
            size={18}
            className={dark ? "" : "text-sky-600"}
          />
          {data.footer}
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            dark
              ? "border border-white/20 text-white"
              : "bg-gray-950 text-white"
          }`}
        >
          {rotate === 0 ? (
            <ArrowRight size={17} />
          ) : (
            <ArrowLeft size={17} />
          )}
        </span>
      </div>
    </div>
  );
};

export default MissionVision;
