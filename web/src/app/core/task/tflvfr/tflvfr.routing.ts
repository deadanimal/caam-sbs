import { Routes } from "@angular/router";
import { UploadComponent } from "./upload/upload.component";
import { HistoryComponent } from "./history/history.component";
import { HistoryViewComponent } from "./history-view/history-view.component";

export const TflvfrRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "upload",
        component: UploadComponent,
      },
      {
        path: "history",
        component: HistoryComponent,
      },
      {
        path: "view",
        component: HistoryViewComponent,
      },
    ],
  },
];
