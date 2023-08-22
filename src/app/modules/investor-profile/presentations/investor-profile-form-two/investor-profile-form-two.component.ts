import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { InvestorProfileService } from '@app/data/service/investor-profile.service';

@Component({
  selector: 'app-investor-profile-form-two',
  templateUrl: './investor-profile-form-two.component.html',
  styleUrls: ['./investor-profile-form-two.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorProfileFormTwoComponent
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
   * Navigate back form
   */
  navigateBack(url) {
    this.navigate(url);
  }
  /**
   * Save and navigate form
   */
  saveAndNavigate(url) {
    this.save(url, true);
  }
}
