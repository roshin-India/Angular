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
  selector: 'app-investor-accreditation',
  templateUrl: './investor-accreditation.component.html',
  styleUrls: ['./investor-accreditation.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorAccreditationComponent
  implements OnInit, OnChanges, OnDestroy {
  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;
  objInvestorAccreditation: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    if (!!objInvestorProfileFormOne) {
      this.objInvestorAccreditation = objInvestorProfileFormOne.get(
        'objInvestorAccreditation'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get investorAccreditationFormControl() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    return objInvestorProfileFormOne.get('objInvestorAccreditation')[
      'controls'
    ];
  }
}
