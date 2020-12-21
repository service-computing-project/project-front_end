import { ContentEntity } from './../content/content.entity'

export interface PublicReq {
  page:	number;     //	页码
  per_page:	number; //	页大小
}

export interface NewPostReq {
  detail:	string;     // 正文
  tags:	string[];  	  // 标签
  isPublic:	boolean;  // 是否公开
}

export interface PublicRes {
  State: string;
  Data: PublicDataItem[];
}

export interface PublicDataItem {
  Data: ContentEntity;
  User: UserEntity;
  isLiked: boolean;
}

export interface UserEntity {
  Name: string;
  Avatar: string;
  Gender: number;
}

export interface ContentDetailRes {
  State: string;
  Data: ContentEntity[];
  User: UserEntity[];
}
