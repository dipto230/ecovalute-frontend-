import {QueryClient} from "@tanstack/react-query"

const AdminDashboardPage = () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:["admin-dashboard-data"],
    queryFn: getDashboardDat
  })
  return (
    <div>AdminDashboardPage</div>
  )
}

export default AdminDashboardPage