import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  OnDestroy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPresentationEvent } from '@app/data/schema';
import { InvestorProfileService } from '@app/data/service';
import { IInvestorProfile } from '@app/data/schema/investor-profile';
import { takeUntil, tap, catchError, take } from 'rxjs/operators';
import { NotificationService } from '@app/shared/service/notification.service';
import { feUrl } from '@app/core/constants/common';
import { Subject, of } from 'rxjs';
import { InvestorService } from '../../investor.service';

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-investor-model',
  templateUrl: './investor-model.component.html',
  styleUrls: ['./investor-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorModelComponent implements OnInit, OnChanges, OnDestroy {
  @Output() event = new EventEmitter<IPresentationEvent>();
  investorProfileData: any;
  destroySubject$ = new Subject();
  editForm: string;
  objInvestorProfileForm: FormGroup;
  investorProfile = feUrl.investorProfile;
  constructor(
    public dialogRef: MatDialogRef<InvestorModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private investorService: InvestorService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.investorService
      .getInvestorProfileData()
      .pipe(take(1))
      .subscribe(({ formGroup }) => {
        this.objInvestorProfileForm = formGroup;
        if (!!this.data) {
          const { editForm } = this.data;
          this.editForm = editForm;
          this.ref.detectChanges();
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
  handleEventFromPresentation(objEvent: IPresentationEvent) {
    if (objEvent.type === 'CANCEL') {
      this.event.emit(objEvent);
      return;
    }
    const form1 = this.objInvestorProfileForm.get('objInvestorProfileFormOne');
    const form2 = this.objInvestorProfileForm.get('objInvestorProfileFormTwo');
    const form3 = this.objInvestorProfileForm.get(
      'objInvestorProfileFormThree'
    );

    const overview = form1.get('objOverview');
    const businessOverview = form1.get('objBuisinessOverview');
    const funding = form1.get('objFunding');
    const socialAccounts = form1.get('objSocialAccounts');
    const management = form2.get('objManagement');
    const industriesOfInterest = form2.get('objIndustriesOfInterest');
    const investmentInterest = form2.get('objInvestmentInterest');
    const investmentAcivities = form2.get('objInvestmentAcivities');
    const portfolio = form3.get('objPortfolio');
    const newsLinks = form3.get('objNews');
    const contact = form3.get('objContact');
    let blnInvalid = false;
    switch (this.editForm) {
      case 'OVERVIEW_EDIT':
        if (overview.invalid || businessOverview.invalid) {
          overview.markAllAsTouched();
          businessOverview.markAllAsTouched();
          blnInvalid = true;
        }
        break;
      case 'SOCIAL_ACCOUNT_EDIT':
        if (socialAccounts.invalid) blnInvalid = true;
        break;
      case 'SUMMARY_EDIT':
        if (
          industriesOfInterest.invalid ||
          investmentInterest.invalid ||
          investmentAcivities.invalid
        ) {
          industriesOfInterest.markAllAsTouched();
          investmentInterest.markAllAsTouched();
          investmentAcivities.markAllAsTouched();
          blnInvalid = true;
        }
        break;
      case 'FUNDING_EDIT':
        if (funding.invalid) {
          funding.markAllAsTouched();
          blnInvalid = true;
        }
        break;
      case 'CONTACT_EDIT':
        if (contact.invalid) blnInvalid = true;
        break;
      case 'PORTFOLIO_EDIT':
        if (portfolio.invalid) blnInvalid = true;
        break;
      case 'MANAGEMENT_EDIT':
        if (management.invalid) blnInvalid = true;
        break;
      case 'NEWS_LINK_EDIT':
        if (newsLinks.invalid) blnInvalid = true;
        break;

      default:
        break;
    }
    if (blnInvalid) return;
    this.event.emit(objEvent);
  }
}
