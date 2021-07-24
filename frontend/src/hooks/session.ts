import { useEffect, useState } from 'react';

export type TSession = string | null;
export type TSessionService = {
  setSession: (token: string) => void;
  resetSession: () => void;
};

export const useSession = (
  key: enumSessionKey
): [TSession, TSessionService] => {
  const [state, setState] = useState<TSession>(null);

  const setSession = (token: string) => {
    setState(token);
  };

  const resetSession = () => {
    console.log("reset");
    setState(null);
  };

  useEffect(() => {
    const token = localStorage.getItem(key);
    setState(token);
  }, []);

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, state);
    } else {
      localStorage.removeItem(key);
    }
  });

  return [state, { setSession, resetSession }];
};

export enum enumSessionKey {
  session = "session",
}
