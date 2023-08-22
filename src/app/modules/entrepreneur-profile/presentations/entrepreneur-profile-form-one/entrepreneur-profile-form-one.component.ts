import { EntrepreneurProfileService } from '@app/data/service';
import { Router } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
@Component({
  selector: 'app-entrepreneur-profile-form-one',
  templateUrl: './entrepreneur-profile-form-one.component.html',
  styleUrls: ['./entrepreneur-profile-form-one.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrepreneurProfileFormOneComponent
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
   *
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
   * Save and navigate form
   */
  saveAndNavigate(url) {
    this.save(url, true);
  }
}
