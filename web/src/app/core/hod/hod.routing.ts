import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const HodRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "database",
        loadChildren: () =>
          import("./database/database.module").then((m) => m.DatabaseModule),
      },
      {
        path: "task",
        loadChildren: () =>
          import("./task/task.module").then((m) => m.TaskModule),
      },
    ],
  },
];
