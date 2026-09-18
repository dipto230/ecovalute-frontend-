import { notFound } from "next/navigation";

import { getVendors } from "../_action";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/app/components/ui/avatar";

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
    <main className="mx-auto flex h-[calc(100vh-64px)] max-w-7xl flex-col overflow-hidden px-4 py-5 md:px-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}
      <div className="mb-5 shrink-0 animate-in fade-in slide-in-from-top-3 duration-500">
        <div className="flex items-center gap-3">
          <div className="h-9 w-1 rounded-full bg-primary" />

          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Vendor Details
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View complete vendor information
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="grid min-h-0 flex-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">

        {/* =================================================
            LEFT SIDE
        ================================================== */}
        <div className="grid min-h-0 grid-cols-1 content-start gap-4 overflow-hidden md:grid-cols-2">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================== */}
          <InfoCard
            title="Personal Information"
            delay="delay-75"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

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
          </InfoCard>


          {/* =================================================
              BUSINESS INFORMATION
          ================================================== */}
          <InfoCard
            title="Business Information"
            delay="delay-100"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

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
          </InfoCard>


          {/* =================================================
              ADDRESS INFORMATION
          ================================================== */}
          <InfoCard
            title="Address Information"
            delay="delay-150"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

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
          </InfoCard>


          {/* =================================================
              BANKING INFORMATION
          ================================================== */}
          <InfoCard
            title="Banking Information"
            delay="delay-200"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

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
          </InfoCard>


          {/* =================================================
              DOCUMENTS & TAX
          ================================================== */}
          <InfoCard
            title="Documents & Tax Information"
            delay="delay-300"
          >
            <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">

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
          </InfoCard>


          {/* =================================================
              NOTES
          ================================================== */}
          <InfoCard
            title="Notes"
            delay="delay-500"
          >
            <p className="text-sm leading-6 text-muted-foreground">
              {vendor.notes || "No notes available."}
            </p>
          </InfoCard>

        </div>


        {/* =================================================
            RIGHT SIDE - VENDOR PROFILE
        ================================================== */}
        <div className="min-h-0 animate-in fade-in slide-in-from-right-5 duration-700">

          <Card className="h-fit overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md">

            {/* =================================================
                PROFILE HEADER
            ================================================== */}
            <div className="relative flex flex-col items-center px-6 py-7 text-center">

              {/* Decorative background */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-muted/60 to-transparent" />

              {/* Avatar */}
              <div className="relative">

                {/* Glow */}
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10 blur-xl" />

                <Avatar className="relative h-28 w-28 border-4 border-background shadow-lg transition-transform duration-300 hover:scale-105">

                  <AvatarImage
                    src={vendor.profilePhoto}
                    alt={vendor.name}
                  />

                  <AvatarFallback className="bg-muted text-2xl font-semibold">
                    {initials}
                  </AvatarFallback>

                </Avatar>
              </div>


              {/* Name */}
              <h2 className="mt-4 text-xl font-bold tracking-tight">
                {vendor.name}
              </h2>


              {/* Company */}
              <p className="mt-1 text-sm text-muted-foreground">
                {vendor.companyName}
              </p>


              {/* Status */}
              <div className="mt-3">
                <Badge
                  variant={
                    vendor.status === "ACTIVE"
                      ? "default"
                      : "secondary"
                  }
                  className="px-3 py-1 text-xs font-semibold"
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current" />
                  {vendor.status}
                </Badge>
              </div>

            </div>


            <Separator />


            {/* =================================================
                QUICK INFORMATION
            ================================================== */}
            <CardContent className="space-y-5 p-5">

              {/* Email */}
              <QuickInfo
                label="Email"
                value={vendor.email}
              />


              {/* Phone */}
              <QuickInfo
                label="Phone"
                value={vendor.contactNumber || "N/A"}
              />


              {/* Business Type */}
              <QuickInfo
                label="Business Type"
                value={vendor.businessType || "N/A"}
              />


              {/* Location */}
              <QuickInfo
                label="Location"
                value={
                  vendor.city && vendor.country
                    ? `${vendor.city}, ${vendor.country}`
                    : "N/A"
                }
              />


              {/* Website */}
              {vendor.website && (
                <div className="rounded-xl bg-muted/40 p-3 transition-colors duration-200 hover:bg-muted/60">

                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Website
                  </p>

                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block truncate text-sm font-medium text-primary underline-offset-4 transition-all hover:underline"
                  >
                    Visit Website
                  </a>

                </div>
              )}

            </CardContent>

          </Card>

        </div>

      </div>
    </main>
  );
};




const InfoCard = ({
  title,
  children,
  delay = "",
}: {
  title: string;
  children: React.ReactNode;
  delay?: string;
}) => {
  return (
    <Card
      className={`animate-in fade-in slide-in-from-bottom-3 rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${delay}`}
    >

      <CardHeader className="px-4 pb-2 pt-4">
        <CardTitle className="text-base font-semibold">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-2">
        {children}
      </CardContent>

    </Card>
  );
};



const Detail = ({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) => {
  return (
    <div className="min-w-0">

      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p
        className="mt-1 break-words text-sm font-semibold leading-5"
        title={value || "N/A"}
      >
        {value || "N/A"}
      </p>

    </div>
  );
};




const QuickInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-xl bg-muted/40 p-3 transition-all duration-200 hover:bg-muted/60">

      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>

      <p
        className="mt-1 break-all text-sm font-semibold leading-5"
        title={value}
      >
        {value}
      </p>

    </div>
  );
};


export default VendorDetailsPage;