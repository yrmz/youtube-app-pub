declare type TStateChannnelList = {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    title: string;
    description: string;
    channelId: string;
    thumbnail: string;
    tags: {
      tagId: number;
      tagName: string;
    }[];
  }[];
};

declare type TActionChannelList = {
  type: "init" | "addChannelList" | "updateTags";
  payload: {
    addChannelList?: TStateChannnelList;
    updateTags?: {
      channelId: string;
      tags: { tagId: number; tagName: string }[];
    };
  };
};

declare type TYoutubeSubscriptionService = {
  getChannelList: () => void;
  addChannelTag: (tagId: number, channelId: string) => void;
  deleteChannelTag: (tagId: number, channelId: string) => void;
};

/*APIのレスポンス */
declare type TResYoutubeSubscriptionApi = {
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    title: string;
    description: string;
    channelId: string;
    thumbnail: string;
    tags: {
      tagId: number;
      tagName: string;
    }[];
  }[];
};

declare type TResAddTag = {
  channelId: string;
  tags: {
    tagId: number;
    tagName: string;
  }[];
};

declare type TResDeleteTag = {
  channelId: string;
  tags: {
    tagId: number;
    tagName: string;
  }[];
};
