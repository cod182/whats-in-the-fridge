// contexts/ApplianceContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react';

type ApplianceContextType = {
  appliance: appliance | null;
  setAppliance: React.Dispatch<React.SetStateAction<appliance | null>>;
};

// Create the context
const ApplianceContext = createContext<ApplianceContextType | undefined>(undefined);

// Provider component
export const ApplianceProvider = ({ children }: { children: ReactNode }) => {
  const [appliance, setAppliance] = useState<appliance | null>(null);

  return (
    <ApplianceContext.Provider value={{ appliance, setAppliance }}>
      {children}
    </ApplianceContext.Provider>
  );
};

// Custom hook to use the context
export const useApplianceContext = () => {
  const context = useContext(ApplianceContext);
  if (!context) {
    throw new Error('useApplianceContext must be used within an ApplianceProvider');
  }
  return context;
};
