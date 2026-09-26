
"use client";


import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r border-emerald-100/80 bg-white text-slate-900 shadow-[4px_0_24px_-20px_rgba(15,23,42,0.25)]">
      {/* Brand */}
      <div className="relative flex h-16 shrink-0 items-center border-b border-slate-100 px-5">
        <Link
          href={dashboardHome}
          className="group flex items-center gap-3 transition-all duration-300"
        >
          {/* Logo */}
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-emerald-600 shadow-sm shadow-emerald-600/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-emerald-600/25">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="relative h-5 w-5 text-white"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21c4.5-3.2 7-6.6 7-11.5C19 6.2 16.2 3 12 3c-4.2 0-7 3.2-7 6.5C5 14.4 7.5 17.8 12 21Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17c0-4.5 1.2-7.7 4.5-10"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 13c-1.8-1.2-3.5-1.8-5.5-1.8"
              />
            </svg>
          </div>

          {/* Brand Name */}
          <div className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-tight text-slate-900">
              Eco<span className="text-emerald-600">Valuate</span>
            </span>

            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-400">
              E-Waste Management
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-5">
        <nav className="space-y-5">
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {/* Section Title */}
              {section.title && (
                <h4 className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  {section.title}
                </h4>
              )}

              <div className="space-y-1">
                {section.items.map((item, id) => {
                  const isActive = pathname === item.href;

                  // Icon Mapper Function
                  const Icon = getIconComponent(item.icon);

                  return (
                    <Link
                      href={item.href}
                      key={id}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100/70"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      {/* Active Indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-emerald-600" />
                      )}

                      {/* Icon Container */}
                      <span
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-emerald-600 group-hover:shadow-sm",
                        )}
                      >
                        <Icon className="h-[17px] w-[17px]" />
                      </span>

                      <span className="truncate">{item.title}</span>

                      {/* Active Dot */}
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.08)]" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {sectionId < navItems.length - 1 && (
                <Separator className="my-5 bg-slate-100" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Info */}
      <div className="shrink-0 border-t border-slate-100 bg-gradient-to-b from-white to-slate-50/80 px-3 py-4">
        <div className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all duration-200 hover:border-emerald-100 hover:shadow-md hover:shadow-slate-200/50">
          {/* Avatar */}
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-sm shadow-emerald-600/20">
            <span className="text-sm font-bold text-white">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>

            {/* Online Indicator */}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-800">
              {userInfo.name}
            </p>

            <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {userInfo.role.toLocaleLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>

        {/* Sustainability Tag */}
        <div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] font-medium uppercase tracking-[0.12em] text-emerald-600/70">
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          Building a greener future
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
