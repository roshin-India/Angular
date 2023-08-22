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
import { IPresentationEvent } from '@app/data/schema';

@Component({
  selector: 'app-product-service',
  templateUrl: './product-service.component.html',
  styleUrls: ['./product-service.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductServiceComponent
  implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() blnEdit = false;
  @Output() event = new EventEmitter<IPresentationEvent>();
  objProductService: FormArray;
  objProductService2 = this.formBuilder.group({
    strName: new FormControl('', Validators.required),
    strShortDesc: new FormControl('')
  });
  objEntrepreneurProfileFormTwo: FormGroup;
  blnAddUpdate = false;
  indexEdit = null;
  constructor(
    private formBuilder: FormBuilder,
    private parent: FormGroupDirective,
    private detectChange: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    if (!!this.objEntrepreneurProfileFormTwo) {
      this.objProductService = this.objEntrepreneurProfileFormTwo.get(
        'objProductService'
      ) as FormArray;
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
   * Get managment controls
   */
  get productServiceControls() {
    const objEntrepreneurProfileFormTwo = this.parent.form.get(
      'objEntrepreneurProfileFormTwo'
    ) as FormGroup;
    return objEntrepreneurProfileFormTwo.get('objProductService')['controls'];
  }

  /**
   * Adding Form
   */
  addProductService(): void {
    this.objProductService.push(this.createProductService());
    this.clearForm();
    this.detectChange.detectChanges();
  }
  /**
   * removing form
   */
  removeProductService(i: number) {
    this.objProductService.removeAt(i);
  }
  /**
   * edit form
   */
  editProductService(data, i) {
    this.objProductService2.setValue({
      strName: data.strName,
      strShortDesc: data.strShortDesc
    });
    this.blnAddUpdate = true;
    this.indexEdit = i;
    this.detectChange.detectChanges();
  }
  /**
   * Update form
   */
  updateProductService(index) {
    if (index !== null) {
      const myForm = this.objProductService.at(index);
      myForm.setValue({
        strName: this.objProductService2.controls.strName.value,
        strShortDesc: this.objProductService2.controls.strShortDesc.value
      });
      this.clearForm();
    }
  }

  /**
   * Clear form
   */
  clearForm() {
    this.objProductService2.reset();
    this.blnAddUpdate = false;
    this.indexEdit = null;
  }
  /**
   * Create form group
   *
   * @returns
   */
  createProductService() {
    return this.formBuilder.group({
      strName: this.objProductService2.controls.strName.value,
      strShortDesc: this.objProductService2.controls.strShortDesc.value
    });
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
