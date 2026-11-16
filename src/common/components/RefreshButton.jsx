import { RefreshCw } from "lucide-react";

const RefreshButton = ({
  onClick,
  loading = false,
  label = "Refresh",
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <RefreshCw
        size={16}
        className={loading ? "animate-spin" : ""}
      />
      {label}
    </button>
  );
};

export default RefreshButton;
