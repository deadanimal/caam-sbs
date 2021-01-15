import { Routes } from "@angular/router";

import { ExemptionsComponent } from "./exemptions/exemptions.component";

import { AircraftsComponent } from './aircrafts/aircrafts.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { AirportsComponent } from './airports/airports.component';
import { CallsignsComponent } from './callsigns/callsigns.component';
import { RatesComponent } from './rates/rates.component';
import { RoutesComponent } from './routes/routes.component';


export const DatabaseRoute: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Database",
    },
    children: [
      {
        path: "rate",
        component: RatesComponent,
        data: {
          breadcrumb: "Rate List",
        },
      },
      {
        path: "airline",
        component: AirlinesComponent,
        data: {
          breadcrumb: "Airline Information",
        },
      },
      {
        path: "aircraft",
        component: AircraftsComponent,
        data: {
          breadcrumb: "Aircraft Type Information",
        },
      },
      {
        path: "airport",
        component: AirportsComponent,
        data: {
          breadcrumb: "Airport List",
        },
      },
      {
        path: "callsign",
        component: CallsignsComponent,
        data: {
          breadcrumb: "Multiple Callsign",
        },
      },
      {
        path: "route",
        component: RoutesComponent,
        data: {
          breadcrumb: "Route List",
        },
      },
      {
        path: "exemptions",
        component: ExemptionsComponent,
        data: {
          breadcrumb: "Exemptions",
        },
      },
    ],
  },
];
