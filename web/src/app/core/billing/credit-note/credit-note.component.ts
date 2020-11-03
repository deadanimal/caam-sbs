
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/credit-note";
import { CreditNoteService } from 'src/app/shared/services/billing/credit-note/credit-note.service';
import { CreditNote } from 'src/app/shared/services/billing/credit-note/credit-note.model';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.creditnotelist;

  // Data
  creditNotes: CreditNote[] = [];

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
    class: "modal-lg",
  };

  constructor(
    public zone: NgZone, 
    private modalService: BsModalService,
    private creditNoteService: CreditNoteService,
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
    this.creditNoteService.get().subscribe(
      data => {
        this.creditNotes = data;
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

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }

  ngOnInit() { 
    console.log(this.rows)
  }

}
