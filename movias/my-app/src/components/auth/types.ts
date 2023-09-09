export enum AuthUserActionType {
  LOGIN_USER = "AUTH_LOGIN_USER",
  LOGOUT_USER = "AUTH_LOGOUT_USER",
}

export interface IUser {
  email: string;
  image: string;
  roles: string;
}

export interface IAuthUser {
  isAuth: boolean;
  user?: IUser;
}
