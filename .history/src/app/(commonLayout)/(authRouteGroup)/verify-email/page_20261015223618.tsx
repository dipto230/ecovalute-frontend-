
"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle2,
  Mail,
  ShieldCheck,
  LoaderCircle,
  Leaf,
  ArrowLeft,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!email.trim() || !/^\d{6}$/.test(otp)) {
      setMessage("Enter a valid email and 6-digit OTP.");
      return;
    }

    if (!API_BASE_URL) {
      setMessage("API configuration is missing. Please try again later.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/verify-email`,
          {
            email: email.trim(),
            otp,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 30000,
          },
        );

        setSuccess(true);
        setMessage(
          response.data?.message || "Email verified successfully.",
        );

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.data?.message ||
              error.message ||
              "Verification failed. Check your OTP and try again.",
          );
        } else {
          setMessage(
            error instanceof Error
              ? error.message
              : "Verification failed. Check your OTP and try again.",
          );
        }
      }
    });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f9f8] px-4 py-10 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-300/50 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[460px]">
        {/* Brand */}
        <div className="mb-7 flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="EcoValuate home"
            className="group mb-5 inline-flex items-center gap-3"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-[#063f42] text-white shadow-lg shadow-teal-900/20 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
              <Leaf size={25} strokeWidth={1.8} />
            </span>

            <span className="text-[25px] font-extrabold tracking-tight text-slate-900">
              Eco<span className="text-teal-700">Valuate</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3.5 py-1.5 shadow-sm shadow-teal-900/[0.03]">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-teal-700">
              <ShieldCheck size={12} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-teal-800">
              Secure account verification
            </span>
          </div>
        </div>

        {/* Main card */}
        <section className="overflow-hidden rounded-[30px] border border-white/90 bg-white/95 shadow-[0_24px_80px_-24px_rgba(6,63,66,0.18)] ring-1 ring-teal-900/[0.04] backdrop-blur-xl">
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-teal-800 via-teal-500 to-emerald-400" />

          <div className="p-6 sm:p-10">
            {/* Icon */}
            <div className="mb-7 flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-teal-100 bg-gradient-to-br from-teal-50 to-emerald-50 text-teal-700 shadow-sm shadow-teal-900/5">
              {success ? (
                <CheckCircle2 size={31} strokeWidth={1.8} />
              ) : (
                <Mail size={30} strokeWidth={1.8} />
              )}
            </div>

            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                {success ? "Verification complete" : "One last step"}
              </p>

              <h1 className="text-[30px] font-extrabold leading-tight tracking-[-0.04em] text-slate-900 sm:text-[34px]">
                {success ? (
                  <>
                    You&apos;re all{" "}
                    <span className="text-teal-700">verified.</span>
                  </>
                ) : (
                  <>
                    Verify your{" "}
                    <span className="text-teal-700">email.</span>
                  </>
                )}
              </h1>

              <p className="mt-3 max-w-sm text-sm leading-7 text-slate-500">
                {success
                  ? "Your email verification was successful. You can now continue to your account."
                  : "Enter the 6-digit verification code we sent to your email to activate your EcoValuate account."}
              </p>
            </div>

            {!success && (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-[13px] font-bold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="group relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-teal-700"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="h-[54px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition duration-200 placeholder:font-normal placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                    />
                  </div>
                </div>

                {/* OTP */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="otp"
                      className="text-[13px] font-bold text-slate-700"
                    >
                      Verification code
                    </label>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                      <LockKeyhole size={12} />
                      6-digit OTP
                    </span>
                  </div>

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(event) =>
                      setOtp(
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    placeholder="000000"
                    aria-label="6-digit verification code"
                    className="h-[68px] w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 text-center text-[27px] font-extrabold tracking-[0.48em] text-teal-900 outline-none transition duration-200 placeholder:font-semibold placeholder:text-slate-300 placeholder:tracking-[0.48em] hover:border-slate-300 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-600/10"
                  />

                  <p className="flex items-start gap-1.5 pt-1 text-xs leading-5 text-slate-400">
                    <ShieldCheck
                      size={14}
                      className="mt-0.5 shrink-0 text-teal-600"
                    />
                    Keep your verification code private. Never share it with
                    anyone.
                  </p>
                </div>

                {/* Feedback */}
                {message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`flex items-start gap-2.5 rounded-2xl border p-3.5 text-sm leading-6 ${
                      success
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    }`}
                  >
                    {success ? (
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0"
                      />
                    ) : (
                      <ShieldCheck
                        size={18}
                        className="mt-0.5 shrink-0"
                      />
                    )}
                    <span>{message}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending || success}
                  className="group relative flex h-[56px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-teal-800 to-[#075b55] px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition duration-300 hover:-translate-y-0.5 hover:from-teal-700 hover:to-teal-800 hover:shadow-xl hover:shadow-teal-900/20 focus:outline-none focus:ring-4 focus:ring-teal-600/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isPending ? (
                    <>
                      <LoaderCircle size={19} className="animate-spin" />
                      Verifying your email...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={19} strokeWidth={2} />
                      Verify email address
                      <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Success state */}
            {success && (
              <div className="space-y-4">
                {message && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm leading-6 text-emerald-800"
                  >
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-800 to-[#075b55] px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-600/20"
                >
                  Continue to sign in
                  <span>→</span>
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-100" />
              <Sparkles size={15} className="text-teal-400" />
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {/* Footer link */}
            <p className="text-center text-sm text-slate-500">
              Already verified?{" "}
              <Link
                href="/login"
                className="font-bold text-teal-700 underline decoration-teal-200 underline-offset-4 transition hover:text-teal-900 hover:decoration-teal-600"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Card footer */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-10">
            <div className="flex items-center justify-center gap-2 text-[11px] font-medium tracking-wide text-slate-400">
              <ShieldCheck size={14} className="text-teal-600" />
              <span>SECURE VERIFICATION</span>
              <span className="text-slate-300">•</span>
              <span>ECOVALUATE</span>
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="mt-6 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-slate-500 transition hover:bg-white/70 hover:text-teal-800"
          >
            <ArrowLeft size={14} />
            Back to homepage
          </Link>
        </div>

        <p className="mt-2 text-center text-[11px] tracking-wide text-slate-400">
          Give E-Waste a Second Life.
        </p>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f4f9f8]">
          <div className="flex items-center gap-3 rounded-2xl border border-teal-100 bg-white px-5 py-4 text-sm font-medium text-slate-500 shadow-lg shadow-teal-900/5">
            <LoaderCircle size={19} className="animate-spin text-teal-700" />
            Loading verification...
          </div>
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
