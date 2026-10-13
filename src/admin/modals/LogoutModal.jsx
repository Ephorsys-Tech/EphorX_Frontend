import { LogOut, X } from "lucide-react";

const LogoutModal = ({ onClose }) => {
  const handleLogout = () => {
    // Logout integration removed.
    onClose?.();
  };

  return (
    <div className="w-full">
      {/* Content */}
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Logout Account
        </h2>

        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Are you sure you want to logout
          from your account?
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <X size={16} />
          Cancel
        </button>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;