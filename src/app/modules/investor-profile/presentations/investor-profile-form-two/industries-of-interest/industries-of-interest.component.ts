import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
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
import { AUTH } from '@app/core/constants/module';
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-industries-of-interest',
  templateUrl: './industries-of-interest.component.html',
  styleUrls: ['./industries-of-interest.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndustriesOfInterestComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() blnEdit = false;

  @Output() event = new EventEmitter<IPresentationEvent>();

  strLoginPath = AUTH.pathLogin;
  objIndustriesOfInterest: FormGroup;
  stRegistrationPath = AUTH.pathRegistration;
  // @ViewChild('multiSelect') multiSelect;
  public dropdownList = [];
  public settings = {};
  public selectedItems = [];
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private renderer: Renderer2
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
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    if (!!objInvestorProfileFormTwo) {
      this.objIndustriesOfInterest = objInvestorProfileFormTwo.get(
        'objIndustriesOfInterest'
      ) as FormGroup;
    }
  }
  public setForm() {
    this.objIndustriesOfInterest = new FormGroup({
      arrIndustriesOfInterest: new FormControl([
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
    return this.objIndustriesOfInterest.controls;
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
  get industriesOfInterestFormControl() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    return objInvestorProfileFormTwo.get('objIndustriesOfInterest')['controls'];
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
