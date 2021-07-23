import axios, { AxiosError, AxiosResponse } from 'axios';
import { GlobalContext } from 'hooks/context/globalContext';
import { useContext } from 'react';

const useHttpClient = () => {
  const client = axios.create();
  const context = useContext(GlobalContext);

  const onSuccess = (res: AxiosResponse) => {
    // context.setError({ status: 200, messaga: "" });
    return res;
  };

  const onError = (err: AxiosError) => {
    if (err.response) {
      context.setError({
        status: err.response.status,
        messaga: err.response.statusText,
      });

      console.log(context.error);
    }
    return false;
  };

  client.interceptors.response.use(onSuccess, onError);
  return client;
};

export default useHttpClient;
