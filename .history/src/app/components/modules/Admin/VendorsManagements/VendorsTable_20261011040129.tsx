"use client"
import { getVendors } from "@/src/services/vendor.service"
import {useQuery} from "@tanstack/react-query"

const VendorsTable = () => {
    const {data: vendorDataResponse} = useQuery({
        queryKey: ["vendors"],
        queryFn: getVendors
    });
    const {data: vendors} = 
    return(
        <div>Vendors Table</div>
    )
}
export default VendorsTable