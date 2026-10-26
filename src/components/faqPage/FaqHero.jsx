import { motion } from "framer-motion";
import { ArrowDownRight, GraduationCap, Star } from "lucide-react";

const FaqHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:px-41 lg:pt-31 lg:pb-27">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-20 top-10 -z-10 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-56 w-56 rounded-full bg-sky-50 blur-3xl" />

      <div className="mx-auto grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl"
        >

           <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-sky-400 opacity-50" />
              <span className="relative h-2 w-2 rounded-full bg-sky-500" />
            </span>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-700">
              EphorX faq Center
            </span>

          </div>
        
          <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Everything You Need
            <br className="hidden sm:block" /> to Know About{" "}
            <span className="relative inline-block text-sky-500">
              EphorX.
              <span className="absolute -bottom-1 left-0 h-1 w-2/3 rounded-full bg-black/70" />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
            Got questions about our courses, learning process, or getting
            started? Find the answers you need and take your next step
            with confidence.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#faq-questions"
              className="group inline-flex items-center gap-3 rounded-xl bg-gray-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gray-950/10 transition-all duration-300 hover:bg-sky-500 hover:shadow-sky-500/20"
            >
              Explore FAQs
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>

            <span className="text-sm font-medium text-gray-500">
              We're here to help you learn.
            </span>
          </div>
        </motion.div>

        {/* Decorative FAQ card */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md  lg:ml-25"
        >
          <div className="absolute -right-3 -top-3 h-20 w-20 rounded-2xl border border-sky-200 bg-sky-50" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-sky-100/80" />

          <div className="relative rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.25)] sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
                  Quick Answers
                </p>
                <h2 className="mt-2 text-xl font-bold text-gray-950">
                  How can we help?
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-950 text-sky-400">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                "Explore our courses",
                "Understand the admission process",
                "Learn about career opportunities",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sm font-bold text-sky-700">
                    0{index + 1}
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-gray-950 p-4">
              <div className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
              <p className="text-sm text-gray-200">
                Your learning journey starts here.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqHero;