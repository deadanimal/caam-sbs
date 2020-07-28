import { Routes } from "@angular/router";
import { AirlineInformationComponent } from "./airline-information/airline-information.component";
import { AircraftTypeInformationComponent } from "./aircraft-type-information/aircraft-type-information.component";
import { FplDataFpexclusionMultipleCallsignComponent } from "./fpl-data-fpexclusion-multiple-callsign/fpl-data-fpexclusion-multiple-callsign.component";
import { FlightRuleAndFlightCategoryComponent } from "./flight-rule-and-flight-category/flight-rule-and-flight-category.component";
import { RateListComponent } from "./rate-list/rate-list.component";
import { AirportListComponent } from "./airport-list/airport-list.component";
import { ExemptionsComponent } from "./exemptions/exemptions.component";

export const DatabaseRoute: Routes = [
  {
    path: "",
    data: {
      breadcrumb: "Database",
    },
    children: [
      {
        path: "rate",
        component: RateListComponent,
        data: {
          breadcrumb: "Rate List",
        },
      },
      {
        path: "airline",
        component: AirlineInformationComponent,
        data: {
          breadcrumb: "Airline Information",
        },
      },
      {
        path: "aircraft",
        component: AircraftTypeInformationComponent,
        data: {
          breadcrumb: "Aircraft Type Information",
        },
      },
      {
        path: "airport",
        component: AirportListComponent,
        data: {
          breadcrumb: "Airport List",
        },
      },
      {
        path: "callsign",
        component: FplDataFpexclusionMultipleCallsignComponent,
        data: {
          breadcrumb: "Multiple Callsign",
        },
      },
      {
        path: "route",
        loadChildren: () =>
          import("./aviation-route/aviation-route.module").then(
            (m) => m.HeadquarterAviationRouteModule
          ),
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
