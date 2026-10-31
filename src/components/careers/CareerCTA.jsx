
import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";

const CareerCTA = () => {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 md:px-8 lg:px-41 lg:py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#2a91e0] via-[#43a6ec] to-[#075985] px-6 py-14 text-center sm:px-12 lg:py-5"
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-sky-300/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-sky-300/10" />

        <div className="relative mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-900 bg-sky-400/10 text-sky-300">
            <Send size={25}  className="text-slate-900"/>
          </div>

          <h2 className="mt-6 text-3xl font-black text-white sm:text-4xl">
            Don't See the Right <span className="text-slate-900">Role?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            We are always interested in connecting with talented and
            passionate people. Reach out to our team to discuss potential
            opportunities.
          </p>

          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-slate-800 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-sky-400"
          >
            <Mail size={18} />
            Contact Us
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CareerCTA;
