const colorStyles = {
  blue: {
    card: "from-blue-50 to-white",
    icon: "bg-blue-100 text-blue-600",
    accent: "bg-blue-500",
  },
  purple: {
    card: "from-purple-50 to-white",
    icon: "bg-purple-100 text-purple-600",
    accent: "bg-purple-500",
  },
  green: {
    card: "from-emerald-50 to-white",
    icon: "bg-emerald-100 text-emerald-600",
    accent: "bg-emerald-500",
  },
  orange: {
    card: "from-orange-50 to-white",
    icon: "bg-orange-100 text-orange-600",
    accent: "bg-orange-500",
  },
  cyan: {
    card: "from-cyan-50 to-white",
    icon: "bg-cyan-100 text-cyan-600",
    accent: "bg-cyan-500",
  },
};

export default function DashboardStats({ stats }) {
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((item) => {
        const Icon = item.icon;
        const tone = colorStyles[item.color];

        return (
          <div
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-linear-to-br ${tone.card} px-5 py-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className={`absolute left-0 top-0 h-1 w-full ${tone.accent}`} />

            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {item.title}
              </p>

              <div
                className={`grid h-12 w-12 place-items-center rounded-xl ${tone.icon} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={24} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-5">
              <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {item.value.toLocaleString()}
              </h3>
              <p className="mt-2 text-xs font-medium text-slate-400">
                Total {item.title.toLowerCase()}
              </p>
            </div>

            <div
              className={`pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-10 ${tone.accent} transition-transform duration-500 group-hover:scale-150`}
            />
          </div>
        );
      })}
    </section>
  );
}
