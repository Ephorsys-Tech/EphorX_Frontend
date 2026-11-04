
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ShieldCheck } from "lucide-react";

const LegalPageLayout = ({ title, subtitle, updated, sections, type }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc] text-slate-800">

      {/* Decorative Background Shapes */}
      <div className="pointer-events-none absolute left-30 top-55 h-22 w-22 rotate-20 rounded-xl bg-blue-200/50" />

      <div className="pointer-events-none absolute right-90 top-290 h-22 w-22 rotate-75 rounded-xl bg-blue-200/40" />

      <div className="pointer-events-none absolute left-99 bottom-4 h-9 w-9 rounded-full bg-blue-500" />

      <div className="pointer-events-none absolute left-320 top-133 h-9 w-9 rounded-full bg-blue-300" />
      <div className="pointer-events-none absolute left-100 top-453 h-9 w-9 rounded-full bg-blue-300" />

      <div className="pointer-events-none absolute right-10 top-[45%] h-14 w-14 rotate-12 rounded-xl bg-sky-200/40" />
      <div className="pointer-events-none absolute left-110 bottom-185 h-22 w-22 rotate-20 rounded-xl bg-blue-200/50" />

      {/* Main Content */}
      <section className="relative z-10 px-5 pb-8 pt-25 sm:px-8 md:px-10 lg:px-41">

        {/* Page Heading */}
        <div className="mb-7">
        
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-600">
            EphorX / {type}
          </p>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
            {subtitle}
          </p>

          <p className="mt-4 text-xs font-medium text-slate-400">
            Last updated: {updated}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm lg:sticky lg:top-28">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              On this page
            </p>

            <nav className="space-y-3">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block text-sm text-slate-600 transition hover:translate-x-1 hover:text-sky-600"
                >
                  {String(index + 1).padStart(2, "0")}. {section.heading}
                </a>
              ))}
            </nav>
          </aside>

          {/* Legal Information */}
          <div className="min-w-0">

            <div className="mb-4 rounded-2xl border border-sky-100 bg-sky-50/80 p-3 sm:p-3">
              <p className="text-sm leading-7 text-slate-600">
                Please read this page carefully. It explains important
                information about using the EphorX website and services.
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <article
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-28 border-b border-slate-200 pb-9 last:border-0"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sm font-bold text-sky-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="pt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                      {section.heading}
                    </h2>
                  </div>

                  <div className="space-y-3 pl-0 text-sm leading-8 text-slate-600 sm:pl-[52px]">
                    {section.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

           
          </div>
        </div>
         {/* Contact Section */}
            <div className="mt-2 rounded-2xl bg-sky-400 p-7 sm:p-9">
              <p className="text-sm font-semibold text-slate-900">
                Need assistance?
              </p>

              <h3 className="mt-2 text-2xl font-bold text-white">
                We're here to help.
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-200">
                If you have questions about this page or our services,
                contact the EphorX team.
              </p>

              <a
                href="mailto:hello@ephorx.com"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-700 transition hover:text-white"
              >
                hello@ephorx.com
                <ArrowUpRight size={16} />
              </a>
            </div>

      </section>
    </div>
  );
};

export default LegalPageLayout;
