import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  tap,
  delay,
  finalize,
  catchError,
  take,
  takeUntil,
  debounceTime
} from 'rxjs/operators';
import { of, Subscription, Subject } from 'rxjs';

import { AuthService } from '@core/service/auth.service';
import { RegistrationService } from '@app/data/service';
import { IPresentationEvent } from '@app/data/schema';
import { NotificationService } from '@app/shared/service/notification.service';
import { feUrl } from '@app/core/constants/common';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginRegistrationComponent
  implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Current active url
   */
  strActive = 'login';

  destroySubject$ = new Subject();
  error: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedrouter: ActivatedRoute,
    private authService: AuthService,
    private regService: RegistrationService,
    private detectChange: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.activatedrouter.paramMap
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((obj: any) => {
        this.strActive = obj.params.active;
        this.detectChange.markForCheck();
      });
  }
  ngAfterViewInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }

  handleEventFromPresentation(objEvent: IPresentationEvent) {
    switch (objEvent.type) {
      case 'LOGIN':
        this.login(objEvent.data);
        break;
      case 'REGISTARTION':
        this.registration(objEvent.data);
        break;

      default:
        break;
    }
  }

  login(loginData) {
    this.authService
      .login(loginData)
      .pipe(
        // debounceTime(1500),
        tap(objLoginDetails => {
          this.router.navigate([feUrl.home]);
        }),
        catchError(err => {
          this.authService.authErrorHandler(err.error);
          return of(err);
        })
      )
      .subscribe();
  }

  registration(registrationData) {
    this.regService
      .registration(registrationData)
      .pipe(
        // debounceTime(1500),
        tap(objRegistrationDetails => {
          this.notificationService.openToster({
            message: 'Registration is success',
            title: 'Success',
            type: 'success',
            module: 'REGISTRATION'
          });
          this.router.navigate([feUrl.login]);
        }),
        catchError(err => {
          this.notificationService.openToster({
            message: 'Registration not success',
            title: 'Error',
            type: 'error',
            module: 'REGISTRATION'
          });
          this.authService.authErrorHandler(err.error);
          return of(err);
        })
      )
      .subscribe();
  }
}
