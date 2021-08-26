import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError , tap } from 'rxjs/operators';
import { User } from './user.model';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string) {
    return this.http.post<AuthResponesData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.HandleError), tap(resData => {
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
    return this.http.post<AuthResponesData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc6ngDX5t8XWYvy712qqTfyixUGoK7ciI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.HandleError), tap(resData => {
        this.HandleAuthebtication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }))
  }

  private HandleAuthebtication(email: string ,UserId: string, Token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, UserId, Token,expirationDate);
    this.user.next(user);
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
