import { Routes } from "@angular/router";
import { WatchTowerComponent } from "./watch-tower/watch-tower.component";
import { UploadComponent } from "./upload/upload.component";
import { HistoryComponent } from "./history/history.component";
import { HistoryViewComponent } from "./history-view/history-view.component";
import { VfrListComponent } from "./vfr-list/vfr-list.component";
import { CheckerMakerComponent } from "./checker-maker/checker-maker.component";
import { DatabaseComponent } from "./database/database.component";
import { GenerateInvoiceComponent } from "./generate-invoice/generate-invoice.component";
import { InvoiceDetailComponent } from "./invoice-detail/invoice-detail.component";

export const VfrvRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "watch-tower",
        component: WatchTowerComponent,
      },
      {
        path: "upload",
        component: UploadComponent,
      },
      {
        path: "history",
        component: HistoryComponent,
      },
      {
        path: "history/view",
        component: HistoryViewComponent,
      },
      {
        path: "database",
        component: DatabaseComponent,
      },
      {
        path: "generate-invoice",
        component: GenerateInvoiceComponent,
      },
      {
        path: "invoice-detail",
        component: InvoiceDetailComponent,
      },
      {
        path: "vfr-list",
        component: VfrListComponent,
      },
      {
        path: "checker-maker",
        component: CheckerMakerComponent,
      },
    ],
  },
];
