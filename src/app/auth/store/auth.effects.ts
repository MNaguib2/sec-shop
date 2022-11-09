import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router, RouterStateSnapshot } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, switchMap, map, exhaustMap, tap } from "rxjs/operators";
import { AuthResponesData, AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.action$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponesData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
        {
          email: authData.payLoad.email,
          password: authData.payLoad.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          //console.log(new Date(+resData.expiresIn * 1000) + ' ' + new Date(new Date().getTime()+ 3600000));
        const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
        const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
        this.AuthService.autoLogout(+resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
          this.router.navigate(['/recipes']);
        return new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate});
      }),catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return of(new AuthActions.LoginFail(errorMessage));
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
            default:
            errorMessage = 'Please Recover Your Network!';
            break;
        }
        return of(new AuthActions.LoginFail(errorMessage));
      }))
    })
  );
  @Effect()
  authSignUp = this.action$.pipe(
    ofType(AuthActions.SignUp_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponesData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
        {
          email: authData.payLoad.email,
          password: authData.payLoad.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
          const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
          this.AuthService.autoLogout(+resData.expiresIn * 1000);
          localStorage.setItem('userData', JSON.stringify(user));
          this.router.navigate(['/recipes']);
          return new AuthActions.Login({email: resData.email, userId: resData.localId, token: resData.idToken, expirationDate: expirationDate});
        }),
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.LoginFail(errorMessage));
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This password is not correct.';
              break;
              default:
              errorMessage = 'Please Recover Your Network!';
              break;
          }
          return of(new AuthActions.LoginFail(errorMessage));
        })
      )
    })
  )

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData')!);
      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.AuthService.autoLogout(expirationDuration);
         return new AuthActions.Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return { type: 'DUMMY' };
    })
  );

  constructor(private action$: Actions, private http: HttpClient, private router: Router,
    private AuthService : AuthService, private route: ActivatedRoute) { }
}
