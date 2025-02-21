export interface IMessage {
  name: string;
  text: string;
  time: string | number | Date;
  photo: string;
  uid: string;
  file?: string;
}
