"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
  RefreshCw,
  Leaf,
  BadgeCheck,
  CircleUserRound,
} from "lucide-react";
import { getUserInfo } from "@/src/services/auth.service";


type ProfileUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  profilePhoto?: string | null;
  role?: string | null;
  status?: string | null;
  emailVerified?: boolean;
  createdAt?: string;
  contactNumber?: string | null;
  admin?: {
    name?: string | null;
    email?: string | null;
    profilePhoto?: string | null;
    contactNumber?: string | null;
  } | null;
  customer?: {
    name?: string | null;
    email?: string | null;
    profilePhoto?: string | null;
    contactNumber?: string | null;
  } | null;
  vendor?: {
    name?: string | null;
    email?: string | null;
    profilePhoto?: string | null;
    contactNumber?: string | null;
    companyName?: string | null;
  } | null;
};

export default function MyProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUserInfo();

        if (!active) return;

        if (!data) {
          setError("Unable to load your profile. Please sign in again.");
          return;
        }

        // Supports both a direct user object and { user: ... } responses.
        const profile = (data.user ?? data) as ProfileUser;
        setUser(profile);
      } catch {
        if (active) {
          setError("Something went wrong while loading your profile.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const role = user?.role ?? "USER";

  const roleProfile =
    role === "SUPER_ADMIN" || role === "ADMIN"
      ? user?.admin
      : role === "VENDOR"
        ? user?.vendor
        : user?.customer;

  const name =
    roleProfile?.name ||
    user?.name ||
    "User";

  const email =
    roleProfile?.email ||
    user?.email ||
    "Not provided";

  const phone =
    roleProfile?.contactNumber ||
    user?.contactNumber ||
    "Not provided";

  const photo =
    roleProfile?.profilePhoto ||
    user?.profilePhoto ||
    user?.image;

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const status = user?.status ?? "UNKNOWN";

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-sm text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <CircleUserRound className="mx-auto mb-3 h-10 w-10 text-red-500" />
        <h2 className="text-lg font-semibold text-slate-900">
          Profile unavailable
        </h2>
        <p className="mt-2 text-sm text-red-600">
          {error || "Your profile information could not be loaded."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Page heading */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Leaf className="h-4 w-4" />
            EcoValuate / Account
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View your personal information and account details.
          </p>
        </div>

        {/* Profile banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#063f42] via-[#075b50] to-emerald-700 p-6 text-white shadow-lg sm:p-9">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-36 h-52 w-52 rounded-full bg-lime-300/10 blur-2xl" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/25 bg-white/10 text-3xl font-bold shadow-xl">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || <UserRound className="h-12 w-12" />
              )}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
                  {role.replaceAll("_", " ")}
                </span>

                {user.emailVerified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/15 px-3 py-1 text-xs font-semibold text-emerald-100">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Verified email
                  </span>
                )}
              </div>

              <h2 className="break-words text-2xl font-bold sm:text-3xl">
                {name}
              </h2>

              <p className="mt-2 break-all text-sm text-emerald-50/80">
                {email}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  Account: {status.replaceAll("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
              <Leaf className="h-7 w-7 text-lime-300" />
            </div>
          </div>
        </section>

        {/* Information cards */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <UserRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Your registered contact details
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoRow
                icon={<UserRound className="h-5 w-5" />}
                label="Full Name"
                value={name}
              />

              <InfoRow
                icon={<Mail className="h-5 w-5" />}
                label="Email Address"
                value={email}
              />

              <InfoRow
                icon={<Phone className="h-5 w-5" />}
                label="Contact Number"
                value={phone}
              />

              {user.vendor?.companyName && (
                <InfoRow
                  icon={<ShieldCheck className="h-5 w-5" />}
                  label="Company"
                  value={user.vendor.companyName}
                />
              )}
            </div>

            <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
              Profile details are currently displayed in read-only mode.
              Editing requires a profile update API.
            </p>
          </section>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Account Details
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Your account status
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Role</span>
                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800">
                    {role.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {status.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Email verified</span>
                  <span className={`text-sm font-semibold ${user.emailVerified ? "text-emerald-700" : "text-amber-600"}`}>
                    {user.emailVerified ? "Yes" : "No"}
                  </span>
                </div>

                {user.createdAt && (
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4" />
                      Joined
                    </span>
                    <span className="text-right text-sm font-medium text-slate-800">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <LockKeyhole className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">
                    Security
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Keep your account secure
                  </p>
                </div>
              </div>

              <p className="mb-5 text-sm leading-6 text-slate-500">
                Update your password regularly to help protect your account.
              </p>

              <Link
                href="/change-password"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#063f42] px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                <LockKeyhole className="h-4 w-4" />
                Change Password
              </Link>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-4 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}