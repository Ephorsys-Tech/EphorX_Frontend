import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Database,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { useState } from "react";

import image from "../assets/Logo.png";
import Modal from "../ui/Modal";
import CompanyMapModal from "../components/modal/CompanyMapModal";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/Course" },
  { label: "About Us", to: "/about" },
  { label: "Our Process", to: "/process" },
  { label: "Contact", to: "/contact" },
  { label: "FAQs", to: "/faq" },
];

const courses = [
  {
    title: "Full Stack Development",
    subtitle: "React, Node.js & more",
    icon: Code2,
  },
  {
    title: "Programming",
    subtitle: "Build strong coding skills",
    icon: GraduationCap,
  },
  {
    title: "Database Management",
    subtitle: "SQL & database concepts",
    icon: Database,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/",
    color: "hover:bg-[#1877F2]",
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/",
    color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/",
    color: "hover:bg-[#0A66C2]",
  },
  {
    label: "X",
    icon: FaXTwitter,
    url: "https://x.com/",
    color: "hover:bg-black",
  },
  {
    label: "YouTube",
    icon: FaYoutube,
    url: "https://www.youtube.com/",
    color: "hover:bg-[#FF0000]",
  },
];

function Logo() {
  return (
    <Link
      to="/"
      aria-label="EphorX Home"
      className="relative flex h-12 w-32 shrink-0 items-center sm:w-36 md:w-40"
    >
      <img
        src={image}
        alt="EphorX logo"
        className="absolute -left-5 top-1/2 h-auto w-44 max-w-none -translate-y-1/2 object-contain sm:-left-7 sm:w-48 md:-left-8 md:w-52 lg:-left-10 lg:w-57"
      />
    </Link>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-6">
      <h3 className="text-base font-bold tracking-wide text-black sm:text-lg">
        {children}
      </h3>

      <span className="mt-3 block h-[3px] w-8 rounded-full bg-sky-400" />
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="mt-7 flex flex-wrap gap-2.5">
      {socialLinks.map(({ label, icon: Icon, url, color }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`group flex h-10 w-10 items-center justify-center rounded-xl
            border border-white/10 bg-sky-300 text-gray-700
            transition-all duration-300 hover:-translate-y-1 hover:border-transparent
            hover:text-white ${color}`}
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group flex w-fit items-center gap-2 py-1.5 text-sm
        font-semibold text-gray-700 transition-colors duration-300 hover:text-sky-500"
    >
      <ChevronRight
        size={15}
        className="shrink-0 text-sky-400 transition-transform duration-300
          group-hover:translate-x-1"
      />
      <span>{children}</span>
    </Link>
  );
}

function CourseLink({ title, subtitle, icon: Icon }) {
  return (
    <Link
      to="/Course"
      className="group flex items-center gap-3 rounded-xl p-2.5
        transition-all duration-300 hover:bg-white/[0.07]"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl border border-sky-300 bg-black text-sky-300
          transition-all duration-300 group-hover:border-sky-300/30
          group-hover:bg-sky-400 group-hover:text-white"
      >
        <Icon size={20} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="block text-sm font-semibold text-gray-400
            transition-colors group-hover:text-sky-400"
        >
          {title}
        </span>

        <span className="mt-1 block text-xs leading-5 text-gray-800">
          {subtitle}
        </span>
      </span>

      <ArrowUpRight
        size={16}
        className="shrink-0 text-gray-600 transition-all duration-300
          group-hover:-translate-y-0.5 group-hover:translate-x-0.5
          group-hover:text-sky-300"
      />
    </Link>
  );
}

function ContactItem({ icon: Icon, title, description, to, onClick }) {
  const content = (
    <>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center
          rounded-xl border border-sky-500 bg-black text-sky-300
          transition-colors duration-300 group-hover:bg-sky-400 group-hover:text-white"
      >
        <Icon size={19} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-400">
          {title}
        </span>

        <span className="mt-1 block text-xs leading-5 text-gray-800">
          {description}
        </span>
      </span>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group flex w-full cursor-pointer items-start gap-3 text-left"
      >
        {content}
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className="group flex items-start gap-3">
        {content}
      </Link>
    );
  }

  return <div className="group flex items-start gap-3">{content}</div>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* Background decoration */}
      <div
        className="pointer-events-none absolute -right-40 -top-40
          h-96 w-96 rounded-full bg-sky-500/[0.08] blur-3xl"
      />

      <div
        className="pointer-events-none absolute -bottom-48 -left-40
          h-96 w-96 rounded-full bg-blue-600/[0.08] blur-3xl"
      />

      <div className="pointer-events-none absolute left-10 top-50 h-22 w-22 rotate-20 rounded-xl bg-blue-200/50" />

      <div className="pointer-events-none absolute right-120 bottom-50 h-22 w-22 rotate-35 rounded-xl bg-blue-200/40" />

      <div className="pointer-events-none absolute left-99 bottom-15 h-7 w-7 rounded-full bg-blue-500" />

      <div className="pointer-events-none absolute left-320 top-53 h-7 w-7 rounded-full bg-blue-300" />

      {/* Main footer container: aligned with the Home HeroSection */}
      <div className="relative px-5 sm:px-10 lg:px-40 2xl:px-41">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative mt-4 overflow-hidden rounded-b-[28px]
            border-x border-b border-sky-200
            bg-gradient-to-br from-sky-400 via-black to-sky-300
            px-6 py-8 sm:px-9 sm:py-10"
        >
          <div
            className="pointer-events-none absolute -right-10 -top-15
              h-52 w-52 rounded-full border border-sky-300/30"
          />

          <div
            className="pointer-events-none absolute -right-5 -top-10
              h-40 w-40 rounded-full border border-sky-300/30"
          />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <span
                className="mb-3 inline-flex items-center gap-2
                  text-xs font-bold uppercase tracking-[0.2em] text-sky-300"
              >
                Your next chapter starts here
              </span>

              <h2
                className="text-2xl font-extrabold leading-tight
                  tracking-tight text-white sm:text-3xl lg:text-4xl"
              >
                Ready to build your{" "}
                <span className="text-sky-300">future?</span>
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
                Learn practical skills, explore technology, and take the
                next step in your learning journey with EphorX.
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex min-h-12 shrink-0 items-center
                justify-center gap-3 self-start rounded-xl bg-sky-400
                px-6 py-3 text-sm font-bold text-slate-950
                shadow-lg shadow-sky-500/10 transition-all duration-300
                hover:-translate-y-1 hover:bg-sky-300 hover:shadow-sky-400/20
                md:self-center"
            >
              Let's Talk
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* Main footer content */}
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-11 py-12
            sm:grid-cols-2 sm:py-14
            lg:grid-cols-[1.25fr_0.8fr_1.2fr_1fr]
            lg:gap-x-10 lg:py-7"
        >
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              <Logo />
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-600">
              Empowering learners with practical technology education,
              hands-on projects, and skills to grow with confidence
              in a changing digital world.
            </p>

            <SocialLinks />

            <div
              className="mt-7 inline-flex items-center gap-2.5
                rounded-xl border border-sky-400 bg-white/[0.035] px-3.5 py-3"
            >
              <GraduationCap size={21} className="shrink-0 text-sky-600" />

              <span className="text-xs leading-5 text-gray-600">
                Learn today.
                <span className="block font-semibold text-gray-400">
                  Build your tomorrow.
                </span>
              </span>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <FooterHeading>Explore</FooterHeading>

            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <FooterLink key={link.to} to={link.to}>
                  {link.label}
                </FooterLink>
              ))}
            </nav>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            <FooterHeading>Our Top Courses</FooterHeading>

            <div className="-mx-2 flex flex-col gap-1">
              {courses.map((course) => (
                <CourseLink key={course.title} {...course} />
              ))}
            </div>

            <Link
              to="/Course"
              className="group mt-5 inline-flex items-center gap-2
                text-sm font-semibold text-sky-400 transition-colors hover:text-black"
            >
              Explore all courses
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.24 }}
          >
            <FooterHeading>Get in Touch</FooterHeading>

            <div className="flex flex-col gap-5">
              <ContactItem
                icon={Mail}
                title="Contact our team"
                description="Course enquiries and general questions"
                to="/contact"
              />

              <ContactItem
                icon={Phone}
                title="Need guidance?"
                description="Talk to us about your learning goals"
                to="/contact"
              />

              <ContactItem
                icon={MapPin}
                title="Our Company"
                description="Get in touch for location and visit details"
                onClick={() => setMapOpen(true)}
              />
            </div>

            <Link
              to="/contact"
              className="group mt-7 flex w-full items-center
                justify-between gap-3 rounded-xl border bg-sky-400
                px-4 py-3.5 text-sm font-semibold text-sky-100
                transition-all duration-300 hover:bg-black"
            >
              <span className="inline-flex items-center gap-2">
                <Send size={16} />
                Send an enquiry
              </span>

              <ArrowUpRight
                size={18}
                className="transition-transform duration-300
                  group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Company map modal */}
      <Modal
        isOpen={mapOpen}
        onClose={() => setMapOpen(false)}
        title="Our Location"
        size="lg"
        theme="white"
      >
        <CompanyMapModal />
      </Modal>

      {/* Bottom bar: same horizontal alignment */}
      <div className="relative border-t border-white/[0.08] bg-[#080e19]">
        <div
          className="flex flex-col gap-4 px-5 py-5
            sm:px-10 md:flex-row md:items-center md:justify-between
            lg:px-40 2xl:px-41"
        >
          <p className="text-xs leading-5 text-sky-500">
            © {year}{" "}
            <span className="font-semibold text-gray-300">EphorX</span>.
            All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to="/privacy-policy"
              className="text-xs text-sky-400 transition-colors hover:text-sky-700"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-xs text-sky-400 transition-colors hover:text-sky-700"
            >
              Terms & Conditions
            </Link>

            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="ml-1 flex h-9 w-9 items-center justify-center
                rounded-xl border border-white/10 bg-white/[0.04]
                text-gray-300 transition-all duration-300
                hover:-translate-y-1 hover:border-sky-400/40
                hover:bg-sky-400/10 hover:text-sky-300"
            >
              <ArrowRight size={17} className="-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
