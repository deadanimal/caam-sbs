import { UploadComponent } from './upload/upload.component';
import { Routes } from "@angular/router";
import { DisputeComponent } from './dispute/dispute.component';
import { TflVfrComponent } from './tfl-vfr/tfl-vfr.component';
import { HistoryComponent } from './history/history.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TaskComponent } from './task/task.component';

export const TaskRoute: Routes = [
  {
    path: "",
    children: [
      { path: "dispute", component: DisputeComponent },  
      { path: "tfl-vfr", component: TflVfrComponent },   
      { path: "upload", component: UploadComponent },  
      { path: "data", component: HistoryComponent }, 
      { path: "task", component: TaskComponent }, 
      { path: "generate-invoice", component: InvoiceComponent },             
    ],
  },
];
