import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { feUrl } from '@app/core/constants/common';
import { IPresentationEvent } from '@app/data/schema';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { EntrepreneurService } from '../../entrepreneur.service';

@Component({
  selector: 'app-entrepreneur-model',
  templateUrl: './entrepreneur-model.component.html',
  styleUrls: ['./entrepreneur-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrepreneurModelComponent implements OnInit {
  @Output() event = new EventEmitter<IPresentationEvent>();
  entrepreneurProfileData: any;
  destroySubject$ = new Subject();
  editForm: string;
  objEntrepreneurProfileForm: FormGroup;
  entrepreneurProfile = feUrl.entrepreneurProfile;
  constructor(
    public dialogRef: MatDialogRef<EntrepreneurModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private router: Router,
    private entrepreneurService: EntrepreneurService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.entrepreneurService
      .getoEntrepreneurProfileData()
      .pipe(take(1))
      .subscribe(({ formGroup }) => {
        this.objEntrepreneurProfileForm = formGroup;
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
    const form1 = this.objEntrepreneurProfileForm.get(
      'objEntrepreneurProfileFormOne'
    );
    const form2 = this.objEntrepreneurProfileForm.get(
      'objEntrepreneurProfileFormTwo'
    );
    const form3 = this.objEntrepreneurProfileForm.get(
      'objEntrepreneurProfileFormThree'
    );

    const overview = form1.get('objOverview');
    const companyDescription = form1.get('objCompanyDescription');
    const companyIndustry = form1.get('objCompanyIndustry');

    const socialAccounts = form1.get('objSocialAccounts');
    const management = form2.get('objManagement');
    const newsLinks = form3.get('objNews');
    const contact = form3.get('objContact');
    const businessOverview = form1.get('objBuisinessOverview');

    const generalFunding = form1.get('objGeneralFunding');
    const privateFunding = form1.get('objPrivateFunding');

    const companyFinancials = form2.get('objCompanyFinancials');
    const companyAgeSize = form2.get('objCompanyAgeSize');

    const investorsLenders = form2.get('objInvestorsLenders');
    const productService = form2.get('objProductService');
    const businessDocuments = form3.get('objBusinessDocuments');
    const media = form3.get('objMedia');
    let blnInvalid = false;
    switch (this.editForm) {
      case 'OVERVIEW_EDIT':
        if (overview.invalid) {
          overview.markAllAsTouched();
          blnInvalid = true;
        }
        break;
      case 'ABOUT_US_EDIT':
        if (companyDescription.invalid || companyIndustry.invalid) {
          blnInvalid = true;
          companyDescription.markAllAsTouched();
          companyIndustry.markAllAsTouched();
        }
        break;
      case 'SOCIAL_ACCOUNT_EDIT':
        if (socialAccounts.invalid) {
          blnInvalid = true;
          socialAccounts.markAllAsTouched();
        }
        break;
      case 'MORE_INFO_EDIT':
        if (companyIndustry.invalid || companyAgeSize.invalid) {
          blnInvalid = true;
          companyIndustry.markAllAsTouched();
          companyAgeSize.markAllAsTouched();
        }
        break;
      case 'REVENUE_EDIT':
        if (companyFinancials.invalid) {
          blnInvalid = true;
          companyFinancials.markAllAsTouched();
        }
        break;
      case 'PRODUCT_SERVICE_EDIT':
        if (productService.invalid) {
          blnInvalid = true;
          productService.markAllAsTouched();
        }
        break;
      case 'DOCUMENT_EDIT':
        if (businessDocuments.invalid) {
          blnInvalid = true;
          businessDocuments.markAllAsTouched();
        }
        break;
      case 'MEDIA_EDIT':
        if (media.invalid) {
          blnInvalid = true;
          media.markAllAsTouched();
        }
        break;
      case 'FUNDING_EDIT':
        if (generalFunding.invalid || privateFunding.invalid) {
          generalFunding.markAllAsTouched();
          privateFunding.markAllAsTouched();
          blnInvalid = true;
        }
        break;
      case 'CONTACT_EDIT':
        if (contact.invalid) {
          blnInvalid = true;
          contact.markAllAsTouched();
        }
        break;
      case 'MANAGEMENT_EDIT':
        if (management.invalid) {
          blnInvalid = true;
          management.markAllAsTouched();
        }
        break;
      case 'NEWS_LINK_EDIT':
        if (newsLinks.invalid) {
          newsLinks.markAllAsTouched();
          blnInvalid = true;
        }
        break;

      default:
        break;
    }
    if (blnInvalid) return;
    this.event.emit(objEvent);
  }
}
