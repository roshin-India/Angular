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
  EventEmitter,
  ViewChild,
  ElementRef
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
  selector: 'app-funding',
  templateUrl: './funding.component.html',
  styleUrls: ['./funding.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundingComponent
  implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  @ViewChild('title') titleHeader: ElementRef;
  objFunding: FormGroup;
  funding: any[] = [
    {
      id: '',
      name: 'Minimum Revenue Stage of Interest'
    },
    {
      id: 1000,
      name: '1000'
    },
    {
      id: 2000,
      name: '2000'
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    if (!!objInvestorProfileFormOne) {
      this.objFunding = objInvestorProfileFormOne.get(
        'objFunding'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  ngAfterViewInit(): void {}
  /**
   * Get controls
   */
  get fundingFormControl() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    return objInvestorProfileFormOne.get('objFunding')['controls'];
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
