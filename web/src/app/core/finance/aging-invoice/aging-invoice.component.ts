import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/aging-invoice";
import { AgingInvoicesService } from 'src/app/shared/services/aging-invoice/aging-invoice.service';
import { AgingInvoice } from 'src/app/shared/services/aging-invoice/aging-invoice.model';

@Component({
  selector: 'app-aging-invoice',
  templateUrl: './aging-invoice.component.html',
  styleUrls: ['./aging-invoice.component.scss']
})
export class AgingInvoiceComponent implements OnInit {

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.aginginvoicelist;

  // Data
  agingInvoices: AgingInvoice[] = [];

  // View Data
  companyname: string;
  invoicedate: string;
  invoicenumber: string;


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
    private agingInvoiceService: AgingInvoicesService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  getAllData = () => {
    this.agingInvoiceService.get().subscribe(
      data => {
        this.agingInvoices = data;
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
    this.invoicedate = row.invoicedate;
    this.invoicenumber = row.invoicenumber;
  }
  
  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  ngOnInit() {

   }

}
