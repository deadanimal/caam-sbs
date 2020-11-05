import { Routes } from "@angular/router";
import { InvoiceComponent } from "./invoice/invoice.component";
import { InvoiceViewComponent } from "./invoice-view/invoice-view.component";
import { HistoryComponent } from "./history/history.component";
import { HistoryViewComponent } from "./history-view/history-view.component";
import { UploadComponent } from "./upload/upload.component";

export const TaskRoute: Routes = [
  {
    path: "",
    children: [
      { path: "invoice", component: InvoiceComponent },
      { path: "invoice-view", component: InvoiceViewComponent },
      { path: "data", component: HistoryComponent },
      { path: "data-history", component: HistoryViewComponent },
      { path: "data-upload", component: UploadComponent },
    ],
  },
];
