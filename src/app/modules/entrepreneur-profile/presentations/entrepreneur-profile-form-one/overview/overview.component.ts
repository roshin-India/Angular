import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  Renderer2,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ControlContainer,
  FormGroupDirective
} from '@angular/forms';
import { UtilityService } from '@app/core/service/utility.service';
import { IPresentationEvent } from '@app/data/schema';
import { AutocompleteService } from '@app/data/service/autocomplete.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  state$: Observable<any>;
  country$: Observable<any>;
  triggerCountryChange$ = new Subject();
  objOverview: FormGroup;
  investorTypes: any[] = [
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
  states: any[] = [
    {
      id: '',
      name: 'Select State or Province'
    },
    {
      id: 1,
      name: 'Kerala'
    }
  ];
  countries: any[] = [
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
  imageError: string = null;
  strLogoName: string;
  strUploadData: string;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private renderer: Renderer2,
    private utilityService: UtilityService,
    private ref: ChangeDetectorRef,
    private autocompleteService: AutocompleteService
  ) {}

  ngOnInit() {
    this.state$ = this.triggerCountryChange$.pipe(
      switchMap(contryId => {
        return this.autocompleteService.stateAutocomplete({
          countryId: contryId,
          value: '',
          limit: 10000
        });
      })
    );
    this.country$ = this.autocompleteService.countryAutocomplete({
      value: '',
      limit: 300
    });

    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormOne) {
      this.objOverview = objEntrepreneurProfileFormOne.get(
        'objOverview'
      ) as FormGroup;
      if (!!this.objOverview.value.objCompanyLogo) {
        if (!!this.objOverview.value.objCompanyLogo.data) {
          this.strUploadData = this.objOverview.value.objCompanyLogo.data;
        }
        if (!!this.objOverview.value.objCompanyLogo.fileName) {
          this.strLogoName = this.objOverview.value.objCompanyLogo.fileName;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    if (!!this.objOverview.value.intCountry) {
      this.triggerCountryChange$.next(this.objOverview.value.intCountry);
      this.objOverview.patchValue({
        intState: this.objOverview.value.intState
      });
    }
    if (this.blnEdit) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get overviewFormControl() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    return objEntrepreneurProfileFormOne.get('objOverview')['controls'];
  }
  /**
   * Update form
   */
  update() {
    if (this.blnEdit) {
      this.event.emit({
        type: 'UPDATE',
        data: this.parent.form.value
      });
    }
  }
  /**
   * cancel form
   */
  cancel() {
    if (this.blnEdit) {
      this.event.emit({
        type: 'CANCEL',
        data: null
      });
    }
  }
  /**
   * File upload
   */
  fileChangeEvent(fileInput: any) {
    const selectedFiles = fileInput.target.files[0];
    const objSetting = {
      maxSize: 20971520,
      allowedTypes: ['image/png', 'image/jpeg'],
      maxHeight: 15200,
      maxWidth: 25600
    };
    this.utilityService
      .fileUpload(selectedFiles, objSetting)
      .then((resp: any) => {
        if (!!resp) {
          if (resp.status === 'Error') {
            this.imageError = resp.message;
            this.strLogoName = null;
          } else if (resp.status === 'Success') {
            this.imageError = null;
            this.strLogoName = resp.data.fileName;
            this.strUploadData = resp.data.data;
            this.ref.detectChanges();
            this.objOverview.patchValue({
              objCompanyLogo: resp.data
            });
          }
        }
      });
  }
  /**
   * Remove uploaded
   */
  removeUpload() {
    this.objOverview.patchValue({
      objCompanyLogo: null
    });
    this.imageError = null;
    this.strLogoName = null;
    this.strUploadData = null;
    this.ref.detectChanges();
  }

  contryChange({ countryId }) {
    this.triggerCountryChange$.next(countryId);
    this.objOverview.patchValue({
      intState: null
    });
  }
}
