import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
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
import { UtilityService } from '@app/core/service/utility.service';
import { IPresentationEvent } from '@app/data/schema';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objMedia: FormGroup;
  uploadError = [];
  arrDocName = [];
  arrDocs = [];
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private utilityService: UtilityService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const objEntrepreneurProfileFormThree = this.parent.form.get(
      'objEntrepreneurProfileFormThree'
    ) as FormGroup;
    if (!!objEntrepreneurProfileFormThree) {
      this.objMedia = objEntrepreneurProfileFormThree.get(
        'objMedia'
      ) as FormGroup;
      if (!!this.objMedia.value.arrMediaImages) {
        this.objMedia.value.arrMediaImages.forEach(element => {
          this.arrDocs.push(element);
        });
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.blnEdit) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnDestroy(): void {}
  /**
   * Get controls
   */
  get mediaFormControl() {
    const objEntrepreneurProfileFormThree = this.parent.form.get(
      'objEntrepreneurProfileFormThree'
    ) as FormGroup;
    return objEntrepreneurProfileFormThree.get('objMedia')['controls'];
  }

  /**
   * File upload
   */
  fileChangeEvent(fileInput: any) {
    const arrDoc = [];
    const error = [];
    const selectedFiles = fileInput.target.files;
    const objSetting = {
      maxSize: 20971520,
      allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      maxHeight: 15200,
      maxWidth: 25600
    };
    const promises = this.utilityService.uploadMultippleFiles(
      selectedFiles,
      objSetting
    );
    Promise.all(promises).then(resp => {
      for (const row of resp) {
        if (row.status === 'Error') {
          error.push(row.message);
          break;
        } else if (row.status === 'Success' && !!row.data) {
          arrDoc.push(row.data);
        }
      }
      if (!!error.length) {
        this.uploadError = error;
        this.arrDocs = null;
        this.ref.detectChanges();
        return;
      }
      if (!!arrDoc.length) {
        this.uploadError = null;
        this.arrDocs = arrDoc;
        this.objMedia.patchValue({
          arrMediaImages: arrDoc
        });
        this.ref.detectChanges();
      }
    });
  }

  /**
   * Remove uploaded
   */
  removeUpload(index) {
    this.arrDocs.splice(index, 1);
    this.objMedia.patchValue({
      arrMediaImages: this.arrDocs
    });
    this.ref.detectChanges();
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
