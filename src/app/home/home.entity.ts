import { ContentEntity } from './../content/content.entity'

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
