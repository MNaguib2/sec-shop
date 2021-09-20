import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators';
import { AppState } from '../shared';
import { User } from './user.model';
import * as AuthActions from './store/auth.action';

export interface AuthResponesData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  //user = new BehaviorSubject<User | any>(null); //I work in Ngrx instead of Subject event
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router : Router, private store : Store<AppState>) { }

  singUp(email: string, password: string) {
    return this.http.post<AuthResponesData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.HandleError),
      tap(resData => {
        this.HandleAuthebtication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }))
    /*
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
    //*/
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponesData>(
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.HandleError),
      tap(resData => {
        this.HandleAuthebtication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }))
  }

   autoLogin() {
    const userData: User
    /*  I will use class User instead of this way
    {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    }
    //*/
    = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      userData._tokenExpirationDate
    );
    if (loadedUser.token) {
      //this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({
           email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
      }
      ));
      const expirationDuration =
      new Date(userData._tokenExpirationDate).getTime() -  new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

   logout() {
    //this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      //clearTimeOut this is function made remove if resume any millsecond remaine in function setTime
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private HandleAuthebtication(email: string ,UserId: string, Token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, UserId, Token, expirationDate);
    //this.user.next(user);
    this.store.dispatch(new AuthActions.Login({
      email: user.email,
     userId: user.id,
     token: user.token,
     expirationDate: new Date(user._tokenExpirationDate)
 }
 ));
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


  private HandleError(errResponse: HttpErrorResponse) {
    let errorMessage;
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email exists already';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'This email Don\'t Exist !';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'This Password is Invalid !';
        break;
      }
      default: {
        errorMessage = 'An unknow error Occurred!';
        break;
      }
    }
    return throwError(errorMessage);
  }
}
