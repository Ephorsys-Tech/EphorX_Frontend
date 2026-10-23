import { Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { inputClass, buttonClass, Heading } from "./AuthUI";

export default function ForgotPasswordForm({
  email,
  setEmail,
  loading,
  onSubmit,
  onBack,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email.trim());
  };

  return (
    <>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600">
        <ArrowLeft size={16} /> Back to sign in
      </button>

      <Heading
        title="Forgot password?"
        description="Enter your registered email address and we'll send you an OTP."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="reset-email" className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Sending OTP...</>
          ) : (
            <>Send OTP <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </>
  );
}