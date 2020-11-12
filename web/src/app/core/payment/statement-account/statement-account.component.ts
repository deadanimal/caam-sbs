import { StatementAccountService } from './../../../shared/services/payment/statement-account/statement-account.service';
import { StatementAccount } from './../../../shared/services/payment/statement-account/statement-account.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statement-account',
  templateUrl: './statement-account.component.html',
  styleUrls: ['./statement-account.component.scss']
})
export class StatementAccountComponent implements OnInit {

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  entries: number = 5;
  activeRow: any;

  // Data
  temp=[];
  statementaccounts: StatementAccount[] = [];
  row = [
    {
      issuedate: "12/01/2020",
      transaction: "invoice",
      transactionnumber: "123",
      debit: 345346,
      credit: 567889,
      balance: 9000
    },
    {
      issuedate: "12/01/2020",
      transaction: "invoice",
      transactionnumber: "123",
      debit: 345346,
      credit: 567889,
      balance: 9000
    }
  ]


  constructor(
    private statementAccountService: StatementAccountService,
  ) { 
    this.temp = this.row
  }

  ngOnInit() {
  }

  getAllData = () => {
    this.statementAccountService.get().subscribe(
      data => {
        this.statementaccounts = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;

  }

}
