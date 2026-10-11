"use client"
import { getVendors } from "@/src/services/vendor.service"
import {useQuery} from "@tanstack/react-query"
import {
    useReactTable,
    getCoreRowModel,
    flexRender
} from "@tanstack/react-table"

const VendorsTable = () => {
    const vendorColumns = [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "companyName", header: "Company" },
      { accessorKey: "contactNumber", header: "Contact Number" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "businessType", header: "Business Type" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "status", header: "Status" },
      { accessorKey: "createdAt", header: "Registered At" },
    ];
  
    const {data: vendorDataResponse} = useQuery({
        queryKey: ["vendors"],
        queryFn: getVendors
    });
    const {data: vendors} = vendorDataResponse! || [];
      const {getHeaderGroups, getRowModel} = useReactTable({
        data:vendors,
        columns: vendorColumns,
        getCoreRowModel: getCoreRowModel()  
    })
    console.log(vendors)
    return(
        <Table
    )
}
export default VendorsTable