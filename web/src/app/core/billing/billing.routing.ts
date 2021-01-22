import { InvoiceComponent } from './invoice/invoice.component';
import { Routes, RouterModule } from '@angular/router';
import { CreditNoteComponent } from './credit-note/credit-note.component';
import { DebitNoteComponent } from './debit-note/debit-note.component';

const routes: Routes = [
  {  },
];

export const BillingRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "credit-note",
        component: CreditNoteComponent,
      },
      {
        path: "debit-note",
        component: DebitNoteComponent,
      },
      {
        path: "invoice",
        component: InvoiceComponent,
      },   
    ],
  },
]

