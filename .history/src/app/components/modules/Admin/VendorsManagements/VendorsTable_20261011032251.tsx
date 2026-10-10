"use client"
import {useQuery} from "@tanstack"

const VendorsTable = () => {
    const {data: vendorDataResponse} = useQuery({

    })
    return(
        <div>Vendors Table</div>
    )
}
export default VendorsTable