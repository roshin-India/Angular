import { InvestorProfileFormTwoComponent } from './presentations/investor-profile-form-two/investor-profile-form-two.component';
import { InvestorProfileFormOneComponent } from './presentations/investor-profile-form-one/investor-profile-form-one.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorProfileComponent } from './containers/investor-profile/investor-profile.component';
import { InvestorProfileFormThreeComponent } from './presentations/investor-profile-form-three/investor-profile-form-three.component';
import { InvestorProfileEditComponent } from './containers/investor-profile-edit/investor-profile-edit.component';
import { InvestorProfileEditResolver } from './investor-profile-edit.resolver';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { feUrl } from '@app/core/constants/common';

const routes: Routes = [
  {
    path: 'profile',
    component: InvestorProfileComponent,
    children: [
      { path: '', redirectTo: '1', pathMatch: 'full' },
      { path: '1', component: InvestorProfileFormOneComponent },
      { path: '2', component: InvestorProfileFormTwoComponent },
      { path: '3', component: InvestorProfileFormThreeComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-view',
    component: InvestorProfileEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: feUrl.investorProfileView,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorProfileRoutingModule {
  constructor() {}
}
