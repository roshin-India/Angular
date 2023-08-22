import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ControlContainer,
  FormGroupDirective
} from '@angular/forms';
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-general-funding',
  templateUrl: './general-funding.component.html',
  styleUrls: ['./general-funding.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralFundingComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objGeneralFunding: FormGroup;
  fundngTypes: any[] = [
    {
      id: '',
      name: 'Select Funding Type'
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
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormOne) {
      this.objGeneralFunding = objEntrepreneurProfileFormOne.get(
        'objGeneralFunding'
      ) as FormGroup;
    }
  }

  ngAfterViewInit(): void {
    if (this.blnEdit) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get generalFundingFormControl() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    return objEntrepreneurProfileFormOne.get('objGeneralFunding')['controls'];
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
