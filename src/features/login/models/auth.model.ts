export enum ELoginMethoded {
  google = 'google',
}

export interface IUserData {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  profileImg: string;
  listings: string[];
}
