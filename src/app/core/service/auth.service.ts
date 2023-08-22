import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { User } from '@data/schema/user';
import { HttpMethodsService } from '@app/core/service/http-methods.service';
import { catchError, take, tap } from 'rxjs/operators';
import { IErrorServer, IErrorServerMessage } from '@app/data/schema';
import { NotificationService } from '@app/shared/service/notification.service';

interface LoginContextInterface {
  username: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(
    private http: HttpMethodsService,
    private objNotificationService: NotificationService
  ) {}

  /**
   * User login
   * @param loginContext
   * @returns
   */
  login(loginContext: LoginContextInterface): Observable<any> {
    return this.http.method['post']('auth', 'login', loginContext).pipe(
      take(1),
      tap(objLoginDetails => {
        this.setLocalStorage(objLoginDetails);
      })
    );
  }

  checkIfLoggedIn() {
    return !!localStorage.getItem('accessToken');
  }

  setLocalStorage(objLoginDetails) {
    localStorage.setItem('accessToken', objLoginDetails.accessToken);
    localStorage.setItem('refreshToken', objLoginDetails.refreshToken);
    localStorage.setItem('firstName', objLoginDetails.firstName);
    localStorage.setItem('lastName', objLoginDetails.lastName);
    localStorage.setItem('email', objLoginDetails.email);
    localStorage.setItem('type', objLoginDetails.type);
    localStorage.setItem('userStatus', objLoginDetails.userStatus);
  }

  setAccessTokenLocalStorage(strAccessToken) {
    localStorage.setItem('accessToken', strAccessToken);
  }

  removeLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
    localStorage.removeItem('userStatus');
  }

  getLocalStorage() {
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      email: localStorage.getItem('email'),
      type: localStorage.getItem('type'),
      userStatus: localStorage.getItem('userStatus')
    };
  }

  logout(): Observable<boolean> {
    this.removeLocalStorage();
    return of(true);
  }

  getNewAccessToken() {
    const refreshToken = this.getLocalStorage()['refreshToken'] || '';
    return this.http.method['post']('auth', 'refresh_auth ', {
      refreshToken
    }).pipe(
      take(1),
      tap(({ accessToken }) => {
        this.setAccessTokenLocalStorage(accessToken);
      })
    );
  }

  authErrorHandler(objError: IErrorServer) {
    objError.application.forEach((obj: IErrorServerMessage) => {
      switch (obj.message) {
        case 'INVALID_CREDENTIAL':
          this.objNotificationService.sendNotification({
            message: 'Invalid credentials',
            module: 'LOGIN',
            title: 'Failed',
            type: 'DANGER'
          });
          break;
        case 'LOGIN_NAME_DUPLICATE':
          this.objNotificationService.sendNotification({
            message: 'Email already used',
            module: 'LOGIN',
            title: 'Failed',
            type: 'DANGER'
          });
          break;

        default:
          break;
      }
    });
  }
}
