import { Injectable } from '@angular/core';
import { HttpMethodsService } from '@app/core/service/http-methods.service';
import { NotificationService } from '@app/shared/service/notification.service';
import { take } from 'rxjs/operators';
import { IRegistration } from '../schema';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(
    private http: HttpMethodsService,
    private objNotificationService: NotificationService
  ) {}

  /**
   * User Registration
   * @param registrationData
   * @returns
   */
  registration(registrationData: IRegistration) {
    return this.http.method['post']('auth', 'sign_up', registrationData).pipe(
      take(1)
    );
  }
}
