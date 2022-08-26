export interface IUser {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface IProfile {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  display_name: string;
}

export interface IAuthData {
  login: string;
  password: string;
}

export interface IAvatar {
  avatar: FormData;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IId {
  id: string;
}

export interface ILogin {
  login: string;
}

export interface IChat {
  title: string;
}
export interface IUserInChats {
  users: string[];
  chatId: string;
}
export interface IMessage {
  userId: number;
  chatId: number;
  token: string;
  callback: {
    onOpen: () => void;
    onClose: (event: CloseEvent) => void;
    onError: (event: ErrorEvent) => void;
    onMessage: (event: MessageEvent) => void;
  };
}
export interface IMessageFormModel {
  data?: string;
  content?: string;
  type?: string;
}
export interface IUserModel {
  id: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}
export interface IApi {
  data: {
    reason?: string;
  };
  response: string;
  responseText: string;
  status: number;
  statusText: string;
}
