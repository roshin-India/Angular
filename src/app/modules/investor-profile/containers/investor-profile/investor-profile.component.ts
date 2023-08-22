import { IPresentationEvent } from './../../../../data/schema/events';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RoutesRecognized,
  NavigationEnd
} from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';

import { ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import {
  catchError,
  takeUntil,
  tap,
  filter,
  take,
  switchMap
} from 'rxjs/operators';
import { InvestorProfileService } from '@app/data/service/investor-profile.service';
import { NotificationService } from '@app/shared/service/notification.service';
import { IInvestorProfile } from '@app/data/schema/investor-profile';
import { UtilityService } from '@app/core/service/utility.service';
import Stepper from 'bs-stepper';
import { feUrl } from '@app/core/constants/common';
import { InvestorService } from '../../investor.service';
import { Subject, of } from 'rxjs';
@Component({
  selector: 'app-investor-profile',
  templateUrl: './investor-profile.component.html',
  styleUrls: ['./investor-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorProfileComponent implements OnInit, OnDestroy, OnChanges {
  stepper: Stepper;
  investorProfile = feUrl.investorProfile;
  investorProfileView = feUrl.investorProfileView;
  destroySubject$ = new Subject();
  objInvestorProfileForm: FormGroup;
  // = this.formBuilder.group({
  //   objInvestorProfileFormOne: this.formBuilder.group({
  //     objOverview: this.formBuilder.group({
  //       strZipCode: new FormControl('', Validators.required),
  //       strWebsite: new FormControl(''),
  //       strPhone: new FormControl(''),
  //       strFirmName: new FormControl('', Validators.required),
  //       strCityName: new FormControl('', Validators.required),
  //       objLogo: new FormControl('', Validators.required),
  //       intState: new FormControl('', Validators.required),
  //       intNoOfInvestorFirm: new FormControl('', Validators.required),
  //       intInvestorMemberType: new FormControl('', Validators.required),
  //       intCountry: new FormControl('', Validators.required)
  //     }),
  //     objSocialAccounts: this.formBuilder.group({
  //       strLinkedInUrl: new FormControl(''),
  //       strFacebookUrl: new FormControl(''),
  //       strTwitterUrl: new FormControl(''),
  //       strYoutubeUrl: new FormControl(''),
  //       strInstagramUrl: new FormControl(''),
  //       strBlogUrl: new FormControl('')
  //     }),
  //     objBuisinessOverview: this.formBuilder.group({
  //       strBuisinessOverview: new FormControl('', Validators.required)
  //     }),
  //     objInvestorAccreditation: this.formBuilder.group({
  //       blnOne: new FormControl(''),
  //       blnTwo: new FormControl(''),
  //       blnThree: new FormControl(''),
  //       blnFour: new FormControl('')
  //     }),
  //     objFunding: this.formBuilder.group({
  //       intMinReveneuStage: new FormControl('', Validators.required),
  //       intMaxReveneuStage: new FormControl('', Validators.required),
  //       intMinInvestmentStage: new FormControl('', Validators.required),
  //       intMaxInvestmentStage: new FormControl('', Validators.required)
  //     })
  //   }),
  //   objInvestorProfileFormTwo: this.formBuilder.group({
  //     objIndustriesOfInterest: this.formBuilder.group({
  //       arrIndustriesOfInterest: new FormControl('', Validators.required)
  //     }),
  //     objInvestmentInterest: this.formBuilder.group({
  //       intPrimaryTypeCapital: new FormControl(''),
  //       intExpRateOfReturnPerYear: new FormControl(''),
  //       intMinValueOfInterest: new FormControl(''),
  //       intMaxValueOfInterest: new FormControl('')
  //     }),
  //     objInvestmentAcivities: this.formBuilder.group({
  //       intNoBuisinessReviewed: new FormControl(''),
  //       intNoBuisinessInvested: new FormControl(''),
  //       intToalCapitalInvested: new FormControl('')
  //     }),
  //     objManagement: this.formBuilder.array([])
  //   }),
  //   objInvestorProfileFormThree: this.formBuilder.group({
  //     objPortfolio: this.formBuilder.array([]),
  //     objNews: this.formBuilder.group({
  //       strNewsLinkUrl: new FormControl(''),
  //       strLinkText: new FormControl('')
  //     }),
  //     objContact: this.formBuilder.group({
  //       strFullName: new FormControl('')
  //     })
  //   })
  // });
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private investorProfileService: InvestorProfileService,
    private investorService: InvestorService,
    private notificationService: NotificationService,
    private utilityService: UtilityService,
    private detectChange: ChangeDetectorRef,
    private router: Router
  ) {
    this.investorService
      .getInvestorProfileData()
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(({ formGroup }) => {
        this.objInvestorProfileForm = formGroup;
        this.detectChange.detectChanges();
      });
  }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.handleSubmitForm();
  }
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
  /**
   * Handle submit
   */
  handleSubmitForm() {
    this.investorProfileService.investorProfileData$
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(res => {
        if (res !== null) {
          this.handleEventFromPresentation(res);
        }
      });
  }
  /**
   * Create management form array
   */
  createManagement() {
    return this.formBuilder.group({
      strFullName: '',
      strLinkedInUrl: '',
      strDesignation: '',
      strEmail: '',
      objPhoto: '',
      strOverviewManagement: ''
    });
  }
  /**
   * Handle all event from presentations
   */
  handleEventFromPresentation(objEvent: any) {
    switch (objEvent.type) {
      case 'SAVE_INVESTOR_PROFILE':
        this.saveInvestorProfile(
          objEvent.data.formValue,
          objEvent.data.navigate
        );
        break;
      case 'NAVIGATE_INVESTOR_PROFILE':
        this.router.navigate([this.investorProfile, objEvent.data]);
        break;
      case 'SUBMIT_FOR_APPROVAL':
        this.submitForApprovalInvestorProfile(objEvent.data);
        break;
      default:
        break;
    }
  }

  /**
   * Submit for approval investor profile
   *
   * @param investorProfileData
   */
  submitForApprovalInvestorProfile(objInvestorProfileForm: FormGroup) {
    if (objInvestorProfileForm.valid) {
      this.investorProfileService
        .save(objInvestorProfileForm.value)
        .pipe(
          switchMap(() => {
            console.log();
            return this.investorProfileService.submitForApprovalFinal().pipe(
              takeUntil(this.destroySubject$),
              // debounceTime(1500),
              tap(objLoginDetails => {
                this.notificationService.openToster({
                  message: 'Submit for approval is success',
                  title: 'Success',
                  type: 'success',
                  module: 'INVESTOR-PROFILE'
                });
                localStorage.setItem('userStatus', 'U');
                this.router.navigate([this.investorProfileView]);
              }),

              catchError(err => {
                this.notificationService.openToster({
                  message: 'Submit for approval is failed',
                  title: 'Error',
                  type: 'error',
                  module: 'INVESTOR-PROFILE'
                });
                return of(err);
              })
            );
          })
        )

        .subscribe();
    } else {
      objInvestorProfileForm.markAllAsTouched();
      this.notificationService.openToster({
        message: 'Please fill all required fields to submit for approval',
        title: 'Error',
        type: 'error',
        module: 'INVESTOR-PROFILE'
      });
    }
  }

  /**
   * Save investor profile details
   *
   * @param investorProfileData
   */
  saveInvestorProfile(
    investorProfileData: IInvestorProfile,
    navigateId: number
  ) {
    this.investorProfileService
      .save(investorProfileData)
      .pipe(
        takeUntil(this.destroySubject$),
        // debounceTime(1500),
        tap(objLoginDetails => {
          this.notificationService.openToster({
            message: 'Save is success',
            title: 'Success',
            type: 'success',
            module: 'INVESTOR-PROFILE'
          });
          if (!!navigateId) {
            this.router.navigate([this.investorProfile, navigateId]);
          }
        }),

        catchError(err => {
          this.notificationService.openToster({
            message: 'Save not success',
            title: 'Error',
            type: 'error',
            module: 'INVESTOR-PROFILE'
          });
          return of(err);
        })
      )
      .subscribe();
  }

  /**
   * Route change scroll tot top func.
   */
  onNavigate(event): any {
    if (!!event.router.routerState.snapshot.url) {
      switch (event.router.routerState.snapshot.url) {
        case this.investorProfile + '/1':
          this.stepper.to(1);
          break;
        case this.investorProfile + '/2':
          this.stepper.to(2);
          break;
        case this.investorProfile + '/3':
          this.stepper.to(3);
          break;
        default:
          break;
      }
    }
    this.utilityService.scrollTo(0);
  }

  next() {
    this.stepper.next();
  }
  prev() {
    this.stepper.previous();
  }
  to(number) {
    this.stepper.to(number);
  }
  reset() {
    this.stepper.reset();
  }
  destroy() {
    this.stepper.destroy();
  }

  onSubmit() {
    return false;
  }
}
