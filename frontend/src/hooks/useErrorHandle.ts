import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from './context/authenticationContext';

export type TErrorHandle = {
  status: number;
  messaga: string;
};

export const initErrorHandle: TErrorHandle = {
  status: 200,
  messaga: "",
};

export const useErrorHandle = (): [
  TErrorHandle,
  React.Dispatch<React.SetStateAction<TErrorHandle>>
] => {
  //reducerに変更
  const [error, setError] = useState<TErrorHandle>(initErrorHandle);
  const context = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    console.log("use " + error);
    const url = context.session ? "/app/error" : "/error";
    if (error.status === 401 || error.status === 403) {
      context.setSession("");
      setError(initErrorHandle);
    } else if (error.status >= 400) {
      history.push(url);
    }
  }, [error]);

  return [error, setError];
};
