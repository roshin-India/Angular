import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NewsLinksComponent } from './presentations/investor-profile-form-three/news-links/news-links.component';
import { PortfolioComponent } from './presentations/investor-profile-form-three/portfolio/portfolio.component';
import { InvestorProfileComponent } from './containers/investor-profile/investor-profile.component';
import { InvestorProfileRoutingModule } from './investor-profile.routing';
import { InvestorProfileFormOneComponent } from './presentations/investor-profile-form-one/investor-profile-form-one.component';
import { BusinessOverviewComponent } from './presentations/investor-profile-form-one/business-overview/business-overview.component';
// eslint-disable-next-line max-len
import { InvestorAccreditationComponent } from './presentations/investor-profile-form-one/investor-accreditation/investor-accreditation.component';
import { SocialAccountsComponent } from './presentations/investor-profile-form-one/social-accounts/social-accounts.component';
import { InvestorProfileFormTwoComponent } from './presentations/investor-profile-form-two/investor-profile-form-two.component';
// eslint-disable-next-line max-len
import { InvestmentOfInterestComponent } from './presentations/investor-profile-form-two/investment-of-interest/investment-of-interest.component';
// eslint-disable-next-line max-len
import { InvestmentActivitiesComponent } from './presentations/investor-profile-form-two/investment-activities/investment-activities.component';
// eslint-disable-next-line max-len
import { IndustriesOfInterestComponent } from './presentations/investor-profile-form-two/industries-of-interest/industries-of-interest.component';
import { ManagementComponent } from './presentations/investor-profile-form-two/management/management.component';
import { InvestorProfileFormThreeComponent } from './presentations/investor-profile-form-three/investor-profile-form-three.component';
import { ContactsComponent } from './presentations/investor-profile-form-three/contacts/contacts.component';
import { FundingComponent } from './presentations/investor-profile-form-one/funding/funding.component';
import { OverviewComponent } from './presentations/investor-profile-form-one/overview/overview.component';
import { InvestorProfileEditComponent } from './containers/investor-profile-edit/investor-profile-edit.component';
import { InvestorModelComponent } from './presentations/investor-model/investor-model.component';

@NgModule({
  declarations: [
    InvestorModelComponent,
    InvestorProfileEditComponent,
    InvestorProfileComponent,
    InvestorProfileFormOneComponent,
    BusinessOverviewComponent,
    FundingComponent,
    InvestorAccreditationComponent,
    OverviewComponent,
    SocialAccountsComponent,
    InvestorProfileFormTwoComponent,
    IndustriesOfInterestComponent,
    InvestmentOfInterestComponent,
    InvestmentActivitiesComponent,
    ManagementComponent,
    InvestorProfileFormThreeComponent,
    PortfolioComponent,
    NewsLinksComponent,
    ContactsComponent
  ],
  imports: [InvestorProfileRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [],
  entryComponents: [InvestorModelComponent]
})
export class InvestorProfileModule {
  constructor() {}
}
