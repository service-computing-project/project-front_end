export interface UserInfoEntity {
  State: string;
  ID: string;
  Email: string;
  Info: InfoEntity;
}

export interface InfoEntity {
  Name: string;
  Avatar: string;
  Bio: string;
  Gender: number;
}

export interface UserBlogEntity {
  State: string;
  Data: BlogDataEntity[];
}

export interface BlogDataEntity {
  ID: string;
  Detail: string;
  OwnID: string;
  PublishDate: number;
  LikeNum: number;
  Public: boolean;
  Tag: string[];
}

export interface UserNotificationEntity {
  State: string;
  Notifications: NotificationEntity[];
}

export interface NotificationEntity {
  Notification: NotificationDataEntity;
  User: NotificationUserEntity;
}

export interface NotificationDataEntity {
  ID: string;
  CreateTime: number;
  Content: string;
  SourceID: string;
  TargetID: string;
  ContentID: string;
  Type: string;
}

export interface NotificationUserEntity {
  Name: string;
  Avatar: string;
  Gender: number;
}

//test
export interface ReturnData {
  data: string;
}
