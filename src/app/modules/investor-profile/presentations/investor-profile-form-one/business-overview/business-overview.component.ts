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
  selector: 'app-business-overview',
  templateUrl: './business-overview.component.html',
  styleUrls: ['./business-overview.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessOverviewComponent implements OnInit, OnChanges, OnDestroy {
  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;
  objBuisinessOverview: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    if (!!objInvestorProfileFormOne) {
      this.objBuisinessOverview = objInvestorProfileFormOne.get(
        'objBuisinessOverview'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get buisinessOverviewFormControl() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    return objInvestorProfileFormOne.get('objBuisinessOverview')['controls'];
  }
}
