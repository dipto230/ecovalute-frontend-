import { notFound } from "next/navigation";

import { getVendors } from "./_action";

const VendorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const response = await getVendors();

  const vendors = response?.data?.data ?? [];

  const vendor = vendors.find(
    (item: any) => item.id === id
  );

  if (!vendor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {vendor.name}
        </h1>

        <p className="mt-1 text-muted-foreground">
          {vendor.companyName}
        </p>
      </div>

      {/* Personal Information */}
      <div className="mb-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Personal Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Detail label="Name" value={vendor.name} />
          <Detail label="Email" value={vendor.email} />
          <Detail
            label="Contact Number"
            value={vendor.contactNumber}
          />
          <Detail
            label="Alternate Contact"
            value={vendor.alternateContactNumber}
          />
        </div>
      </div>

      {/* Business Information */}
      <div className="mb-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Business Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
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
            label="Status"
            value={vendor.status}
          />
        </div>
      </div>

      {/* Address */}
      <div className="mb-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Address
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Detail label="Address" value={vendor.address} />
          <Detail label="City" value={vendor.city} />
          <Detail label="State" value={vendor.state} />
          <Detail
            label="Postal Code"
            value={vendor.postalCode}
          />
          <Detail label="Country" value={vendor.country} />
        </div>
      </div>

      {/* Banking Information */}
      <div className="mb-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Banking Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
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
            label="Mobile Banking"
            value={vendor.mobileBankingNumber}
          />
        </div>
      </div>

      {/* Tax & Documents */}
      <div className="mb-6 rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Documents & Tax Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
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
      </div>

      {/* Notes */}
      <div className="rounded-xl border p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Notes
        </h2>

        <p className="text-sm leading-6 text-muted-foreground">
          {vendor.notes || "No notes available."}
        </p>
      </div>
    </div>
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
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-medium">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default VendorDetailsPage;