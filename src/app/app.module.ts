import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NameEditorComponent } from './FormControl/name-editor/name-editor.component';
import { ProfileEditorComponent } from './FormControl/profile-editor/profile-editor.component';
import { ChooseQuantityComponent } from './CustomFormControl/choose-quantity/choose-quantity.component';
import { HomeComponent } from './Authentication/home/home.component';
import { ProfileComponent } from './Authentication/profile/profile.component';
import {
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GrocerComponent } from './Authentication/grocer/grocer.component';
import { LoginFormComponent } from './login-form/login-form.component';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

const components = [
  AppComponent,
  NameEditorComponent,
  ProfileEditorComponent,
  ChooseQuantityComponent,
  HomeComponent,
  ProfileComponent,
];

const clientAppConfig = () => new PublicClientApplication({
  auth: {
    clientId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx', // Application (client) ID from the app registration
    authority:
      'https://login.microsoftonline.com/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx', // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
    redirectUri: 'http://localhost:4200/', // This is your redirect URI
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
  },
});

const guardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect, // MSAL guard configuration
  authRequest: {
    scopes: ['user.read', 'api://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx/X.Read'], //[graph api, custom api]
  },
};

const interceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect, // MSAL interceptor configuration
  protectedResourceMap: new Map([
    [
      'https://localhost',
      ['api://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx/EGrocer.Read'],
    ], // [custom api url, read scope]
    ['https://graph.microsoft.com/v1.0/me', ['user.read']], // [graph api url, read scoep]
  ]),
};

@NgModule({
  declarations: [components, GrocerComponent, LoginFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MsalModule.forRoot(
      clientAppConfig(),
      guardConfig,
      interceptorConfig
    ),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    MsalGuard,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
