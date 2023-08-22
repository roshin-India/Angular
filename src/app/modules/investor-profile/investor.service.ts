import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { InvestorProfileService } from '@app/data/service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  objInvestorProfileForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private investorProfileService: InvestorProfileService
  ) {}

  /**
   * Investor profile form building
   */
  getInvestorProfileData() {
    return this.investorProfileService.getInvestorProfileData().pipe(
      map(res => {
        return {
          state: res?.objInvestorProfileFormOne?.objOverview.state,
          country: res?.objInvestorProfileFormOne?.objOverview.contry,
          formGroup: this.formBuilder.group({
            investorId: new FormControl(res.investorId),
            personId: new FormControl(res.personId),
            objInvestorProfileFormOne: this.formBuilder.group({
              objOverview: this.formBuilder.group({
                strZipCode: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.strZipCode
                    ? res.objInvestorProfileFormOne.objOverview.strZipCode
                    : '',
                  Validators.required
                ),
                strWebsite: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.strWebsite
                    ? res.objInvestorProfileFormOne.objOverview.strWebsite
                    : ''
                ),
                strPhone: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.strPhone
                    ? res.objInvestorProfileFormOne.objOverview.strPhone
                    : ''
                ),
                strFirmName: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.strFirmName
                    ? res.objInvestorProfileFormOne.objOverview.strFirmName
                    : '',
                  Validators.required
                ),
                strCityName: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.strCityName
                    ? res.objInvestorProfileFormOne.objOverview.strCityName
                    : '',
                  Validators.required
                ),
                objLogo: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.objLogo
                    ? res.objInvestorProfileFormOne.objOverview.objLogo
                    : '',
                  Validators.required
                ),
                intState: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.intState
                    ? res.objInvestorProfileFormOne.objOverview.intState
                    : '',
                  Validators.required
                ),
                intNoOfInvestorFirm: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview
                    ?.intNoOfInvestorFirm
                    ? res.objInvestorProfileFormOne.objOverview
                        .intNoOfInvestorFirm
                    : '',
                  Validators.required
                ),
                intInvestorMemberType: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview
                    ?.intInvestorMemberType
                    ? res.objInvestorProfileFormOne.objOverview
                        .intInvestorMemberType
                    : '',
                  Validators.required
                ),
                intCountry: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objOverview?.intCountry
                    ? res.objInvestorProfileFormOne.objOverview.intCountry
                    : '',
                  Validators.required
                )
              }),
              objSocialAccounts: this.formBuilder.group({
                strLinkedInUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strLinkedInUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts
                        .strLinkedInUrl
                    : ''
                ),
                strFacebookUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strFacebookUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts
                        .strFacebookUrl
                    : ''
                ),
                strTwitterUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strTwitterUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts
                        .strTwitterUrl
                    : ''
                ),
                strYoutubeUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strYoutubeUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts
                        .strYoutubeUrl
                    : ''
                ),
                strInstagramUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strInstagramUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts
                        .strInstagramUrl
                    : ''
                ),
                strBlogUrl: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objSocialAccounts
                    ?.strBlogUrl
                    ? res.objInvestorProfileFormOne.objSocialAccounts.strBlogUrl
                    : ''
                )
              }),
              objBuisinessOverview: this.formBuilder.group({
                strBuisinessOverview: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objBuisinessOverview
                    ?.strBuisinessOverview
                    ? res.objInvestorProfileFormOne.objBuisinessOverview
                        .strBuisinessOverview
                    : '',
                  Validators.required
                )
              }),
              objInvestorAccreditation: this.formBuilder.group({
                blnOne: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objInvestorAccreditation
                    ?.blnOne
                    ? res.objInvestorProfileFormOne.objInvestorAccreditation
                        .blnOne
                    : ''
                ),
                blnTwo: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objInvestorAccreditation
                    ?.blnTwo
                    ? res.objInvestorProfileFormOne.objInvestorAccreditation
                        .blnTwo
                    : ''
                ),
                blnThree: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objInvestorAccreditation
                    ?.blnThree
                    ? res.objInvestorProfileFormOne.objInvestorAccreditation
                        .blnThree
                    : ''
                ),
                blnFour: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objInvestorAccreditation
                    ?.blnFour
                    ? res.objInvestorProfileFormOne.objInvestorAccreditation
                        .blnFour
                    : ''
                )
              }),
              objFunding: this.formBuilder.group({
                intMinReveneuStage: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objFunding
                    ?.intMinReveneuStage
                    ? res.objInvestorProfileFormOne.objFunding
                        .intMinReveneuStage
                    : '',
                  Validators.required
                ),
                intMaxReveneuStage: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objFunding
                    ?.intMaxReveneuStage
                    ? res.objInvestorProfileFormOne.objFunding
                        .intMaxReveneuStage
                    : '',
                  Validators.required
                ),
                intMinInvestmentStage: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objFunding
                    ?.intMinInvestmentStage
                    ? res.objInvestorProfileFormOne.objFunding
                        .intMinInvestmentStage
                    : '',
                  Validators.required
                ),
                intMaxInvestmentStage: new FormControl(
                  !!res?.objInvestorProfileFormOne?.objFunding
                    ?.intMaxInvestmentStage
                    ? res.objInvestorProfileFormOne.objFunding
                        .intMaxInvestmentStage
                    : '',
                  Validators.required
                )
              })
            }),
            objInvestorProfileFormTwo: this.formBuilder.group({
              objIndustriesOfInterest: this.formBuilder.group({
                arrIndustriesOfInterest: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objIndustriesOfInterest
                    ?.arrIndustriesOfInterest
                    ? res.objInvestorProfileFormTwo.objIndustriesOfInterest
                        .arrIndustriesOfInterest
                    : '',
                  Validators.required
                )
              }),
              objInvestmentInterest: this.formBuilder.group({
                intPrimaryTypeCapital: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentInterest
                    ?.intPrimaryTypeCapital
                    ? res.objInvestorProfileFormTwo.objInvestmentInterest
                        .intPrimaryTypeCapital
                    : ''
                ),
                intExpRateOfReturnPerYear: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentInterest
                    ?.intExpRateOfReturnPerYear
                    ? res.objInvestorProfileFormTwo.objInvestmentInterest
                        .intExpRateOfReturnPerYear
                    : ''
                ),
                intMinValueOfInterest: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentInterest
                    ?.intMinValueOfInterest
                    ? res.objInvestorProfileFormTwo.objInvestmentInterest
                        .intMinValueOfInterest
                    : ''
                ),
                intMaxValueOfInterest: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentInterest
                    ?.intMaxValueOfInterest
                    ? res.objInvestorProfileFormTwo.objInvestmentInterest
                        .intMaxValueOfInterest
                    : ''
                )
              }),
              objInvestmentAcivities: this.formBuilder.group({
                intNoBuisinessReviewed: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentAcivities
                    ?.intNoBuisinessReviewed
                    ? res.objInvestorProfileFormTwo.objInvestmentAcivities
                        .intNoBuisinessReviewed
                    : ''
                ),
                intNoBuisinessInvested: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentAcivities
                    ?.intNoBuisinessInvested
                    ? res.objInvestorProfileFormTwo.objInvestmentAcivities
                        .intNoBuisinessInvested
                    : ''
                ),
                intToalCapitalInvested: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentAcivities
                    ?.intToalCapitalInvested
                    ? res.objInvestorProfileFormTwo.objInvestmentAcivities
                        .intToalCapitalInvested
                    : ''
                ),
                averageDeal: new FormControl(
                  !!res?.objInvestorProfileFormTwo?.objInvestmentAcivities
                    ?.averageDeal
                    ? res.objInvestorProfileFormTwo.objInvestmentAcivities
                        .averageDeal
                    : ''
                )
              }),
              objManagement: Object.keys(
                res.objInvestorProfileFormTwo.objManagement
              ).length
                ? this.formBuilder.array(
                    this.updateManagement(
                      res.objInvestorProfileFormTwo.objManagement
                    )
                  )
                : this.formBuilder.array([])
            }),
            objInvestorProfileFormThree: this.formBuilder.group({
              objPortfolio: Object.keys(
                res?.objInvestorProfileFormThree?.objPortfolio
              ).length
                ? this.formBuilder.array(
                    this.updatePortfolio(
                      res.objInvestorProfileFormThree.objPortfolio
                    )
                  )
                : this.formBuilder.array([]),
              objNews: this.formBuilder.group({
                strNewsLinkUrl: new FormControl(
                  !!res?.objInvestorProfileFormThree?.objNews?.strNewsLinkUrl
                    ? res.objInvestorProfileFormThree.objNews.strNewsLinkUrl
                    : ''
                ),
                strLinkText: new FormControl(
                  !!res?.objInvestorProfileFormThree?.objNews?.strLinkText
                    ? res.objInvestorProfileFormThree.objNews.strLinkText
                    : ''
                )
              }),
              objContact: this.formBuilder.group({
                strFullName: new FormControl(
                  !!res?.objInvestorProfileFormThree?.objContact?.strFullName
                    ? res.objInvestorProfileFormThree.objContact.strFullName
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
   * Updae portfolio
   *
   */
  updatePortfolio(data) {
    if (!!data) {
      const portfolioArray = [];
      data.forEach(element => {
        portfolioArray.push({
          id: !!element.id ? element.id : null,
          strCompanyName: element.strCompanyName,
          objCompanyLogo: element.objCompanyLogo,
          strCompanyWebsite: element.strCompanyWebsite,
          strCompanyRole: element.strCompanyRole
        });
      });
      return portfolioArray;
    }
  }
}
