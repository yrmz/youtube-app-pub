import { useState } from 'react';

export const useSession = (
  key: enumSessionKey
): [string, (value: string) => void] => {
  const value = localStorage.getItem(key) || "";
  const [session, set] = useState<string>(value);

  const setSession = (value: string) => {
    set(value);
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  };

  return [session, setSession];
};

export enum enumSessionKey {
  session = "session",
}
