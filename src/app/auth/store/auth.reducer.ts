import { User } from "../user.model";
import * as AuthActions from './auth.action';

export interface authState{
  user: User;
  authError: null;
  loading: boolean;
}

const initalState : authState | any = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer (state: authState = initalState, action: AuthActions.AuthActions){
  {
    switch (action.type) {
      case AuthActions.LOGIN:
        const user = new User(
          action.payload.email,
          action.payload.userId,
          action.payload.token,
          action.payload.expirationDate
        );
        return {
          ...state,
          authError: null,
          user: user,
          loading: false
        };
      case AuthActions.LOGOUT:
        return {
          ...state,
          authError: null,
          user: null
        };
        case AuthActions.LOGIN_FAIL:
        return{
          ...state,
          user: null,
          authError: action.payload,
          loading: false
        };
        case AuthActions.LOGIN_START:
        return{
          ...state,
          authError: null,
          loading: true
        }
        case AuthActions.SignUp_START:
        return{
          ...state,
          authError: null,
          loading: true
        }
      default:
        return state;
    }
  }

}
