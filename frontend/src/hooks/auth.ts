import { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import { enumSessionKey, useSession } from 'hooks/session';
import useHttpClient from 'hooks/useHttpClient';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const REDIRECT_URL = `${window.location.origin}/auth/callback`;
const SIGNIN_URL_URL = `${BACKEND_ENDPOINT}/socialLogin?redirectUrl=${REDIRECT_URL}`;
const SIGNOUT_URL = `${BACKEND_ENDPOINT}/auth/socialLogout`;
const CALLBACK_URL = `${BACKEND_ENDPOINT}/callback`;

//SNS認証URL取得
export const useSigninUrl = (): string => {
  const [url, setUrl] = useState("");
  const httpClient = useHttpClient();

  useEffect(() => {
    httpClient
      .get<TResSigninUrlApi>(SIGNIN_URL_URL, {})
      .then((res) => setUrl(res.data.url))
      .catch((err) => console.log(err));
  }, []);

  return url;
};

//ログアウト
export const useSignOut = () => {
  const authContext = useContext(AuthContext);
  const httpClient = useHttpClient();

  return () => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authContext.session}`,
      },
    };

    authContext.setSession("");
    httpClient.post(SIGNOUT_URL, null, config);
  };
};

//SNS認証コールバックのハンドリング
export const useAuthCallback = (): [string, (value: string) => void] => {
  const [session, setSession] = useSession(enumSessionKey.session);
  const httpClient = useHttpClient();
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

      httpClient
        .post<TResCallbackApi>(CALLBACK_URL, body)
        .then((res) => setSession(res.data.token));
    }
  }, [location.pathname]);

  return [session, setSession];
};
