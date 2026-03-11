import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const value = useMemo(
    () => ({
      refreshKey,
      refresh: () => setRefreshKey((value) => value + 1)
    }),
    [refreshKey]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
