"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getVendors } from "@/src/app/(commonLayout)/marketplace/vendors/_action";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/app/components/ui/card";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/components/ui/avatar";

import { Badge } from "@/src/app/components/ui/badge";

import { buttonVariants } from "@/src/app/components/ui/button";

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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Vendors
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Explore our marketplace vendors and their businesses.
        </p>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor: any) => (
          <Card
            key={vendor.id}
            className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={vendor.profilePhoto}
                    alt={vendor.name}
                  />

                  <AvatarFallback className="text-lg font-semibold">
                    {vendor.name
                      ?.split(" ")
                      .map((name: string) => name[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-lg font-semibold">
                    {vendor.name}
                  </h2>

                  <p className="truncate text-sm text-muted-foreground">
                    {vendor.companyName}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Business Type
                </span>

                <span className="text-sm font-medium">
                  {vendor.businessType}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Location
                </span>

                <span className="text-sm font-medium">
                  {vendor.city}, {vendor.country}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Status
                </span>

                <Badge
                  variant={
                    vendor.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                >
                  {vendor.status}
                </Badge>
              </div>
            </CardContent>

            <CardFooter>
              <Link
                href={`/marketplace/vendors/${vendor.id}`}
                className={buttonVariants({
                  className: "w-full",
                })}
              >
                View Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorList;