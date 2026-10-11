import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import CategoriesTable from "@/src/app/components/modules/Admin/CategoriesManagements/CategoriesTable";
import { getCategories } from "@/src/services/category.service";

const CategoriesManagementPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
        <CategoriesTable />
      </div>
    </HydrationBoundary>
  );
};

export default CategoriesManagementPage;