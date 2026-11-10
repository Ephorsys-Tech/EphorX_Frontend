
import { FileText, ExternalLink } from "lucide-react";

const SyllabusModal = ({ course }) => {
  if (!course) return null;

  const hasSyllabus =
    course.syllabus && course.syllabus !== "#";

  return (
    <div className="space-y-4">
      {/* Course information */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
          <FileText size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900">
            {course.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {course.category || "Course"} · PDF Syllabus
          </p>
        </div>
      </div>

      {/* PDF viewer */}
      {hasSyllabus ? (
        <>
          <iframe
            src={course.syllabus}
            title={`${course.title} syllabus`}
            className="h-[55vh] min-h-[350px] w-full rounded-xl border border-slate-200 bg-white"
          />

          <div className="flex justify-end">
            <a
              href={course.syllabus}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
            >
              Open PDF in new tab
              <ExternalLink size={16} />
            </a>
          </div>
        </>
      ) : (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <FileText size={27} />
          </div>

          <h3 className="font-semibold text-slate-900">
            Syllabus not available yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            The syllabus PDF for this course has not been
            uploaded yet. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default SyllabusModal;
