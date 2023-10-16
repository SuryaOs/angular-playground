import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MsalGuard } from "@azure/msal-angular";
import { BrowserUtils } from "@azure/msal-browser";
import { ProfileComponent } from "./Authentication/profile/profile.component";
import { HomeComponent } from "./Authentication/home/home.component";
import { GrocerComponent } from "./Authentication/grocer/grocer.component";
import { GrocerDetailsComponent } from "./Authentication/grocer/grocer-details.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: "grocer",
    component: GrocerComponent,
    canActivate: [MsalGuard]
  },
  {
    path: "grocer/:id",
    component: GrocerDetailsComponent,
    canActivate: [MsalGuard]
  },
  {
    path: "",
    component: HomeComponent,
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? "enabledNonBlocking"
          : "disabled", // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
