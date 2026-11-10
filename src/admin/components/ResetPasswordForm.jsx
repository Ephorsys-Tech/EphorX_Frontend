import { useState } from "react";
import { Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { buttonClass, Heading, PasswordField } from "./AuthUI";

export default function ResetPasswordForm({
  loading,
  onSubmit,
  onBack,
}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8 || newPassword !== confirmPassword) {
      return;
    }

    onSubmit(newPassword, confirmPassword, () => {
      setNewPassword("");
      setConfirmPassword("");
    });
  };

  return (
    <>
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-sky-600">
        <ArrowLeft size={16} /> Back to sign in
      </button>

      <Heading
        icon={Lock}
        title="Create new password"
        description="Choose a strong password with at least 8 characters."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <PasswordField
          id="new-password"
          label="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />

        {newPassword.length > 0 && newPassword.length < 8 && (
          <p className="text-xs text-red-600">
            Password must contain at least 8 characters.
          </p>
        )}

        <PasswordField
          id="confirm-password"
          label="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter new password"
          autoComplete="new-password"
        />

        {confirmPassword.length > 0 && newPassword !== confirmPassword && (
          <p className="text-xs text-red-600">Passwords do not match.</p>
        )}

        <button
          type="submit"
          disabled={loading || newPassword.length < 8 || newPassword !== confirmPassword}
          className={buttonClass}
        >
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /> Resetting password...</>
          ) : (
            <>Reset password <ArrowRight size={18} /></>
          )}
        </button>
      </form>
    </>
  );
}