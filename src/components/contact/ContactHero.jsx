
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Headphones,
} from "lucide-react";
import { Link } from "react-router-dom";
import contactImage from "../../assets/contactImage.png";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description: "Courses, admissions, fees or career guidance.",
  },
  {
    number: "02",
    title: "Get the right guidance",
    description: "Our team will help you plan your next step.",
  },
];

const ContactHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white pb-8 pt-24 sm:pt-28 lg:pb-0 lg:pt-10">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-72 w-72 rounded-full bg-blue-100/70 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-64 w-64 rounded-full bg-blue-50 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.88fr)] lg:gap-14">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="relative z-10 min-w-0"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-blue-700" />
              </span>

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-700">
                Let's connect
              </span>

              <ArrowUpRight size={13} className="text-blue-700" />
            </div>

            {/* Heading */}
            <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#081521] sm:text-5xl lg:text-[3.6rem] xl:text-6xl">
              Let's start a
              <br />
              <span className="relative inline-block text-blue-700">
                conversation.
              </span>
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              Have questions about courses, admissions or your career?
              Connect with EphorX and get the guidance you need to take
              your next step with confidence.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("ask-question-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                }
                className="group inline-flex items-center gap-3 rounded-xl bg-blue-800 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-900 hover:shadow-xl hover:shadow-blue-900/20"
              >
                Contact our team

                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </button>

              <Link
                to="/faq"
                className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800"
              >
                Explore FAQs

                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Small trust note */}
            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <MessageCircle size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-extrabold text-slate-900">
                  Need a little guidance?
                </p>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  We're just a conversation away.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right visual panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative min-w-0 w-full"
          >
            <div className="group/panel relative isolate min-h-[360px] overflow-hidden rounded-[1.5rem] border border-blue-400/15 bg-white shadow-[0_25px_60px_rgba(7,15,39,0.16)] sm:min-h-[400px] sm:rounded-[1.75rem] lg:min-h-[390px]">

              {/* Background image */}
              <img
                src={contactImage}
                alt="EphorX support and guidance"
                className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-50 transition-transform duration-700 group-hover/panel:scale-105"
              />

              {/* Original navy gradient overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#061521]/55 via-[#071927]/70 to-[#0A1C2A]/40" />

              {/* Subtle blue glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-blue-600/20 blur-[80px]" />

              {/* Panel content */}
              <div className="relative flex min-h-[360px] flex-col justify-between p-5 sm:min-h-[400px] sm:p-7 lg:min-h-[390px] lg:p-8">

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1.5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300">
                      EphorX support
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl">
                    Your next chapter
                    <br />
                    starts <span className="text-blue-400">here.</span>
                  </h2>

                  <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                    Every big achievement begins with the right guidance.
                    Let's find your next step together.
                  </p>
                </div>

                {/* Compact support steps */}
                <div className="mt-8 space-y-3">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.3 + index * 0.12,
                      }}
                      className="group/step flex min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-[#071927]/55 p-3 backdrop-blur-md transition-colors duration-300 hover:border-blue-400/40 hover:bg-white/10 sm:p-3.5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-blue-400/25 bg-blue-400/10 text-xs font-black text-blue-300 transition-colors duration-300 group-hover/step:bg-blue-500 group-hover/step:text-[#071927]">
                        {step.number}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-white">
                          {step.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-300">
                          {step.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="shrink-0 text-slate-400 transition-all duration-300 group-hover/step:-translate-y-0.5 group-hover/step:translate-x-0.5 group-hover/step:text-blue-300"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Bottom status */}
                <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Headphones size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Here to help you grow
                    </p>

                    <p className="mt-1 text-[11px] text-slate-300">
                      One step at a time.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
