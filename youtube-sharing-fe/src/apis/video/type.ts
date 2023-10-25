export interface IVideo {
  id: string;
  url: string;
  title: string;
  description: string;
  statistics: IVideoStatistics;
  userEmail: string;
  _id: string;
  __v: number;
}

export interface IVideoStatistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
  _id: string;
}

export interface IResponseListVideo {
  list: Array<IVideo>;
}
