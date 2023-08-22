import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { AuthService } from '@core/service/auth.service';
import { AUTH } from '@app/core/constants/module';
import { ValidationService } from '@app/shared/service';
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-login-registration-form',
  templateUrl: './login-registration-form.component.html',
  styleUrls: ['./login-registration-form.component.scss']
})
export class LoginRegistrationFormComponent
  implements OnInit, OnChanges, OnDestroy {
  /**
   * currently active url to activate tab for login or registration
   */
  @Input() active: string;
  @Output() event = new EventEmitter<IPresentationEvent>();

  objLoginClass: any;

  objRegistrationClass: any;

  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, ValidationService.passwordValidator]]
  });

  registrationForm = this.formBuilder.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ],
      confirmPassword: [
        '',
        [Validators.required, ValidationService.passwordValidator]
      ]
    },
    { validator: ValidationService.passwordConfirmValidator }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef,
    private validationService: ValidationService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.active) {
      this.objLoginClass = {
        active: this.active === 'login',
        show: this.active === 'login'
      };

      this.objRegistrationClass = {
        active: this.active !== 'login',
        show: this.active !== 'login'
      };
    }
  }
  ngOnDestroy(): void {}

  get loginFormControl() {
    return this.loginForm.controls;
  }

  get registrationFormControl() {
    return this.registrationForm.controls;
  }

  loginSubmit() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    this.event.emit({
      type: 'LOGIN',
      data: this.loginForm.value
    });
  }

  registrationSubmit() {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) {
      return;
    }
    this.event.emit({
      type: 'REGISTARTION',
      data: this.registrationForm.value
    });
  }
}
