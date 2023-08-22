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
  selector: 'app-investment-of-interest',
  templateUrl: './investment-of-interest.component.html',
  styleUrls: ['./investment-of-interest.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentOfInterestComponent
  implements OnInit, OnChanges, OnDestroy {
  objInvestmentInterest: FormGroup;
  primaryTypes: any[] = [
    {
      id: '',
      name: 'Choose Primary Type of Capital Provided'
    },
    {
      id: 1,
      name: 'Debt'
    },
    {
      id: 2,
      name: 'Equity'
    },
    {
      id: 3,
      name: 'Grant'
    },
    {
      id: 4,
      name: 'Other'
    },
    {
      id: 5,
      name: 'Royalty Repayment'
    }
  ];
  minValuation: any[] = [
    {
      id: '',
      name: 'Minimum Valuation of Interest ($)'
    },
    {
      id: 1,
      name: '1000'
    },
    {
      id: 2,
      name: '5000'
    }
  ];
  maxValuation: any[] = [
    {
      id: '',
      name: 'Maximum Valuation of Interest ($)'
    },
    {
      id: 1,
      name: '1000'
    },
    {
      id: 2,
      name: '5000'
    }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    if (!!objInvestorProfileFormTwo) {
      this.objInvestmentInterest = objInvestorProfileFormTwo.get(
        'objInvestmentInterest'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get investmentInterestoverviewFormControl() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    return objInvestorProfileFormTwo.get('objInvestmentInterest')['controls'];
  }
}
