import { TSession, TSessionService } from 'hooks/session';
import React, { createContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuthCallback } from '../auth';

type ContextProps = {
  session: TSession;
  sessionService: TSessionService;
};

type ProviderProps = {
  pubRoot: string;
  authRoot: string;
};

//初期設定
export const AuthContext = createContext<ContextProps>({
  session: null,
  sessionService: {
    setSession: (token: TSession) => {},
    resetSession: () => {},
  },
});

//認証のハンドリング
export const useAuthenticate = (
  session: TSession,
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
  const [session, sessionService] = useAuthCallback();

  useAuthenticate(session, pubRoot, authRoot);

  return (
    <AuthContext.Provider
      value={{
        session,
        sessionService,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
