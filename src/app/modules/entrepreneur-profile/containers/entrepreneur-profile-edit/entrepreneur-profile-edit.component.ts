import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

import { IEntrepreneurProfile } from '@app/data/schema/entrepreneur-profile';
import { EntrepreneurProfileService } from '@app/data/service';
import { NotificationService } from '@app/shared/service/notification.service';
import { of, Subject } from 'rxjs';
import { catchError, map, take, takeUntil, tap } from 'rxjs/operators';
import { EntrepreneurService } from '../../entrepreneur.service';
import { EntrepreneurModelComponent } from '../../presentations/entrepreneur-model/entrepreneur-model.component';
import { DomSanitizer } from '@angular/platform-browser';
const entrepreneurTypes: any[] = [
  {
    id: '',
    name: 'Choose Entrepreneur Type'
  },
  {
    id: 1,
    name: 'Angel Group'
  },
  {
    id: 2,
    name: 'Debt Provider'
  },
  {
    id: 3,
    name: 'Government Funding Source'
  },
  {
    id: 4,
    name: 'Individual Entrepreneur'
  },
  {
    id: 5,
    name: 'Non-Profit Funding Source'
  },
  {
    id: 6,
    name: 'Venture Capital Fund'
  }
];
const states: any[] = [
  {
    id: '',
    name: 'Select State or Province'
  },
  {
    id: 1,
    name: 'Kerala'
  }
];
const countries: any[] = [
  {
    id: '',
    name: 'Select country'
  },
  {
    id: 1,
    name: 'India'
  },
  {
    id: 2,
    name: 'Afghanistan'
  },
  {
    id: 3,
    name: 'Åland Islands'
  },
  {
    id: 4,
    name: 'Albania'
  },
  {
    id: 5,
    name: 'Algeria'
  },
  {
    id: 6,
    name: 'Andorra'
  },
  {
    id: 7,
    name: 'Angola'
  },
  {
    id: 8,
    name: 'Anguilla'
  },
  {
    id: 9,
    name: 'Antarctica'
  }
];
const primaryTypes: any[] = [
  {
    id: '',
    name: 'Choose Primary Type of Capital Provided'
  },
  {
    id: 1,
    name: 'Debt'
  },
  {
    id: 2,
    name: 'Equity'
  },
  {
    id: 3,
    name: 'Grant'
  },
  {
    id: 4,
    name: 'Other'
  },
  {
    id: 5,
    name: 'Royalty Repayment'
  }
];
const minValuation: any[] = [
  {
    id: '',
    name: 'Minimum Valuation of Interest ($)'
  },
  {
    id: 1,
    name: '1000'
  },
  {
    id: 2,
    name: '5000'
  }
];
const maxValuation: any[] = [
  {
    id: '',
    name: 'Maximum Valuation of Interest ($)'
  },
  {
    id: 1,
    name: '1000'
  },
  {
    id: 2,
    name: '5000'
  }
];
const companyRoles: any[] = [
  {
    id: '',
    name: 'Select company role'
  },
  {
    id: 1,
    name: 'Entrepreneur'
  },
  {
    id: 2,
    name: 'Lender'
  },
  {
    id: 3,
    name: 'Employee'
  },
  {
    id: 4,
    name: 'Founder'
  },
  {
    id: 5,
    name: 'Advisor'
  },
  {
    id: 6,
    name: 'Attorney'
  }
];
const fundngTypes = [
  {
    id: '',
    name: 'Select Funding Type'
  },
  {
    id: 1,
    name: 'Equity'
  },
  {
    id: 2,
    name: 'Convertible Debt'
  },
  {
    id: 3,
    name: 'Debt Financing'
  },
  {
    id: 4,
    name: 'Grant'
  },
  {
    id: 5,
    name: 'Royalty'
  }
];
@Component({
  selector: 'app-entrepreneur-profile-edit',
  templateUrl: './entrepreneur-profile-edit.component.html',
  styleUrls: ['./entrepreneur-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrepreneurProfileEditComponent
  implements OnInit, OnDestroy, OnChanges {
  destroySubject$ = new Subject();
  entrepreneurProfileForm: FormGroup;
  form1: any;
  form2: any;
  form3: any;
  overview: any;
  funding: any;
  socialAccounts: any;
  portfolio: any;
  summary: any;
  newsLinks: any;
  contact: any;
  management: any;
  aboutUs: any;
  companyDescription: any;
  companyIndustry: any;
  companyFinancials: any;
  companyAgeSize: any;
  productService: any;
  investorsLenders: any;
  businessDocuments: any;
  media: any;
  companyAge: any;
  state: any;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private entrepreneurService: EntrepreneurService,
    private entrepreneurProfileService: EntrepreneurProfileService,
    private notificationService: NotificationService,
    private detectChange: ChangeDetectorRef,
    public _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getEntrepreneurProfileDetails();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }

  get entrepreneurProfileData() {
    return this.entrepreneurProfileForm.value;
  }

  getEntrepreneurTypeName(id) {
    if (id) return entrepreneurTypes.filter(obj => obj.id == id)[0]['name'];
  }

  getStateName(id) {
    if (id) return states.filter(obj => obj.id == id)[0]['name'];
  }

  getMaxValuation(id) {
    if (id) return maxValuation.filter(obj => obj.id == id)[0]['name'];
  }

  getMinValuation(id) {
    if (id) return minValuation.filter(obj => obj.id == id)[0]['name'];
  }

  getPrimaryType(id) {
    if (id) return primaryTypes.filter(obj => obj.id == id)[0]['name'];
  }

  getCountryName(id) {
    if (id) return countries.filter(obj => obj.id == id)[0]['name'];
  }

  getCompanyRole(id) {
    if (id) return companyRoles.filter(obj => obj.id == id)[0]['name'];
  }
  getFundingType(id) {
    if (id) return fundngTypes.filter(obj => obj.id == id)[0]['name'];
  }
  eventHandler(editForm: string) {
    this.openDialog(editForm);
  }

  /**
   * Open dialogue
   */
  openDialog(editForm: string): void {
    const dialogRef = this.dialog.open(EntrepreneurModelComponent, {
      width: '75vw',
      height: '75vh',
      autoFocus: false,
      data: {
        entrepreneurProfileData: this.entrepreneurProfileData,
        entrepreneurProfileForm: this.entrepreneurProfileForm,
        editForm
      }
    });

    dialogRef.componentInstance.event
      .pipe(
        take(1),
        map(event => {
          switch (event.type) {
            case 'UPDATE':
              this.saveEntrepreneurProfile(event.data)
                .pipe(
                  take(1),
                  tap(() => {
                    dialogRef.close();
                    this.getEntrepreneurProfileDetails();
                  })
                )
                .subscribe();
              break;
            case 'CANCEL':
              dialogRef.close();
              break;
            default:
              break;
          }
        })
      )
      .subscribe();
    dialogRef.afterClosed().subscribe(result => {});
  }

  saveEntrepreneurProfile(entrepreneurProfileData: IEntrepreneurProfile) {
    return this.entrepreneurProfileService.save(entrepreneurProfileData).pipe(
      takeUntil(this.destroySubject$),
      tap(objLoginDetails => {
        this.notificationService.openToster({
          message: 'Update is success',
          title: 'Success',
          type: 'success',
          module: 'INVESTOR-PROFILE'
        });
      }),
      catchError(err => {
        this.notificationService.openToster({
          message: 'Update not success',
          title: 'Error',
          type: 'error',
          module: 'INVESTOR-PROFILE'
        });
        return of(err);
      })
    );
  }

  getEntrepreneurProfileDetails() {
    this.entrepreneurService
      .getoEntrepreneurProfileData()
      .pipe(take(1))
      .subscribe(({ formGroup, state }) => {
        this.state = state;
        this.entrepreneurProfileForm = formGroup;
        this.form1 = this.entrepreneurProfileData.objEntrepreneurProfileFormOne;
        this.form2 = this.entrepreneurProfileData.objEntrepreneurProfileFormTwo;
        this.form3 = this.entrepreneurProfileData.objEntrepreneurProfileFormThree;
        this.overview = this.form1.objOverview;
        this.companyDescription = this.form1.objCompanyDescription;
        this.companyIndustry = this.form1.objCompanyIndustry;
        this.funding = {
          ...this.form1.objGeneralFunding,
          ...this.form1.objPrivateFunding
        };
        this.socialAccounts = this.form1.objSocialAccounts;
        this.companyFinancials = this.form2.objCompanyFinancials;
        this.companyAgeSize = this.form2.objCompanyAgeSize;
        this.companyAge = moment
          .duration(
            moment().diff(
              moment(
                this.form2.objCompanyAgeSize.strCompFoundDate,
                'YYYY-MM-DD'
              )
            )
          )
          .asMonths();
        this.companyAge = Math.round(+this.companyAge);
        this.management = this.form2.objManagement;
        this.investorsLenders = this.form2.objInvestorsLenders;
        this.productService = this.form2.objProductService;
        this.summary = {};
        this.businessDocuments = this.form3.objBusinessDocuments;
        this.media = this.form3.objMedia;
        this.newsLinks = this.form3.objNews;
        this.contact = this.form3.objContact;

        this.detectChange.detectChanges();
      });
  }
}
