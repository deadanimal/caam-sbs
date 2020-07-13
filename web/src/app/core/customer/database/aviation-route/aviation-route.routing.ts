import { Routes } from '@angular/router';
import { RoutelistKkComponent } from './routelist-kk/routelist-kk.component';
import { RoutelistKucComponent } from './routelist-kuc/routelist-kuc.component';
import { RoutelistSemenanjungComponent } from './routelist-semenanjung/routelist-semenanjung.component';

export const AviationRouteRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'routelist-kk',
                component: RoutelistKkComponent
            },
            {
                path: 'routelist-kuc',
                component: RoutelistKucComponent
            },
            {
                path: 'routelist-semenanjung',
                component: RoutelistSemenanjungComponent
            }
        ]
    }
]