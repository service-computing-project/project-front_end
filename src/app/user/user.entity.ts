export interface UserInfoEntity {
  state: string;
  id: string;
  email: string;
  info: InfoEntity[];
}

export interface InfoEntity {
  name: string;
  avator: string;
  bio: string;
  gender: string;
}
