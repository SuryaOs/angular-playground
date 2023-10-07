import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-choose-quantity',
  templateUrl: './choose-quantity.component.html',
  styleUrls: ['./choose-quantity.component.scss'],
  providers: [
    {
      // adding custom control component to list of known value accessors
      // for example, input, checkbox are also registered with NG_VALUE_ACCESSOR
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ChooseQuantityComponent,
    },
    // adding custom validator rule to list of known validators
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ChooseQuantityComponent
    }
  ],
})
export class ChooseQuantityComponent implements ControlValueAccessor, Validator
{
  value = 0;

  @Input() increment!: number;

  // onChange property for holding onRegisterChange callback fn.
  // declaring property as function, in case angular calls this function before registering call back, it shouldn't run into errors
  onChange = (value: any) => {};

  // onTouched property for holding onRegisterTouch callback fn.
  onTouched = () => {};

  touched = false;
  disabled = false;

  onAdd() {
    this.markAsTouched();
    this.value += this.increment;
    this.onChange(this.value);
  }

  onRemove() {
    this.markAsTouched();
    this.value -= this.increment;
    this.onChange(this.value);
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  // Interface Methods Start //

  // called when parent form wants to set value in child control
  writeValue(obj: number): void {
    this.value = obj;
  }

  // if users changes value, increments or decrements counter.
  // new value needs to be passed to parent form
  // therefore onload, we are registering onChange call back function to  property
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // similar to onchange, but registering onTouch cb to prop
  // when form is initialized, every form control is untouched.
  // when one control is touched, entire form is considered as touched.
  // important for styling error message in form
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Interface Methods End //

  // Validator Interface Method Starts //

  // this method will be called whenever a new value is reported to parent form.
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
    return null;
  }

  // Optional Method
  // it will register callback function that allows us to trigger validation for custom control on demand.
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error('Method not implemented.');
  // }
}
