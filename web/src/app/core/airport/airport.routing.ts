import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HistoryComponent } from "./tflvfr/history/history.component";
import { HistoryViewComponent } from "./tflvfr/history-view/history-view.component";
import { UploadComponent } from "./tflvfr/upload/upload.component";

export const AirportRoute: Routes = [
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
        path: "tflvfr",
        component: HistoryComponent,
        // loadChildren: () => import("./tflvfr/tflvfr.module").then((m) => m.TflvfrModule),
      },
      {
        path: "tflvfr/view",
        component: HistoryViewComponent,
      },
      {
        path: "tflvfr/upload",
        component: UploadComponent,
      },
    ],
  },
];
