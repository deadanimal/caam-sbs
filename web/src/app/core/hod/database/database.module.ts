import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { DatabaseRoute } from './database.routing';
import { AirlineInformationComponent } from './airline-information/airline-information.component';
import { AircraftTypeInformationComponent } from './aircraft-type-information/aircraft-type-information.component';
import { FplDataFpexclusionMultipleCallsignComponent } from './fpl-data-fpexclusion-multiple-callsign/fpl-data-fpexclusion-multiple-callsign.component';
import { FlightRuleAndFlightCategoryComponent } from './flight-rule-and-flight-category/flight-rule-and-flight-category.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { AirportListComponent } from './airport-list/airport-list.component';
import { ExemptionsComponent } from './exemptions/exemptions.component';

@NgModule({
  declarations: [
    AirlineInformationComponent,
    AircraftTypeInformationComponent,
    FplDataFpexclusionMultipleCallsignComponent,
    FlightRuleAndFlightCategoryComponent,
    RateListComponent,
    AirportListComponent,
    ExemptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(DatabaseRoute),
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class DatabaseModule { }
