
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bot,
  Building2,
  ChevronDown,
  Home,
  Leaf,
  Menu,
  Recycle,
  ShoppingBag,
  Sparkles,
  X,
  UserCircle,
  UserRound,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

// Update this import path if your project uses a different location.
import { getUserInfo } from "@/src/services/auth.service";

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "AI Detection",
    href: "/ai-detection",
    icon: Bot,
    badge: "AI",
    dropdown: "ai",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
    dropdown: "marketplace",
  },
  {
    label: "About Us",
    href: "/about",
    icon: Building2,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Sparkles,
  },
];

export default function Navbar() {
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [marketplaceOpen, setMarketplaceOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Load authenticated user.
  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const currentUser = await getUserInfo();

        if (active) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Failed to load user:", error);

        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setAuthLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  // Navbar scroll effect.
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll while mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMarketplaceOpen(false);
    setAiDropdownOpen(false);
    setProfileOpen(false);
  };

  // Dashboard destination based on the authenticated user's role.
  const getDashboardPath = () => {
    switch (user?.role) {
      case "SUPER_ADMIN":
        return "/super-admin/dashboard";
      case "ADMIN":
        return "/admin/dashboard";
      case "VENDOR":
        return "/vendor/dashboard";
      default:
        return "/dashboard";
    }
  };

  const handleLogout = () => {
    closeMobileMenu();
    setProfileOpen(false);

    // Replace this with your existing logout server action if available.
    router.push("/logout");
  };

  const profileMenu = (
    <>
      <Link
        href="/my-profile"
        onClick={() => {
          setProfileOpen(false);
          closeMobileMenu();
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
      >
        <UserRound className="h-4 w-4" />
        My Profile
      </Link>

      <Link
        href={getDashboardPath()}
        onClick={() => {
          setProfileOpen(false);
          closeMobileMenu();
        }}
        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
      >
        <LayoutDashboard className="h-4 w-4" />
        My Dashboard
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </>
  );

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? "px-4 pt-3" : "px-4 pt-5"
        }`}
      >
        <nav
          className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-6 ${
            scrolled
              ? "border-emerald-200/60 bg-white/85 shadow-[0_12px_40px_rgba(16,185,129,0.12)] backdrop-blur-2xl"
              : "border-white/60 bg-white/70 shadow-[0_8px_35px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          }`}
        >
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group relative flex shrink-0 items-center gap-2.5"
          >
            <div className="absolute -inset-2 -z-10 rounded-full bg-emerald-400/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-100 shadow-sm transition-all duration-500 group-hover:-rotate-3 group-hover:scale-110 group-hover:shadow-lg">
              <Image
                src="/logo.png"
                alt="EcoValuate Logo"
                width={42}
                height={42}
                priority
                className="h-9 w-9 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="hidden sm:block">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  Eco
                </span>
                <span className="text-xl font-extrabold tracking-tight text-emerald-600">
                  Valuate
                </span>
              </div>

              <div className="-mt-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                <Recycle className="h-2.5 w-2.5 text-emerald-500" />
                Smart E-Waste
              </div>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-1 rounded-xl bg-slate-50/70 p-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                if (item.dropdown === "ai") {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setAiDropdownOpen(true)}
                      onMouseLeave={() => setAiDropdownOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm"
                      >
                        <Icon className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                        <span>{item.label}</span>

                        <span className="ml-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                          AI
                        </span>

                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            aiDropdownOpen ? "rotate-180" : ""
                          }`}
                        />

                        <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" />
                      </Link>

                      <div
                        className={`absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 transition-all duration-300 ${
                          aiDropdownOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                          <Link
                            href="/ai-detection"
                            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                AI Detection
                              </p>
                              <p className="text-xs text-slate-400">
                                Detect electronic waste
                              </p>
                            </div>
                          </Link>

                          <Link
                            href="/price-estimation"
                            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                              <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                Price Estimation
                              </p>
                              <p className="text-xs text-slate-400">
                                Estimate your e-waste value
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (item.dropdown === "marketplace") {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setMarketplaceOpen(true)}
                      onMouseLeave={() => setMarketplaceOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className="group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm"
                      >
                        <Icon className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-300 ${
                            marketplaceOpen ? "rotate-180" : ""
                          }`}
                        />
                        <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" />
                      </Link>

                      <div
                        className={`absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 transition-all duration-300 ${
                          marketplaceOpen
                            ? "pointer-events-auto translate-y-0 opacity-100"
                            : "pointer-events-none -translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl shadow-slate-900/10">
                          <Link
                            href="/marketplace"
                            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                              <ShoppingBag className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                Marketplace
                              </p>
                              <p className="text-xs text-slate-400">
                                Browse e-waste products
                              </p>
                            </div>
                          </Link>

                          <Link
                            href="/marketplace/products"
                            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                              <Recycle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                Products
                              </p>
                              <p className="text-xs text-slate-400">
                                Explore recycled items
                              </p>
                            </div>
                          </Link>

                          <Link
                            href="/marketplace/vendors"
                            className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-emerald-50"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">
                              <Building2 className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                Vendors
                              </p>
                              <p className="text-xs text-slate-400">
                                Find trusted vendors
                              </p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group relative flex items-center gap-1.5 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-emerald-600 hover:shadow-sm"
                  >
                    <Icon className="h-4 w-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
                    <span>{item.label}</span>
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-1/2" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* DESKTOP AUTH / PROFILE */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {authLoading ? (
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
            ) : user ? (
              <div
                className="relative"
                onMouseEnter={() => setProfileOpen(true)}
                onMouseLeave={() => setProfileOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setProfileOpen((prev) => !prev)}
                  aria-expanded={profileOpen}
                  className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50"
                >
                  <UserCircle className="h-5 w-5 text-emerald-600" />
                  <span className="max-w-28 truncate">
                    {user.name || "My Account"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 top-full z-50 w-60 pt-3 transition-all duration-200 ${
                    profileOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {user.name || "EcoValuate User"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                    {profileMenu}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-emerald-50 hover:text-emerald-600"
                >
                  Login
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>

                <Link
                  href="/register"
                  className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Leaf className="relative h-4 w-4" />
                  <span className="relative">Sign Up</span>
                  <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </header>

      {/* MOBILE BACKDROP */}
      <div
        className={`fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMobileMenu}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed left-4 right-4 top-[100px] z-50 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-2xl shadow-slate-900/15 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-5 scale-95 opacity-0"
        }`}
      >
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            if (item.dropdown === "ai") {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={aiDropdownOpen}
                    onClick={() => setAiDropdownOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                      <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold text-white">
                        AI
                      </span>
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        aiDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      aiDropdownOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-5 space-y-1 border-l border-emerald-100 pl-3">
                      <Link
                        href="/ai-detection"
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        AI Detection
                      </Link>
                      <Link
                        href="/price-estimation"
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        Price Estimation
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.dropdown === "marketplace") {
              return (
                <div key={item.label}>
                  <button
                    type="button"
                    aria-expanded={marketplaceOpen}
                    onClick={() => setMarketplaceOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        marketplaceOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      marketplaceOpen
                        ? "max-h-40 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-5 space-y-1 border-l border-emerald-100 pl-3">
                      <Link
                        href="/marketplace"
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        Marketplace
                      </Link>
                      <Link
                        href="/marketplace/products"
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        Products
                      </Link>
                      <Link
                        href="/marketplace/vendors"
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        Vendors
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-emerald-50 hover:pl-5 hover:text-emerald-600"
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 opacity-40" />
              </Link>
            );
          })}
        </div>

        <div className="my-3 h-px bg-slate-100" />

        {/* MOBILE AUTH / PROFILE */}
        {authLoading ? (
          <div className="h-11 animate-pulse rounded-xl bg-slate-100" />
        ) : user ? (
          <div className="rounded-xl border border-emerald-100 bg-white p-2">
            <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3">
              <UserCircle className="h-8 w-8 shrink-0 text-emerald-600" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-800">
                  {user.name || "EcoValuate User"}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>
            {profileMenu}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
            >
              <Leaf className="h-4 w-4" />
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
