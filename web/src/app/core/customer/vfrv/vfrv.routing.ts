import { Routes } from '@angular/router';
import { WatchTowerComponent } from './watch-tower/watch-tower.component';
import { UploadComponent } from './upload/upload.component';
import { VfrListComponent } from './vfr-list/vfr-list.component';
import { CheckerMakerComponent } from './checker-maker/checker-maker.component';

export const VfrvRoute: Routes = [
    {
        path: '',
        children: [
            {
                path: 'watch-tower',
                component: WatchTowerComponent
            },
            {
                path: 'upload',
                component: UploadComponent
            },
            {
                path: 'vfr-list',
                component: VfrListComponent
            },
            {
                path: 'checker-maker',
                component: CheckerMakerComponent
            }
        ]
    }
]