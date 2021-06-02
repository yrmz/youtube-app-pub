declare type TStateChannnelList = {
  prevPageToken: string;
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
  }[];
};

declare type TResYoutubeSubscriptionApi = {
  prevPageToken: string;
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
  }[];
};
