import { useState } from "react";
import {
    KeyRound,
    ArrowRight,
    ArrowLeft,
    Loader2,
    RefreshCw,
} from "lucide-react";
import { buttonClass, Heading } from "./AuthUI.jsx";

export default function OtpVerificationForm({
    email,
    loading,
    onVerify,
    onResend,
    onBack,
}) {
    const [otp, setOtp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onVerify(otp);
    };

    return (
        <>
            <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600">
                <ArrowLeft size={16} /> Back to sign in
            </button>

            <Heading
                icon={KeyRound}
                title="Verify your email"
                description={`Enter the 6-digit OTP sent to ${email}.`}
            />

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="otp" className="mb-2 block text-sm font-medium text-slate-700">
                        Verification code
                    </label>
                    <input
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        maxLength={6}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-xl font-semibold tracking-[0.45em] outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                        required
                    />
                </div>

                <button type="submit" disabled={loading || otp.length !== 6} className={buttonClass}>
                    {loading ? (
                        <><Loader2 size={18} className="animate-spin" /> Verifying...</>
                    ) : (
                        <>Verify OTP <ArrowRight size={18} /></>
                    )}
                </button>
            </form>

            <button
                type="button"
                onClick={onResend}
                disabled={loading}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 disabled:opacity-50"
            >
                <RefreshCw size={15} /> Resend OTP
            </button>
        </>
    );
}