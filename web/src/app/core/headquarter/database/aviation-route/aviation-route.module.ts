import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  PopoverModule
} from 'ngx-bootstrap';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AviationRouteRoute } from './aviation-route.routing';
import { RoutelistKkComponent } from './routelist-kk/routelist-kk.component';
import { RoutelistKucComponent } from './routelist-kuc/routelist-kuc.component';
import { RoutelistSemenanjungComponent } from './routelist-semenanjung/routelist-semenanjung.component';


@NgModule({
  declarations: [
    
  RoutelistKkComponent,
    
  RoutelistKucComponent,
    
  RoutelistSemenanjungComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(AviationRouteRoute),
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot()
  ]
})
export class HeadquarterAviationRouteModule { }
