"use client"
import {useQuery} from "@tanstack/react-query"

const VendorsTable = () => {
    const {data: vendorDataResponse} = useQuery({
        queryKey: ["vendors"],
        queryFn: getVendors
    })
    return(
        <div>Vendors Table</div>
    )
}
export default VendorsTable