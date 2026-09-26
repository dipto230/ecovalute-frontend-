
"use client";



import { UserInfo } from "@/src/types/user.types";
import { Menu, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";


interface DashboardNavbarProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardNavbarContent = ({
  dashboardHome,
  navItems,
  userInfo,
}: DashboardNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);

    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40 flex h-[72px] w-full items-center border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xl md:px-6">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu */}
        <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 border-r border-slate-200 p-0"
          >
            <DashboardMobileSidebar
              userInfo={userInfo}
              dashboardHome={dashboardHome}
              navItems={navItems}
            />
          </SheetContent>
        </Sheet>

        {/* Desktop Context */}
        <div className="hidden md:flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="leading-none">
            <p className="text-sm font-semibold text-slate-800">
              EcoValuate
            </p>

            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400">
              E-Waste Management
            </p>
          </div>
        </div>
      </div>

      {/* Center Search */}
      <div className="mx-4 flex flex-1 justify-center md:mx-8">
        <div className="relative hidden w-full max-w-xl sm:block">
          <Search className="absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-slate-400" />

          <Input
            type="text"
            placeholder="Search anything..."
            className="
              h-11
              rounded-xl
              border-slate-200
              bg-slate-50/70
              pl-10
              pr-16
              text-sm
              text-slate-700
              shadow-none
              placeholder:text-slate-400
              transition-all
              duration-200
              focus:border-emerald-300
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-500/10
            "
          />

          {/* Search Shortcut */}
          <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-slate-200 bg-white px-1.5 py-1 text-[10px] font-medium text-slate-400 shadow-sm lg:flex">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Notification */}
        <div className="rounded-xl transition-all duration-200 hover:bg-slate-50">
          <NotificationDropdown />
        </div>

        {/* Divider */}
        <div className="mx-1 hidden h-7 w-px bg-slate-200 sm:block" />

        {/* User Dropdown */}
        <UserDropdown userInfo={userInfo} />
      </div>
    </div>
  );
};

export default DashboardNavbarContent;

