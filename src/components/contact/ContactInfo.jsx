import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Star,
} from "lucide-react";

const contactItems = [
  {
    number: "01",
    title: "Email Address",
    description: "Have a question? Send us a message.",
    value: "hello@ephorx.com",
    icon: Mail,
    link: "mailto:hello@ephorx.com",
  },
  {
    number: "02",
    title: "Phone Number",
    description: "Talk directly with our team.",
    value: "+91 XXXXX XXXXX",
    icon: Phone,
    link: null,
  },
  {
    number: "03",
    title: "Our Location",
    description: "Come and connect with us in person.",
    value: "Add your office address",
    icon: MapPin,
    link: null,
  },
  {
    number: "04",
    title: "Working Hours",
    description: "We're here to help you move forward.",
    value: "Add your working hours",
    icon: Clock,
    link: null,
  },
];

const ContactInfo = () => {
  return (
    <section
      id="contact-info"
      className="relative overflow-hidden bg-gray-50 px-5 py-10 sm:px-8 md:px-10 lg:px-41 lg:py-16"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:flex-row md:items-end lg:mb-14"
      >
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 shadow-sm">
            <Star size={15} className="text-sky-500" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gray-700">
              Get in Touch
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            Let's Make Something
            <span className="text-sky-500"> Happen.</span>
          </h2>

          <p className="pt-2 text-sm leading-7 text-gray-500 sm:text-base">
            Have a question or an idea? Choose the best way to connect
            <br className="hidden lg:block" /> with our team. We'd love to hear from you.
          </p>
        </div>
      </motion.div>

      {/* Four designed boxes */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {contactItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: index * 0.09,
                ease: "easeOut",
              }}
              className="group min-w-0"
            >
              <div className="group/card relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-3xl border border-sky-400/20 bg-gradient-to-br from-[#040d14] via-[#071927] to-[#0c293f] p-5 shadow-[0_20px_50px_rgba(14,165,233,0.13)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-sky-200 hover:bg-none hover:bg-white hover:shadow-[0_20px_55px_rgba(14,165,233,0.25)] sm:min-h-[275px] sm:p-6 lg:p-7">

                {/* Navy blue glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-500/20 blur-3xl transition-all duration-500 group-hover/card:bg-sky-300/40" />
                <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-blue-600/20 blur-3xl transition-all duration-500 group-hover/card:bg-blue-300/30" />

                {/* Corner decoration */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-sky-400/10 transition-all duration-500 group-hover/card:scale-150 group-hover/card:bg-sky-100/80" />

                {/* Number and arrow */}
                <div className="relative flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-[0.2em] text-sky-400 transition-colors duration-500 group-hover/card:text-sky-600">
                    / {item.number}
                  </span>

                  <ArrowUpRight
                    size={19}
                    className="text-sky-400 transition-all duration-300 group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/card:text-sky-600 group-hover:rotate-45"
                  />
                </div>

                {/* Icon */}
                <div className="relative mt-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-400 text-gray-950 shadow-lg shadow-sky-400/30 transition-all duration-300 group-hover:rounded-xl group-hover:bg-gray-950 group-hover:text-sky-400">
                  <Icon size={25} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="relative mt-5">
                  <h3 className="text-lg font-extrabold tracking-tight text-white transition-colors duration-500 group-hover/card:text-gray-950 sm:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300 transition-colors duration-500 group-hover/card:text-gray-600">
                    {item.description}
                  </p>
                </div>

                {/* Contact detail */}
                <div className="relative mt-auto min-w-0 pt-6">
                  <div className="mb-3 h-px w-full bg-sky-400/20 transition-colors duration-500 group-hover/card:bg-sky-200" />

                  {item.link ? (
                    <a
                      href={item.link}
                      className="inline-flex max-w-full items-center gap-2 break-all text-sm font-bold text-white transition-colors duration-500 hover:text-sky-500 group-hover/card:text-gray-800"
                    >
                      <span className="min-w-0 break-all">{item.value}</span>
                      <ArrowUpRight
                        size={15}
                        className="shrink-0 text-sky-400 transition-colors duration-500 group-hover/card:text-sky-600"
                      />
                    </a>
                  ) : (
                    <p className="break-words text-sm font-bold text-white transition-colors duration-500 group-hover/card:text-gray-800">
                      {item.value}
                    </p>
                  )}
                </div>

                {/* Bottom hover accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-500 group-hover/card:w-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactInfo;
