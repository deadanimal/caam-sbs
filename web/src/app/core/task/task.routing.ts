
import { UploadComponent } from './upload/upload.component';
import { Routes } from "@angular/router";
import { DisputeComponent } from './dispute/dispute.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TaskComponent } from './task/task.component';

export const TaskRoute: Routes = [
  {
    path: "",
    children: [
      { path: "dispute", component: DisputeComponent },   
      { path: "upload", component: UploadComponent },  
      { path: "task", component: TaskComponent }, 
      { path: "generate-invoice", component: InvoiceComponent },         
    ],
  },
];
