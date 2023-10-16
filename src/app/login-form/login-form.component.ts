import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type formType = { userName: string; password: string }

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;

  @Output() submitEvent: EventEmitter<formType> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onFormSubmit(event: FormGroup): void {
    if(this.loginForm.invalid) return;

    this.submitEvent.emit(event.value);
  }
}
