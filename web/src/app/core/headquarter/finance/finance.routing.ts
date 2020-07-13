import { Routes } from "@angular/router";
import { RegisterInvoiceComponent } from "./register-invoice/register-invoice.component";
import { AgingInvoiceComponent } from "./aging-invoice/aging-invoice.component";
import { ChecklistInvoiceComponent } from "./checklist-invoice/checklist-invoice.component";
import { ChargesComponent } from "./charges/charges.component";
import { ExemptionsComponent } from "./exemptions/exemptions.component";
import { StatementAccountReportComponent } from "../statement-account-report/statement-account-report.component";
import { CreditDebitNoteReportComponent } from "../credit-debit-note-report/credit-debit-note-report.component";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";

export const FinanceRoute: Routes = [
  {
    path: "",
    children: [
      {
        path: "register-invoice",
        component: RegisterInvoiceComponent,
      },
      {
        path: "invoice-list",
        component: InvoiceListComponent,
      },    
      {
        path: "aging-invoice",
        component: AgingInvoiceComponent,
      },
      {
        path: "checklist-invoice",
        component: ChecklistInvoiceComponent,
      },
      {
        path: "exemptions",
        component: ExemptionsComponent,
      },
      {
        path: "charges",
        component: ChargesComponent,
      },
      {
        path: "statement-account-report",
        component: StatementAccountReportComponent,
      },
      {
        path: "credit-debit-note-report",
        component: CreditDebitNoteReportComponent,
      },
    ],
  },
];
