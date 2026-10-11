
"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  Search,
  RefreshCw,
  Loader2,
  Wallet,
  CircleCheck,
  Clock3,
  ReceiptText,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";

import { getPayments } from "@/src/services/payment.service";
import type {
  IPayment,
  PaymentStatus,
} from "@/src/types/payment.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { Badge } from "../../../ui/badge";

const PAGE_SIZE = 10;

const getStatusStyle = (status?: string | null) => {
  switch (status?.toUpperCase()) {
    case "PAID":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "PENDING":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "FAILED":
      return "border-red-200 bg-red-50 text-red-700";
    case "REFUNDED":
      return "border-violet-200 bg-violet-50 text-violet-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
};

const displayValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return String(value);
};

const formatAmount = (amount: number | string) => {
  const value = Number(amount);

  if (!Number.isFinite(value)) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? "N/A"
    : format(date, "dd MMM yyyy, hh:mm a");
};

const PaymentsTable = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("ALL");
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] =
    useState<IPayment | null>(null);

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["payments", page, PAGE_SIZE, status],
    queryFn: () =>
      getPayments({
        page,
        limit: PAGE_SIZE,
        status,
      }),
  });

  // httpClient returns ApiResponse<T>, not AxiosResponse<T>.
  const payments = (response?.data ?? []) as IPayment[];

  const meta = response?.meta;

  const total = Number(meta?.total ?? payments.length);
  const totalPages = Math.max(
    1,
    Number(meta?.totalPages ?? Math.ceil(total / PAGE_SIZE)),
  );

  // Search applies to the current server-returned page.
  const filteredPayments = payments.filter((payment) => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return true;

    return [
      payment.id,
      payment.orderId,
      payment.transactionId,
      payment.paymentMethod,
      payment.status,
      payment.order?.customer?.name,
      payment.order?.customer?.email,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value).toLowerCase().includes(searchText),
      );
  });

  const paidOnPage = payments.filter(
    (payment) => payment.status?.toUpperCase() === "PAID",
  ).length;

  const pendingOnPage = payments.filter(
    (payment) => payment.status?.toUpperCase() === "PENDING",
  ).length;

  const paidAmountOnPage = payments
    .filter((payment) => payment.status?.toUpperCase() === "PAID")
    .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

  const stats = [
    {
      label: "Total Payments",
      value: total,
      icon: ReceiptText,
      description: "All matching records",
      color: "bg-blue-50 text-blue-700",
    },
    {
      label: "Paid on This Page",
      value: paidOnPage,
      icon: CircleCheck,
      description: "Successful payments",
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Pending on This Page",
      value: pendingOnPage,
      icon: Clock3,
      description: "Awaiting confirmation",
      color: "bg-amber-50 text-amber-700",
    },
    {
      label: "Paid Amount on This Page",
      value: formatAmount(paidAmountOnPage),
      icon: Wallet,
      description: "Paid records on current page",
      color: "bg-violet-50 text-violet-700",
    },
  ];

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <CreditCard className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Payments
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor transactions and payment records.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            className={`size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-2 break-words text-2xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                >
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Transactions
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Search and filter payment records.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search transaction or order..."
                aria-label="Search payments"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={status}
              onChange={(event) => {
                setStatus(event.target.value as PaymentStatus);
                setPage(1);
              }}
              aria-label="Filter payment status"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-400"
            >
              <option value="ALL">All statuses</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full min-w-[1100px]">
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                {[
                  "Payment",
                  "Order ID",
                  "Customer",
                  "Amount",
                  "Method",
                  "Status",
                  "Payment Date",
                  "Details",
                ].map((heading) => (
                  <TableHead
                    key={heading}
                    className="h-12 whitespace-nowrap px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    {heading}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="size-7 animate-spin text-emerald-600" />
                      <span className="text-sm text-slate-500">
                        Loading payments...
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <p className="font-semibold text-red-600">
                      Unable to load payments.
                    </p>
                    <button
                      type="button"
                      onClick={() => refetch()}
                      className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Try Again
                    </button>
                  </TableCell>
                </TableRow>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-b border-slate-100 hover:bg-emerald-50/40"
                  >
                    <TableCell className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                          <CreditCard className="size-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-44 truncate text-sm font-semibold text-slate-800">
                            {payment.transactionId || payment.id}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Payment record
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <span className="block max-w-40 truncate font-mono text-xs text-slate-600">
                        {payment.orderId}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <div className="max-w-48">
                        <p className="truncate text-sm font-medium text-slate-700">
                          {displayValue(payment.order?.customer?.name)}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {displayValue(payment.order?.customer?.email)}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-4 py-4">
                      <span className="text-sm font-bold text-slate-800">
                        {formatAmount(payment.amount)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                        {displayValue(payment.paymentMethod)}
                      </span>
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(payment.status)}`}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {displayValue(payment.status).replaceAll("_", " ")}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                      {formatDate(payment.paidAt)}
                    </TableCell>

                    <TableCell className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(payment)}
                        aria-label="View payment details"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        <Eye className="size-3.5" />
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-56 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Wallet className="size-7" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">
                          No payments found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try another search or status filter.
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && !isError && (
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500">
              Page <span className="font-semibold text-slate-800">{page}</span>
              {" "}of{" "}
              <span className="font-semibold text-slate-800">{totalPages}</span>
              {" · "}
              <span className="font-semibold text-slate-800">{total}</span>
              {" "}payments
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>

              <button
                type="button"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment details modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-details-title"
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2
                  id="payment-details-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Payment Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Full payment record
                </p>
              </div>

              <button
                type="button"
                aria-label="Close payment details"
                onClick={() => setSelectedPayment(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="rounded-xl bg-emerald-50 p-4">
                <p className="text-sm text-emerald-700">Payment amount</p>
                <p className="mt-1 text-3xl font-bold text-emerald-800">
                  {formatAmount(selectedPayment.amount)}
                </p>
              </div>

              {[
                ["Payment ID", selectedPayment.id],
                ["Order ID", selectedPayment.orderId],
                ["Transaction ID", selectedPayment.transactionId],
                ["Payment Method", selectedPayment.paymentMethod],
                ["Status", selectedPayment.status],
                ["Customer", selectedPayment.order?.customer?.name],
                ["Customer Email", selectedPayment.order?.customer?.email],
                ["Payment Date", formatDate(selectedPayment.paidAt)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-slate-100 pb-3 last:border-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <span className="text-sm text-slate-500">{label}</span>
                  <span className="max-w-full break-all text-sm font-medium text-slate-800 sm:max-w-[60%] sm:text-right">
                    {displayValue(value)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end border-t border-slate-100 p-5">
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;
