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
import { TflvfrRoute } from "./tflvfr.routing";
import { UploadComponent } from "./upload/upload.component";
import { HistoryComponent } from './history/history.component';
import { HistoryViewComponent } from './history-view/history-view.component';

@NgModule({
  declarations: [
    UploadComponent,
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
    RouterModule.forChild(TflvfrRoute),
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
export class TflvfrModule {}
