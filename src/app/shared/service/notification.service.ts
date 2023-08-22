import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

export interface INotification {
  message: string;
  title: string;
  data?: any;
  module: string;
  type: string;
}
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  openToster = (objNotification: INotification) => {
    switch (objNotification.type) {
      case 'success':
        this.toastr.success(objNotification.message, objNotification.title);
        break;

      case 'error':
        this.toastr.error(objNotification.message, objNotification.title);
        break;

      case 'warning':
        this.toastr.warning(objNotification.message, objNotification.title);
        break;

      case 'info':
        this.toastr.info(objNotification.message, objNotification.title);
        break;

      default:
        break;
    }
  };
  notification = new Subject<INotification>();

  constructor(private toastr: ToastrService) {}

  sendNotification(objNotification: INotification) {
    this.notification.next(objNotification);
  }

  receiveNotification() {
    return this.notification.asObservable();
  }
}
