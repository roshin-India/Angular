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
  ViewChild,
  ElementRef,
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
import { AUTH } from '@app/core/constants/module';
import { IPresentationEvent } from '@app/data/schema';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  @ViewChild('title') titleHeader: ElementRef;
  strLoginPath = AUTH.pathLogin;

  stRegistrationPath = AUTH.pathRegistration;
  objContact: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objInvestorProfileFormThree = this.parent.form.get(
      'objInvestorProfileFormThree'
    ) as FormGroup;
    if (!!objInvestorProfileFormThree) {
      this.objContact = objInvestorProfileFormThree.get(
        'objContact'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit() {
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
  get contactFormControl() {
    const objInvestorProfileFormThree = this.parent.form.get(
      'objInvestorProfileFormThree'
    ) as FormGroup;
    return objInvestorProfileFormThree.get('objContact')['controls'];
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
