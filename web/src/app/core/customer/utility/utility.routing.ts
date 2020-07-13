import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { UserPrivilegeComponent } from './user-privilege/user-privilege.component';

export const UtilityRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'user',
                component: UserComponent
            },
            {
                path: 'audit-trail',
                component: AuditTrailComponent
            },
            {
                path: 'user-privilege',
                component: UserPrivilegeComponent
            }
        ]
    }
]