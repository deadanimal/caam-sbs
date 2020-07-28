import { Routes } from "@angular/router";
import { RoutelistKkComponent } from "./routelist-kk/routelist-kk.component";
import { RoutelistKucComponent } from "./routelist-kuc/routelist-kuc.component";
import { RoutelistSemenanjungComponent } from "./routelist-semenanjung/routelist-semenanjung.component";

export const AviationRouteRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "kk",
        component: RoutelistKkComponent,
      },
      {
        path: "kuc",
        component: RoutelistKucComponent,
      },
      {
        path: "semenanjung",
        component: RoutelistSemenanjungComponent,
      },
    ],
  },
];
