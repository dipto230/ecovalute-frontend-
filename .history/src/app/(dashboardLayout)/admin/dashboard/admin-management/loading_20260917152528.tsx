
export default function AdminManagementsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Loading Spinner */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />
        </div>

        {/* Content */}
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Loading...
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          Please wait while we load the page for you.
        </p>
      </div>
    </div>
  );
}

