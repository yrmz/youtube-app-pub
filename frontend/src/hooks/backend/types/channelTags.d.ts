declare type TStateChannelTags = {
  channelId: string;
  tags: { tagId: number; tagName: string }[];
}[];

declare type TUseChannelTags = [TStateChannelTags, TChannelTagsService];
declare type TChannelTagsService = {
  getChannelTags: () => void;
  addChannelTag: (tagId: number, channelId: string) => void;
  deleteChannelTag: (tagId: number, channelId: string) => void;
};

declare type TResTagsApi = {
  channelId: string;
  tags: {
    tagId: number;
    tagName: string;
  }[];
}[];
