import React, { createContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuthCallback, useGoogleApiToken } from '../backend/auth';

type ContextProps = {
  session: string;
  setSession: (value: string) => void;
  googleApiToken: string;
  setGoogleApiToken: (value: string) => void;
};

type ProviderProps = {
  pubRoot: string;
  authRoot: string;
};

//初期設定
export const AuthContext = createContext<ContextProps>({
  session: "",
  setSession: (value: string) => {},
  googleApiToken: "",
  setGoogleApiToken: (value: string) => {},
});

//認証のハンドリング
export const useAuthenticate = (
  session: string,
  pubRoot: string,
  authRoot: string
) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (session && !location.pathname.includes(authRoot)) {
      history.push(authRoot);
    } else if (!session && location.pathname.includes(authRoot)) {
      history.push(pubRoot);
    }
  }, [session, location.pathname]);
};

//認証プロバイダ
export const AuthProvider: React.FC<ProviderProps> = ({
  children,
  pubRoot,
  authRoot,
}) => {
  const [session, setSession] = useAuthCallback();
  const [googleApiToken, setGoogleApiToken] = useGoogleApiToken(session);

  useAuthenticate(session, pubRoot, authRoot);

  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        googleApiToken,
        setGoogleApiToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
