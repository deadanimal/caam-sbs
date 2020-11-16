import { OutstandingPaymentService } from './../../../shared/services/payment/outstanding-payment/outstanding-payment.service';
import { OutstandingPayement } from './../../../shared/services/payment/outstanding-payment/outstanding-payment.model';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private oustandingPaymentService: OutstandingPaymentService
  ) { }

  ngOnInit() {
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    this.oustandingPaymentService.get().subscribe(
      data => {
        this.outstandingPayments = data;
      },
      error => {
        console.log(error)
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
