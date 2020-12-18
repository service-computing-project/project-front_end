export interface PublicRes {
  State: string;
  Data: PublicDataItem[];
}

export interface PublicDataItem {
  Data: ContentDetailData;
  User: UserEntity;
}

export interface ContentDetailData {
  ID: string;
  Name: string;
  Detail: string;
  OwnID: string;
  PublishDate: string;
  LikeNum: number;
  Public: boolean;
  Tag: [];
}

export interface UserEntity {
  Name: string;
  Avatar: string;
  Gender: number;
}

export interface ContentDetailRes {
  State: string;
  Data: ContentDetailData[];
  User: UserEntity[];
}
