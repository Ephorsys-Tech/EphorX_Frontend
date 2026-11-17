import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage = 10,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(
        currentPage * itemsPerPage,
        totalItems
    );

    return (
        <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">

            <div className="flex items-center gap-2">

                <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronLeft size={18} />
                </button>


                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        type="button"
                        onClick={() => onPageChange(page)}
                        className={`h-9 min-w-9 rounded-lg px-3 text-sm ${currentPage === page
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                    >
                        {page}
                    </button>
                ))}


                <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <ChevronRight size={18} />
                </button>

            </div>
        </div>
    );
}
