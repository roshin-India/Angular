import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  Output
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
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-company-industry',
  templateUrl: './company-industry.component.html',
  styleUrls: ['./company-industry.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyIndustryComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objCompanyIndustry: FormGroup;
  // @ViewChild('multiSelect') multiSelect;
  public dropdownList = [];
  public settings = {};
  public selectedItems = [];
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    this.dropdownList = [
      {
        id: 1,
        text: 'Biotech, Pharmaceuticals, Healthcare,Medical Devices & Equipment'
      },
      { id: 2, text: 'Business Products &amp; Services, IT Services' },
      { id: 3, text: 'Communications' },
      { id: 4, text: 'Computers &amp; Control Systems,Peripherals, Robotics' },
      { id: 5, text: 'Consumer Products &amp; Services,Retailing' },
      { id: 6, text: 'Electronics &amp; Instrumentation,Semiconductors, Na' },
      { id: 7, text: 'Energy &amp; Utilities' },
      { id: 8, text: 'Financial Services &amp; Real Estate' },
      { id: 9, text: 'Industrial &amp; Manufacturing,Materials, Chemicals' },
      { id: 10, text: 'Media &amp; Entertainment' },
      { id: 11, text: 'Software' },
      { id: 12, text: 'Transportation &amp; Distribution,Aerospace, Defense' }
    ];
    // setting and support i18n
    this.settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 3,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No data available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormOne) {
      this.objCompanyIndustry = objEntrepreneurProfileFormOne.get(
        'objCompanyIndustry'
      ) as FormGroup;
    }
  }
  public setForm() {
    this.objCompanyIndustry = new FormGroup({
      arrIndustries: new FormControl([
        this.dropdownList[0],
        this.dropdownList[2]
      ])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
    if (this.blnEdit) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  ngOnDestroy(): void {}
  get f() {
    return this.objCompanyIndustry.controls;
  }
  public onFilterChange(item: any) {}
  public onDropDownClose(item: any) {}

  public onItemSelect(item: any) {}
  public onDeSelect(item: any) {}

  public onSelectAll(items: any) {}
  public onDeSelectAll(items: any) {}
  /**
   * Get controls
   */
  get companyIndustryFormControl() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    return objEntrepreneurProfileFormOne.get('objCompanyIndustry')['controls'];
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
}
