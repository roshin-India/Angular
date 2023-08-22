import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { LoginRegistrationComponent } from './containers/login-registration/login-registration.component';
import { LoginRegistrationFormComponent } from './presentations/login-registration-form/login-registration-form.component';

@NgModule({
  declarations: [LoginRegistrationComponent, LoginRegistrationFormComponent],
  imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
