import { Routes } from "@angular/router";
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { HistoryComponent } from './tflvfr/history/history.component';
import { HistoryViewComponent } from './tflvfr/history-view/history-view.component';
import { UploadComponent } from './tflvfr/upload/upload.component';

export const TaskRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "invoice",
        component: InvoiceComponent,
      },
      {
        path: "invoice/view",
        component: InvoiceViewComponent
      },
    {
      path: "tflvfr",
      component: HistoryComponent,
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
