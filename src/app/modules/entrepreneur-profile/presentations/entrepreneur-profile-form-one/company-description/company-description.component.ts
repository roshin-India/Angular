import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
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
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-company-description',
  templateUrl: './company-description.component.html',
  styleUrls: ['./company-description.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDescriptionComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objCompanyDescription: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormOne) {
      this.objCompanyDescription = objEntrepreneurProfileFormOne.get(
        'objCompanyDescription'
      ) as FormGroup;
    }
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
  /**
   * Get controls
   */
  get companyDescriptionFormControl() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    return objEntrepreneurProfileFormOne.get('objCompanyDescription')[
      'controls'
    ];
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
