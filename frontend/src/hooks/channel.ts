import axios, { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import { useContext, useEffect, useState } from 'react';

import { GlobalContext } from './context/globalContext';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
const TAGS_CHANNEL_URL = `${BACKEND_ENDPOINT}/auth/tags/channel`;

type TStateChannels = {
  channelIds: string[] | null;
};

type ResTagChannels = {
  channelIds: string[];
};

//タグ別にチャンネルID取得
export const useChannels = (tagId: string): [TStateChannels] => {
  const globalContext = useContext(GlobalContext);
  const authContext = useContext(AuthContext);
  const [channels, setChannels] = useState<TStateChannels>({
    channelIds: null,
  });

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authContext.session}`,
    },
  };

  const getChannels = () => {
    const url = new URL(TAGS_CHANNEL_URL);
    const params = new URLSearchParams({ tagId: tagId });
    url.search = params.toString();

    axios
      .get<ResTagChannels>(url.toString(), config)
      .then((res) => setChannels({ channelIds: res.data.channelIds }))
      .catch((err) =>
        globalContext.setError({
          status: err.response.status,
          message: err.response.statusText,
        })
      );
  };

  useEffect(() => {
    if (tagId) {
      getChannels();
    }
  }, [tagId]);

  return [channels];
};
