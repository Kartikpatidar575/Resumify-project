import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const startFirstLoading = () => setFirstLoading(true);
  const stopFirstLoading = () => setFirstLoading(false);
  return (
    <LoadingContext.Provider
      value={{
        loading,
        firstLoading,
        startLoading,
        stopLoading,
        startFirstLoading,
        stopFirstLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
