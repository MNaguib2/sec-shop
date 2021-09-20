import { Action } from '@ngrx/store';


export const LOGIN_START = '[Auth] Login Start';
export const SignUp_START = '[Auth] SignUp Start';
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const LOGOUT = 'LOGOUT';
export const AUTO_LOGIN = '[Auth] Auto Login';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string | any;
      expirationDate: Date;
    }
  ) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payLoad: {email: string; password: string}){ }
}

export class SignUpStart implements Action {
  readonly type = SignUp_START;
  constructor(public payLoad: {email: string; password: string}){}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions = Login | Logout | LoginStart | LoginFail | SignUpStart;
