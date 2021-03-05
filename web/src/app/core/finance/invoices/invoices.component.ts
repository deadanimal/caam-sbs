import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/finance/invoice";
import { NgxSpinnerService } from "ngx-spinner";
// invoice handler
import { InvoicesService } from 'src/app/shared/services/finance/invoice/invoices.service';
import { Invoice } from 'src/app/shared/services/finance/invoice/invoices.model';

// filesaver package for pdf handler
import * as FileSaver from 'file-saver';

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


  // View Data (for detail view)
  companyname: string;
  companycid: string;
  companyemail: string;
  companytel: string;
  companyfax: string;
  invoicenumber: string;
  invoicedate: string;
  invoiceduedate: string;
  invoicestatus: string;
  invoicesurcharge: string;
  invoicetotal: string;
  domesticflight: string;
  inboundflight: string;
  outboundflight: string;
  overflight: string;
  otherflight: string;
  subtotal: string;



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
    private spinner: NgxSpinnerService
  ) {
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.getAllData();
  }



  download(url: string, company_name: string): void {
    console.log(url);
    // to do :
    // post request to downloadpdf route with id as payloads
    this.invoiceService.exportpdf({"id":url}).subscribe(
      (res) => {
        console.log("this is res");
        var filename = company_name + ".pdf"
        FileSaver.saveAs(res, filename)
      },
      (err) => {
        console.log("this is err");
      }

    )

  }
  // get all invoices
  getAllData = () => {
    this.spinner.show();
    this.invoiceService.get().subscribe(
      data => {
        this.invoices = data;
        this.temp = this.invoices.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

        this.spinner.hide()
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }
    )
  };


  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.invoices.filter(function (d) {
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

  
  onActivate(event) {
    this.activeRow = event.row;
  }

  // function utk detail view
  viewData(row) {
    this.companyname = row.company_name;
    this.companycid = row.cid;
    this.companyemail = row.company_email;
    this.companytel = row.office_num;
    this.companyfax = row.fax_number;
    this.invoicenumber = row.invoice_no;
    this.invoicedate = row.created_at_str;
    this.invoiceduedate = row.due_at_str;
    this.invoicestatus = row.status;
    this.invoicesurcharge = row.surchage;
    this.invoicetotal = row.invoice_total;
    this.domesticflight = row.domestic_flight;
    this.inboundflight = row.inbound_flight;
    this.outboundflight = row.outbound_flight;
    this.overflight = row.over_flight;
    this.otherflight = row.other_flight;
    this.subtotal = row.sub_total;


    
  }

  openModal(modalRef: TemplateRef<any>, row) {
    this.viewData(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }


  statusBadge(status: string) {
    if (status == "UNPAID") return "badge badge-danger";
    if (status == "OUTSTANDING") return "badge badge-warning";
    if (status == "PARTIAL") return "badge badge-primary";
    if (status == "PAID") return "badge badge-success";
  }

  testSpinner() {
    this.spinner.show();

    setTimeout(() => {
         this.spinner.hide();
    }, 10000);
  }

  exportPdf(value: string) {
    console.log("value", value)
    this.spinner.show()
    this.invoiceService.exportList({"file_type":value}).subscribe(
      (res) => {
        let filename: string;
        console.log("this is res", res)
        if (value=="PDF") {
          filename = "invoice_list.pdf"
        }
        else if (value=="XLSX") {
          filename = "invoice_list.xlsx"
        }
        FileSaver.saveAs(res, filename)
        this.spinner.hide()
      },
      (err) => {
        console.log("this is err")
        console.log(err)
        this.spinner.hide()
      }
    )
  }

}


