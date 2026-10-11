"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var react_query_1 = require("@tanstack/react-query");
var lucide_react_1 = require("lucide-react");
var category_service_1 = require("@/src/services/category.service");
var table_1 = require("../../../ui/table");
var badge_1 = require("../../../ui/badge");
function CategoriesTable() {
    var _this = this;
    var _a;
    var queryClient = react_query_1.useQueryClient();
    var _b = react_1.useState(""), search = _b[0], setSearch = _b[1];
    var _c = react_1.useState(false), showForm = _c[0], setShowForm = _c[1];
    var _d = react_1.useState(""), name = _d[0], setName = _d[1];
    var _e = react_1.useState(""), description = _e[0], setDescription = _e[1];
    var _f = react_1.useState(null), file = _f[0], setFile = _f[1];
    var _g = react_1.useState(""), formError = _g[0], setFormError = _g[1];
    var _h = react_query_1.useQuery({
        queryKey: ["categories"],
        queryFn: category_service_1.getCategories
    }), response = _h.data, isLoading = _h.isLoading, isError = _h.isError, isFetching = _h.isFetching, refetch = _h.refetch;
    var categories = react_1.useMemo(function () {
        var _a;
        return ((_a = response === null || response === void 0 ? void 0 : response.data) !== null && _a !== void 0 ? _a : []);
    }, [response]);
    var createMutation = react_query_1.useMutation({
        mutationFn: function (payload) {
            return category_service_1.createCategory(payload);
        },
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["categories"]
                        })];
                    case 1:
                        _a.sent();
                        setName("");
                        setDescription("");
                        setFile(null);
                        setFormError("");
                        setShowForm(false);
                        return [2 /*return*/];
                }
            });
        }); },
        onError: function () {
            setFormError("Could not create the category. Please check the form and try again.");
        }
    });
    var deleteMutation = react_query_1.useMutation({
        mutationFn: category_service_1.deleteCategory,
        onSuccess: function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryClient.invalidateQueries({
                            queryKey: ["categories"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    });
    var filteredCategories = react_1.useMemo(function () {
        var term = search.trim().toLowerCase();
        if (!term)
            return categories;
        return categories.filter(function (category) {
            return [category.name, category.description]
                .filter(Boolean)
                .join(" ")
                .toLowerCase()
                .includes(term);
        });
    }, [categories, search]);
    var handleCreate = function (event) {
        event.preventDefault();
        setFormError("");
        if (!name.trim()) {
            setFormError("Category name is required.");
            return;
        }
        createMutation.mutate({
            name: name.trim(),
            description: description.trim(),
            file: file
        });
    };
    var handleDelete = function (category) {
        var confirmed = window.confirm("Delete category \"" + category.name + "\"?");
        if (confirmed) {
            deleteMutation.mutate(category.id);
        }
    };
    return (React.createElement("div", { className: "w-full min-w-0 space-y-6" },
        React.createElement("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" },
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700" },
                    React.createElement(lucide_react_1.FolderTree, { className: "size-6" })),
                React.createElement("div", null,
                    React.createElement("h1", { className: "text-2xl font-bold tracking-tight text-slate-900" }, "Categories Management"),
                    React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Organize and manage marketplace product categories."))),
            React.createElement("div", { className: "flex items-center gap-3" },
                React.createElement("div", { className: "rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm" },
                    React.createElement("p", { className: "text-xs font-medium text-slate-500" }, "Total Categories"),
                    React.createElement("p", { className: "mt-1 text-xl font-bold text-slate-900" }, categories.length)),
                React.createElement("button", { type: "button", onClick: function () {
                        setShowForm(function (previous) { return !previous; });
                        setFormError("");
                    }, className: "inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700" },
                    showForm ? (React.createElement(lucide_react_1.X, { className: "size-4" })) : (React.createElement(lucide_react_1.Plus, { className: "size-4" })),
                    showForm ? "Close" : "Add Category"))),
        showForm && (React.createElement("form", { onSubmit: handleCreate, className: "space-y-5 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-6" },
            React.createElement("div", null,
                React.createElement("h2", { className: "font-semibold text-slate-900" }, "Create New Category"),
                React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Add a category to organize products in your marketplace.")),
            React.createElement("div", { className: "grid grid-cols-1 gap-5 md:grid-cols-2" },
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "category-name", className: "text-sm font-medium text-slate-700" },
                        "Category Name ",
                        React.createElement("span", { className: "text-red-500" }, "*")),
                    React.createElement("input", { id: "category-name", value: name, onChange: function (event) { return setName(event.target.value); }, placeholder: "e.g. Mobile Accessories", required: true, maxLength: 100, className: "h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" })),
                React.createElement("div", { className: "space-y-2" },
                    React.createElement("label", { htmlFor: "category-file", className: "text-sm font-medium text-slate-700" }, "Category Icon / Image"),
                    React.createElement("label", { htmlFor: "category-file", className: "flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-3 py-2 transition hover:border-emerald-400 hover:bg-emerald-50/40" },
                        React.createElement(lucide_react_1.ImagePlus, { className: "size-5 shrink-0 text-emerald-600" }),
                        React.createElement("span", { className: "min-w-0 flex-1 truncate text-sm text-slate-500" }, (_a = file === null || file === void 0 ? void 0 : file.name) !== null && _a !== void 0 ? _a : "Choose an image (optional)"),
                        React.createElement("input", { id: "category-file", type: "file", accept: "image/*", className: "sr-only", onChange: function (event) { var _a, _b; return setFile((_b = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null); } })),
                    file && (React.createElement("button", { type: "button", onClick: function () { return setFile(null); }, className: "text-xs font-medium text-red-600 hover:underline" }, "Remove selected image"))),
                React.createElement("div", { className: "space-y-2 md:col-span-2" },
                    React.createElement("label", { htmlFor: "category-description", className: "text-sm font-medium text-slate-700" }, "Description"),
                    React.createElement("textarea", { id: "category-description", value: description, onChange: function (event) {
                            return setDescription(event.target.value);
                        }, placeholder: "Describe this category...", rows: 3, className: "w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" }))),
            formError && (React.createElement("p", { role: "alert", className: "text-sm text-red-600" }, formError)),
            React.createElement("div", { className: "flex justify-end gap-3 border-t border-slate-100 pt-4" },
                React.createElement("button", { type: "button", onClick: function () {
                        setShowForm(false);
                        setFormError("");
                    }, className: "rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50" }, "Cancel"),
                React.createElement("button", { type: "submit", disabled: createMutation.isPending, className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60" },
                    createMutation.isPending && (React.createElement(lucide_react_1.Loader2, { className: "size-4 animate-spin" })),
                    "Create Category")))),
        createMutation.isSuccess && !showForm && (React.createElement("div", { className: "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" }, "Category created successfully.")),
        deleteMutation.isError && (React.createElement("div", { role: "alert", className: "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" }, "Could not delete the category. Please try again.")),
        deleteMutation.isSuccess && (React.createElement("div", { className: "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700" }, "Category deleted successfully.")),
        React.createElement("div", { className: "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" },
            React.createElement("div", { className: "flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6" },
                React.createElement("div", null,
                    React.createElement("h2", { className: "font-semibold text-slate-900" }, "All Categories"),
                    React.createElement("p", { className: "mt-1 text-xs text-slate-500" }, "Search and manage product categories.")),
                React.createElement("div", { className: "flex flex-col gap-2 sm:flex-row" },
                    React.createElement("div", { className: "relative sm:w-72" },
                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" }),
                        React.createElement("input", { type: "search", value: search, onChange: function (event) { return setSearch(event.target.value); }, placeholder: "Search categories...", "aria-label": "Search categories", className: "h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-sm outline-none transition focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" })),
                    React.createElement("button", { type: "button", onClick: function () { return refetch(); }, disabled: isFetching, className: "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 disabled:opacity-50" },
                        React.createElement(lucide_react_1.RefreshCw, { className: "size-4 " + (isFetching ? "animate-spin" : "") }),
                        "Refresh"))),
            React.createElement("div", { className: "overflow-x-auto" },
                React.createElement(table_1.Table, { className: "w-full min-w-[700px]" },
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, { className: "border-b border-slate-200 bg-slate-50/80" },
                            React.createElement(table_1.TableHead, { className: "h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, "Category"),
                            React.createElement(table_1.TableHead, { className: "h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, "Description"),
                            React.createElement(table_1.TableHead, { className: "h-12 px-5 text-[11px] font-bold uppercase tracking-wider text-slate-500" }, "Created"),
                            React.createElement(table_1.TableHead, { className: "h-12 px-5 text-right text-[11px] font-bold uppercase tracking-wider text-slate-500" }, "Actions"))),
                    React.createElement(table_1.TableBody, null, isLoading ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 4, className: "h-52 text-center" },
                            React.createElement(lucide_react_1.Loader2, { className: "mx-auto mb-3 size-7 animate-spin text-emerald-600" }),
                            React.createElement("p", { className: "text-sm text-slate-500" }, "Loading categories...")))) : isError ? (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 4, className: "h-52 text-center" },
                            React.createElement("p", { className: "font-semibold text-red-600" }, "Unable to load categories"),
                            React.createElement("button", { type: "button", onClick: function () { return refetch(); }, className: "mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" }, "Try Again")))) : filteredCategories.length > 0 ? (filteredCategories.map(function (category) {
                        var createdDate = category.createdAt
                            ? new Date(category.createdAt)
                            : null;
                        return (React.createElement(table_1.TableRow, { key: category.id, className: "border-b border-slate-100 transition-colors last:border-0 hover:bg-emerald-50/40" },
                            React.createElement(table_1.TableCell, { className: "px-5 py-4" },
                                React.createElement("div", { className: "flex items-center gap-3" },
                                    React.createElement("div", { className: "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-700" }, category.icon ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    React.createElement("img", { src: category.icon, alt: "", className: "size-full object-cover" })) : (React.createElement(lucide_react_1.FolderTree, { className: "size-5" }))),
                                    React.createElement("div", null,
                                        React.createElement("p", { className: "font-semibold text-slate-800" }, category.name),
                                        React.createElement("p", { className: "mt-1 max-w-48 truncate text-xs text-slate-400" }, category.id)))),
                            React.createElement(table_1.TableCell, { className: "max-w-xs px-5 py-4" },
                                React.createElement("p", { className: "line-clamp-2 text-sm text-slate-600" }, category.description || "No description")),
                            React.createElement(table_1.TableCell, { className: "whitespace-nowrap px-5 py-4 text-sm text-slate-600" }, createdDate &&
                                !Number.isNaN(createdDate.getTime())
                                ? date_fns_1.format(createdDate, "dd MMM yyyy")
                                : "N/A"),
                            React.createElement(table_1.TableCell, { className: "px-5 py-4 text-right" },
                                React.createElement("button", { type: "button", title: "Delete category", "aria-label": "Delete " + category.name, disabled: deleteMutation.isPending, onClick: function () { return handleDelete(category); }, className: "inline-flex size-9 items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100 disabled:opacity-50" }, deleteMutation.isPending ? (React.createElement(lucide_react_1.Loader2, { className: "size-4 animate-spin" })) : (React.createElement(lucide_react_1.Trash2, { className: "size-4" }))))));
                    })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: 4, className: "h-56 text-center" },
                            React.createElement(lucide_react_1.FolderTree, { className: "mx-auto mb-3 size-8 text-slate-300" }),
                            React.createElement("p", { className: "font-semibold text-slate-800" }, "No categories found"),
                            React.createElement("p", { className: "mt-1 text-sm text-slate-500" }, "Try another search or create a new category."))))))),
            React.createElement("div", { className: "flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between" },
                React.createElement("p", { className: "text-sm text-slate-500" },
                    "Showing",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, filteredCategories.length),
                    " ",
                    "of",
                    " ",
                    React.createElement("span", { className: "font-semibold text-slate-800" }, categories.length),
                    " ",
                    "categories"),
                React.createElement(badge_1.Badge, { variant: "outline", className: "w-fit border-emerald-200 bg-emerald-50 text-emerald-700" }, "EcoValuate Categories")))));
}
exports["default"] = CategoriesTable;
