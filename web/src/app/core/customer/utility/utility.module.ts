import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule
} from 'ngx-bootstrap';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { UtilityRoute } from './utility.routing';
import { UserComponent } from './user/user.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { UserPrivilegeComponent } from './user-privilege/user-privilege.component';


@NgModule({
  declarations: [
    
  UserComponent,
    
  AuditTrailComponent,
    
  UserPrivilegeComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(UtilityRoute),
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    LeafletModule,
    BsDatepickerModule.forRoot()
  ]
})
export class CustomerUtilityModule { }
