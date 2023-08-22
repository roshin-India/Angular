import { InvestorProfileModule } from './../investor-profile/investor-profile.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProfileRoutingModule } from './profile.routing';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule, InvestorProfileModule],
  exports: [],
  providers: []
})
export class ProfileModule {
  constructor() {}
}
