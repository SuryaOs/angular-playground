import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameEditorComponent } from './FormControl/name-editor/name-editor.component';
import { ProfileEditorComponent } from './FormControl/profile-editor/profile-editor.component';
import { ChooseQuantityComponent } from './CustomFormControl/choose-quantity/choose-quantity.component';
@NgModule({
  declarations: [
    AppComponent,
    NameEditorComponent,
    ProfileEditorComponent,
    ChooseQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
