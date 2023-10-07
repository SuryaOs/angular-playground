import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ],
})
export class ChooseQuantityComponent implements ControlValueAccessor {
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

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
