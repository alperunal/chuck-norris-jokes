import {Action} from '@ngrx/store';
import {IAuthData} from '../auth-data.model';

export const LOGIN = 'LOGIN';
export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class Login implements Action {
  readonly type = LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: IAuthData) {}
}

export type AuthActions = Login | Logout | SetToken | TryLogin;
