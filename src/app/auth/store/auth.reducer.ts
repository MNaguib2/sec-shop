import { User } from "../user.model";
import * as AuthActions from './auth.action';

export interface authState{
  user: User;
}

const initalState : authState | any = {
  user: null
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
          user: user
        };
      case AuthActions.LOGOUT:
        return {
          ...state,
          user: null
        };
      default:
        return state;
    }
  }

}
