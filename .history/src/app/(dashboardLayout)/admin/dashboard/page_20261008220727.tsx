import AdminDashboardContent from "@/src/app/components/modules/Dashboard/AdminDashboardContent";
import { getDashboardData } from "@/src/services/dashboard.service";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query"

const AdminDashboardPage = async() => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["admin-dashboard-data"],
    queryFn: getDashboardData,

  })
  const dashboardData = queryClient
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent/>
  </HydrationBoundary>
  )
}

export default AdminDashboardPage