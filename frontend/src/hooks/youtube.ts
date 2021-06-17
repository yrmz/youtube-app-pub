import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from './context/authenticationContext';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
const YOUTUBE_SUBSCRIPTION_URL = `${BACKEND_ENDPOINT}/auth/youtube/subscriptions`;

const initChannnelList: TStateChannnelList = {
  nextPageToken: "",
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  items: [],
};

export const useYoutubeChannelList = (
  tagId?: string
): [TStateChannnelList, boolean, () => void] => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<TStateChannnelList>(initChannnelList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getChannelList = () => {
    const url = new URL(YOUTUBE_SUBSCRIPTION_URL);
    const params = new URLSearchParams();
    if (tagId) {
      params.set("tagId", tagId);
    }
    if (data.nextPageToken) {
      params.set("pageToken", data.nextPageToken);
    }
    url.search = params.toString();

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authContext.session}`,
      },
    };

    return axios
      .get<TResYoutubeSubscriptionApi>(url.href, config)
      .then((res) =>
        setData((state) => ({
          nextPageToken: res.data.nextPageToken,
          pageInfo: {
            totalResults: res.data.pageInfo.totalResults,
            resultsPerPage: res.data.pageInfo.resultsPerPage,
          },
          items: [
            ...state.items,
            ...res.data.items.map((v: any) => ({
              title: v.title,
              description: v.description,
              channelId: v.channelId,
              thumbnail: v.thumbnail,
              tags:
                v.tags.map((t: any) => ({
                  tagId: t.tagId,
                  tagName: t.tagName,
                })) || [],
            })),
          ],
        }))
      )
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (authContext.session) {
      setIsLoading(true);
      setData(initChannnelList);
      getChannelList().then((v) => setIsLoading(false));
    }
  }, [tagId]);

  return [data, isLoading, getChannelList];
};
