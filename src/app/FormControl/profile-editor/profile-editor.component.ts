import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomValidator } from 'src/app/CustomValidator/custom-validator';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent {
  // Creating form using FormGroup and FormControl
  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl('')
  //   })
  // });

  // Creating form using FormBuilder
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    addresses: this.fb.array([]),
    // address: this.fb.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: [''],
    // }),
    totalQuantity: [10, [Validators.required, CustomValidator.maxNumberCustom(20) ]]
  });

  constructor(private fb: FormBuilder) {}

  // getter for address form array
  get addresses() {
    return this.profileForm.controls["addresses"] as FormArray;
  }

  // to add address form dynamically
  addAddress() {
      const addressForm = this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      });

      this.addresses.push(addressForm);
  }

  // remove addressForm based on index
  deleteAddress(addressIndex: any) {
    this.addresses.removeAt(addressIndex);
  }

  onSubmit() {
    console.warn(this.profileForm.value);
  }
}
