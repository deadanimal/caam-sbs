import { chartPieData } from './../../../variables/charts';
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/credit-debit-note";
import { CreditDebitService } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.service';
import { CreditDebit } from 'src/app/shared/services/finance/credit-and-debit/credit-and-debit.model';

@Component({
  selector: 'app-credit-debit-note',
  templateUrl: './credit-debit-note.component.html',
  styleUrls: ['./credit-debit-note.component.scss']
})
export class CreditDebitNoteComponent implements OnInit {

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.creditdebitlist;

  // Data
  creditDebits: CreditDebit[] = [];

  // View Data
  companyname: string;
  transactionnumber: string;
  transactiondate: string;

  // searchInput
  searchInput = {
    invoicenumber: "",
    companyname: "",
  };

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg"
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private creditDebitService: CreditDebitService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    this.creditDebitService.get().subscribe(
      data => {
        this.creditDebits = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    });
  }

  searchTable() {
    let object = this.searchInput;
    this.temp = this.rows.filter(function (d) {
      for (var key in object) {
        if (object[key]) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(object[key].toString().toLowerCase()) !== -1
          )
            return true;
        }
      }
      return false;
    });
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  viewData(row){
    this.companyname = row.companyname;
    this.transactiondate = row.transactiondate;
    this.transactionnumber = row.transactionnumber;
  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  ngOnInit() { }

  statusBadge(status: string) {
    if (status == "Overdue") return "badge badge-danger";
    if (status == "Disputed") return "badge badge-warning";
    if (status == "Partial") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
  }

}
