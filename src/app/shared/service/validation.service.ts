import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  public static getValidationErrorMessage(
    validatorName: string,
    validatorValue?: any,
    labelName?: string
  ): any {
    labelName = labelName || 'field';
    const config = {
      required: `${labelName} is required.`,
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      maxlength: `The ${labelName} can't contain more than ${validatorValue.requiredLength} characters.`,
      minlength: `The ${labelName} must contain atleast ${validatorValue.requiredLength} characters.`
    };

    return config[validatorName];
  }

  public static passwordValidator(control: AbstractControl): any {
    if (!control.value) {
      return;
    }

    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    return control.value.match(
      /^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/
    )
      ? ''
      : { invalidPassword: true };
  }

  /**
   * Check if password and confirm password are same.
   *
   * @param control
   * @returns
   */
  public static passwordConfirmValidator(control: AbstractControl): any {
    return (
      control.get('password').value === control.get('confirmPassword').value
    );
  }
}
