
import { Link } from "react-router-dom";

export default function Button({
  text = "Button",
  icon: Icon,
  path,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
}) {
  const variants = {
    primary:
      "bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:ring-blue-200",

    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-200",

    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",

    outline:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
  };

  const sizes = {
    sm: "px-2 py-2",
    md: "px-3 py-2",
    lg: "px-4 py-2",
  };

  const buttonClasses = `
    inline-flex items-center justify-center gap-3
    rounded-xl font-semibold
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.md}
    ${className}
  `;

  const content = (
    <>
      {Icon && !loading && <Icon size={20} strokeWidth={2} />}

      {loading && (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}

      <span>{loading ? "Loading..." : text}</span>
    </>
  );

  if (path) {
    return (
      <Link
        to={path}
        className={buttonClasses}
        aria-disabled={disabled || loading}
        onClick={(event) => {
          if (disabled || loading) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={buttonClasses}
    >
      {content}
    </button>
  );
}
