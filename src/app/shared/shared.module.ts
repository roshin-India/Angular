import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  FontAwesomeModule,
  FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import {
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook,
  faUserCircle,
  faAsterisk
} from '@fortawesome/free-solid-svg-icons';
import { faMediumM, faGithub } from '@fortawesome/free-brands-svg-icons';

import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { InputMaxLengthDirective } from './directives/input-max-length.directive';
import { AlertMessagesComponent } from './component/alert-messages/alert-messages.component';

import { ToastrModule } from 'ngx-toastr';
import { RequiredDirective } from './directives/required.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { PrimengModule } from './primeng.module';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    NgbModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    NgSelectModule,
    AutocompleteLibModule
  ],
  declarations: [
    ControlMessagesComponent,
    SpinnerComponent,
    AlertMessagesComponent,
    BreadcrumbComponent,
    OnlyNumberDirective,
    InputMaxLengthDirective,
    RequiredDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    PrimengModule,
    NgMultiSelectDropDownModule,
    NgbModule,
    FontAwesomeModule,

    ControlMessagesComponent,
    SpinnerComponent,
    OnlyNumberDirective,
    InputMaxLengthDirective,
    AlertMessagesComponent,
    BreadcrumbComponent,
    ToastrModule,
    RequiredDirective,
    NgSelectModule,
    AutocompleteLibModule
  ]
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(
      faGithub,
      faMediumM,
      faPlus,
      faEdit,
      faTrash,
      faTimes,
      faCaretUp,
      faCaretDown,
      faExclamationTriangle,
      faFilter,
      faTasks,
      faCheck,
      faSquare,
      faLanguage,
      faPaintBrush,
      faLightbulb,
      faWindowMaximize,
      faStream,
      faBook,
      faUserCircle,
      faAsterisk
    );
  }
}
