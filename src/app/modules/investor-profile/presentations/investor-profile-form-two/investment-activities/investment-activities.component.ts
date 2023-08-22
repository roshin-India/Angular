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
import { AUTH } from '@app/core/constants/module';
@Component({
  selector: 'app-investment-activities',
  templateUrl: './investment-activities.component.html',
  styleUrls: ['./investment-activities.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentActivitiesComponent
  implements OnInit, OnChanges, OnDestroy {
  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;

  objInvestmentAcivities: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    if (!!objInvestorProfileFormTwo) {
      this.objInvestmentAcivities = objInvestorProfileFormTwo.get(
        'objInvestmentAcivities'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get investmentAcivitiesFormControl() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    return objInvestorProfileFormTwo.get('objInvestmentAcivities')['controls'];
  }
}
