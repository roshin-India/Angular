import { EntrepreneurProfileService } from '@app/data/service';
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

@Component({
  selector: 'app-entrepreneur-profile-form-two',
  templateUrl: './entrepreneur-profile-form-two.component.html',
  styleUrls: ['./entrepreneur-profile-form-two.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrepreneurProfileFormTwoComponent
  implements OnInit, OnChanges, OnDestroy {
  constructor(
    private router: Router,
    private parent: FormGroupDirective,
    private entrepreneurProfileService: EntrepreneurProfileService
  ) {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}

  /**
   * Save form
   */
  save(url = null, navigate = false) {
    this.entrepreneurProfileService.changeData({
      type: 'SAVE_ENTREPRENEUR_PROFILE',
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
    this.entrepreneurProfileService.changeData({
      type: 'NAVIGATE_ENTREPRENEUR_PROFILE',
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
