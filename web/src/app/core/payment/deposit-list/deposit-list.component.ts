import { Component, OnInit } from '@angular/core';
import { DepositList } from 'src/app/shared/services/payment/deposit-list/deposit-list.model';
import { DepositListService } from 'src/app/shared/services/payment/deposit-list/deposit-list.service';

@Component({
  selector: 'app-deposit-list',
  templateUrl: './deposit-list.component.html',
  styleUrls: ['./deposit-list.component.scss']
})
export class DepositListComponent implements OnInit {

  // Search Filter
  filterby: String;
  searchText: String;

  // Table
  entries: number = 5;
  activeRow: any;

  // Data
  temp = [];
  depositList: DepositList[] = [];

  constructor(
    private depositListService: DepositListService
  ) { }

  ngOnInit() {
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  // getAllData = () => {
  //   this.depositListService.get().subscribe(
  //     data => {
  //       this.outstandingPayments = data;
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  // filterTable(filterby,search){
  //   this.depositListService.filter(filterby,search).subscribe((res) => {
  //     this.outstandingPayments = res;
  //   },
  //   error => {
  //     console.log(error)
  //   })
  // }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;
  }
}
