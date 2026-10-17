import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { UsersRound, BookOpen, Star, Download } from "lucide-react";

const stats = [
  {
    value: 10000,
    suffix: "+",
    label: "Active Members",
    icon: UsersRound,
  },
  {
    value: 120,
    suffix: "+",
    label: "Courses Available",
    icon: BookOpen,
  },
  {
    value: 4.9,
    suffix: "/5",
    label: "Student Rating",
    icon: Star,
    decimal: true,
  },
  {
    value: 50000,
    suffix: "+",
    label: "App Downloads",
    icon: Download,
  },
];

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) =>
    stat.decimal ? value.toFixed(1) : Math.round(value).toLocaleString("en-IN")
  );
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplayValue);
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, {
        duration: 1.8,
        ease: "easeOut",
      });

      return () => controls.stop();
    }
  }, [isInView, count, stat.value]);

  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group flex min-w-0 flex-1 items-center justify-center gap-3 px-3 py-5 sm:gap-4 sm:px-5"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-sky-50 text-sky-600 transition-all duration-300 group-hover:border-sky-200 group-hover:bg-sky-500 group-hover:text-white sm:h-12 sm:w-12">
        <Icon size={21} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <div className="flex items-baseline gap-0.5 whitespace-nowrap">
          <span className="text-xl font-extrabold tracking-tight text-black sm:text-2xl lg:text-3xl">
            {displayValue}
          </span>
          <span className="text-lg font-bold text-sky-500 sm:text-xl">
            {stat.suffix}
          </span>
        </div>

        <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-6 sm:px-6 lg:px-0 lg:py-8">
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-3/4 -translate-x-1/2 rounded-full bg-sky-100/60 blur-3xl" />

      <div className="relative  mx-auto w-full max-w-none">
        <div className="overflow-hidden  border border-gray-200/80 bg-white/90 shadow-[0_12px_40px_-24px_rgba(14,165,233,0.35)] backdrop-blur-sm">
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-200/80 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
