import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ElementRef,
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
  selector: 'app-social-accounts',
  templateUrl: './social-accounts.component.html',
  styleUrls: ['./social-accounts.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialAccountsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;

  @Output() event = new EventEmitter<IPresentationEvent>();

  @ViewChild('title') titleHeader: ElementRef;

  objSocialAccounts: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    if (!!objInvestorProfileFormOne) {
      this.objSocialAccounts = objInvestorProfileFormOne.get(
        'objSocialAccounts'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get socialAccountFormControl() {
    const objInvestorProfileFormOne = this.parent.form.get(
      'objInvestorProfileFormOne'
    ) as FormGroup;
    return objInvestorProfileFormOne.get('objSocialAccounts')['controls'];
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
