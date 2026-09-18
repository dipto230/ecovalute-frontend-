import { notFound } from "next/navigation";

import { getVendors } from "./_action";

import { Avatar, AvatarFallback, AvatarImage } from "@/src/app/components/ui/avatar";
import { Badge } from "@/src/app/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/app/components/ui/card";
import { Separator } from "@/src/app/components/ui/separator";

const VendorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await getVendors();

  const vendors = response?.data?.data ?? [];

  const vendor = vendors.find(
    (item: {
      id: string;
    }) => item.id === id
  );

  if (!vendor) {
    notFound();
  }

  const initials = vendor.name
    ?.split(" ")
    .map((name: string) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Vendor Details
        </h1>

        <p className="mt-1 text-muted-foreground">
          View complete vendor information
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* ================= LEFT SIDE ================= */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Full Name"
                  value={vendor.name}
                />

                <Detail
                  label="Email"
                  value={vendor.email}
                />

                <Detail
                  label="Contact Number"
                  value={vendor.contactNumber}
                />

                <Detail
                  label="Alternate Contact"
                  value={vendor.alternateContactNumber}
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Company Name"
                  value={vendor.companyName}
                />

                <Detail
                  label="Business Type"
                  value={vendor.businessType}
                />

                <Detail
                  label="Trade License Number"
                  value={vendor.tradeLicenseNumber}
                />

                <Detail
                  label="Website"
                  value={vendor.website}
                />

                <Detail
                  label="Vendor Status"
                  value={vendor.status}
                />
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Address"
                  value={vendor.address}
                />

                <Detail
                  label="City"
                  value={vendor.city}
                />

                <Detail
                  label="State"
                  value={vendor.state}
                />

                <Detail
                  label="Postal Code"
                  value={vendor.postalCode}
                />

                <Detail
                  label="Country"
                  value={vendor.country}
                />
              </div>
            </CardContent>
          </Card>

          {/* Banking Information */}
          <Card>
            <CardHeader>
              <CardTitle>Banking Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  label="Bank Name"
                  value={vendor.bankName}
                />

                <Detail
                  label="Bank Account Number"
                  value={vendor.bankAccountNumber}
                />

                <Detail
                  label="Bank Branch"
                  value={vendor.bankBranch}
                />

                <Detail
                  label="Mobile Banking Number"
                  value={vendor.mobileBankingNumber}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents & Tax */}
          <Card>
            <CardHeader>
              <CardTitle>Documents & Tax Information</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                <Detail
                  label="NID Number"
                  value={vendor.nidNumber}
                />

                <Detail
                  label="TIN Number"
                  value={vendor.tinNumber}
                />

                <Detail
                  label="VAT Registration"
                  value={vendor.vatRegistrationNumber}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">
                {vendor.notes || "No notes available."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div>
          <Card className="sticky top-6 overflow-hidden">
            {/* Profile Header */}
            <div className="flex flex-col items-center px-6 py-8 text-center">
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage
                  src={vendor.profilePhoto}
                  alt={vendor.name}
                />

                <AvatarFallback className="text-3xl font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <h2 className="mt-5 text-2xl font-bold">
                {vendor.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {vendor.companyName}
              </p>

              <div className="mt-4">
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
            </div>

            <Separator />

            {/* Quick Information */}
            <CardContent className="space-y-5 pt-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-medium">
                  {vendor.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Phone
                </p>

                <p className="mt-1 text-sm font-medium">
                  {vendor.contactNumber || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Business Type
                </p>

                <p className="mt-1 text-sm font-medium">
                  {vendor.businessType || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium">
                  {vendor.city}, {vendor.country}
                </p>
              </div>

              {vendor.website && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Website
                  </p>

                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block break-all text-sm font-medium underline underline-offset-4 hover:text-primary"
                  >
                    Visit Website
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

/* ================= DETAIL COMPONENT ================= */

const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words font-medium">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default VendorDetailsPage;