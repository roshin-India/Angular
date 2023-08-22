import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  AfterViewInit,
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
  selector: 'app-news-links',
  templateUrl: './news-links.component.html',
  styleUrls: ['./news-links.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsLinksComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objNews: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormThree = this.parent.form.get(
      'objEntrepreneurProfileFormThree'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormThree) {
      this.objNews = objEntrepreneurProfileFormThree.get(
        'objNews'
      ) as FormGroup;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit(): void {
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
  get newsFormControl() {
    const objEntrepreneurProfileFormThree = this.parent.form.get(
      'objEntrepreneurProfileFormThree'
    ) as FormGroup;
    return objEntrepreneurProfileFormThree.get('objNews')['controls'];
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
