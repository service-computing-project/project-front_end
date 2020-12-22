import { UserEntity } from "../home/home.entity";

export interface ContentEntity {
  ID: string;
  Detail: string;
  OwnID: string;
  PublishDate: number;
  LikeNum: number;
  Public: boolean;
  Tag: string[];
}

export interface ContentDetailRes {
  State: string;
  Data: ContentEntity;
  User: UserEntity;
}

export interface UpdatePostReq {
  contentID: string;
  detail: string;
  tags: string[];
  isPublic: boolean;
}

export interface UpdatePostRes {
  State: string;
  Data: [];
}

export interface LikePostRes {
  State: string;
  Data: [];
}

export interface LikeGetRes {
  State: string;
  Data: [];
}

export interface DeletePostRes {
  State: string;
  Data: [];
}
