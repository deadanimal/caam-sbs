import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  BsDropdownModule, 
  ProgressbarModule, 
  TooltipModule, 
  BsDatepickerModule,
  PaginationModule
} from 'ngx-bootstrap';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { VfrvRoute } from './vfrv.routing';
import { WatchTowerComponent } from './watch-tower/watch-tower.component';
import { UploadComponent } from './upload/upload.component';
import { VfrListComponent } from './vfr-list/vfr-list.component';
import { CheckerMakerComponent } from './checker-maker/checker-maker.component';

@NgModule({
  declarations: [
    
  WatchTowerComponent,
    
  UploadComponent,
    
  VfrListComponent,
    
  CheckerMakerComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(VfrvRoute),
    HttpClientModule,
    NgbModule,
    NgxDatatableModule,
    LeafletModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ]
})
export class CustomerVfrvModule { }
