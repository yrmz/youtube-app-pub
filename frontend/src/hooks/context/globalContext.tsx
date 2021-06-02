import React, { useState } from 'react';

export const GlobalContext = React.createContext<{}>({});

export const GlobalProvider: React.FC<{}> = ({ children }) => {
  // const [error, setError] = useState(false);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
