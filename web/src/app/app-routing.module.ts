import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "admin",
        loadChildren: "./core/admin/admin.module#AdminModule",
      },
      {
        path: "airport",
        loadChildren: "./core/airport/airport.module#AirportModule",
      },
      {
        path: "operation",
        loadChildren: "./core/operation/operation.module#OperationModule",
      },
      {
        path: "hod",
        loadChildren: "./core/hod/hod.module#HodModule",
      },
      // HQ
      {
        path: "headquarter",
        loadChildren: "./core/headquarter/headquarter.module#HeadquarterModule",
      },
      // Branch
      {
        path: "branch",
        loadChildren: "./core/branch/branch.module#BranchModule",
      },
      // Customer
      {
        path: "customer",
        loadChildren: "./core/customer/customer.module#CustomerModule",
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "auth",
        loadChildren: "./auth/auth.module#AuthModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
