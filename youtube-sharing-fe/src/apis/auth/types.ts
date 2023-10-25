export interface IAuth {
  email: string;
  password: string;
}

export interface IUser {
  _id: string;
  email: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
