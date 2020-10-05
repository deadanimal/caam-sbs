import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule } from "@angular/router";
import { FinanceRoute } from "./finance.routing";
import { RegisterInvoiceComponent } from "./register-invoice/register-invoice.component";
import { AgingInvoiceComponent } from "./aging-invoice/aging-invoice.component";
import { ChecklistInvoiceComponent } from "./checklist-invoice/checklist-invoice.component";
import { ChargesComponent } from "./charges/charges.component";
import { ExemptionsComponent } from "./exemptions/exemptions.component";
import { StatementAccountReportComponent } from "../statement-account-report/statement-account-report.component";
import { CreditDebitNoteReportComponent } from "../credit-debit-note-report/credit-debit-note-report.component";
import { InvoiceListComponent } from './invoice-list/invoice-list.component';

@NgModule({
  declarations: [
    RegisterInvoiceComponent,
    AgingInvoiceComponent,
    ChecklistInvoiceComponent,
    ChargesComponent,
    ExemptionsComponent,
    StatementAccountReportComponent,
    CreditDebitNoteReportComponent,
    InvoiceListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(FinanceRoute),
    HttpClientModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    NgbModule,
    NgxQRCodeModule,
    PopoverModule.forRoot(),
  ],
})
export class HeadquarterFinanceModule {}
