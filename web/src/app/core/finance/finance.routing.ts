import { Routes } from "@angular/router";
import { InvoicesComponent } from './invoices/invoices.component';
import { AgingInvoiceComponent } from './aging-invoice/aging-invoice.component';
import { CreditDebitNoteComponent } from './credit-debit-note/credit-debit-note.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';


export const FinanceRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "invoices",
        component: InvoicesComponent,
      },
      {
        path: "aging-invoice",
        component: AgingInvoiceComponent,
      },
      {
        path: "credit-debit-note",
        component: CreditDebitNoteComponent,
      },
      {
        path: "general-ledger",
        component: GeneralLedgerComponent,
      },
     
    ],
  },
];
