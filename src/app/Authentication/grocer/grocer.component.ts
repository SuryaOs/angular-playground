import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const EGROCER_ENDPOINT = 'https://localhost:44350/api/values';
//https://localhost:44350/
//5023
export interface GrocerType {
  name?: string;
}

@Component({
  selector: 'app-grocer',
  template: `
    <div *ngFor="let gro of grocer">
      <p (click)="navigateToDetails(gro)">Name : {{ gro.name }}</p>
    </div>
    <!-- <app-login-form (submitEvent)="onLoginFormSubmit($event)"></app-login-form> -->
  `,
})
export class GrocerComponent implements OnInit {
  grocer: any;
  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
    this.loadGrocers();
  }
  loadGrocers() {
    this.http.get(EGROCER_ENDPOINT).subscribe((x) => {
      this.grocer = x;
    });
  }
  navigateToDetails(gro: any) {
    this.router.navigate(["grocer", gro.id])
  }

  // onLoginFormSubmit(formData: any) {
  //   console.log("I am from grocer", formData);
  // }
}
