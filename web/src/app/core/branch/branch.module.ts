import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule 
} from 'ngx-bootstrap';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { BranchRoutes } from './branch.routing';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(BranchRoutes),
    HttpClientModule,
    LeafletModule,
    BsDatepickerModule.forRoot()
  ]
})
export class BranchModule { }
