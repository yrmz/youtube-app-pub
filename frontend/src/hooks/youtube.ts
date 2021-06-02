import axios, { AxiosRequestConfig } from 'axios';
import { useContext, useEffect, useState } from 'react';

import { useChannels } from './backend/channel';
import { AuthContext } from './context/authenticationContext';

const GOOGLE_API_ENDPOINT = process.env.REACT_APP_GOOGLE_API_ENDPOINT;
const YOUTUBE_SUBSCRIPTION_URL = `${GOOGLE_API_ENDPOINT}/youtube/v3/subscriptions`;

const initChannnelList: TStateChannnelList = {
  prevPageToken: "",
  nextPageToken: "",
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  items: [],
};

export const useYoutubeChannelList = (
  channelIds: string[] | null,
  tagId?: string
): [TStateChannnelList, boolean] => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState<TStateChannnelList>(initChannnelList);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getChannelList = () => {
    setIsLoading(true);

    if (tagId && !channelIds) {
      setData(initChannnelList);
      setIsLoading(false);
      return;
    }

    const url = new URL(YOUTUBE_SUBSCRIPTION_URL);
    const params = new URLSearchParams({
      part: "id,snippet",
      mine: "true",
      maxResults: "25",
    });
    if (channelIds) {
      params.set("forChannelId", channelIds.join(","));
    }

    url.search = params.toString();

    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authContext.googleApiToken}`,
      },
    };

    axios
      .get<TResYoutubeSubscriptionApi>(url.href, config)
      .then((res) =>
        setData({
          prevPageToken: res.data.prevPageToken,
          nextPageToken: res.data.nextPageToken,
          pageInfo: {
            totalResults: res.data.pageInfo.totalResults,
            resultsPerPage: res.data.pageInfo.resultsPerPage,
          },
          items: res.data.items.map((v: any) => ({
            title: v.snippet.title,
            description: v.snippet.description,
            channelId: v.snippet.resourceId.channelId,
            thumbnail: v.snippet.thumbnails.default.url,
          })),
        })
      )
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (authContext.googleApiToken) {
      getChannelList();
    }
  }, [authContext.googleApiToken, channelIds]);

  return [data, isLoading];
};
