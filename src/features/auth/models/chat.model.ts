export interface IUserProfile {
  uid: string;
  name: string;
  profileImg?: string;
}

export interface IMessage {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}
