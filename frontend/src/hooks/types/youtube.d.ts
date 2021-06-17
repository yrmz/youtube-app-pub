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
