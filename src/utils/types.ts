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
