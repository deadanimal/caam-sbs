
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/debit-note";
import { DebitNoteService } from 'src/app/shared/services/billing/debit-note/debit-note.service';
import { DebitNote } from 'src/app/shared/services/billing/debit-note/debit-note.model';

@Component({
  selector: 'app-debit-note',
  templateUrl: './debit-note.component.html',
  styleUrls: ['./debit-note.component.scss']
})
export class DebitNoteComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.debitnotelist;

  // Data
  debitNotes: DebitNote[] = [];

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
    private debitNoteService: DebitNoteService,
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
    this.debitNoteService.get().subscribe(
      data => {
        this.debitNotes = data;
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
