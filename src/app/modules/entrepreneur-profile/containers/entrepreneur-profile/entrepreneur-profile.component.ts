import { IEntrepreneurProfile } from './../../../../data/schema/entrepreneur-profile';
import { UtilityService } from '@app/core/service/utility.service';
import { IPresentationEvent } from './../../../../data/schema/events';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { EntrepreneurProfileService } from '@app/data/service';
import { NotificationService } from '@app/shared/service/notification.service';
import Stepper from 'bs-stepper';
import { feUrl } from '@app/core/constants/common';
import { EntrepreneurService } from '../../entrepreneur.service';
@Component({
  selector: 'app-entrepreneur-profile',
  templateUrl: './entrepreneur-profile.component.html',
  styleUrls: ['./entrepreneur-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrepreneurProfileComponent implements OnInit, OnDestroy {
  stepper: Stepper;
  entrepreneurProfile = feUrl.entrepreneurProfile;
  entrepreneurProfileView = feUrl.entrepreneurProfileView;
  destroySubject$ = new Subject();
  objEntrepreneurProfileForm: FormGroup;
  entrepreneurId = null;
  personId = null;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private entrepreneurProfileService: EntrepreneurProfileService,
    private entrepreneurService: EntrepreneurService,
    private utilityService: UtilityService,
    private detectChange: ChangeDetectorRef,
    private router: Router
  ) {
    this.entrepreneurService
      .getoEntrepreneurProfileData()
      .pipe(take(1))
      .subscribe(({ formGroup }) => {
        this.objEntrepreneurProfileForm = formGroup;
        this.detectChange.detectChanges();
      });
  }
  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });
    this.handleSubmitForm();
    //TODO:Edit case
    // this.getEntrepreneurProfileData();
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(null);
    this.destroySubject$.complete();
  }
  /**
   * Handle submit
   */
  handleSubmitForm() {
    this.entrepreneurProfileService.entrepreneurProfileData$
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
      case 'SAVE_ENTREPRENEUR_PROFILE':
        this.saveEntrepreneurProfile(
          objEvent.data.formValue,
          objEvent.data.navigate
        );
        break;
      case 'SAVE_AND_REDIRECT_TO_PROFILE':
        this.saveEntrepreneurProfile(objEvent.data.formValue, null);
        break;
      case 'NAVIGATE_ENTREPRENEUR_PROFILE':
        this.router.navigate([this.entrepreneurProfile, objEvent.data]);
        break;
      case 'SUBMIT_FOR_APPROVAL':
        this.submitForApprovalEntreprenureProfile(objEvent.data);
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
  submitForApprovalEntreprenureProfile(objEntrepreneurProfileForm: FormGroup) {
    if (objEntrepreneurProfileForm.valid) {
      const formData = objEntrepreneurProfileForm.value;
      const strInvestorLanders: any =
        formData?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
          ?.strInvestorLanders;
      if (typeof strInvestorLanders === 'object' && !!strInvestorLanders) {
        formData.objEntrepreneurProfileFormTwo.objInvestorsLenders.strInvestorLanders =
          strInvestorLanders.name;
      }

      this.entrepreneurProfileService
        .save(formData)
        .pipe(
          switchMap(() => {
            console.log();
            return this.entrepreneurProfileService
              .submitForApprovalFinal()
              .pipe(
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
                  this.router.navigate([this.entrepreneurProfileView]);
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
      objEntrepreneurProfileForm.markAllAsTouched();
      this.notificationService.openToster({
        message: 'Please fill all required fields to submit for approval',
        title: 'Error',
        type: 'error',
        module: 'ENTREPRENURE-PROFILE'
      });
    }
  }
  /**
   * Save ENTREPRENEUR profile details
   *
   * @param entrepreneurProfileData
   */
  saveEntrepreneurProfile(
    entrepreneurProfileData: IEntrepreneurProfile,
    navigateId: number
  ) {
    const formData = entrepreneurProfileData;
    const strInvestorLanders: any =
      formData?.objEntrepreneurProfileFormTwo?.objInvestorsLenders
        ?.strInvestorLanders;
    if (typeof strInvestorLanders === 'object' && !!strInvestorLanders) {
      formData.objEntrepreneurProfileFormTwo.objInvestorsLenders.strInvestorLanders =
        strInvestorLanders.name;
    }

    this.entrepreneurProfileService
      .save(formData)
      .pipe(
        takeUntil(this.destroySubject$),
        // debounceTime(1500),
        tap(objLoginDetails => {
          this.notificationService.openToster({
            message: 'Save is success',
            title: 'Success',
            type: 'success',
            module: 'ENTREPRENEUR-PROFILE'
          });
          if (!!navigateId) {
            this.router.navigate([this.entrepreneurProfile, navigateId]);
          }
          // if (!finalFlag) {
          //   if (!!navigateId) {
          //     this.router.navigate([this.entrepreneurProfile, navigateId]);
          //   }
          // } else {
          //   localStorage.setItem('userStatus', 'A');
          //   this.router.navigate([this.entrepreneurProfileView]);
          // }
        }),
        catchError(err => {
          this.notificationService.openToster({
            message: 'Save not success',
            title: 'Error',
            type: 'error',
            module: 'ENTREPRENEUR-PROFILE'
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
        case this.entrepreneurProfile + '/1':
          this.stepper.to(1);
          break;
        case this.entrepreneurProfile + '/2':
          this.stepper.to(2);
          break;
        case this.entrepreneurProfile + '/3':
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
