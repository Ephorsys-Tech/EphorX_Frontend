import { useState } from "react";
import { motion } from "framer-motion";
import faqImage from "../../assets/faqImage.png";
import {
  ArrowUpRight,
  MessageCircleQuestion,
  Send,
  UserRound,
  Mail,
  BookOpen,
  Sparkles,
} from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  category: "Courses",
  question: "",
};

const AskQuestion = () => {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend only for now.
    // Later, connect this form to your backend API.
    console.log("Question submitted:", formData);

    alert("Your form UI is ready! Backend submission will be added later.");
  };

  return (
    <section
      id="ask-question-section"
      className="relative overflow-hidden bg-white px-5 py-0 pb-6 sm:px-8 lg:px-41 lg:pt-4 lg:pb-10"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative mx-auto w-full">
        {/* Section heading — original content and alignment */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
            <Sparkles size={14} />
            We're listening
          </span>

          <h2 className="mt-5 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl lg:text-4xl">
            Have a Question?
            
            <span className="text-sky-500 ml-2">Ask EphorX.</span>
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_12px_40px_-18px_rgba(14,165,233,0.24)] lg:grid-cols-[0.85fr_1.15fr]"
        >
          {/* Left sky-blue information panel */}
         

<div className="relative isolate flex flex-col justify-between overflow-hidden bg-[#061521] p-6 sm:p-8 lg:p-9">
  {/* Background photo */}
  <img
    src={faqImage}
    alt=""
    aria-hidden="true"
    className="absolute inset-0 -z-20 h-full w-full object-cover"
  />

  {/* Dark overlay for readable text */}
  <div className="pointer-events-none absolute inset-0 -z-10 bg-sky-300/30" />

  {/* Blue glow effects */}
  <div className="pointer-events-none absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-sky-500/30 blur-2xl" />
  <div className="pointer-events-none absolute -bottom-20 -left-16 -z-10 h-56 w-56 rounded-full bg-blue-600/40 blur-2xl" />

  <div>
    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-400/60 bg-slate-950/50 text-sky-400 shadow-[0_0_25px_rgba(14,165,233,0.2)] backdrop-blur-sm">
      <MessageCircleQuestion size={25} />
    </div>

    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
      Your curiosity matters
    </p>

    <h3 className="mt-3 text-2xl font-black leading-tight text-white sm:text-3xl">
      Every great
      <br />
      journey starts
      <br />
      with a{" "}
      <span className="text-black/50">question.</span>
    </h3>

    <p className="mt-4 max-w-sm text-sm leading-6 text-slate-200">
      Ask us about courses, admissions, fees or learning paths.
      Share what's on your mind and let us guide you.
    </p>
  </div>

  <div className="mt-8 border-t border-sky-500/60 pt-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/20">
        <BookOpen size={19} />
      </div>

      <div>
        <p className="text-sm font-bold text-white">
          Learn with confidence
        </p>
        <p className="mt-1 text-xs text-slate-300">
          Get clarity before your next step.
        </p>
      </div>

      <ArrowUpRight
        className="ml-auto shrink-0 text-sky-400"
        size={24}
      />
    </div>
  </div>
</div>



          {/* Right question form */}
          <div className="bg-white p-6 sm:p-8 lg:p-9">
            <div className="mb-6">
              <h3 className="text-xl font-black text-gray-950 sm:text-2xl">
                Send us your question
              </h3>
             
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="ask-name"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Your name
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition-all duration-300 hover:border-sky-300 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
                  <UserRound
                    size={18}
                    className="shrink-0 text-gray-400 transition-colors group-focus-within:text-sky-500"
                  />
                  <input
                    id="ask-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="ask-email"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Email address
                </label>

                <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50/70 px-4 transition-all duration-300 hover:border-sky-300 focus-within:border-sky-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-sky-100/70">
                  <Mail
                    size={18}
                    className="shrink-0 text-gray-400 transition-colors group-focus-within:text-sky-500"
                  />
                  <input
                    id="ask-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="ask-category"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  What is your question about?
                </label>

                <select
                  id="ask-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition-all duration-300 hover:border-sky-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100/70"
                >
                  <option value="General">General enquiry</option>
                  <option value="Courses">Courses & training</option>
                  <option value="Admissions">Admissions</option>
                  <option value="Fees">Fees & payment</option>
                  <option value="Learning">Learning support</option>
                  <option value="Career">Career & placement</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Question */}
              <div>
                <label
                  htmlFor="ask-question"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Your question
                </label>

                <textarea
                  id="ask-question"
                  name="question"
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={3}
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Tell us what you'd like to know..."
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-sky-300 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100/70"
                />

                <p className="mt-2 text-right text-xs text-gray-400">
                  {formData.question.length}/1000 characters
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-sky-500/20 transition-all duration-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/25 focus:outline-none focus:ring-4 focus:ring-sky-200 active:scale-[0.99]"
              >
                Submit Your Question
                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                />
              </button>

             
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AskQuestion;