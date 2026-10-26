import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Star,
  Users,
  Code2,
  Globe,
  Database,
  Smartphone,
  BrainCircuit,
  Palette,
} from "lucide-react";

const categories = [
  "All Courses",
  "Web Development",
  "Programming",
  "Data Science",
  "Design",
];

const courses = [
  {
    title: "Full Stack Web Development",
    category: "Web Development",
    description:
      "Build modern web applications using React, Node.js, Express, and MongoDB.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    icon: Code2,
    duration: "6 Months",
    students: "2.4k",
    rating: "4.9",
    price: "₹12,999",
    oldPrice: "₹19,999",
    level: "Beginner to Advanced",
    accent: "bg-blue-50 text-blue-600",
  },
  {
    title: "Python Programming",
    category: "Programming",
    description:
      "Master Python fundamentals, OOP, automation, and real-world projects.",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    icon: Database,
    duration: "3 Months",
    students: "1.8k",
    rating: "4.8",
    price: "₹7,999",
    oldPrice: "₹11,999",
    level: "Beginner Friendly",
    accent: "bg-amber-50 text-amber-600",
  },
  {
    title: "Data Science & AI",
    category: "Data Science",
    description:
      "Learn data analysis, machine learning, Python libraries, and AI concepts.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    icon: BrainCircuit,
    duration: "5 Months",
    students: "1.2k",
    rating: "4.9",
    price: "₹14,999",
    oldPrice: "₹22,999",
    level: "Intermediate",
    accent: "bg-purple-50 text-purple-600",
  },
  {
    title: "UI/UX Design Masterclass",
    category: "Design",
    description:
      "Create user-friendly digital experiences using Figma and design systems.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
    icon: Palette,
    duration: "3 Months",
    students: "950+",
    rating: "4.8",
    price: "₹6,999",
    oldPrice: "₹9,999",
    level: "Beginner Friendly",
    accent: "bg-pink-50 text-pink-600",
  },
  {
    title: "Mobile App Development",
    category: "Programming",
    description:
      "Develop cross-platform mobile applications with React Native.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    icon: Smartphone,
    duration: "4 Months",
    students: "800+",
    rating: "4.8",
    price: "₹9,999",
    oldPrice: "₹14,999",
    level: "Intermediate",
    accent: "bg-green-50 text-green-600",
  },
  {
    title: "Digital & Web Technologies",
    category: "Web Development",
    description:
      "Understand modern web technologies, responsive design, and deployment.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    icon: Globe,
    duration: "4 Months",
    students: "1.1k",
    rating: "4.7",
    price: "₹8,999",
    oldPrice: "₹13,999",
    level: "Beginner Friendly",
    accent: "bg-cyan-50 text-cyan-600",
  },
];

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("All Courses");

  const filteredCourses =
    activeCategory === "All Courses"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <section
      id="courses"
      className="overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Explore Our{" "}
            <span className="text-blue-600">Top Courses</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Upgrade your skills with industry-focused IT training, hands-on
            projects, and practical learning designed for your career.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCourses.map((course, index) => {
            const CourseIcon = course.icon;

            return (
              <motion.article
                layout
                key={course.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -7 }}
                className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
              >
                {/* Course Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800 shadow-sm">
                    {course.level}
                  </span>

                  <span className="absolute bottom-4 left-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Star
                      size={16}
                      fill="currentColor"
                      className="text-amber-400"
                    />
                    {course.rating}
                    <span className="font-normal text-white/80">
                      ({course.students} students)
                    </span>
                  </span>
                </div>

                {/* Course Content */}
                <div className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold ${course.accent}`}
                    >
                      <CourseIcon size={15} />
                      {course.category}
                    </span>

                    <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-500">
                      <Clock3 size={14} />
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    {course.title}
                  </h3>

                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>

                  <div className="my-5 border-t border-slate-100" />

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs text-slate-500">Course Fee</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-xl font-extrabold text-slate-900">
                          {course.price}
                        </span>
                        <span className="text-sm text-slate-400 line-through">
                          {course.oldPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        console.log(`Explore course: ${course.title}`)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 transition-all hover:bg-blue-600 hover:text-white"
                    >
                      Explore
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-slate-900 p-7 sm:flex-row sm:p-10"
        >
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Not sure which course is right for you?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Find the right learning path for your career goals.
            </p>
          </div>

          <button
            onClick={() => console.log("Explore all courses")}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white transition-all hover:bg-blue-500"
          >
            View All Courses
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Courses;