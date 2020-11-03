import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/general-ledger";
import { GeneralLedgerService } from 'src/app/shared/services/finance/general-ledger/general-ledger.service';
import { GeneralLedger } from 'src/app/shared/services/finance/general-ledger/general-ledger.model';

@Component({
  selector: 'app-general-ledger',
  templateUrl: './general-ledger.component.html',
  styleUrls: ['./general-ledger.component.scss']
})
export class GeneralLedgerComponent implements OnInit {

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.generalledgerlist;

  // Data
  generalLedger: GeneralLedger[] = [];


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
    class: "modal-dialog"
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private generalLedgerService: GeneralLedgerService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  getAllData = () => {
    this.generalLedgerService.get().subscribe(
      data => {
        this.generalLedger = data;
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

  
  openModal(modalRef: TemplateRef<any>, row) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  ngOnInit() {

   }

}

