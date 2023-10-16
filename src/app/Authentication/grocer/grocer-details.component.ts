import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const EGROCER_ENDPOINT = 'https://localhost:44350/api/values/';
//https://localhost:44350/
//5023
export interface GrocerType {
  name?: string;
}

@Component({
  selector: 'app-grocer-details',
  template: `
    <div>
      {{ grocer.name }}
    </div>
  `,
})
export class GrocerDetailsComponent implements OnInit {
  grocer: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getIdFromRoute();
  }
  getIdFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getGrocerDetails(id);
  }
  getGrocerDetails(id: any) {
    this.http.get(EGROCER_ENDPOINT + id).subscribe((x: any) => {
      this.grocer = x[0];
    });
  }
}
