```ts
export type VendorStatus =
  | "PENDING"
  | "ACTIVE"
  | "BLOCKED"
  | "REJECTED"
  | "SUSPENDED";

export interface IVendor {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string | null;
  contactNumber?: string | null;
  alternateContactNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  companyName?: string | null;
  tradeLicenseNumber?: string | null;
  nidNumber?: string | null;
  tinNumber?: string | null;
  vatRegistrationNumber?: string | null;
  website?: string | null;
  businessType?: string | null;
  status: VendorStatus;

  bankName?: string | null;
  bankAccountNumber?: string | null;
  bankBranch?: string | null;
  mobileBankingNumber?: string | null;
  notes?: string | null;

  category: string[];

  createdAt: string;
  updatedAt: string;
}

export interface IUpdateVendorPayload {
  name?: string;
  email?: string;
  profilePhoto?: string | null;
  contactNumber?: string;
  alternateContactNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  companyName?: string;
  tradeLicenseNumber?: string;
  nidNumber?: string;
  tinNumber?: string;
  vatRegistrationNumber?: string;
  website?: string;
  businessType?: string;
  status?: VendorStatus;

  bankName?: string;
  bankAccountNumber?: string;
  bankBranch?: string;
  mobileBankingNumber?: string;
  notes?: string;

  category?: string[];
}
```