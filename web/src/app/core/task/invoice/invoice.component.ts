import { Component, OnInit, NgZone, ViewChild, ElementRef, TemplateRef } from "@angular/core";
import {
} from "@angular/forms";
import {
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert2";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { InvoicesService } from 'src/app/shared/services/finance/invoice/invoices.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  opost = {
    "cid":"all"
  }
  
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = [];
  airlines = [];
  fpldatas = [];
  fpldatasByCID = [];
  archivedfpldatas = [];
  errorfpldatas = [];
  invoice: any;

  total_domestic =[];
  total_inbound =[];
  total_outbound =[]
  total_overflight =[];
  total_other = [];
  selectedRow:{
    invoice_period:"",
    cid:"",
    company_name:"",
    total_charge:"",
    total_flight:"",
    domestic:"",
    inbound:"",
    outbound:"",
    overflight:"",
    other:""
  }

  


  // Modal
  modal: BsModalRef;
  modalmodal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-xl",
  }; 

  constructor(
    public zone: NgZone,
    private fpldataService: FpldatasService,
    private organisationService: OrganisationsService,
    private modalDialogService: BsModalService,
    private invoiceService: InvoicesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.getInvoice();
    this.getFpldata();
  }

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  // downloadAsPDF() {
  //   var data = document.getElementById('pdfTable');  //Id of the table
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options  
  //     let imgWidth = 208;
  //     let pageHeight = 295;
  //     let imgHeight = canvas.height * imgWidth / canvas.width;
  //     let heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
  //     let position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     pdf.save('Invoice.pdf'); // Generated PDF   

  //   });
  // }
  generateInvoice = () => {
    this.spinner.show();
    this.invoiceService.post(this.opost).subscribe(
      data => {
        console.log(data)
        this.spinner.hide()
      },
      error => {
        console.log(error)
        this.spinner.hide()
      }
    )
  }


  getInvoice() {
    this.fpldataService.invoice().subscribe(
      (res) => {
        // console.log("res", res);
        this.rows = res;
        this.organisationService.filter("organisation_type=AL").subscribe(
          (res) => {
            this.airlines = res;
            for (let i = 0; i < this.rows.length; i++) {
              let organisation = res.find((obj) => {
                return obj.cid == this.rows[i].cid;
              });
              this.rows[i].organisation = organisation;
            }
            this.temp = this.rows.map((prop, key) => {
              return {
                ...prop,
                // id: key
                no: key,
              };
            });
          },
          (err) => {
            console.error("err", err);
          }
        );
      },
      (err) => {
        console.error("err", err);
      }
    );
  }

  getFpldata() {
    this.fpldataService.get().subscribe(
      (res) => {
        // console.log("res", res);
        this.fpldatas = res;

        this.archivedfpldatas = this.fpldatas.find((obj) => {
          return obj.status == "FPL3";
        });

        this.errorfpldatas = this.fpldatas.filter((obj) => {
          return obj.error_remark != "";
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
    console.error("archive", this.archivedfpldatas);
  }

  getFplDataByCID(){
    this.fpldataService.filterByCID('1025').subscribe(
      (res) => {
        // console.log("res", res);
        let datas = res;

        this.fpldatasByCID = datas.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });
      },
      (err) => {
        console.error("err", err);
      }
    );
    console.log("ini ha", this.fpldatasByCID)
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key] != "" && d[key] != null) {
          if (
            d[key]
              .toString()
              .toLowerCase()
              .indexOf(val.toString().toLowerCase()) !== -1
          )
            return true;
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  generate(row) {
    swal
      .fire({
        title: "Generate Invoice",
        text: "DO you want to generate invoice for this airline?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-primary",
        confirmButtonText: "Yes, generate it!",
        cancelButtonClass: "btn btn-secondary",
      })
      .then((result) => {
        if (result.value) {
          let body = {
            cid: row.cid
          };
          this.fpldataService.generate(body).subscribe(
            (res) => {
              console.log("res", res);
            }, (err) => {
              console.error("err", err);
            }
          )

          // Show confirmation
          swal.fire({
            title: "Generated!",
            text: "Your invoice have been generated.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary",
          });
        }
      });
  }

  openModal(modalRef: TemplateRef<any>, row) {
    console.log(row)
    // this.selectedRow.cid = row.organisation.cid
    // this.selectedRow.company_name = row.organisation.name
    // this.selectedRow.total_charge = row.total_amount
    // this.selectedRow.total_flight = row.total_flight
    // this.selectedRow.invoice_period = row.invoice_period
    this.getFplDataByCID()
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }
}
