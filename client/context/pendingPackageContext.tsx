import { ApartmentGroup } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PendingPackagesContextType {
  allPackages: ApartmentGroup[] | null;
  selectedApartment: string | null;
  setAllPackages: (data: ApartmentGroup[]) => void;
  setSelectedApartment: (apt: string) => void;
  clear: () => void;
}

const PendingPackagesContext = createContext<PendingPackagesContextType | null>(
  null
);

export const PendingPackagesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allPackages, setAllPackagesState] = useState<ApartmentGroup[] | null>(
    null
  );
  const [selectedApartment, setSelectedApartmentState] = useState<
    string | null
  >(null);

  const setAllPackages = (data: ApartmentGroup[]) => setAllPackagesState(data);
  const setSelectedApartment = (apt: string) => setSelectedApartmentState(apt);
  const clear = () => {
    setAllPackagesState(null);
    setSelectedApartmentState(null);
  };

  return (
    <PendingPackagesContext.Provider
      value={{
        allPackages,
        selectedApartment,
        setAllPackages,
        setSelectedApartment,
        clear,
      }}
    >
      {children}
    </PendingPackagesContext.Provider>
  );
};

export const usePendingPackages = () => {
  const context = useContext(PendingPackagesContext);
  if (!context)
    throw new Error(
      "usePendingPackages must be used within PendingPackagesProvider"
    );
  return context;
};
