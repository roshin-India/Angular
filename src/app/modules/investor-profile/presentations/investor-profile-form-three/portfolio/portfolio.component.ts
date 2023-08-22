import { filter } from 'rxjs/operators';
import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ControlContainer,
  FormGroupDirective,
  FormControl
} from '@angular/forms';
import { UtilityService } from '@app/core/service/utility.service';
import { IPresentationEvent } from '@app/data/schema';
import { Observable } from 'rxjs';
import { AutocompleteService } from '@app/data/service/autocomplete.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  @ViewChild('title') titleHeader: ElementRef;
  objPortfolio: FormArray;
  objPortfolio2 = this.formBuilder.group({
    id: new FormControl(''),
    strCompanyName: new FormControl('', Validators.required),
    objCompanyLogo: new FormControl(''),
    strCompanyWebsite: new FormControl(''),
    strCompanyRole: new FormControl('')
  });
  initialValues = this.objPortfolio2;

  objInvestorProfileFormThree: FormGroup;
  blnAddUpdate = false;
  indexEdit = null;
  companyRoles: any[] = [
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
  imageError: string = null;
  strLogoName: string;
  strUploadData: string;
  portfolio$: Observable<any>;
  keyword = 'strCompanyName';
  historyHeading = 'Recently selected';
  companyName = '';
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private ref: ChangeDetectorRef,
    private utilityService: UtilityService,
    private autocompleteService: AutocompleteService
  ) {}

  ngOnInit() {
    this.objInvestorProfileFormThree = this.parent.form.get(
      'objInvestorProfileFormThree'
    ) as FormGroup;
    if (!!this.objInvestorProfileFormThree) {
      this.objPortfolio = this.objInvestorProfileFormThree.get(
        'objPortfolio'
      ) as FormArray;
    }
    this.portfolio$ = this.autocompleteService.portfolioAutocomplete({
      value: '',
      limit: 1000
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  ngAfterViewInit() {
    if (this.blnEdit) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  /**
   * return seleced autocomplete string
   *
   * @param id
   * @returns
   */
  getCompanyRole(id) {
    const currentCompany = this.companyRoles
      .filter(obj => obj.id === id)
      .map(res => res.name);
    return currentCompany[0];
  }
  /**
   * Get controls
   */
  get portfolioFormControl() {
    const objInvestorProfileFormThree = this.parent.form.get(
      'objInvestorProfileFormThree'
    ) as FormGroup;
    return objInvestorProfileFormThree.get('objPortfolio')['controls'];
  }
  /**
   * Adding Form
   */
  addPortfolio(): void {
    this.objPortfolio.push(this.createPortfolio());
    this.clearForm();
    this.ref.detectChanges();
  }
  /**
   * removing form
   */
  removePortfolio(i: number) {
    this.objPortfolio.removeAt(i);
  }
  /**
   * edit form
   */
  editPortfolio(data, i) {
    this.objPortfolio2.setValue({
      id: data.id,
      strCompanyName: data.strCompanyName,
      objCompanyLogo: data.objCompanyLogo,
      strCompanyWebsite: data.strCompanyWebsite,
      strCompanyRole: data.strCompanyRole
    });
    if (!!data.objCompanyLogo) {
      if (!!data.objCompanyLogo.data) {
        this.strUploadData = data.objCompanyLogo.data;
      }
      if (!!data.objCompanyLogo.fileName) {
        this.strLogoName = data.objCompanyLogo.fileName;
      }
    }
    this.blnAddUpdate = true;
    this.indexEdit = i;
    this.ref.detectChanges();
  }
  /**
   * Update form
   */
  updatePortfolio(index) {
    if (index !== null) {
      const myForm = this.objPortfolio.at(index);
      const comapany = this.objPortfolio2.controls.strCompanyName.value;
      myForm.setValue({
        id: this.objPortfolio2.controls.id.value,
        strCompanyName: !!comapany.id
          ? comapany.strCompanyName
          : this.objPortfolio2.controls.strCompanyName.value,
        objCompanyLogo: this.objPortfolio2.controls.objCompanyLogo.value,
        strCompanyWebsite: this.objPortfolio2.controls.strCompanyWebsite.value,
        strCompanyRole: this.objPortfolio2.controls.strCompanyRole.value
      });
      this.clearForm();
    }
  }

  /**
   * Clear form
   */
  clearForm() {
    this.objPortfolio2.reset(this.initialValues);
    this.blnAddUpdate = false;
    this.indexEdit = null;
    this.imageError = null;
    this.strLogoName = null;
    this.strUploadData = null;
  }
  /**
   * Create form group
   *
   * @returns
   */
  createPortfolio() {
    const comapany = this.objPortfolio2.controls.strCompanyName.value;
    return this.formBuilder.group({
      id: this.objPortfolio2.controls.id.value,
      strCompanyName: !!comapany.id
        ? comapany.strCompanyName
        : this.objPortfolio2.controls.strCompanyName.value,
      objCompanyLogo: this.objPortfolio2.controls.objCompanyLogo.value,
      strCompanyWebsite: this.objPortfolio2.controls.strCompanyWebsite.value,
      strCompanyRole: this.objPortfolio2.controls.strCompanyRole.value
    });
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
            this.strUploadData = null;
          } else if (resp.status === 'Success') {
            this.imageError = null;
            this.strLogoName = resp.data.fileName;
            this.strUploadData = resp.data.data;
            this.ref.detectChanges();
            this.objPortfolio2.patchValue({
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
    this.objPortfolio2.patchValue({
      objCompanyLogo: null
    });
    this.imageError = null;
    this.strLogoName = null;
    this.strUploadData = null;
    this.ref.detectChanges();
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
   * Select autocomplete
   */
  selectEvent(item) {
    if (!!item) {
      this.objPortfolio2.patchValue({
        id: item.id,
        strCompanyName: item.strCompanyName,
        objCompanyLogo: item.objCompanyLogo,
        strCompanyWebsite: item.strCompanyWebsite,
        strCompanyRole: item.strCompanyRole
      });
      if (!!item.objCompanyLogo) {
        if (!!item.objCompanyLogo.data) {
          this.strUploadData = item.objCompanyLogo.data;
        }
        if (!!item.objCompanyLogo.fileName) {
          this.strLogoName = item.objCompanyLogo.fileName;
        }
      }
      this.ref.detectChanges();
    }
  }
  onChangeSearch(search: string) {
    this.objPortfolio2.patchValue({
      id: null,
      strCompanyName: search,
      objCompanyLogo: null,
      strCompanyWebsite: null,
      strCompanyRole: ''
    });
    this.strUploadData = null;
    this.strLogoName = null;
  }
}
