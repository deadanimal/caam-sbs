import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

export const CoreRoute: Routes = [
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
      {
        path: "finance",
        loadChildren: () =>
          import("./finance/finance.module").then((m) => m.FinanceModule),
      },
    ],
  },
];
