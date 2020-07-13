import { Routes } from '@angular/router';
import { AirlineInformationComponent } from './airline-information/airline-information.component';
import { AircraftTypeInformationComponent } from './aircraft-type-information/aircraft-type-information.component';
import { FplDataFpexclusionMultipleCallsignComponent } from './fpl-data-fpexclusion-multiple-callsign/fpl-data-fpexclusion-multiple-callsign.component';
import { FlightRuleAndFlightCategoryComponent } from './flight-rule-and-flight-category/flight-rule-and-flight-category.component';

export const DatabaseRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'airline-information',
                component: AirlineInformationComponent
            },
            {
                path: 'aircraft-type-information',
                component: AircraftTypeInformationComponent
            },
            {
                path: 'flight-rule-and-flight-category',
                component: FlightRuleAndFlightCategoryComponent
            },
            {
                path: 'fpl-data-fpexclusion-multiple-callsign',
                component: FplDataFpexclusionMultipleCallsignComponent
            },
            {
                path: 'aviation-route',
                loadChildren: () => import('./aviation-route/aviation-route.module').then(m => m.CustomerAviationRouteModule)
            }
        ]
    }
]