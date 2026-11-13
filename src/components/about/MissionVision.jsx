import { motion } from "framer-motion";
import { Compass, Eye, Lightbulb, Target } from "lucide-react";

const content = [
  {
    label: "Our mission",
    title: "Make Learning",
    highlight: "Meaningful.",
    description:
      "At EphorX, our mission is to make technology education practical, engaging, and accessible. We help learners build relevant knowledge through structured lessons, guided practice, and hands-on projects that encourage independent thinking and creative problem-solving.",
    extra:
      "We aim to connect foundational knowledge with practical application, helping learners strengthen their abilities, explore new opportunities, and take meaningful steps toward personal and professional growth.",
    footer: "Learn with purpose",
    icon: Target,
    footerIcon: Lightbulb,
  },
  {
    label: "Our vision",
    title: "Inspire the",
    highlight: "Next Generation.",
    description:
      "Our vision is to contribute to a future where learners feel confident exploring technology, adapting to change, and turning ideas into meaningful solutions. We aspire to create an environment that encourages curiosity, creativity, and lifelong learning.",
    extra:
      "Through practical education and continuous improvement, we want learners to prepare for evolving industry needs, discover their potential, and pursue professional ambitions with confidence.",
    footer: "Grow beyond limits",
    icon: Eye,
    footerIcon: Compass,
  },
];

const MissionVision = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0b2a5b] py-12 text-white sm:py-10">
      {/* Background design */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-10 left-[14%] h-[130%] w-28 skew-x-[-28deg] bg-linear-to-b from-white/[0.07] to-transparent" />
        <div className="absolute -top-10 left-[44%] h-[130%] w-14 skew-x-[-28deg] bg-linear-to-b from-white/6 to-transparent" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10 bg-linear-to-br from-blue-500/25 to-transparent" />
        <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full border border-white/10 bg-linear-to-tr from-sky-400/15 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Our Mission &amp; <span className="text-sky-300">Vision</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-100/90">
            Every learning journey needs a purpose and a direction. Discover
            the principles that guide our approach to education and future
            growth.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {content.map((item, index) => {
            const Icon = item.icon;
            const FooterIcon = item.footerIcon;

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="flex flex-col rounded-2xl bg-white p-6 text-slate-900 shadow-xl shadow-black/10 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                    {item.label}
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-bold leading-tight sm:text-3xl">
                  {item.title}{" "}
                  <span className="text-blue-700">{item.highlight}</span>
                </h3>

                <p className="mt-4 text-[15px] leading-7 text-slate-700">
                  {item.description}
                </p>
                <p className="mt-3 text-[15px] leading-7 text-slate-600">
                  {item.extra}
                </p>

                <div className="mt-auto flex items-center gap-2.5 border-t border-slate-100 pt-5 text-sm font-semibold text-slate-800">
                  <FooterIcon size={18} className="text-blue-700" />
                  {item.footer}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;