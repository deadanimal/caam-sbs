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
import { HttpClientModule } from "@angular/common/http";
import { MatChipsModule } from '@angular/material/chips';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { RouterModule } from "@angular/router";
import { PaymentRoute } from "./payment.routing";
import { ChecklistComponent } from "./checklist/checklist.component";
import { ReportListComponent } from "./report-list/report-list.component";
import { AdvancedPaymentReportListComponent } from "./advanced-payment-report-list/advanced-payment-report-list.component";
import { PaymentSummaryReportComponent } from "./payment-summary-report/payment-summary-report.component";
import { OutstandingPaymentComponent } from "./outstanding-payment/outstanding-payment.component";
import { OutstandingPaymentSurchargeComponent } from "./outstanding-payment-surcharge/outstanding-payment-surcharge.component";

@NgModule({
  declarations: [
    ChecklistComponent,
    ReportListComponent,
    AdvancedPaymentReportListComponent,
    PaymentSummaryReportComponent,
    OutstandingPaymentComponent,
    OutstandingPaymentSurchargeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(PaymentRoute),
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    NgxQRCodeModule,
    MatChipsModule
  ],
})
export class CustomerPaymentModule {}
