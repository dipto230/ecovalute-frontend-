
"use client";

import { useState, useTransition, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Store,
  UserRound,
  UsersRound,
  Truck,
  ShoppingBag,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import { registerAction } from "./_action";
import { useRouter } from "next/navigation";

type UserRole = "CUSTOMER" | "VENDOR";

export default function RegisterPage() {
  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    tradeLicenseNumber: "",
    nidNumber: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);

    const payload =
      role === "CUSTOMER"
        ? {
            role: "CUSTOMER" as const,
            name: form.name,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
          }
        : {
            role: "VENDOR" as const,
            name: form.name,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            companyName: form.companyName,
            tradeLicenseNumber: form.tradeLicenseNumber,
            nidNumber: form.nidNumber,
          };

    startTransition(async () => {
      try {
        const result = await registerAction(payload);

        setMessage(result.message);
        setIsSuccess(result.success);

        if (result.success) {
          setForm((previous) => ({
            ...previous,
            password: "",
            confirmPassword: "",
          }));
           router.push(
    `/verify-email?email=${encodeURIComponent(form.email.trim())}`,
  );
        }
      } catch {
        setIsSuccess(false);
        setMessage("Something went wrong. Please try again.");
      }
    });
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10";

  const labelClass =
    "block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-[#f4f9f8] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto grid min-h-[700px] max-w-6xl overflow-hidden rounded-3xl border border-white bg-white shadow-[0_24px_80px_-30px_rgba(15,118,110,0.22)] lg:grid-cols-[0.88fr_1.12fr]">

        {/* Left branding panel */}
        <aside className="relative overflow-hidden bg-gradient-to-br from-[#e7f8f5] via-[#f0fbf9] to-[#d7f4ee] px-7 py-9 sm:px-10 lg:px-12 lg:py-12">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-white/50 blur-2xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-teal-200/40 blur-2xl" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-lg shadow-teal-700/20">
                <Leaf size={26} />
              </span>
              <span>
                <span className="block text-2xl font-extrabold tracking-tight text-slate-900">
                  Eco<span className="text-teal-700">Valuate</span>
                </span>
                <span className="text-xs font-medium tracking-wide text-slate-500">
                  Give E-Waste a Second Life
                </span>
              </span>
            </Link>

            <div className="mt-12">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                Connect · Trade · Recycle
              </p>

              <h1 className="max-w-md text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Join a more
                <span className="block text-teal-700">
                  sustainable future.
                </span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
                Buy, sell and give old electronics a new purpose.
                Join a community making electronic waste more valuable.
              </p>
            </div>

            {/* Marketplace illustration */}
            <div className="relative my-9 flex min-h-44 items-center justify-center sm:min-h-52">
              <div className="absolute h-48 w-48 rounded-full bg-white/70 sm:h-56 sm:w-56" />
              <div className="absolute h-36 w-36 rounded-full border border-dashed border-teal-300 sm:h-44 sm:w-44" />

              <div className="relative flex items-end gap-4 sm:gap-6">
                <div className="flex h-28 w-24 flex-col items-center justify-center rounded-2xl border border-white bg-white/90 shadow-xl shadow-teal-900/5 sm:h-32 sm:w-28">
                  <ShoppingBag size={38} className="text-teal-700" />
                  <span className="mt-3 text-xs font-bold text-slate-600">
                    Reuse
                  </span>
                </div>

                <div className="mb-5 flex h-36 w-28 flex-col items-center justify-center rounded-2xl bg-teal-700 text-white shadow-xl shadow-teal-900/20 sm:h-40 sm:w-32">
                  <Leaf size={46} />
                  <span className="mt-3 text-sm font-bold">
                    Renew
                  </span>
                </div>

                <div className="flex h-28 w-24 flex-col items-center justify-center rounded-2xl border border-white bg-white/90 shadow-xl shadow-teal-900/5 sm:h-32 sm:w-28">
                  <Store size={38} className="text-teal-700" />
                  <span className="mt-3 text-xs font-bold text-slate-600">
                    Resell
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: ShieldCheck,
                  title: "Secure & Trusted",
                  description: "Your account and data matter.",
                },
                {
                  icon: Truck,
                  title: "A Circular Marketplace",
                  description: "Give electronics another life.",
                },
                {
                  icon: UsersRound,
                  title: "Grow Together",
                  description: "Connect with a greener community.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/60 p-4 backdrop-blur-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <Icon size={21} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Registration form */}
        <section className="px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-lg">
            <div className="mb-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-700">
                Create your account
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Get started today.
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Choose your account type and enter your details below.
              </p>
            </div>

            {/* Role selection */}
            <div className="mb-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setRole("CUSTOMER");
                  setMessage("");
                  setIsSuccess(false);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  role === "CUSTOMER"
                    ? "border-teal-700 bg-teal-700 text-white shadow-lg shadow-teal-700/15"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                }`}
              >
                <UserRound
                  size={23}
                  className={
                    role === "CUSTOMER"
                      ? "text-white"
                      : "text-teal-700"
                  }
                />
                <span className="mt-3 block text-sm font-bold">
                  Customer
                </span>
                <span
                  className={`mt-1 block text-xs leading-5 ${
                    role === "CUSTOMER"
                      ? "text-teal-50"
                      : "text-slate-500"
                  }`}
                >
                  Buy and explore
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole("VENDOR");
                  setMessage("");
                  setIsSuccess(false);
                }}
                className={`rounded-2xl border p-4 text-left transition ${
                  role === "VENDOR"
                    ? "border-teal-700 bg-teal-700 text-white shadow-lg shadow-teal-700/15"
                    : "border-slate-200 bg-white text-slate-700 hover:border-teal-300"
                }`}
              >
                <Store
                  size={23}
                  className={
                    role === "VENDOR"
                      ? "text-white"
                      : "text-teal-700"
                  }
                />
                <span className="mt-3 block text-sm font-bold">
                  Vendor
                </span>
                <span
                  className={`mt-1 block text-xs leading-5 ${
                    role === "VENDOR"
                      ? "text-teal-50"
                      : "text-slate-500"
                  }`}
                >
                  Sell your products
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-[26px] -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-[26px] -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@example.com"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              {/* Vendor-specific fields */}
              {role === "VENDOR" && (
                <div className="space-y-5 rounded-2xl border border-teal-100 bg-teal-50/60 p-4 sm:p-5">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      Business information
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Provide your business details to register as a vendor.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="companyName" className={labelClass}>
                      Company name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      required
                      minLength={2}
                      value={form.companyName}
                      onChange={(e) =>
                        updateField("companyName", e.target.value)
                      }
                      placeholder="Your registered business name"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tradeLicenseNumber"
                      className={labelClass}
                    >
                      Trade license number{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="tradeLicenseNumber"
                      name="tradeLicenseNumber"
                      required
                      value={form.tradeLicenseNumber}
                      onChange={(e) =>
                        updateField("tradeLicenseNumber", e.target.value)
                      }
                      placeholder="Enter trade license number"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="nidNumber" className={labelClass}>
                      NID number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="nidNumber"
                      name="nidNumber"
                      required
                      value={form.nidNumber}
                      onChange={(e) =>
                        updateField("nidNumber", e.target.value)
                      }
                      placeholder="Enter national ID number"
                      className={inputClass}
                    />
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Your information should be accurate and valid.
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-[26px] -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) =>
                      updateField("password", e.target.value)
                    }
                    placeholder="At least 8 characters"
                    className={`${inputClass} pl-11 pr-12`}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-[26px] -translate-y-1/2 text-slate-400 hover:text-teal-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-[26px] -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField("confirmPassword", e.target.value)
                    }
                    placeholder="Enter your password again"
                    className={`${inputClass} pl-11 pr-12`}
                  />
                  <button
                    type="button"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    onClick={() =>
                      setShowConfirmPassword((value) => !value)
                    }
                    className="absolute right-4 top-[26px] -translate-y-1/2 text-slate-400 hover:text-teal-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
                    isSuccess
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-rose-200 bg-rose-50 text-rose-700"
                  }`}
                >
                  {isSuccess ? (
                    <CheckCircle2 className="mt-0.5 shrink-0" size={19} />
                  ) : (
                    <AlertCircle className="mt-0.5 shrink-0" size={19} />
                  )}
                  <p>{message}</p>
                </div>
              )}

              {isSuccess && (
                <div className="rounded-xl bg-teal-50 p-4 text-sm leading-6 text-teal-900">
                  Check your inbox and spam folder for the verification email.
                  Please verify your email before logging in.
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || isSuccess}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-800 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Creating account...
                  </>
                ) : isSuccess ? (
                  <>
                    Registration submitted
                    <CheckCircle2 size={19} />
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-medium text-slate-400">
                SECURE REGISTRATION
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="flex items-center justify-center gap-2 text-center text-sm text-slate-500">
              <ShieldCheck size={18} className="shrink-0 text-teal-700" />
              Your account details are sent securely.
            </div>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-teal-700 transition hover:text-teal-900"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to our applicable terms and
              privacy policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
