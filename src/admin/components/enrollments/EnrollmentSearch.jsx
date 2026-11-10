import { Search } from "lucide-react";

const EnrollmentSearch = ({ search, setSearch }) => {
  return (
    <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 md:max-w-xl">
      <Search size={20} className="text-slate-400" />

      <input
        type="text"
        placeholder="Search by name, email, phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
      />
    </div>
  );
};

export default EnrollmentSearch;