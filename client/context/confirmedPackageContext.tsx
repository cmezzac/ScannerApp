import { ConfirmedApartmentGroup } from "@/types/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ConfirmedPackagesContextType {
  allConfirmedPackages: ConfirmedApartmentGroup[] | null;
  selectedConfirmedApartment: string | null;
  setAllConfirmedPackages: (data: ConfirmedApartmentGroup[]) => void;
  setSelectedConfirmedApartment: (apt: string) => void;
  clearConfirmed: () => void;
}

const ConfirmedPackagesContext =
  createContext<ConfirmedPackagesContextType | null>(null);

export const ConfirmedPackagesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allConfirmedPackages, setAllConfirmedPackagesState] = useState<
    ConfirmedApartmentGroup[] | null
  >(null);
  const [selectedConfirmedApartment, setSelectedConfirmedApartmentState] =
    useState<string | null>(null);

  const setAllConfirmedPackages = (data: ConfirmedApartmentGroup[]) =>
    setAllConfirmedPackagesState(data);

  const setSelectedConfirmedApartment = (apt: string) =>
    setSelectedConfirmedApartmentState(apt);

  const clearConfirmed = () => {
    setAllConfirmedPackagesState(null);
    setSelectedConfirmedApartmentState(null);
  };

  return (
    <ConfirmedPackagesContext.Provider
      value={{
        allConfirmedPackages,
        selectedConfirmedApartment,
        setAllConfirmedPackages,
        setSelectedConfirmedApartment,
        clearConfirmed,
      }}
    >
      {children}
    </ConfirmedPackagesContext.Provider>
  );
};

export const useConfirmedPackages = () => {
  const context = useContext(ConfirmedPackagesContext);
  if (!context)
    throw new Error(
      "useConfirmedPackages must be used within ConfirmedPackagesProvider"
    );
  return context;
};
