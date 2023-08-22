import { FormGroup, FormArray } from '@angular/forms';
import { ElementRef } from '@angular/core';

/**
 * Generic validator for Reactive forms
 * Implemented as a class, not a service, so it can retain state for multiple forms.
 *
 */
export class Validation {
  ///**
  // * Provide the set of valid validation messages
   // Stucture:
   //   controlName1: {
    //      ionRuleName1: 'Validation Message.',
    //      validationRuleName2: 'Validation Message.'
    //  },
    //  controlName2: {
   //       validationRuleName1: 'Validation Message.',
   //       validationRuleName2: 'Validation Message.'
   //  }

 //  * @param validationMessages
 //  */
  constructor(private validationMessages: { [strKey: string]: any }) {}
/**
 *
 * @param container
 * @param blnConsiderDirty
 * @returns Processes each control within a FormGroup
 * And returns a set of validation messages to display
 * Structure
 * controlName1: 'Validation Message.',
 * controlName2: 'Validation Message.'
 * @param container: Form group on which validation message needs to be tested
 */


  /**
   *
   * Processes each control within a FormGroup
   * And returns a set of validation messages to display Structure
   * controlName1: 'Validation Message.',
   * controlName2: 'Validation Message.'
   *
   * @param container
   * @param blnConsiderDirty
   * @returns
   */
  processMessages(
    container: FormGroup | FormArray,
    blnConsiderDirty = true
  ): { [strKey: string]: any } {
    let messages = {};
    for (const strControlKey in container.controls) {
      if (container.controls.hasOwnProperty(strControlKey)) {
        const objTemp = {};
        const c = container.controls[strControlKey];
        /**
         * If it is a FormGroup, process its child controls.
         */
        if (c instanceof FormGroup) {
          const childMessages = this.processMessages(c, blnConsiderDirty);
          objTemp[strControlKey] = childMessages;
          messages = { ...messages, ...objTemp };
        } else if (c instanceof FormArray) {
          const childMessages = this.processMessages(c, blnConsiderDirty);
          objTemp[strControlKey] = childMessages;
          messages = { ...messages, ...objTemp };
        } else {
          /**
           * Only validate if there are validation messages for the control
           */
          if (this.validationMessages[strControlKey]) {
            messages[strControlKey] = '';
            if ((!blnConsiderDirty || c.dirty || c.touched) && c.errors) {
              for (const strMessageKey in c.errors) {
                if (this.validationMessages[strControlKey][strMessageKey]) {
                  messages[strControlKey] += this.validationMessages[
                    strControlKey
                  ][strMessageKey];
                }
              }
            }
          }
        }
      }
    }
    return messages;
  }
}

// objFormValidator = new FormValidator({
//     datDocument: {
//         required: "VALIDATIONS.DATE_REQUIRED"
//     },
//     objBranch: {
//         required: "VALIDATIONS.BRANCH_REQUIRED"
//     },
//     strExtraAmountAccount: {
//         required: "voucherRecoPayable.VALIDATIONS.EXTRA_ACCOUNT_REQUIRE_SET_IT_IN_MAPPING_ACCOUNTS"
//     }
// });
// this.objFormMessages = this.objFormValidator.processMessages(
//     this.objVoucherRecoDocForm
// )
