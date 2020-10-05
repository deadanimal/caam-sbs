import { Routes } from "@angular/router";
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

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
      }
    ],
  },
];
