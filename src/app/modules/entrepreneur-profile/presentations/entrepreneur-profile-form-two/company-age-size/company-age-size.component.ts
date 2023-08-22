import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ControlContainer,
  FormGroupDirective
} from '@angular/forms';

@Component({
  selector: 'app-company-age-size',
  templateUrl: './company-age-size.component.html',
  styleUrls: ['./company-age-size.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyAgeSizeComponent implements OnInit, OnChanges, OnDestroy {
  objCompanyAgeSize: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormTwo) {
      this.objCompanyAgeSize = objEntrepreneurProfileFormTwo.get(
        'objCompanyAgeSize'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get companyAgeSizeFormControl() {
    const objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    return objEntrepreneurProfileFormTwo.get('objCompanyAgeSize')['controls'];
  }
}
