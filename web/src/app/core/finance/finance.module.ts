import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxQRCodeModule } from "ngx-qrcode2";
import { NgpSortModule } from "ngp-sort-pipe";
import { ModalModule,} from 'ngx-bootstrap/modal';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { FinanceRoute } from './finance.routing';
import { InvoicesComponent } from './invoices/invoices.component';
import { AgingInvoiceComponent } from './aging-invoice/aging-invoice.component';
import { CreditDebitNoteComponent } from './credit-debit-note/credit-debit-note.component';
import { GeneralLedgerComponent } from './general-ledger/general-ledger.component';




let pages = [
  InvoicesComponent,
  AgingInvoiceComponent,
  CreditDebitNoteComponent,
  GeneralLedgerComponent,
]

@NgModule({
  declarations: [
    pages
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(FinanceRoute),
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    NgxQRCodeModule,
    Ng2SearchPipeModule,
    NgpSortModule,
    ModalModule.forRoot(),
  ]
})
export class FinanceModule { }
