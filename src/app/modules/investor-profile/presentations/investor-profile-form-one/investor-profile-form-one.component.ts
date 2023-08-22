import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InvestorProfileService } from '@app/data/service/investor-profile.service';
@Component({
  selector: 'app-investor-profile-form-one',
  templateUrl: './investor-profile-form-one.component.html',
  styleUrls: ['./investor-profile-form-one.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorProfileFormOneComponent
  implements OnInit, OnChanges, OnDestroy {
  constructor(
    private router: Router,
    private parent: FormGroupDirective,
    private investorProfileService: InvestorProfileService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Save form
   *
   */
  save(url = null, navigate = false) {
    this.investorProfileService.changeData({
      type: 'SAVE_INVESTOR_PROFILE',
      data: {
        formValue: this.parent.form.value,
        position: url,
        navigate: navigate ? url : null
      }
    });
  }
  /**
   * Navigate form
   */
  navigate(url) {
    this.investorProfileService.changeData({
      type: 'NAVIGATE_INVESTOR_PROFILE',
      data: url
    });
  }
  /**
   * Save and navigate form
   */
  saveAndNavigate(url) {
    this.save(url, true);
  }
}
