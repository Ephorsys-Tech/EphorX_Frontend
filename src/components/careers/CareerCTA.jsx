
import { motion } from "framer-motion";
import { ArrowRight, Mail, Send } from "lucide-react";
import { Link } from "react-router-dom";

const CareerCTA = () => {
  return (
    <section className="bg-white py-1 sm:py-9">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 px-6 py-10 text-center sm:px-12 lg:py-8"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-blue-300/20" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-blue-300/20" />

          <div className="relative mx-auto">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-300/40 bg-white/10 text-white">
              <Send size={25} />
            </div>

            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Don't See the Right{" "}
              <span className="text-sky-300">Role?</span>
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              We are always interested in connecting with talented and
              passionate people. Reach out to our team to discuss potential
              opportunities.
            </p>

            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 transition-all duration-300 hover:bg-sky-100"
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
      </div>
    </section>
  );
};

export default CareerCTA;
