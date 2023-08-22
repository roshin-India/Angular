import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { EntrepreneurProfileService } from '@app/data/service';
import { map, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService {
  objEntrepreneurProfileForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private entrepreneurProfileService: EntrepreneurProfileService
  ) {}

  /**
   * Investor profile form building
   */
  getoEntrepreneurProfileData() {
    return this.entrepreneurProfileService.getEntrepreneurProfileData().pipe(
      map((res: any) => {
        console.log();
        return {
          state: res?.objEntrepreneurProfileFormOne?.objOverview.state,
          country: res?.objEntrepreneurProfileFormOne?.objOverview.contry,
          formGroup: this.formBuilder.group({
            entrepreneurId: new FormControl(res?.entrepreneurId),
            personId: new FormControl(res?.personId),
            objEntrepreneurProfileFormOne: this.formBuilder.group({
              objOverview: this.formBuilder.group({
                strZipCode: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.strZipCode
                    ? res.objEntrepreneurProfileFormOne.objOverview.strZipCode
                    : '',
                  Validators.required
                ),
                strWebsite: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.strWebsite
                    ? res.objEntrepreneurProfileFormOne.objOverview.strWebsite
                    : ''
                ),
                strPhone: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.strPhone
                    ? res.objEntrepreneurProfileFormOne.objOverview.strPhone
                    : ''
                ),
                strBusinessName: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview
                    ?.strBusinessName
                    ? res.objEntrepreneurProfileFormOne.objOverview
                        .strBusinessName
                    : '',
                  Validators.required
                ),
                strCityName: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.strCityName
                    ? res.objEntrepreneurProfileFormOne.objOverview.strCityName
                    : '',
                  Validators.required
                ),
                objCompanyLogo: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview
                    ?.objCompanyLogo
                    ? res.objEntrepreneurProfileFormOne.objOverview
                        .objCompanyLogo
                    : '',
                  Validators.required
                ),
                intState: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.intState
                    ? res.objEntrepreneurProfileFormOne.objOverview.intState
                    : '',
                  Validators.required
                ),
                intNoOfEntrepreneurFirm: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview
                    ?.intNoOfEntrepreneurFirm
                    ? res.objEntrepreneurProfileFormOne.objOverview
                        .intNoOfEntrepreneurFirm
                    : ''
                ),
                intEntrepreneurMemberType: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview
                    ?.intEntrepreneurMemberType
                    ? res.objEntrepreneurProfileFormOne.objOverview
                        .intEntrepreneurMemberType
                    : ''
                ),
                intCountry: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objOverview?.intCountry
                    ? res.objEntrepreneurProfileFormOne.objOverview.intCountry
                    : '',
                  Validators.required
                )
              }),
              objSocialAccounts: this.formBuilder.group({
                strLinkedInUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strLinkedInUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strLinkedInUrl
                    : ''
                ),
                strFacebookUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strFacebookUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strFacebookUrl
                    : ''
                ),
                strTwitterUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strTwitterUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strTwitterUrl
                    : ''
                ),
                strYoutubeUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strYoutubeUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strYoutubeUrl
                    : ''
                ),
                strInstagramUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strInstagramUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strInstagramUrl
                    : ''
                ),
                strBlogUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objSocialAccounts
                    ?.strBlogUrl
                    ? res.objEntrepreneurProfileFormOne.objSocialAccounts
                        .strBlogUrl
                    : ''
                )
              }),
              objCompanyIndustry: this.formBuilder.group({
                arrIndustries: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objCompanyIndustry
                    ?.arrIndustries
                    ? res.objEntrepreneurProfileFormOne.objCompanyIndustry
                        .arrIndustries
                    : ''
                )
              }),
              objCompanyDescription: this.formBuilder.group({
                strShortDesc: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objCompanyDescription
                    ?.strShortDesc
                    ? res.objEntrepreneurProfileFormOne.objCompanyDescription
                        .strShortDesc
                    : ''
                ),
                strLongDesc: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objCompanyDescription
                    ?.strLongDesc
                    ? res.objEntrepreneurProfileFormOne.objCompanyDescription
                        .strLongDesc
                    : ''
                ),
                blnOne: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objCompanyDescription
                    ?.blnOne
                    ? res.objEntrepreneurProfileFormOne.objCompanyDescription
                        .blnOne
                    : ''
                )
              }),
              objGeneralFunding: this.formBuilder.group({
                strFundingGoal: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objGeneralFunding
                    ?.strFundingGoal
                    ? res.objEntrepreneurProfileFormOne.objGeneralFunding
                        .strFundingGoal
                    : ''
                ),
                strFundingRaised: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objGeneralFunding
                    ?.strFundingRaised
                    ? res.objEntrepreneurProfileFormOne.objGeneralFunding
                        .strFundingRaised
                    : ''
                ),
                strFundingCommitments: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objGeneralFunding
                    ?.strFundingCommitments
                    ? res.objEntrepreneurProfileFormOne.objGeneralFunding
                        .strFundingCommitments
                    : ''
                ),
                intFundingType: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objGeneralFunding
                    ?.intFundingType
                    ? res.objEntrepreneurProfileFormOne.objGeneralFunding
                        .intFundingType
                    : ''
                ),
                blnTwo: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objGeneralFunding
                    ?.blnTwo
                    ? res.objEntrepreneurProfileFormOne.objGeneralFunding.blnTwo
                    : ''
                )
              }),
              objPrivateFunding: this.formBuilder.group({
                intPreMoneyValuation: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objPrivateFunding
                    ?.intPreMoneyValuation
                    ? res.objEntrepreneurProfileFormOne.objPrivateFunding
                        .intPreMoneyValuation
                    : ''
                ),
                intInterest: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objPrivateFunding
                    ?.intInterest
                    ? res.objEntrepreneurProfileFormOne.objPrivateFunding
                        .intInterest
                    : ''
                ),
                intPrevFund: new FormControl(
                  !!res?.objEntrepreneurProfileFormOne?.objPrivateFunding
                    ?.intPrevFund
                    ? res.objEntrepreneurProfileFormOne.objPrivateFunding
                        .intPrevFund
                    : ''
                )
              })
            }),
            objEntrepreneurProfileFormTwo: this.formBuilder.group({
              objCompanyFinancials: this.formBuilder.group({
                intCompRevFiscalYear: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objCompanyFinancials
                    ?.intCompRevFiscalYear
                    ? res.objEntrepreneurProfileFormTwo.objCompanyFinancials
                        .intCompRevFiscalYear
                    : ''
                ),
                intProjectedCompRevFiscalYear: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objCompanyFinancials
                    ?.intProjectedCompRevFiscalYear
                    ? res.objEntrepreneurProfileFormTwo.objCompanyFinancials
                        .intProjectedCompRevFiscalYear
                    : ''
                ),
                intCurrentCompRevFiscalYear: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objCompanyFinancials
                    ?.intCurrentCompRevFiscalYear
                    ? res.objEntrepreneurProfileFormTwo.objCompanyFinancials
                        .intCurrentCompRevFiscalYear
                    : ''
                )
              }),
              objCompanyAgeSize: this.formBuilder.group({
                strCompFoundDate: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objCompanyAgeSize
                    ?.strCompFoundDate
                    ? res.objEntrepreneurProfileFormTwo.objCompanyAgeSize
                        .strCompFoundDate
                    : ''
                ),
                intNoOfCurrentEmp: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objCompanyAgeSize
                    ?.intNoOfCurrentEmp
                    ? res.objEntrepreneurProfileFormTwo.objCompanyAgeSize
                        .intNoOfCurrentEmp
                    : ''
                )
              }),
              objProductService:
                res.objEntrepreneurProfileFormTwo.objProductService !== null
                  ? this.formBuilder.array(
                      this.updateProductService(
                        res.objEntrepreneurProfileFormTwo.objProductService
                      )
                    )
                  : this.formBuilder.array([]),
              objManagement: Object.keys(
                res.objEntrepreneurProfileFormTwo.objManagement
              ).length
                ? this.formBuilder.array(
                    this.updateManagement(
                      res.objEntrepreneurProfileFormTwo.objManagement
                    )
                  )
                : this.formBuilder.array([]),
              objInvestorsLenders: this.formBuilder.group({
                strInvestorLanders: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strInvestorLanders
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strInvestorLanders
                    : ''
                ),
                intSelectType: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intSelectType
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intSelectType
                    : ''
                ),
                objPhoto: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.objPhoto
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .objPhoto
                    : ''
                ),
                intCountry: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intCountry
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intCountry
                    : ''
                ),
                intState: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intState
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intState
                    : ''
                ),
                strCityName: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strCityName
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strCityName
                    : ''
                ),
                strZipCode: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strZipCode
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strZipCode
                    : ''
                ),
                strEmail: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strEmail
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strEmail
                    : ''
                ),
                strLinkedIn: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strLinkedIn
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strLinkedIn
                    : ''
                ),
                strGeneralDesc: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strGeneralDesc
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strGeneralDesc
                    : ''
                ),
                intInvestmentAmount: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intInvestmentAmount
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intInvestmentAmount
                    : ''
                ),
                intInvestmentRound: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intInvestmentRound
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intInvestmentRound
                    : ''
                ),
                intInvestmentType: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.intInvestmentType
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .intInvestmentType
                    : ''
                ),
                strInvestmentDate: new FormControl(
                  !!res?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
                    ?.strInvestmentDate
                    ? res.objEntrepreneurProfileFormTwo.objInvestorsLenders
                        .strInvestmentDate
                    : ''
                )
              })
            }),
            objEntrepreneurProfileFormThree: this.formBuilder.group({
              objMedia: this.formBuilder.group({
                strVideoLinkUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objMedia
                    ?.strVideoLinkUrl
                    ? res.objEntrepreneurProfileFormThree.objMedia
                        .strVideoLinkUrl
                    : ''
                ),
                arrMediaImages: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objMedia
                    ?.arrMediaImages
                    ? res.objEntrepreneurProfileFormThree.objMedia
                        .arrMediaImages
                    : ''
                )
              }),
              objBusinessDocuments: this.formBuilder.group({
                arrBusinessDocuments: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objBusinessDocuments
                    ?.arrBusinessDocuments
                    ? res.objEntrepreneurProfileFormThree.objBusinessDocuments
                        .arrBusinessDocuments
                    : ''
                )
              }),
              objNews: this.formBuilder.group({
                strNewsLinkUrl: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objNews
                    ?.strNewsLinkUrl
                    ? res.objEntrepreneurProfileFormThree.objNews.strNewsLinkUrl
                    : ''
                ),
                strLinkText: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objNews?.strLinkText
                    ? res.objEntrepreneurProfileFormThree.objNews.strLinkText
                    : ''
                )
              }),
              objContact: this.formBuilder.group({
                strFullName: new FormControl(
                  !!res?.objEntrepreneurProfileFormThree?.objContact
                    ?.strFullName
                    ? res.objEntrepreneurProfileFormThree.objContact.strFullName
                    : ''
                )
              })
            })
          })
        };
      })
    );
  }
  /**
   * update management
   */
  updateManagement(data) {
    if (!!data) {
      const managementArray = [];
      data.forEach(element => {
        managementArray.push({
          // id: !!element.id ? element.id : null,
          strFullName: element.strFullName,
          strLinkedInUrl: element.strLinkedInUrl,
          strDesignation: element.strDesignation,
          strEmail: element.strEmail,
          objPhoto: element.objPhoto,
          strOverviewManagement: element.strOverviewManagement
        });
      });
      return managementArray;
    }
  }
  /**
   * Updae product services
   *
   */
  updateProductService(data) {
    if (!!data) {
      const productService = [];
      data.forEach(element => {
        productService.push({
          strName: element.strName,
          strShortDesc: element.strShortDesc
        });
      });
      return productService;
    }
  }
}
