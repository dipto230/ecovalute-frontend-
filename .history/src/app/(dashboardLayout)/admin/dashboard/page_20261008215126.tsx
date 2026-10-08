import { getDashboardData } from "@/src/services/dashboard.service";
import {HydrationBoundary, QueryClient} from "@tanstack/react-query"

const AdminDashboardPage = async() => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["admin-dashboard-data"],
    queryFn: getDashboardData,

  })
  return (
  <HydrationBoundary
  )
}

export default AdminDashboardPage