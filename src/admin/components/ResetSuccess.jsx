import { CheckCircle2, ArrowRight } from "lucide-react";
import { buttonClass } from "./AuthUI.jsx";

export default function ResetSuccess({ onBackToLogin }) {
    return (
        <div className="py-5 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                <CheckCircle2 size={36} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
                Password reset!
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
                Your password has been changed successfully. You can now sign in with your new password.
            </p>

            <button
                type="button"
                onClick={onBackToLogin}
                className={`${buttonClass} mt-7`}
            >
                Back to sign in <ArrowRight size={18} />
            </button>
        </div>
    );
}