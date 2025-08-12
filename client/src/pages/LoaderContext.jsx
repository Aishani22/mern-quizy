import React, { createContext, useState, useContext } from 'react';
import Loader from './Loader';

const LoaderContext = createContext();

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && <Loader />} {/* Loader appears above all content */}
    </LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
