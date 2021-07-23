import { AxiosRequestConfig } from 'axios';
import useHttpClient from 'hooks/useHttpClient';
import { Reducer, useContext, useEffect, useReducer, useState } from 'react';

import { AuthContext } from './context/authenticationContext';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;
const YOUTUBE_SUBSCRIPTION_URL = `${BACKEND_ENDPOINT}/auth/youtube/subscriptions`;
const TAGS_ADD_CHANNEL = `${BACKEND_ENDPOINT}/auth/tags/channel/add`;
const TAGS_DELETE_CHANNEL = `${BACKEND_ENDPOINT}/auth/tags/channel/delete`;

const initChannnelList: TStateChannnelList = {
  nextPageToken: "",
  pageInfo: {
    totalResults: 0,
    resultsPerPage: 0,
  },
  items: [],
};

const reducer: Reducer<TStateChannnelList, TActionChannelList> = (
  state,
  action
) => {
  switch (action.type) {
    case "addChannelList":
      const channelList = action.payload.addChannelList;
      if (channelList) {
        state = {
          ...channelList,
          items: [...state.items, ...channelList.items],
        };
      }
      break;
    case "updateTags":
      state = {
        ...state,
        items: state.items.map((i) =>
          i.channelId === action.payload.updateTags?.channelId
            ? {
                ...i,
                tags: action.payload.updateTags.tags,
              }
            : i
        ),
      };
      break;
    case "init":
      state = initChannnelList;
      break;
  }

  return state;
};

export const useYoutubeChannelList = (
  tagId?: string
): [TStateChannnelList, boolean, TYoutubeSubscriptionService] => {
  const httpClient = useHttpClient();
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initChannnelList);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authContext.session}`,
    },
  };

  const getChannelList = () => {
    const url = new URL(YOUTUBE_SUBSCRIPTION_URL);
    const params = new URLSearchParams();
    if (tagId) {
      params.set("tagId", tagId);
    }
    if (state.nextPageToken) {
      params.set("pageToken", state.nextPageToken);
    }
    url.search = params.toString();

    return httpClient
      .get<TResYoutubeSubscriptionApi>(url.href, config)
      .then((res) =>
        dispatch({
          type: "addChannelList",
          payload: { addChannelList: res.data },
        })
      );
  };

  const addChannelTag = (tagId: number, channelId: string) => {
    httpClient
      .post<TResAddTag>(
        TAGS_ADD_CHANNEL,
        { channelId: channelId, tagId: tagId },
        config
      )
      .then((res) =>
        dispatch({
          type: "updateTags",
          payload: {
            updateTags: {
              channelId: res.data.channelId,
              tags: res.data.tags,
            },
          },
        })
      )
      .catch((err) => console.log(err));
  };

  const deleteChannelTag = (tagId: number, channelId: string) => {
    httpClient
      .post<TResDeleteTag>(
        TAGS_DELETE_CHANNEL,
        { channelId: channelId, tagId: tagId },
        config
      )
      .then((res) =>
        dispatch({
          type: "updateTags",
          payload: {
            updateTags: {
              channelId: res.data.channelId,
              tags: res.data.tags,
            },
          },
        })
      )
      .catch((err) => console.log(err));
  };

  //タグページ別チャンネルリスト
  useEffect(() => {
    if (authContext.session) {
      setIsLoading(true);
      dispatch({ type: "init", payload: {} });
      getChannelList().then((v) => setIsLoading(false));
    }
  }, [tagId]);

  return [
    state,
    isLoading,
    { getChannelList, addChannelTag, deleteChannelTag },
  ];
};
