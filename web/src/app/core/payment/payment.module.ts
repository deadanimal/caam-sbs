import { OutstandingPaymentComponent } from './outstanding-payment/outstanding-payment.component';
import { PaymentRoutes } from './payment.routing';

import { PaymentComponent } from './payment/payment.component';
import { StatementAccountComponent } from './statement-account/statement-account.component';

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
import { CurrencyMaskModule } from 'ngx-currency-mask';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ngx-currency-mask/src/currency-mask.config';
import { DatePipe } from '@angular/common';

import { RouterModule } from '@angular/router';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: '.',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: ',',
  currency: 'MYR'
};


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(PaymentRoutes),
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
    CurrencyMaskModule,
    
  ],
  declarations: [
    PaymentComponent,
    StatementAccountComponent,
    OutstandingPaymentComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    DatePipe,
  ]
})
export class PaymentModule { }
