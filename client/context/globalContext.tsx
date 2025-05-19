import React, { createContext, useContext, useState, ReactNode } from "react";

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalContext = createContext<any>(null);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [fullPackageUri, setFullPackageUri] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [detailsUri, setDetailsUri] = useState<string | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        fullPackageUri,
        setFullPackageUri,
        detailsUri,
        setDetailsUri,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
