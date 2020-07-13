import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  PopoverModule
} from 'ngx-bootstrap';
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


@NgModule({
  declarations: [
    AirlineInformationComponent,
    AircraftTypeInformationComponent,
    FplDataFpexclusionMultipleCallsignComponent,
    FlightRuleAndFlightCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
export class CustomerDatabaseModule { }
