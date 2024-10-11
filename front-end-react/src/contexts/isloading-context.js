import React, { useState, createContext, useContext } from "react";

const defaultValue = {
  isLoading: false,
  setUser: () => {},
};

const IsLoadingContext = createContext(defaultValue);

export default function IsLoadingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <IsLoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </IsLoadingContext.Provider>
  );
}

export const useIsLoadingContext = () => {
  const context = useContext(IsLoadingContext);
  return context;
};
