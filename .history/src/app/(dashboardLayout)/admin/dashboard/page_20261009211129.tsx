import AdminDashboardContent from "@/src/app/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/src/services/dashboard.service";
import { ApiResponse } from "@/src/types/api.types";
import { IAdminDashboardData } from "@/src/types/dashboard.types";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"

const AdminDashboardPage = async() => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["admin-dashboard-data"],
    queryFn: getDashboardData,
    staleTime: 30 

  })
  const dashboardData = queryClient.getQueryData(["admin-dashboard-data"]) as ApiResponse<IAdminDashboardData>;
  console.log(dashboardData.data, "Dashboard Data from Server Action");
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent/>
  </HydrationBoundary>
  )
}

export default AdminDashboardPage