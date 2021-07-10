declare type TStateTag = { id: number; name: string; description: string };

declare type TUseTags = [TStateTag[], TTagService];
declare type TTagService = {
  getTags: () => void;
  editTag: (res: { tagId?: number; name: string; description: string }) => void;
  deleteTag: (tagId: number) => void;
};

declare type TResTagListApi = { tagId: number; tagName: string };
declare type TResTagDetailApi = {
  tagId: number;
  tagName: string;
  description: string;
};
