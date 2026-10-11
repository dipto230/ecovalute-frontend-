```tsx
import React from "react";
import DashboardNavbar from "../components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "../components/modules/Dashboard/DashboardSidebar";

const RootDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-dvh min-h-0 overflow-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar />

      {/* Main Dashboard Area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <DashboardNavbar />

        <main className="min-h-0 flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="w-full min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootDashboardLayout;
```