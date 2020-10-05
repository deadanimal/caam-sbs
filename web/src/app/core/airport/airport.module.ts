import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HttpClientModule } from "@angular/common/http";
import { Ng9OdometerModule } from "ng9-odometer";
import { NgxSpinnerModule } from "ngx-spinner";

import { RouterModule } from "@angular/router";
import { AirportRoute } from "./airport.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HistoryComponent } from "./tflvfr/history/history.component";
import { HistoryViewComponent } from "./tflvfr/history-view/history-view.component";
import { UploadComponent } from "./tflvfr/upload/upload.component";

@NgModule({
  declarations: [
    DashboardComponent,
    HistoryComponent,
    HistoryViewComponent,
    UploadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AirportRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    Ng9OdometerModule,
    NgxSpinnerModule,
  ],
})
export class AirportModule {}
