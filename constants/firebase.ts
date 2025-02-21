export enum ECollections {
  Main = 'sw-chat',
  Users = '/users',
  Relations = 'relations',
  lastMessages = 'lastMessages',
}

export const chatPath = (path: string) => `/chat/${path}`;
