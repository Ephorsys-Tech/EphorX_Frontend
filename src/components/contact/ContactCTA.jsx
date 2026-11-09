import { motion } from "framer-motion";
import { ArrowUpRight, CircleHelp, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
  return (
    <section className="bg-white pb-10 pt-6 sm:pb-16 lg:pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative isolate overflow-hidden rounded-2xl bg-blue-700 p-5 sm:rounded-[2rem] sm:p-8 md:p-10 lg:p-14"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-blue-900/20 blur-3xl" />

          <div className="relative flex min-w-0 flex-col justify-between gap-6 sm:gap-8 lg:flex-row lg:items-center">
            <div className="flex min-w-0 items-start gap-3 sm:gap-5">
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-950 text-blue-400 sm:flex">
                <CircleHelp size={27} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white sm:tracking-[0.18em]">
                  <MessageCircle size={15} className="shrink-0" />
                  <span>Need More Information?</span>
                </div>

                <h2 className="text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                  Still Have Questions?
                  <br className="hidden sm:block" />
                  <span className="text-blue-200"> We've Got You.</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
                  Browse our frequently asked questions for helpful information
                  about courses, admissions, fees and learning at EphorX.
                </p>
              </div>
            </div>

            <Link
              to="/faq"
              className="group inline-flex w-full shrink-0 items-center justify-center gap-3 self-start rounded-xl bg-gray-950 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-blue-800 sm:w-auto sm:px-6 sm:py-4 lg:self-center"
            >
              Visit FAQ Page
              <ArrowUpRight
                size={18}
                className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;