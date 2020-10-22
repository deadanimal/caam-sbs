import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabsModule } from 'ngx-bootstrap/tabs';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HttpClientModule } from "@angular/common/http";
import { Ng9OdometerModule } from 'ng9-odometer';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxSpinnerModule } from 'ngx-spinner';

import { RouterModule } from "@angular/router";
import { TaskRoute } from "./task.routing";
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { HistoryComponent } from './history/history.component';
import { UploadComponent } from './upload/upload.component';

let pages = [
  InvoiceComponent,
  InvoiceViewComponent,
  UploadComponent,
  HistoryComponent,
  HistoryViewComponent, 
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
    RouterModule.forChild(TaskRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    Ng9OdometerModule.forRoot(),
    NgxQRCodeModule,
    NgxSpinnerModule
  ],
})
export class TaskModule {}
