import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IInvestorProfile } from '@app/data/schema/investor-profile';
import { InvestorProfileService } from '@app/data/service';
import { NotificationService } from '@app/shared/service/notification.service';
import { of, Subject } from 'rxjs';
import { catchError, map, take, takeUntil, tap } from 'rxjs/operators';
import { InvestorService } from '../../investor.service';
import { InvestorModelComponent } from '../../presentations/investor-model/investor-model.component';

const investorTypes: any[] = [
  {
    id: '',
    name: 'Choose Investor Type'
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
    name: 'Individual Investor'
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
    name: 'Investor'
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
@Component({
  selector: 'app-investor-profile-edit',
  templateUrl: './investor-profile-edit.component.html',
  styleUrls: ['./investor-profile-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorProfileEditComponent
  implements OnInit, OnDestroy, OnChanges {
  destroySubject$ = new Subject();
  investorProfileForm: FormGroup;
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
  state: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private investorService: InvestorService,
    private investorProfileService: InvestorProfileService,
    private notificationService: NotificationService,
    private detectChange: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getInvestorProfileDetails();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }

  get investorProfileData() {
    return this.investorProfileForm.value;
  }

  getInvestorTypeName(id) {
    if (id) return investorTypes.filter(obj => obj.id == id)[0]['name'];
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

  eventHandler(editForm: string) {
    this.openDialog(editForm);
  }

  /**
   * Open dialogue
   */
  openDialog(editForm: string): void {
    const dialogRef = this.dialog.open(InvestorModelComponent, {
      width: '75vw',
      height: '75vh',
      autoFocus: false,
      data: {
        investorProfileData: this.investorProfileData,
        investorProfileForm: this.investorProfileForm,
        editForm
      }
    });

    dialogRef.componentInstance.event
      .pipe(
        take(1),
        map(event => {
          switch (event.type) {
            case 'UPDATE':
              this.saveInvestorProfile(event.data)
                .pipe(
                  take(1),
                  tap(() => {
                    dialogRef.close();
                    this.getInvestorProfileDetails();
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

  saveInvestorProfile(investorProfileData: IInvestorProfile) {
    return this.investorProfileService.save(investorProfileData).pipe(
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

  getInvestorProfileDetails() {
    this.investorService
      .getInvestorProfileData()
      .pipe(take(1))
      .subscribe(({ state, country, formGroup }) => {
        this.state = state || '';
        this.investorProfileForm = formGroup;
        this.form1 = this.investorProfileData.objInvestorProfileFormOne;
        this.form2 = this.investorProfileData.objInvestorProfileFormTwo;
        this.form3 = this.investorProfileData.objInvestorProfileFormThree;
        this.overview = {
          ...this.form1.objOverview,
          buisinessOverview: this.form1.objBuisinessOverview
            .strBuisinessOverview
        };
        this.funding = this.form1.objFunding;
        this.socialAccounts = this.form1.objSocialAccounts;
        this.management = this.form2.objManagement;
        this.summary = {
          ...this.form2.objIndustriesOfInterest,
          ...this.form2.objInvestmentInterest,
          ...this.form2.objInvestmentAcivities
        };

        this.portfolio = this.form3.objPortfolio;
        this.newsLinks = this.form3.objNews;
        this.contact = this.form3.objContact;

        this.detectChange.detectChanges();
      });
  }
}
