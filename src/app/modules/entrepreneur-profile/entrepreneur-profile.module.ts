import { EntrepreneurProfileEditComponent } from './containers/entrepreneur-profile-edit/entrepreneur-profile-edit.component';
import { EntrepreneurProfileFormTwoComponent } from './presentations/entrepreneur-profile-form-two/entrepreneur-profile-form-two.component';
import { InvestorsLendersComponent } from './presentations/entrepreneur-profile-form-two/investors-lenders/investors-lenders.component';
import { ProductServiceComponent } from './presentations/entrepreneur-profile-form-two/product-service/product-service.component';
import { CompanyAgeSizeComponent } from './presentations/entrepreneur-profile-form-two/company-age-size/company-age-size.component';
import { ContactsComponent } from './presentations/entrepreneur-profile-form-three/contacts/contacts.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// eslint-disable-next-line max-len
import { BusinessDocumentsComponent } from './presentations/entrepreneur-profile-form-three/business-documents/business-documents.component';
import { MediaComponent } from './presentations/entrepreneur-profile-form-three/media/media.component';
// eslint-disable-next-line max-len
import { EntrepreneurProfileFormThreeComponent } from './presentations/entrepreneur-profile-form-three/entrepreneur-profile-form-three.component';
// eslint-disable-next-line max-len
import { CompanyDescriptionComponent } from './presentations/entrepreneur-profile-form-one/company-description/company-description.component';
import { CompanyIndustryComponent } from './presentations/entrepreneur-profile-form-one/company-industry/company-industry.component';
import { GeneralFundingComponent } from './presentations/entrepreneur-profile-form-one/general-funding/general-funding.component';
import { PrivateFundingComponent } from './presentations/entrepreneur-profile-form-one/private-funding/private-funding.component';
import { EntrepreneurProfileRoutingModule } from './entrepreneur-profile.routing';
import { EntrepreneurProfileFormOneComponent } from './presentations/entrepreneur-profile-form-one/entrepreneur-profile-form-one.component';
import { SocialAccountsComponent } from './presentations/entrepreneur-profile-form-one/social-accounts/social-accounts.component';
import { OverviewComponent } from './presentations/entrepreneur-profile-form-one/overview/overview.component';
import { NewsLinksComponent } from './presentations/entrepreneur-profile-form-three/news-links/news-links.component';
import { EntrepreneurProfileComponent } from './containers/entrepreneur-profile/entrepreneur-profile.component';
import { CompanyFinancialsComponent } from './presentations/entrepreneur-profile-form-two/company-financials/company-financials.component';
import { ManagementComponent } from './presentations/entrepreneur-profile-form-two/management/management.component';
import { EntrepreneurModelComponent } from './presentations/entrepreneur-model/entrepreneur-model.component';

@NgModule({
  declarations: [
    EntrepreneurProfileComponent,
    EntrepreneurProfileFormOneComponent,
    SocialAccountsComponent,
    PrivateFundingComponent,
    OverviewComponent,
    GeneralFundingComponent,
    CompanyIndustryComponent,
    CompanyDescriptionComponent,
    EntrepreneurProfileFormThreeComponent,
    NewsLinksComponent,
    MediaComponent,
    ContactsComponent,
    BusinessDocumentsComponent,
    CompanyFinancialsComponent,
    CompanyAgeSizeComponent,
    ManagementComponent,
    ProductServiceComponent,
    InvestorsLendersComponent,
    EntrepreneurProfileFormTwoComponent,
    EntrepreneurProfileEditComponent,
    EntrepreneurModelComponent
  ],
  imports: [EntrepreneurProfileRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntrepreneurProfileModule {
  constructor() {}
}
