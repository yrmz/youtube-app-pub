import { TErrorHandle, useErrorHandle } from 'hooks/useErrorHandle';
import React from 'react';

type ContextProps = {
  error: TErrorHandle;
  setError: React.Dispatch<React.SetStateAction<TErrorHandle>>;
};

export const GlobalContext = React.createContext<ContextProps>({
  error: { status: 200, messaga: "" },
  setError: () => {},
});

export const GlobalProvider: React.FC<{}> = ({ children }) => {
  const [error, setError] = useErrorHandle();

  return (
    <GlobalContext.Provider value={{ error, setError }}>
      {children}
    </GlobalContext.Provider>
  );
};
