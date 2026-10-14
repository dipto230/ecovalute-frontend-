
"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, Mail, ShieldCheck, LoaderCircle, Leaf } from "lucide-react";
import { httpClient } from "@/lib/axios/httpClient";

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

    startTransition(async () => {
      try {
        const response = await httpClient.post<unknown>("/auth/verify-email", {
          email: email.trim(),
          otp,
        });

        setSuccess(true);
        setMessage(response.message || "Email verified successfully.");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } catch (error: unknown) {
        const err = error as {
          response?: { data?: { message?: string } };
          message?: string;
        };

        setMessage(
          err.response?.data?.message ||
            err.message ||
            "Verification failed. Check your OTP and try again.",
        );
      }
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f9f8] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-7 shadow-xl shadow-teal-900/5 sm:p-10">
        <Link href="/" className="mb-9 inline-flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
            <Leaf size={22} />
          </span>
          <span className="text-xl font-extrabold text-slate-900">
            Eco<span className="text-teal-700">Valuate</span>
          </span>
        </Link>

        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          {success ? <CheckCircle2 size={28} /> : <Mail size={28} />}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Verify your email
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Enter the verification code sent to your email address to activate
          your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            />
          </div>

          <div>
            <label htmlFor="otp" className="text-sm font-semibold text-slate-700">
              6-digit OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter your OTP"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            />
          </div>

          {message && (
            <div
              role="status"
              className={`rounded-xl p-3 text-sm ${
                success
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending || success}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-4 text-sm font-bold text-white transition hover:bg-teal-800 disabled:opacity-60"
          >
            {isPending ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                Verify email
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="font-bold text-teal-700 hover:text-teal-900">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f4f9f8] text-sm text-slate-500">
          Loading verification...
        </div>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
