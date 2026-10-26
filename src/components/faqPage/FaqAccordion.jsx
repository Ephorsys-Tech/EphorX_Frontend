import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Search,
  X,
} from "lucide-react";

const faqData = [
  {
    id: 1,
    category: "General",
    question: "What is EphorX?",
    answer:
      "EphorX is an educational and IT training company focused on helping students develop practical, industry-relevant technical skills.",
  },
  {
    id: 2,
    category: "General",
    question: "Who can join EphorX courses?",
    answer:
      "College Students, freshers, graduates, and working professionals who want to learn new technical skills can explore our courses.",
  },
  {
    id: 3,
    category: "Courses",
    question: "What courses are available at EphorX?",
    answer:
      "EphorX offers learning opportunities in Web Development, MERN Stack Development, Python Programming,, Data Analytics,Artificial Intelligence and Machine Learning,Node.js,React.js and other technology-related fields.",
  },
  {
    id: 4,
    category: "Courses",
    question: "Do I need prior programming knowledge?",
    answer:
      "Not necessarily. Beginners can start with foundational concepts and gradually develop their programming skills.",
  },
  {
    id: 5,
    category: "Courses",
    question: "Will I work on real-world projects?",
    answer:
      "Practical exercises and project-based learning can help you apply concepts and understand how technical skills are used in real-world situations.",
  },
  {
    id: 6,
    category: "Admissions",
    question: "How can I enroll in a course?",
    answer:
      "You can contact the EphorX team through the website to enquire about available courses, admission procedures, and upcoming batches.",
  },
  {
    id: 7,
    category: "Admissions",
    question: "Can I get information about upcoming batches?",
    answer:
      "Yes. Contact the team to enquire about upcoming batches, course schedules, and available learning options.",
  },
  {
    id: 8,
    category: "Fees",
    question: "How can I know the course fees?",
    answer:
      "Course fees may vary depending on the selected program. Contact the EphorX team for the latest fee details.",
  },
  {
    id: 9,
    category: "Fees",
    question: "Are installment payment options available?",
    answer:
      "Please contact the EphorX team to confirm the available payment methods and whether installment options are offered for your selected course.",
  },
  {
    id: 10,
    category: "Learning",
    question: "How are the courses taught?",
    answer:
      "The learning process can include concept explanations, practical exercises, coding practice, and project-based activities, depending on the course.",
  },
  {
    id: 11,
    category: "Career",
    question: "Will these courses help me prepare for a job?",
    answer:
      "Learning technical concepts, practising projects, and strengthening problem-solving skills can help you prepare for technical roles. Career outcomes depend on your skills, practice, and preparation.",
  },
  {
    id: 12,
    category: "Career",
    question: "Can beginners prepare for a technical career?",
    answer:
      "Yes. Beginners can build their foundation step by step through consistent practice, projects, and continued learning.",
  },
];

const categories = [
  "All Questions",
  "General",
  "Courses",
  "Admissions",
  "Fees",
  "Learning",
  "Career",
];

const FaqAccordion = () => {
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === "All Questions" ||
      faq.category === activeCategory;

    const matchesSearch =
      !normalizedSearch ||
      faq.question.toLowerCase().includes(normalizedSearch) ||
      faq.answer.toLowerCase().includes(normalizedSearch) ||
      faq.category.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setOpenQuestion(null);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setOpenQuestion(null);
  };

  return (
    <section
      id="faq-questions"
      className="relative overflow-hidden bg-white px-5 pb-7 pt-1 lg:pt-8 sm:px-8 lg:px-41 lg:pb-10"
    >
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 top-40 h-64 w-64 rounded-full bg-sky-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto ">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-6 "
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl lg:text-4xl">
            Frequently 
            <span className=" text-sky-500 ml-2">
              Asked Questions!
            </span>
          </h2>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-5 border rounded-2xl border-sky-100 "
        >
          <div className="group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-all duration-300 focus-within:border-sky-400 focus-within:shadow-[0_8px_30px_rgba(14,165,233,0.12)]">
            <Search
              size={21}
              className="shrink-0 text-gray-400 transition-colors group-focus-within:text-sky-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search your question..."
              aria-label="Search frequently asked questions"
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
            />

            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => handleSearchChange("")}
                  aria-label="Clear search"
                  className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-sky-50 hover:text-sky-600"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-9 flex flex-wrap gap-2"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-gray-950 bg-gray-950 text-white shadow-lg shadow-gray-950/15"
                    : "border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </motion.div>

        {/* Results Count */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-500">
            {filteredFaqs.length === 1
              ? "Showing 0 question"
              : `Showing ${filteredFaqs.length} questions`}
          </p>

          {(activeCategory !== "All Questions" || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("All Questions");
                setSearchTerm("");
                setOpenQuestion(null);
              }}
              className="text-sm font-semibold text-sky-600 transition-colors hover:text-sky-800"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openQuestion === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{
                      duration: 0.25,
                      delay: Math.min(index * 0.035, 0.2),
                    }}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-sky-200 bg-white shadow-[0_10px_35px_rgba(14,165,233,0.09)]"
                        : "border-gray-200 bg-white hover:border-sky-200 hover:shadow-[0_6px_24px_rgba(15,23,42,0.04)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : faq.id)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                    >
                      <span
                        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors duration-300 ${
                          isOpen
                            ? "bg-gray-950 text-sky-400"
                            : "bg-sky-50 text-sky-600"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                       

                        <span className="block text-sm font-semibold leading-6 text-gray-900 sm:text-base">
                          {faq.question}
                        </span>
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 bg-gray-950 text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: {
                              duration: 0.3,
                              ease: "easeInOut",
                            },
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-[4.5rem] mr-5 border-t border-gray-100 pb-5 pt-4 sm:ml-[5rem] sm:mr-6">
                            <p className="text-sm leading-7 text-gray-600 sm:text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 px-6 py-12 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                  <Search size={25} />
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  No questions found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  We couldn't find any questions matching your search.
                  Try another keyword or select a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory("All Questions");
                    setSearchTerm("");
                    setOpenQuestion(null);
                  }}
                  className="mt-5 rounded-xl bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                >
                  Show all questions
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        
      </div>
    </section>
  );
};

export default FaqAccordion;