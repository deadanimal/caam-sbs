import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from "ngx-bootstrap/popover";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HttpClientModule } from "@angular/common/http";
import { Ng9OdometerModule } from 'ng9-odometer';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxSpinnerModule } from 'ngx-spinner';

import { RouterModule } from "@angular/router";
import { VfrvRoute } from "./vfrv.routing";
import { WatchTowerComponent } from "./watch-tower/watch-tower.component";
import { UploadComponent } from "./upload/upload.component";
import { VfrListComponent } from "./vfr-list/vfr-list.component";
import { CheckerMakerComponent } from "./checker-maker/checker-maker.component";
import { DatabaseComponent } from "./database/database.component";
import { GenerateInvoiceComponent } from "./generate-invoice/generate-invoice.component";
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { HistoryComponent } from './history/history.component';
import { HistoryViewComponent } from './history-view/history-view.component';

@NgModule({
  declarations: [
    WatchTowerComponent,
    UploadComponent,
    VfrListComponent,
    CheckerMakerComponent,
    DatabaseComponent,
    GenerateInvoiceComponent,
    InvoiceDetailComponent,
    HistoryComponent,
    HistoryViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(VfrvRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    Ng9OdometerModule.forRoot(),
    NgxQRCodeModule,
    NgxSpinnerModule
  ],
})
export class HeadquarterVfrvModule {}
