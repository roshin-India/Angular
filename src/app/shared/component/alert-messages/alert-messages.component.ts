import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import {
  INotification,
  NotificationService
} from '@app/shared/service/notification.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertMessagesComponent implements OnInit {
  @Input() module: string;

  obsNotification$: Observable<INotification>;
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.obsNotification$ = this.notificationService
      .receiveNotification()
      .pipe(filter((obj: INotification) => obj.module === this.module));
  }
}
