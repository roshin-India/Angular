import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
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
import { AutocompleteService } from '@app/data/service/autocomplete.service';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-investors-lenders',
  templateUrl: './investors-lenders.component.html',
  styleUrls: ['./investors-lenders.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorsLendersComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  objInvestorsLenders: FormGroup;
  state$: Observable<any>;
  country$: Observable<any>;
  triggerCountryChange$ = new Subject();
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
  selectType: any[] = [
    {
      id: '',
      name: 'Select Type'
    },
    {
      id: 1,
      name: 'Seed Funding'
    }
  ];
  investmentType: any[] = [
    {
      id: '',
      name: 'Select  Investment Type'
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
  investmentRound: any[] = [
    {
      id: '',
      name: 'Select Investment Round'
    },
    {
      id: 1,
      name: 'Angel'
    },
    {
      id: 2,
      name: 'Series A'
    },
    {
      id: 3,
      name: 'Series B'
    },
    {
      id: 4,
      name: 'Series C'
    },
    {
      id: 5,
      name: 'Series D'
    },
    {
      id: 6,
      name: 'Series C'
    },
    {
      id: 7,
      name: 'Series D'
    },
    {
      id: 8,
      name: 'Series E'
    },
    {
      id: 9,
      name: 'Series F'
    },
    {
      id: 10,
      name: 'Others'
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
  strPhotoName: string;
  strUploadData: string;
  investor$: Observable<any>;
  keyword = 'name';
  historyHeading = 'Recently selected';
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
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
    this.investor$ = this.autocompleteService.investorAutocomplete({
      value: '',
      limit: 1000
    });

    const objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormTwo) {
      this.objInvestorsLenders = objEntrepreneurProfileFormTwo.get(
        'objInvestorsLenders'
      ) as FormGroup;

      if (!!this.objInvestorsLenders.value.objPhoto) {
        if (!!this.objInvestorsLenders.value.objPhoto.data) {
          this.strUploadData = this.objInvestorsLenders.value.objPhoto.data;
        }
        if (!!this.objInvestorsLenders.value.objPhoto.fileName) {
          this.strPhotoName = this.objInvestorsLenders.value.objPhoto.fileName;
        }
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    if (!!this.objInvestorsLenders.value.intCountry) {
      this.triggerCountryChange$.next(
        this.objInvestorsLenders.value.intCountry
      );
      this.objInvestorsLenders.patchValue({
        intState: this.objInvestorsLenders.value.intState
      });
    }
  }
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get investorLandersFormControl() {
    const objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    return objEntrepreneurProfileFormTwo.get('objInvestorsLenders')['controls'];
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
            this.strPhotoName = null;
            this.strUploadData = null;
          } else if (resp.status === 'Success') {
            this.imageError = null;
            this.strPhotoName = resp.data.fileName;
            this.strUploadData = resp.data.data;
            this.ref.detectChanges();
            this.objInvestorsLenders.patchValue({
              objPhoto: resp.data
            });
          }
        }
      });
  }
  /**
   * Remove uploaded
   */
  removeUpload() {
    this.objInvestorsLenders.patchValue({
      objPhoto: null
    });
    this.imageError = null;
    this.strPhotoName = null;
    this.strUploadData = null;
    this.ref.detectChanges();
  }

  contryChange({ countryId }) {
    this.triggerCountryChange$.next(countryId);
    this.objInvestorsLenders.patchValue({
      intState: null
    });
  }
  /**
   * Select autocomplete
   */
  selectEvent(item) {
    if (!!item) {
      if (!!item.intCountry) {
        this.triggerCountryChange$.next(item.intCountry);
      }
      this.objInvestorsLenders.patchValue({
        strInvestorLanders: item.name,
        intSelectType: '',
        objPhoto: item.objLogo,
        intCountry: item.intCountry,
        intState: item.intState,
        strCityName: item.cityName,
        strZipCode: item.strZipCode,
        strEmail: item.strEmail,
        strLinkedIn: item.strLinkedInUrl,
        strGeneralDesc: item.strBuisinessOverview
      });
      if (!!item.objLogo) {
        if (!!item.objLogo.data) {
          this.strUploadData = item.objLogo.data;
        }
        if (!!item.objLogo.fileName) {
          this.strPhotoName = item.objLogo.fileName;
        }
      }
      this.ref.detectChanges();
    }
  }
  onChangeSearch(search: string) {
    this.objInvestorsLenders.patchValue({
      strInvestorLanders: search,
      intSelectType: '',
      objPhoto: null,
      intCountry: null,
      intState: null,
      strCityName: null,
      strZipCode: null,
      strEmail: null,
      strLinkedIn: null,
      strGeneralDesc: null
    });
    this.strUploadData = null;
    this.strPhotoName = null;
  }
  onInputClear() {
    console.log('key');
  }
}
