import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { feUrl } from '@app/core/constants/common';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { EntrepreneurProfileEditComponent } from './containers/entrepreneur-profile-edit/entrepreneur-profile-edit.component';
import { EntrepreneurProfileComponent } from './containers/entrepreneur-profile/entrepreneur-profile.component';
import { EntrepreneurProfileFormOneComponent } from './presentations/entrepreneur-profile-form-one/entrepreneur-profile-form-one.component';
// eslint-disable-next-line max-len
import { EntrepreneurProfileFormThreeComponent } from './presentations/entrepreneur-profile-form-three/entrepreneur-profile-form-three.component';
import { EntrepreneurProfileFormTwoComponent } from './presentations/entrepreneur-profile-form-two/entrepreneur-profile-form-two.component';
// eslint-disable-next-line max-len

const routes: Routes = [
  {
    path: 'profile',
    component: EntrepreneurProfileComponent,
    children: [
      { path: '', redirectTo: '1', pathMatch: 'full' },
      { path: '1', component: EntrepreneurProfileFormOneComponent },
      { path: '2', component: EntrepreneurProfileFormTwoComponent },
      { path: '3', component: EntrepreneurProfileFormThreeComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-view',
    component: EntrepreneurProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: feUrl.entrepreneurProfile,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepreneurProfileRoutingModule {
  constructor() {}
}
