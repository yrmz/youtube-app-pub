import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from './context/authenticationContext';

export type TErrorHandle = {
  status: number;
  message: string;
};

export const initErrorHandle: TErrorHandle = {
  status: 200,
  message: "",
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
    const url = context.session ? "/app/error" : "/error";
    if (error.status === 401 || error.status === 403) {
      context.sessionService.resetSession();
      setError(initErrorHandle);
    } else if (error.status >= 400) {
      history.push(url);
    }
  }, [error]);

  return [error, setError];
};
