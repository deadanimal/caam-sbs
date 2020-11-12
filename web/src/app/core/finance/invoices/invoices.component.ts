import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/invoice";
import { InvoicesService } from 'src/app/shared/services/finance/invoice/invoices.service';
import { Invoice } from 'src/app/shared/services/finance/invoice/invoices.model';

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.invoicelist;

  // Data
  invoices: Invoice[] = [];


  // View Data
  companyname: string;
  invoicenumber: string;
  invoicedate: string;


  // Search Filter
  filterby: String;
  searchText: String;


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
    private invoiceService: InvoicesService,
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
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


  FilterTable(field) {
    let search = field.toLocaleLowerCase();
    let tempAll = [];


    if (this.filterby == 'all') {
      for (let i = 0; i < 15; i++) {
        if (this.rows[i] != null) { tempAll[i] = this.rows[i]; }
      }

      return this.temp = tempAll;

    }
    else if (this.filterby == 'companyname') {
      this.temp = this.rows.filter(function (d) {
        return d.companyname.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'invoicenumber') {
      this.temp = this.rows.filter(function (d) {
        return d.invoicenumber.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'status') {
      this.temp = this.rows.filter(function (d) {
        return d.status.toLocaleLowerCase().includes(search);
      })
    }
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  viewData(row) {
    this.companyname = row.companyname;
    this.invoicenumber = row.invoicenumber;
    this.invoicedate = row.invoicedate;
  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }


  statusBadge(status: string) {
    if (status == "Overdue") return "badge badge-danger";
    if (status == "Disputed") return "badge badge-warning";
    if (status == "Partial") return "badge badge-primary";
    if (status == "Paid") return "badge badge-success";
  }
}
