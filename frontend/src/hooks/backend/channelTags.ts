import axios, { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import { useContext, useEffect, useRef, useState } from 'react';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const TAGS_URL = `${BACKEND_ENDPOINT}/auth/tags`;
const TAGS_ADD_CHANNEL = `${BACKEND_ENDPOINT}/auth/tags/channel/add`;
const TAGS_DELETE_CHANNEL = `${BACKEND_ENDPOINT}/auth/tags/channel/delete`;

export const useChannelTags = (channelIds: string[]): TUseChannelTags => {
  const authContext = useContext(AuthContext);
  const [channelTags, setChannelTags] = useState<TStateChannelTags>([]);
  const isFirstRendere = useRef(false);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authContext.session}`,
    },
  };

  const getChannelTags = () => {
    const url = new URL(TAGS_URL);
    const params = new URLSearchParams({
      channelId: channelIds.join(","),
    });
    url.search = params.toString();

    axios
      .get<TResTagsApi>(url.toString(), config)
      .then((res) => {
        const channelTags: TStateChannelTags = res.data
          ? res.data.map((v) => ({
              channelId: v.channelId,
              tags: v.tags
                ? v.tags.map((t) => ({
                    tagId: t.tagId,
                    tagName: t.tagName,
                  }))
                : [],
            }))
          : [];
        setChannelTags(channelTags);
      })
      .catch((err) => console.log(err));
  };

  const addChannelTag = (tagId: number, channelId: string) => {
    axios
      .post(TAGS_ADD_CHANNEL, { channelId: channelId, tagId: tagId }, config)
      .then(() => getChannelTags())
      .catch((err) => console.log(err));
  };

  const deleteChannelTag = (tagId: number, channelId: string) => {
    axios
      .post(TAGS_DELETE_CHANNEL, { channelId: channelId, tagId: tagId }, config)
      .then(() => getChannelTags())
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   if (channelIds.length > 0 && !isFirstRendere.current) {
  //     getChannelTags();
  //     isFirstRendere.current = true;
  //   }
  // }, [channelIds]);

  return [channelTags, { getChannelTags, addChannelTag, deleteChannelTag }];
};
