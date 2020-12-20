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

//test
export interface ReturnData {
  data: string;
}
