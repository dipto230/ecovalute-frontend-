"use client";

import { useQuery } from "@tanstack/react-query";
import { getVendors } from "@/src/app/(commonLayout)/marketplace/vendors/[id]/_action";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/app/components/ui/table";

import { Badge } from "@/src/app/components/ui/badge";

const VendorList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["vendors"],
    queryFn: getVendors,
  });

  if (isLoading) {
    return <div className="p-6">Loading vendors...</div>;
  }

  if (isError) {
    return <div className="p-6">Failed to load vendors.</div>;
  }

  const vendors = data?.data?.data ?? [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <p className="text-sm text-muted-foreground">
          Manage marketplace vendors
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vendors.map((vendor: any) => (
              <TableRow key={vendor.id}>
                <TableCell className="font-medium">
                  {vendor.businessName || vendor.name || "N/A"}
                </TableCell>

                <TableCell>
                  {vendor.email || "N/A"}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {vendor.status || "N/A"}
                  </Badge>
                </TableCell>

                <TableCell>
                  {vendor.phone || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VendorList;