'use client';
import React, { createContext, useContext, useState } from 'react';

// Define the types
interface NavigationContextProps {
  isNavigationOpen: boolean;
  toggleNavigation: () => void;
}

// Create a context
const NavigationContext = createContext<NavigationContextProps | undefined>(
  undefined
);

// Create a provider component
export const NavigationProvider = ({ children }: any) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  const toggleNavigation = () => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <NavigationContext.Provider value={{ isNavigationOpen, toggleNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Custom hook to use the global state
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
