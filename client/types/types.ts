type PackageInfo = {
  apartmentNumber: string;
  name: string;
  province: string;
  city: string;
};

export type PendingPackage = {
  trackingNumber: string;
  name: string;
  scannedDate: string;
  urgent: boolean;
  courrier: string;
  photo: string;
};

export type ApartmentGroup = {
  apartmentNumber: string;
  packages: PendingPackage[];
};

export type ApartmentSummary = {
  apartmentNumber: string; // <-- needed for context & filtering
  apartment: string; // e.g. "Apartment 101"
  count: number;
};

export type ConfirmedApartmentGroup = {
  apartmentNumber: string;
  packages: {
    trackingNumber: string;
    name: string;
    scannedDate: string;
    urgent: boolean;
    courrier: string;
    photo: string;
    confirmedDate: string;
  }[];
};

export type AuthUser = {
  userId: string;
  fullName: string;
  buildingName: string;
  buildingId: string;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
};
