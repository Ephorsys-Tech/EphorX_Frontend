import { useState } from "react";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { inputClass, buttonClass, PasswordField } from "./AuthUI";

export default function LoginForm({
  email,
  setEmail,
  loading,
  onLogin,
  onForgotPassword,
}) {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email.trim(), password);
  };

  return (
    <>
     <form onSubmit={handleSubmit} className="space-y-5 ">
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="login-password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700"
            >
              Forgot password?
            </button>
          </div>
          <PasswordField
            id="login-password"
            label=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" disabled={loading} className={buttonClass}>
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Signing in...</>
          ) : (
            <>Sign in <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </>
  );
}