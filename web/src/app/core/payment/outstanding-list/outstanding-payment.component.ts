import { OutstandingPaymentService } from './../../../shared/services/payment/outstanding-payment/outstanding-payment.service';
import { OutstandingPayement } from './../../../shared/services/payment/outstanding-payment/outstanding-payment.model';
import { Component, OnInit } from '@angular/core';

// invoice handler
import { InvoicesService } from 'src/app/shared/services/finance/invoice/invoices.service';
import { Invoice } from 'src/app/shared/services/finance/invoice/invoices.model';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-outstanding-payment',
  templateUrl: './outstanding-payment.component.html',
  styleUrls: ['./outstanding-payment.component.scss']
})
export class OutstandingPaymentComponent implements OnInit {

  // Search Filter
  filterby: String;

  // Table
  entries: number = 5;
  activeRow: any;

  // Data
  temp = [];
  outstandingPayments: OutstandingPayement[] = [];
  invoices: Invoice[] = [];

  constructor(
    private oustandingPaymentService: OutstandingPaymentService,
    private invoiceService: InvoicesService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAllData()
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    this.spinner.show()
    this.invoiceService.get_outstanding().subscribe(
      data => {
        this.invoices = data;
        console.log(this.invoices)
        this.spinner.hide()
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }
    )
  }

  filterTable(filterby,search){
    this.oustandingPaymentService.filter(filterby,search).subscribe((res) => {
      this.outstandingPayments = res;
    },
    error => {
      console.log(error)
    })
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;
  }
}
