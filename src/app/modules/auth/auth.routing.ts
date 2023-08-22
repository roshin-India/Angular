import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { feUrl } from '@app/core/constants/common';

import { LoginRegistrationComponent } from './containers/login-registration/login-registration.component';

const routes: Routes = [
  {
    path: '',
    component: LoginRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
