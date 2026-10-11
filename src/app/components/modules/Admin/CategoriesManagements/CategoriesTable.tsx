"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  FolderTree,
  ImagePlus,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/src/services/category.service";

import type {
  ICategory,
  ICreateCategoryPayload,
} from "@/src/types/category.types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table";

import { Badge } from "../../../ui/badge";

export default function CategoriesTable() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [formError, setFormError] = useState("");

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const categories = useMemo<ICategory[]>(() => {
    return (response?.data ?? []) as ICategory[];
  }, [response]);

  const createMutation = useMutation({
    mutationFn: (payload: ICreateCategoryPayload) =>
      createCategory(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setName("");
      setDescription("");
      setFile(null);
      setFormError("");
      setShowForm(false);
    },

    onError: () => {
      setFormError(
        "Could not create the category. Please check the form and try again."
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return categories;

    return categories.filter((category) =>
      [category.name, category.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [categories, search]);

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Category name is required.");
      return;
    }

    createMutation.mutate({
      name: name.trim(),
      description: description.trim(),
      file,
    });
  };

  const handleDelete = (category: ICategory) => {
    const confirmed = window.confirm(
      `Delete category "${category.name}"?`
    );

    if (confirmed) {
      deleteMutation.mutate(category.id);
    }
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
            <FolderTree className="size-6" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Categories Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Organize and manage marketplace product categories.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-500">
              Total Categories
            </p>
            <p className="mt-1 text-xl font-bold text-slate-900">
              {categories.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm((previous) => !previous);
              setFormError("");
            }}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            {showForm ? (
              <X className="size-4" />
            ) : (
              <Plus className="size-4" />
            )}
            {showForm ? "Close" : "Add Category"}
          </button>
        </div>
      </div>

      {/* Create category form */}
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div>
            <h2 className="font-semibold text-slate-900">
              Create New Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add a category to organize products in your marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="category-name"
                className="text-sm font-medium text-slate-700"
              >
                Category Name <span className="text-red-500">*</span>
              </label>

              <input
                id="category-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Mobile Accessories"
                required
                maxLength={100}
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category-file"
                className="text-sm font-medium text-slate-700"
              >
                Category Icon / Image
              </label>

              <label
                htmlFor="category-file"
                className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-3 py-2 transition hover:border-emerald-400 hover:bg-emerald-50/40"
              >
                <ImagePlus className="size-5 shrink-0 text-emerald-600" />

                <span className="min-w-0 flex-1 truncate text-sm text-slate-500">
                  {file?.name ?? "Choose an image (optional)"}
                </span>

                <input
                  id="category-file"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setFile(event.target.files?.[0] ?? null)
                  }
                />
              </label>

              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs font-medium text-red-600 hover:underline"
                >
                  Remove selected image
                </button>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="category-description"
                className="text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="category-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe this category..."
                rows={3}
                className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          {formError && (
            <p role="alert" className="text-sm text-red-600">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormError("");
              }}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={createMutation.isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {createMutation.isPending && (
                <Loader2 className="size-4 animate-spin" />
              )}
              Create Category
            </button>
          </div>
        </form>
      )}

      {/* Mutation messages */}
      {createMutation.isSuccess && !showForm && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Category created successfully.
        </div>
      )}

      {deleteMutation.isError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Could not delete the category. Please try again.
        </div>
      )}

      {deleteMutation.isSuccess && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Category deleted successfully.
        </div>
      )}

      {/* Categories table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-900">
              All Categories
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Search and manage product categories.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative sm:w-72">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search categories..."
                aria-label="Search categories"
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
              />
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              <RefreshCw
                className={`size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="w-full min-w-[700px]">
            <TableHeader>
              <TableRow className="border-b border-slate-200 bg-slate-50/80">
                <TableHead className="h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Category
                </TableHead>
                <TableHead className="h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Description
                </TableHead>
                <TableHead className="h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Created
                </TableHead>
                <TableHead className="h-12 px-5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-52 text-center">
                    <Loader2 className="mx-auto mb-3 size-7 animate-spin text-emerald-600" />
                    <p className="text-sm text-slate-500">
                      Loading categories...
                    </p>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-52 text-center">
                    <p className="font-semibold text-red-600">
                      Unable to load categories
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
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => {
                  const createdDate = category.createdAt
                    ? new Date(category.createdAt)
                    : null;

                  return (
                    <TableRow
                      key={category.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40"
                    >
                      <TableCell className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                            {category.icon ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={category.icon}
                                alt=""
                                className="size-full object-cover"
                              />
                            ) : (
                              <FolderTree className="size-5" />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {category.name}
                            </p>
                            <p className="mt-1 max-w-48 truncate text-xs text-slate-400">
                              {category.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="max-w-xs px-5 py-4">
                        <p className="line-clamp-2 text-sm text-slate-600">
                          {category.description || "No description"}
                        </p>
                      </TableCell>

                      <TableCell className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                        {createdDate &&
                        !Number.isNaN(createdDate.getTime())
                          ? format(createdDate, "dd MMM yyyy")
                          : "N/A"}
                      </TableCell>

                      <TableCell className="px-5 py-4 text-right">
                        <button
                          type="button"
                          title="Delete category"
                          aria-label={`Delete ${category.name}`}
                          disabled={deleteMutation.isPending}
                          onClick={() => handleDelete(category)}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {deleteMutation.isPending ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-56 text-center">
                    <FolderTree className="mx-auto mb-3 size-8 text-slate-300" />
                    <p className="font-semibold text-slate-800">
                      No categories found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try another search or create a new category.
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredCategories.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">
              {categories.length}
            </span>{" "}
            categories
          </p>

          <Badge
            variant="outline"
            className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700"
          >
            EcoValuate Categories
          </Badge>
        </div>
      </div>
    </div>
  );
}