import { getVendors } from "@/src/app/(commonLayout)/marketplace/vendors/[id]/_action"
import { useQuery } from "@tanstack/react-query"

const VendorList = () => {
    const { data } = useQuery({
        queryKey: ["vendors"],
        queryFn: () => getVendors(),
    });
    console.log(data);
    return (
        <div>VendorList</div>
    )
}
expor