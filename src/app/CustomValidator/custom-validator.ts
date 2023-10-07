import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxNumberCustom(fixedValue: number): ValidatorFn {
  // maxNumberCustom is called once when initializing the form and returns another function that handles validation.
  // after that this function won't exists in call stack
  return (control: AbstractControl): ValidationErrors | null => {
    // whenever we change value, inner function still carries lexical environment of parent
    // and has access to parent variable (fixedValue).
    // this is closures
    return control.value > fixedValue
      ? { length: { value: control.value } }
      : null;
  };
}
