import { StatementAccountService } from './../../../shared/services/payment/statement-account/statement-account.service';
import { StatementAccount } from './../../../shared/services/payment/statement-account/statement-account.model';
import { AuthService } from './../../../shared/services/auth/auth.service';
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
  // row = [
  //   {
  //     issuedate: "12/01/2020",
  //     transaction: "invoice",
  //     transactionnumber: "123",
  //     debit: 345346,
  //     credit: 567889,
  //     balance: 9000
  //   },
  //   {
  //     issuedate: "12/01/2020",
  //     transaction: "invoice",
  //     transactionnumber: "123",
  //     debit: 345346,
  //     credit: 567889,
  //     balance: 9000
  //   }
  // ]


  constructor(
    private statementAccountService: StatementAccountService,
    private authService: AuthService,
  ) { 
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData = () => {
    const user_id = this.authService.decodedToken().user_id
    const body = {
      "user_id": user_id
    }

    this.statementAccountService.getfiltered(body).subscribe(
      (res) => {
        this.statementaccounts = res;
        this.temp = this.statementaccounts.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

        console.log(this.statementaccounts);
      },
      (err) => {
        console.log("err", err);
      });
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;

  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.statementaccounts.filter(function (d) {
      for (var key in d) {
        if (d[key] != "" && d[key] != null) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) !== -1
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }



}
