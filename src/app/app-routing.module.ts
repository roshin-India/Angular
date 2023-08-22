import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { ContentLayoutTwoComponent } from './layout/content-layout-two/content-layout-two.component';
import { AuthGuard } from './core/guard/auth.guard';
import { feUrl } from '@app/core/constants/common';

const routes: Routes = [
  {
    path: 'dashboard',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then(m => m.HomeModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: ContentLayoutComponent,
    children: [
      {
        path: ':active',
        loadChildren: () =>
          import('@modules/auth/auth.module').then(m => m.AuthModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'investor',
    component: ContentLayoutTwoComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@app/modules/investor-profile/investor-profile.module').then(
            m => m.InvestorProfileModule
          )
      }
    ]
  },
  {
    path: 'entrepreneur',
    component: ContentLayoutTwoComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import(
            '@app/modules/entrepreneur-profile/entrepreneur-profile.module'
          ).then(m => m.EntrepreneurProfileModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: feUrl.home,
    pathMatch: 'full'
  }
];

// , {
//   useHash: true,
//     relativeLinkResolution: 'legacy'
// }
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
