export interface UserInfoEntity {
  State: string;
  ID: string;
  Email: string;
  Info: InfoEntity;
}

export interface InfoEntity {
  Name: string;
  Avator: string;
  Bio: string;
  Gender: string;
}

export interface UserBlogEntity {
  State: string;
  Data: BlogDataEntity;
}

export interface BlogDataEntity {
  ID: string;
  Name: string;
  Detail: string;
  OwnID: string;
  PublishData: string; //number ?
  LikeNum: number;
  CommentNum: number;
  Public: boolean;
  Tag: string[];
}

//test
export interface ReturnData {
  data: string;
}
