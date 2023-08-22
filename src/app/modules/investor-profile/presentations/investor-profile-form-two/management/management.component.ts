import {
  Input,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
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
  FormGroupDirective,
  FormControl
} from '@angular/forms';
import { UtilityService } from '@app/core/service/utility.service';
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagementComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objManagement: FormArray;
  objManagement2 = this.formBuilder.group({
    strFullName: new FormControl('', Validators.required),
    strLinkedInUrl: new FormControl(''),
    strDesignation: new FormControl(''),
    strEmail: new FormControl(''),
    objPhoto: new FormControl(''),
    strOverviewManagement: new FormControl('')
  });
  objInvestorProfileFormTwo: FormGroup;
  blnAddUpdate = false;
  indexEdit = null;
  imageError: string = null;
  strPhotoName: string;
  strUploadData: string;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private ref: ChangeDetectorRef,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    if (!!this.objInvestorProfileFormTwo) {
      this.objManagement = this.objInvestorProfileFormTwo.get(
        'objManagement'
      ) as FormArray;
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
   * Get managment controls
   */
  get managementControls() {
    const objInvestorProfileFormTwo = this.parent.form.get(
      'objInvestorProfileFormTwo'
    ) as FormGroup;
    return objInvestorProfileFormTwo.get('objManagement')['controls'];
  }

  /**
   * Adding Form
   */
  addManagement(): void {
    this.objManagement.push(this.createManagement());
    this.clearForm();
    this.ref.detectChanges();
  }
  /**
   * removing form
   */
  removeManagement(i: number) {
    this.objManagement.removeAt(i);
  }
  /**
   * edit form
   */
  editManagement(data, i) {
    this.objManagement2.setValue({
      strFullName: data.strFullName,
      strLinkedInUrl: data.strLinkedInUrl,
      strDesignation: data.strDesignation,
      strEmail: data.strEmail,
      objPhoto: data.objPhoto,
      strOverviewManagement: data.strOverviewManagement
    });

    if (!!data.objPhoto) {
      if (!!data.objPhoto.data) {
        this.strUploadData = data.objPhoto.data;
      }
      if (!!data.objPhoto.fileName) {
        this.strPhotoName = data.objPhoto.fileName;
      }
    }
    this.blnAddUpdate = true;
    this.indexEdit = i;
    this.ref.detectChanges();
  }
  /**
   * Update form
   */
  updateManagement(index) {
    if (index !== null) {
      const myForm = this.objManagement.at(index);
      myForm.setValue({
        strFullName: this.objManagement2.controls.strFullName.value,
        strLinkedInUrl: this.objManagement2.controls.strLinkedInUrl.value,
        strDesignation: this.objManagement2.controls.strDesignation.value,
        strEmail: this.objManagement2.controls.strEmail.value,
        objPhoto: this.objManagement2.controls.objPhoto.value,
        strOverviewManagement: this.objManagement2.controls
          .strOverviewManagement.value
      });
      this.clearForm();
    }
  }

  /**
   * Clear form
   */
  clearForm() {
    this.objManagement2.reset();
    this.blnAddUpdate = false;
    this.indexEdit = null;
    this.imageError = null;
    this.strPhotoName = null;
    this.strUploadData = null;
  }
  /**
   * Create form group
   *
   * @returns
   */
  createManagement() {
    return this.formBuilder.group({
      strFullName: this.objManagement2.controls.strFullName.value,
      strLinkedInUrl: this.objManagement2.controls.strLinkedInUrl.value,
      strDesignation: this.objManagement2.controls.strDesignation.value,
      strEmail: this.objManagement2.controls.strEmail.value,
      objPhoto: this.objManagement2.controls.objPhoto.value,
      strOverviewManagement: this.objManagement2.controls.strOverviewManagement
        .value
    });
  }
  /**
   * File upload
   *
   */
  fileChangeEvent(fileInput: any) {
    const selectedFiles = fileInput.target.files[0];
    const objSetting = {
      maxSize: 20971520,
      allowedTypes: ['image/png', 'image/jpeg'],
      maxHeight: 15200,
      maxWidth: 25600
    };
    this.utilityService
      .fileUpload(selectedFiles, objSetting)
      .then((resp: any) => {
        if (!!resp) {
          if (resp.status === 'Error') {
            this.imageError = resp.message;
            this.strPhotoName = null;
            this.strUploadData = null;
          } else if (resp.status === 'Success') {
            this.imageError = null;
            this.strPhotoName = resp.data.fileName;
            this.strUploadData = resp.data.data;
            this.ref.detectChanges();
            this.objManagement2.patchValue({
              objPhoto: resp.data
            });
          }
        }
      });
  }
  /**
   * Remove uploaded
   */
  removeUpload() {
    this.objManagement2.patchValue({
      objPhoto: null
    });
    this.imageError = null;
    this.strPhotoName = null;
    this.strUploadData = null;
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
