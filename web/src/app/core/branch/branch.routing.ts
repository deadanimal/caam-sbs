import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const BranchRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    }
]