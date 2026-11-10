
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Active Members" },
  { value: 20, suffix: "+", label: "Courses Available" },
  { value: 4.9, suffix: "/5", label: "Student Rating", decimal: true },
  { value: 25, suffix: "+", label: "Expert Mentors" },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;

    const animations = stats.map((stat, index) =>
      animate(0, stat.value, {
        duration: 1.8,
        ease: "easeOut",
        delay: index * 0.12,
        onUpdate: (value) => {
          setCounts((prev) =>
            prev.map((count, i) => (i === index ? value : count))
          );
        },
      })
    );

    return () => animations.forEach((animation) => animation.stop());
  }, [isInView]);

  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-0 lg:py-0">

      {/* BLUE BACKGROUND */}
      <div ref={ref} className="bg-blue-700 px-10">

        {/* GRID ALIGNMENT */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/20 md:divide-y-0">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}

              // CHANGE ALIGNMENT AND SPACING HERE
              className="flex items-center justify-center px-2 py-3 sm:px-3 sm:py-4"
            >
              <div className="text-center">

                {/* NUMBER */}
                <div className="flex items-baseline justify-center gap-0.5">
                  <span className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
                    {stat.decimal
                      ? counts[index].toFixed(1)
                      : Math.round(counts[index]).toLocaleString("en-IN")}
                  </span>

                  <span className="text-lg font-bold text-blue-200 sm:text-xl">
                    {stat.suffix}
                  </span>
                </div>

                {/* LABEL */}
                <p className="mt-1 text-xs font-medium text-blue-100 sm:text-sm">
                  {stat.label}
                </p>

              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
