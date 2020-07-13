import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  PopoverModule
} from 'ngx-bootstrap';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { CustomerRoute } from './customer.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagementComponent } from './management/management.component';
import { OperationReportComponent } from './reporting/operation-report/operation-report.component';
import { FinanceReportComponent } from './reporting/finance-report/finance-report.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { VfrComponent } from './vfr/vfr.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { StatementAccountReportComponent } from './statement-account-report/statement-account-report.component';
import { CreditDebitNoteReportComponent } from './credit-debit-note-report/credit-debit-note-report.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    ManagementComponent,
    OperationReportComponent,
    FinanceReportComponent,
    AnalysisComponent,
    VfrComponent,
    InvoiceComponent,
    StatementAccountReportComponent,
    CreditDebitNoteReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(CustomerRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class CustomerModule { }
