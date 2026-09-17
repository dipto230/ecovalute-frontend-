```tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.007M10.29 3.86l-7.1 12.28A1.875 1.875 0 004.81 19h14.38a1.875 1.875 0 001.62-2.86L13.71 3.86a1.875 1.875 0 00-3.42 0z"
            />
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          Something went wrong
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          We encountered an unexpected error while loading this page.
          Please try again. If the problem continues, please contact support.
        </p>

        {/* Action */}
        <button
          onClick={() => retry()}
          className="mt-7 inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

