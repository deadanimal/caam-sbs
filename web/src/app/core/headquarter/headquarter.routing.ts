import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ManagementComponent } from "./management/management.component";
import { OperationReportComponent } from "./reporting/operation-report/operation-report.component";
import { FinanceReportComponent } from "./reporting/finance-report/finance-report.component";
import { AnalysisComponent } from "./analysis/analysis.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { AirlineManagementReportComponent } from "./reporting/airline-management-report/airline-management-report.component";
import { InvoiceDatabaseApprovalComponent } from "./approval/invoice-database-approval/invoice-database-approval.component";
import { MonthlyInvoiceApprovalComponent } from "./approval/monthly-invoice-approval/monthly-invoice-approval.component";
import { PaymentSummaryReportComponent } from "../headquarter/payment/payment-summary-report/payment-summary-report.component";
// import { StatementAccountReportComponent } from './statement-account-report/statement-account-report.component';
// import { CreditDebitNoteReportComponent } from './credit-debit-note-report/credit-debit-note-report.component';

export const HeadquarterRoute: Routes = [
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
          import("./database/database.module").then(
            (m) => m.HeadquarterDatabaseModule
          ),
      },
      {
        path: "management",
        component: ManagementComponent,
      },
      {
        path: "report",
        children: [
          {
            path: "operation",
            component: OperationReportComponent,
          },
          {
            path: "finance",
            component: FinanceReportComponent,
          },
          {
            path: "airline-management",
            component: AirlineManagementReportComponent,
          },
          {
            path: "payment-summary",
            component: PaymentSummaryReportComponent,
          },
        ],
      },
      {
        path: "analysis",
        component: AnalysisComponent,
      },
      {
        path: "vfrv",
        loadChildren: () =>
          import("./vfrv/vfrv.module").then((m) => m.HeadquarterVfrvModule),
      },
      {
        path: "approval",
        children: [
          {
            path: "invoice-database-approval",
            component: InvoiceDatabaseApprovalComponent,
          },
          {
            path: "monthly-invoice-approval",
            component: MonthlyInvoiceApprovalComponent,
          },
        ],
      },
      {
        path: "invoice",
        component: InvoiceComponent,
      },
      {
        path: "finance",
        loadChildren: () =>
          import("./finance/finance.module").then(
            (m) => m.HeadquarterFinanceModule
          ),
      },
      {
        path: "utility",
        loadChildren: () =>
          import("./utility/utility.module").then(
            (m) => m.HeadquarterUtilityModule
          ),
      },
      {
        path: "payment",
        loadChildren: () =>
          import("./payment/payment.module").then(
            (m) => m.HeadquarterPaymentModule
          ),
      },
      // {
      //     path: 'statement-account-report',
      //     component: StatementAccountReportComponent
      // },
      // {
      //     path: 'credit-debit-note-report',
      //     component: CreditDebitNoteReportComponent
      // }
    ],
  },
];
