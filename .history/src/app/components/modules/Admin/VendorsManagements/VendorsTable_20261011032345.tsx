"use client"
import {useQuery} from "@tanstack/react-query"

const VendorsTable = () => {
    const {data: vendorDataResponse} = useQuery({
        queryKey: [""]
    })
    return(
        <div>Vendors Table</div>
    )
}
export default VendorsTable