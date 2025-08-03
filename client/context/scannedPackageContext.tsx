// context/scannedPackageContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
export type PackageDetails = {
  title: string;
  name: string;
  urgent: boolean;
  imageUrl: string;
  apartment: string;
  trackingNumber: string;
};

type GroupedPackages = {
  [apartment: string]: PackageDetails[];
};

interface ScannedPackageContextType {
  groupedPackages: GroupedPackages;
  addPackageToApartment: (apartment: string, pkg: PackageDetails) => void;
  getPackageSummary: () => { apartment: string; count: number }[];
  getAllTrackingNumbers: () => string[];
  currentPackage: PackageDetails | null;
  setCurrentPackage: (pkg: PackageDetails | null) => void;
}

// Context
const ScannedPackageContext = createContext<
  ScannedPackageContextType | undefined
>(undefined);

// Provider
export const ScannedPackageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [groupedPackages, setGroupedPackages] = useState<GroupedPackages>({});
  const [currentPackage, setCurrentPackage] = useState<PackageDetails | null>(
    null
  );

  const addPackageToApartment = (apartment: string, pkg: PackageDetails) => {
    setGroupedPackages((prev) => {
      const existing = prev[apartment] || [];
      return {
        ...prev,
        [apartment]: [...existing, pkg],
      };
    });
  };

  const getPackageSummary = () => {
    return Object.entries(groupedPackages).map(([apartment, pkgs]) => ({
      apartment,
      count: pkgs.length,
    }));
  };

  const getAllTrackingNumbers = (): string[] => {
    return Object.values(groupedPackages)
      .flat()
      .map((pkg) => pkg.trackingNumber);
  };

  return (
    <ScannedPackageContext.Provider
      value={{
        groupedPackages,
        addPackageToApartment,
        getPackageSummary,
        getAllTrackingNumbers,
        currentPackage,
        setCurrentPackage,
      }}
    >
      {children}
    </ScannedPackageContext.Provider>
  );
};

// Hook
export const useScannedPackages = () => {
  const context = useContext(ScannedPackageContext);
  if (!context) {
    throw new Error(
      "useScannedPackages must be used within a ScannedPackageProvider"
    );
  }
  return context;
};
