import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {


  public isGenerated: boolean = false

  constructor() { }

  ngOnInit() {
  }

  generateInvoice() {
    this.swalGenerated()
    this.isGenerated = true
  }

  swalGenerated() {
    swal.fire({
      title: "Success",
      text: "Invoice successfully generated",
      type: "success",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-success"
    });
  }

}
