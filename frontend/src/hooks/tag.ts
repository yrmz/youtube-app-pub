import { AxiosRequestConfig } from 'axios';
import { AuthContext } from 'hooks/context/authenticationContext';
import useHttpClient from 'hooks/useHttpClient';
import { useContext, useEffect, useState } from 'react';

const BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT;

const TAG_LIST_URL = `${BACKEND_ENDPOINT}/auth/tags/list`;
const ADD_TAG_URL = `${BACKEND_ENDPOINT}/auth/tags`;
const DELETE_TAG_URL = `${BACKEND_ENDPOINT}/auth/tags/delete`;

export const useTags = (): TUseTags => {
  const authContext = useContext(AuthContext);
  const httpClient = useHttpClient();
  const [tags, setTags] = useState<TStateTag[]>([]);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authContext.session}`,
    },
  };

  // タグ一覧取得
  const getTags = () => {
    httpClient
      .get<TResTagDetailApi[]>(TAG_LIST_URL, config)
      .then((res) => {
        const tags = res.data.map<TStateTag>((v) => ({
          id: v.tagId,
          name: v.tagName,
          description: v.description,
        }));
        setTags(tags);
      })
      .catch((err) => console.log(err));
  };

  // タグ編集
  const editTag = (res: {
    tagId?: number;
    name: string;
    description: string;
  }) => {
    httpClient
      .post(
        ADD_TAG_URL,
        {
          tagId: res.tagId,
          name: res.name,
          description: res.description,
        },
        config
      )
      .then(() => getTags())
      .catch((err) => console.log(err));
  };

  // タグ削除
  const deleteTag = (tagId: number) => {
    httpClient
      .post(DELETE_TAG_URL, { tagId: tagId }, config)
      .then(() => getTags())
      .catch((err) => console.log(err));
  };

  //初期読み込み
  useEffect(() => getTags(), []);

  return [tags, { getTags, editTag, deleteTag }];
};
