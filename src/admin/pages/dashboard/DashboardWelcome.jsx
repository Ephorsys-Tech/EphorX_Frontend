import {
  Calendar,
  Megaphone,
  Plus,
  Users,
  Zap,
} from "lucide-react";

const quickActions = [
  {
    key: "add-course",
    label: "Add Course",
    icon: Plus,
    path: "/admin/add-course",
  },
  {
    key: "students",
    label: "View Enrollments",
    icon: Users,
    path: "/admin/enrollments",
  },
  {
    key: "demo",
    label: "Manage Demo Sessions",
    icon: Calendar,
    path: "/admin/book-demo",
  },
  {
    key: "campaign",
    label: "Create Campaign",
    icon: Megaphone,
    path: "/admin/campaigns",
  },
];

const iconColors = [
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-teal-100 text-teal-600",
  "bg-orange-100 text-orange-600",
];

export default function DashboardWelcome({ adminImage, onNavigate }) {
  return (
    <section className="relative grid overflow-hidden rounded-2xl bg-linear-to-r from-[#172477] via-blue-700 to-purple-600 text-white shadow-sm lg:grid-cols-[1fr_0.95fr]">
      <div className="grid grid-cols-1 items-center gap-4 px-5 py-7 sm:px-5 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
            Education Management
          </p>

          <h1 className="text-xl font-extrabold tracking-tight sm:text-3xl md:whitespace-nowrap">
            Welcome back, Admin!
          </h1>

          <p className="mt-2 max-w-md text-sm leading-relaxed text-blue-100">
            Manage your platform and track your performance from one place.
          </p>
        </div>

        <div className="flex w-full items-center justify-center md:justify-end">
          <img
            src={adminImage}
            alt="Education management mascot"
            className="mx-auto mr-15 h-36 w-full max-w-64 object-contain drop-shadow-xl sm:h-40 md:mx-0 md:h-44 lg:h-52"
          />
        </div>
      </div>

      <div className="border-t border-white/20 bg-white/10 px-5 py-6 backdrop-blur-sm lg:border-l lg:border-t-0 lg:px-7">
        <div className="mb-4 flex items-center gap-2">
          <Zap size={19} className="text-yellow-300" />
          <h2 className="text-lg font-bold">Quick Actions</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                type="button"
                key={item.key}
                onClick={() => onNavigate(item.path)}
                className="flex min-h-22.5 flex-col items-center justify-center gap-2 rounded-xl border border-white/70 bg-white px-2 py-3 text-center text-xs font-bold text-slate-800 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full ${iconColors[index % iconColors.length]}`}
                >
                  <Icon size={21} />
                </span>
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
