"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import { changePassword } from "@/src/services/auth.service";



const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const passwordRules = [
    {
      label: "At least 8 characters",
      valid: newPassword.length >= 8,
    },
    {
      label: "Contains an uppercase letter",
      valid: /[A-Z]/.test(newPassword),
    },
    {
      label: "Contains a lowercase letter",
      valid: /[a-z]/.test(newPassword),
    },
    {
      label: "Contains a number",
      valid: /[0-9]/.test(newPassword),
    },
  ];

  const strength = passwordRules.filter((rule) => rule.valid).length;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("New password must contain at least 8 characters.");
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMessage(
        "Your new password must be different from your current password."
      );
      return;
    }

    if (strength !== 4) {
      setErrorMessage(
        "Please use uppercase, lowercase, and numeric characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirmation do not match.");
      return;
    }

    try {
      setLoading(true);

      
const result = await changePassword({
  currentPassword,
  newPassword,
});

if (!result.success) {
  throw new Error(
    result.message || "Unable to change your password."
  );
}

setSuccessMessage(
  result.message || "Your password has been changed successfully."
);

setCurrentPassword("");
setNewPassword("");
setConfirmPassword("");

    } catch (error: unknown) {
      const err = error as {
        message?: string;
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      setErrorMessage(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10";

  const renderPasswordInput = (
    label: string,
    value: string,
    setValue: (value: string) => void,
    visible: boolean,
    setVisible: (value: boolean) => void,
    placeholder: string,
    id: string
  ) => (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete={
            id === "current-password"
              ? "current-password"
              : "new-password"
          }
          disabled={loading}
          className={inputClass}
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-emerald-700"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-full bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Account Security
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Change Password
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Update your password to keep your EcoValuate administrator
            account safe and secure.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_300px]">
          {/* Password form */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <KeyRound className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900">
                  Update your credentials
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Verify your current password first.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-5 sm:p-7"
            >
              {successMessage && (
                <div
                  role="status"
                  className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{successMessage}</p>
                </div>
              )}

              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {renderPasswordInput(
                "Current Password",
                currentPassword,
                setCurrentPassword,
                showCurrent,
                setShowCurrent,
                "Enter your current password",
                "current-password"
              )}

              <div className="space-y-2">
                {renderPasswordInput(
                  "New Password",
                  newPassword,
                  setNewPassword,
                  showNew,
                  setShowNew,
                  "Enter your new password",
                  "new-password"
                )}

                {newPassword && (
                  <div className="space-y-2 pt-2">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full ${
                            strength >= level
                              ? strength === 4
                                ? "bg-emerald-500"
                                : strength >= 3
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              : "bg-slate-100"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {passwordRules.map((rule) => (
                        <p
                          key={rule.label}
                          className={`flex items-center gap-2 text-xs ${
                            rule.valid
                              ? "text-emerald-700"
                              : "text-slate-400"
                          }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                          {rule.label}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {renderPasswordInput(
                "Confirm New Password",
                confirmPassword,
                setConfirmPassword,
                showConfirm,
                setShowConfirm,
                "Re-enter your new password",
                "confirm-password"
              )}

              {confirmPassword && (
                <p
                  className={`text-xs ${
                    confirmPassword === newPassword
                      ? "text-emerald-700"
                      : "text-red-500"
                  }`}
                >
                  {confirmPassword === newPassword
                    ? "Passwords match."
                    : "Passwords do not match."}
                </p>
              )}

              <div className="border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Security information */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>

              <h3 className="font-semibold text-slate-900">
                Keep your account secure
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                A strong password helps protect your EcoValuate admin
                dashboard and sensitive management operations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Security checklist
              </h3>

              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Use a unique password.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Never share your credentials.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Avoid reusing old passwords.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Sign out on shared devices.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;