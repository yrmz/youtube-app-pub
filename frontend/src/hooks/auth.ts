import axios, { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import { enumSessionKey, useSession } from 'hooks/session';
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
  useEffect(() => {
    axios
      .get<TResSigninUrlApi>(SIGNIN_URL_URL, {})
      .then((res) => setUrl(res.data.url))
      .catch((err) => console.log(err));
  }, []);

  return url;
};

//ログアウト
export const useSignOut = () => {
  const authContext = useContext(AuthContext);

  return () => {
    // axios.interceptors.request.use((req) => {
    //   console.log(req);
    //   return req;
    // });

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authContext.session}`,
      },
    };

    authContext.setSession("");

    axios.post(SIGNOUT_URL, null, config).catch((err) => {
      console.log(err);
    });
  };
};

//SNS認証コールバックのハンドリング
export const useAuthCallback = (): [string, (value: string) => void] => {
  const [session, setSession] = useSession(enumSessionKey.session);
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
        .then((res) => setSession(res.data.token))
        .catch((err) => console.log(err));
    }
  }, [location.pathname]);

  return [session, setSession];
};
