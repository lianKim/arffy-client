export interface UserInfoData {
  name: string;
  phoneNumber: string;
  address: string;
  addressDetail: string;
  postCode: string;
  email?: string;
}

export interface UserInfo {
  data: UserInfoData;
}
