import axios, { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import { enumSessionKey, TSession, TSessionService, useSession } from 'hooks/session';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { GlobalContext } from './context/globalContext';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const REDIRECT_URL = `${window.location.origin}/auth/callback`;
const SIGNIN_URL_URL = `${BACKEND_ENDPOINT}/socialLogin?redirectUrl=${REDIRECT_URL}`;
const SIGNOUT_URL = `${BACKEND_ENDPOINT}/auth/socialLogout`;
const CALLBACK_URL = `${BACKEND_ENDPOINT}/callback`;

//SNS認証URL取得
export const useSigninUrl = (): string => {
  const [url, setUrl] = useState("");
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get<TResSigninUrlApi>(SIGNIN_URL_URL, {})
      .then((res) => setUrl(res.data.url))
      .catch((err) =>
        globalContext.setError({
          status: err.response.status,
          message: err.response.statusText,
        })
      );
  }, []);

  return url;
};

//ログアウト
export const useSignOut = () => {
  const authContext = useContext(AuthContext);
  const globalContext = useContext(GlobalContext);

  return () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authContext.session}`,
      },
    };

    authContext.sessionService.resetSession();
    axios.post(SIGNOUT_URL, null, config).catch((err) =>
      globalContext.setError({
        status: err.response.status,
        message: err.response.statusText,
      })
    );
  };
};

//SNS認証コールバックのハンドリング
export const useAuthCallback = (): [TSession, TSessionService] => {
  const [session, sessionService] = useSession(enumSessionKey.session);
  const globalContext = useContext(GlobalContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/auth/callback") {
      const query = new URLSearchParams(location.search);
      const state = query.get("state") || "";
      const code = query.get("code") || "";

      const body = {
        state: state,
        code: code,
        redirectUrl: REDIRECT_URL,
      };

      axios
        .post<TResCallbackApi>(CALLBACK_URL, body)
        .then((res) => sessionService.setSession(res.data.token))
        .catch((err) =>
          globalContext.setError({
            status: err.response.status,
            message: err.response.statusText,
          })
        );
    }
  }, [location.pathname]);

  return [session, sessionService];
};
