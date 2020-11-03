
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/invoice";
import { InvoiceService } from 'src/app/shared/services/billing/invoice/invoice.service';
import { Invoice } from 'src/app/shared/services/billing/invoice/invoice.model';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.invoicelist;

  // Data
  invoices: Invoice[] = [];

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
    private invoiceService: InvoiceService,
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
    this.invoiceService.get().subscribe(
      data => {
        this.invoices = data;
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

  statusBadge(status: string) {
    if (status == "Overdue") return "badge badge-danger";
    if (status == "Disputed") return "badge badge-warning";
    if (status == "Partial") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
  }
}
