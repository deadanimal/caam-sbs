import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TabsModule } from 'ngx-bootstrap/tabs';

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { HttpClientModule } from "@angular/common/http";
import { Ng9OdometerModule } from "ng9-odometer";
import { NgxSpinnerModule } from "ngx-spinner";

import { RouterModule } from "@angular/router";
import { OperationRoute } from "./operation.routing";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HistoryComponent } from "./task/history/history.component";
import { HistoryViewComponent } from "./task/history-view/history-view.component";
import { UploadComponent } from "./task/upload/upload.component";

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
    RouterModule.forChild(OperationRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule.forRoot(),
    Ng9OdometerModule,
    NgxSpinnerModule,
  ],
})
export class OperationModule {}
