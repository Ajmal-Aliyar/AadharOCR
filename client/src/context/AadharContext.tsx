import { createContext, useContext, useState, type ReactNode } from "react";

export type AadhaarDetails = {
  name: string | null;
  dob: string | null;
  gender: string | null;
  UID: string | null;
  address: string | null;
  pincode: string | null;
  ageBand: string | null;
};

type AadhaarContextType = {
  details: AadhaarDetails | null;
  setDetails: (data: AadhaarDetails | null) => void;
};

const AadhaarContext = createContext<AadhaarContextType | undefined>(undefined);

export const AadhaarProvider = ({ children }: { children: ReactNode }) => {
  const [details, setDetails] = useState<AadhaarDetails | null>(null);

  return (
    <AadhaarContext.Provider value={{ details, setDetails }}>
      {children}
    </AadhaarContext.Provider>
  );
};

export const useAadhaar = () => {
  const ctx = useContext(AadhaarContext);
  if (!ctx) {
    throw new Error("useAadhaar must be used inside AadhaarProvider");
  }
  return ctx;
};
