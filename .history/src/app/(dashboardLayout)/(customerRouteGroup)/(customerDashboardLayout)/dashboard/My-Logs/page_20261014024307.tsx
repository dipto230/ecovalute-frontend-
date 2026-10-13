
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  LogIn,
  LogOut,
  Package,
  RefreshCw,
  ShoppingBag,
  UserRound,
  XCircle,
} from "lucide-react";
import { getMyAuditLogs, IAuditLog } from "@/src/services/audit-log.service";



function getActionDetails(action: string) {
  const actions: Record<
    string,
    {
      label: string;
      description: string;
      icon: typeof Activity;
      color: string;
      background: string;
    }
  > = {
    LOGIN: {
      label: "Logged in",
      description: "You signed in to your account.",
      icon: LogIn,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
    LOGOUT: {
      label: "Logged out",
      description: "You signed out of your account.",
      icon: LogOut,
      color: "text-slate-600",
      background: "bg-slate-100",
    },
    CREATE_ORDER: {
      label: "Order created",
      description: "A new order was created.",
      icon: ShoppingBag,
      color: "text-emerald-700",
      background: "bg-emerald-50",
    },
    CANCEL_ORDER: {
      label: "Order cancelled",
      description: "An order was cancelled.",
      icon: Package,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
    PAYMENT_SUCCESS: {
      label: "Payment successful",
      description: "Your payment was completed.",
      icon: CheckCircle2,
      color: "text-emerald-700",
      background: "bg-emerald-50",
    },
    PAYMENT_FAILED: {
      label: "Payment failed",
      description: "Your payment could not be completed.",
      icon: XCircle,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
    UPDATE_PROFILE: {
      label: "Profile updated",
      description: "Your account information was updated.",
      icon: UserRound,
      color: "text-violet-600",
      background: "bg-violet-50",
    },
    CREATE_OFFER: {
      label: "Offer created",
      description: "A new offer was created.",
      icon: FileText,
      color: "text-amber-700",
      background: "bg-amber-50",
    },
    ACCEPT_OFFER: {
      label: "Offer accepted",
      description: "An offer was accepted.",
      icon: CheckCircle2,
      color: "text-emerald-700",
      background: "bg-emerald-50",
    },
    REJECT_OFFER: {
      label: "Offer rejected",
      description: "An offer was rejected.",
      icon: XCircle,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
    CREATE: {
      label: "Item created",
      description: "A new item was created.",
      icon: ArrowUpRight,
      color: "text-emerald-700",
      background: "bg-emerald-50",
    },
    UPDATE: {
      label: "Item updated",
      description: "An item was updated.",
      icon: RefreshCw,
      color: "text-blue-600",
      background: "bg-blue-50",
    },
    DELETE: {
      label: "Item deleted",
      description: "An item was deleted.",
      icon: ArrowDownRight,
      color: "text-rose-600",
      background: "bg-rose-50",
    },
  };

  return (
    actions[action] ?? {
      label: action
        .toLowerCase()
        .split("_")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
      description: "An activity was recorded on your account.",
      icon: Activity,
      color: "text-teal-700",
      background: "bg-teal-50",
    }
  );
}

function formatDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(parsed);
}

export default function RecentActivity() {
  const [logs, setLogs] = useState<IAuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadLogs = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getMyAuditLogs(1, 5);

        if (mounted) {
          setLogs(result.data);
        }
      } catch {
        if (mounted) {
          setError(
            "Unable to load activity. Please try again."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    void loadLogs();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
            <Activity className="h-5 w-5 text-emerald-700" />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">
              Recent Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Your latest account activities
            </p>
          </div>
        </div>

        <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Latest 5
        </span>
      </div>

      <div className="px-5 sm:px-6">
        {loading ? (
          <div className="space-y-5 py-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex animate-pulse gap-4"
              >
                <div className="h-11 w-11 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 w-36 rounded bg-slate-100" />
                  <div className="h-3 w-56 max-w-full rounded bg-slate-100" />
                  <div className="h-3 w-28 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-rose-600">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-emerald-700 hover:underline"
            >
              Reload page
            </button>
          </div>
        ) : logs.length === 0 ? (
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <Clock3 className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="font-semibold text-slate-800">
              No activity yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Your recent orders, profile updates and other
              account activities will appear here when logged.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((log) => {
              const details = getActionDetails(log.action);
              const Icon = details.icon;

              return (
                <div
                  key={log.id}
                  className="group flex items-start gap-4 py-5 transition-colors"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${details.background}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${details.color}`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-800">
                        {details.label}
                      </h3>

                      <span className="text-xs text-slate-400">
                        {formatDate(log.createdAt)}
                      </span>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {details.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <span className="rounded-md bg-slate-50 px-2 py-1 font-medium text-slate-600">
                        {log.entityType}
                      </span>

                      {log.entityId && (
                        <span
                          className="max-w-full truncate"
                          title={log.entityId}
                        >
                          ID: {log.entityId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-3 sm:px-6">
        <p className="text-xs text-slate-500">
          Activity is displayed from your account audit history.
        </p>
      </div>
    </section>
  );
}
