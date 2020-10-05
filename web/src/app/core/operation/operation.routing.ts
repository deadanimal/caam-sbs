import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HistoryComponent } from "./task/history/history.component";
import { HistoryViewComponent } from "./task/history-view/history-view.component";
import { UploadComponent } from "./task/upload/upload.component";

export const OperationRoute: Routes = [
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
        path: "task/tflvfr",
        component: HistoryComponent,
        // loadChildren: () => import("./task/task.module").then((m) => m.TaskModule),
      },
      {
        path: "task/tflvfr/view",
        component: HistoryViewComponent,
      },
      {
        path: "task/upload",
        component: UploadComponent,
      },
    ],
  },
];
