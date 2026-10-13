```tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Fingerprint,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  UserRoundPen,
} from "lucide-react";

import { getUserInfo } from "@/src/services/auth.service";

type ProfileUser = {
  id?: string;
  name?: string | null;
  fullName?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
  profilePhoto?: string | null;
  image?: string | null;
  contactNumber?: string | null;
  phone?: string | null;
  createdAt?: string | Date | null;
  emailVerified?: boolean;
};

const formatDate = (value?: string | Date | null) => {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatLabel = (value?: string | null) => {
  if (!value) return "Not available";

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "EV";

  return words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

function InfoField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value?: string | null;
  icon: typeof UserRound;
}) {
  return (
    <div className="group rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-emerald-100 hover:bg-emerald-50/30">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100">
          <Icon size={17} strokeWidth={1.8} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
            {value?.trim() || "Not provided"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function MyProfilePage() {
  const userData = await getUserInfo().catch(() => null);

  const user = userData as ProfileUser | null;

  const displayName =
    user?.name?.trim() ||
    user?.fullName?.trim() ||
    user?.email?.split("@")[0] ||
    "EcoValuate Customer";

  const email = user?.email;
  const role = formatLabel(user?.role);
  const status = formatLabel(user?.status);
  const photo = user?.profilePhoto || user?.image;
  const contactNumber = user?.contactNumber || user?.phone;
  const accountDate = formatDate(user?.createdAt);

  return (
    <main className="min-h-screen bg-[#f5f8f6] px-4 py-6 text-slate-900 sm:px-6 lg:px-8 lg:py-9">
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page heading */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <UserRound size={15} />
              ACCOUNT MANAGEMENT
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
              Manage your account information and keep your EcoValuate profile
              up to date.
            </p>
          </div>

          <Link
            href="/change-password"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-800"
          >
            <KeyRound size={16} />
            Change password
          </Link>
        </header>

        {!user ? (
          <section
            role="alert"
            className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <ShieldCheck size={27} />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-slate-900">
              Unable to load your profile
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Your account information could not be retrieved. Please sign in
              again if your session has expired.
            </p>

            <Link
              href="/login"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Go to login <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <>
            {/* Profile hero card */}
            <section className="relative isolate overflow-hidden rounded-[26px] bg-gradient-to-br from-[#073f3c] via-[#075c50] to-[#07866d] p-6 text-white shadow-lg shadow-emerald-950/10 sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-4 -top-16 -z-10 h-48 w-48 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-20 left-1/3 -z-10 h-40 w-40 rounded-full bg-lime-300/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[25px] border border-white/20 bg-white/10 text-3xl font-semibold text-lime-200 shadow-inner">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={`${displayName} profile`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      getInitials(displayName)
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50">
                      <BadgeCheck size={14} className="text-lime-300" />
                      ACCOUNT PROFILE
                    </div>

                    <h2 className="break-words text-2xl font-semibold tracking-tight sm:text-3xl">
                      {displayName}
                    </h2>

                    <p className="mt-2 break-all text-sm text-emerald-50/80">
                      {email || "Email not available"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/10">
                        <UserRound size={13} />
                        {role}
                      </span>

                      {user.status && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-lime-300/15 px-3 py-1.5 text-xs font-medium text-lime-200 ring-1 ring-lime-200/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
                          {status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-300/15 text-lime-200">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Your account</p>
                    <p className="mt-1 text-xs text-emerald-50/75">
                      Personal information
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Main profile content */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <UserRoundPen size={21} />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold">
                      Personal information
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Your currently saved account details.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
                  <InfoField
                    label="Full name"
                    value={displayName}
                    icon={UserRound}
                  />

                  <InfoField
                    label="Email address"
                    value={email}
                    icon={Mail}
                  />

                  <InfoField
                    label="Contact number"
                    value={contactNumber}
                    icon={Phone}
                  />

                  <InfoField
                    label="Account role"
                    value={role}
                    icon={Fingerprint}
                  />

                  <InfoField
                    label="Account status"
                    value={user.status ? status : "Not available"}
                    icon={CheckCircle2}
                  />

                  <InfoField
                    label="Member since"
                    value={accountDate}
                    icon={CalendarDays}
                  />
                </div>

                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
                  <p className="text-xs leading-5 text-slate-500">
                    Your profile details are displayed from your existing
                    account information. Changes should be saved through the
                    account update API.
                  </p>
                </div>
              </section>

              {/* Right sidebar */}
              <aside className="space-y-5">
                <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h2 className="font-semibold">Account security</h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Keep your account secure
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-700"
                      />
                      <div>
                        <p className="text-sm font-semibold text-emerald-950">
                          Profile information
                        </p>
                        <p className="mt-1 text-xs leading-5 text-emerald-900/70">
                          Review your saved contact and account details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/change-password"
                    className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 p-3.5 transition hover:border-emerald-200 hover:bg-emerald-50/40"
                  >
                    <div className="flex items-center gap-3">
                      <KeyRound size={18} className="text-slate-600" />
                      <span className="text-sm font-medium text-slate-800">
                        Change password
                      </span>
                    </div>
                    <ChevronRight size={17} className="text-slate-400" />
                  </Link>
                </section>

                <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#e7f8ef] to-[#f4fce9] p-5 sm:p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm">
                    <Clock3 size={21} />
                  </div>

                  <h2 className="mt-4 text-lg font-semibold text-emerald-950">
                    Your EcoValuate journey
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-emerald-900/75">
                    Keep track of your purchases and discover ways to give
                    electronics a second life.
                  </p>

                  <Link
                    href="/dashboard/orders"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-950 transition hover:text-emerald-700"
                  >
                    View my orders <ArrowRight size={16} />
                  </Link>
                </section>
              </aside>
            </div>
          </>
        )}

        <footer className="border-t border-slate-200 pt-5 text-xs text-slate-500">
          © {new Date().getFullYear()} EcoValuate · Give E-Waste a Second Life
        </footer>
      </div>
    </main>
  );
}
