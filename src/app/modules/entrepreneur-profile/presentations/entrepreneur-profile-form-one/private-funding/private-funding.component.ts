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
  selector: 'app-private-funding',
  templateUrl: './private-funding.component.html',
  styleUrls: ['./private-funding.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateFundingComponent implements OnInit, OnChanges, OnDestroy {
  objPrivateFunding: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormOne) {
      this.objPrivateFunding = objEntrepreneurProfileFormOne.get(
        'objPrivateFunding'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get privateFundingFormControl() {
    const objEntrepreneurProfileFormOne = this.parent.form.get(
      'objEntrepreneurProfileFormOne'
    ) as FormGroup;
    return objEntrepreneurProfileFormOne.get('objPrivateFunding')['controls'];
  }
}
