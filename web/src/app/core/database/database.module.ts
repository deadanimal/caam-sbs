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

import { ExemptionsComponent } from './exemptions/exemptions.component';

import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { AirportsComponent } from './airports/airports.component';
import { CallsignsComponent } from './callsigns/callsigns.component';
import { RatesComponent } from './rates/rates.component';
import { RoutesComponent } from './routes/routes.component';

let pages = [
  ExemptionsComponent,

  AircraftsComponent,
  AirlinesComponent,
  AirportsComponent,
  CallsignsComponent,
  RatesComponent,
  RoutesComponent
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
