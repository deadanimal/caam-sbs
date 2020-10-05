import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { HeadquarterRoute } from './headquarter.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { OperationReportComponent } from './reporting/operation-report/operation-report.component';
import { FinanceReportComponent } from './reporting/finance-report/finance-report.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AirlineManagementReportComponent } from './reporting/airline-management-report/airline-management-report.component';
import { InvoiceDatabaseApprovalComponent } from './approval/invoice-database-approval/invoice-database-approval.component';
import { MonthlyInvoiceApprovalComponent } from './approval/monthly-invoice-approval/monthly-invoice-approval.component';
import { PaymentSummaryReportComponent } from './payment/payment-summary-report/payment-summary-report.component';
// import { StatementAccountReportComponent } from './statement-account-report/statement-account-report.component';
// import { CreditDebitNoteReportComponent } from './credit-debit-note-report/credit-debit-note-report.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    ManagementComponent,
    OperationReportComponent,
    FinanceReportComponent,
    AnalysisComponent,
    InvoiceComponent,
    AirlineManagementReportComponent,
    InvoiceDatabaseApprovalComponent,
    MonthlyInvoiceApprovalComponent,
    PaymentSummaryReportComponent,
    // StatementAccountReportComponent,
    // CreditDebitNoteReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(HeadquarterRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class HeadquarterModule { }
