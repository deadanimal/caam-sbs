import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';
import { FpldatasService } from 'src/app/shared/services/fpldatas/fpldatas.service';
import { DisputeService } from 'src/app/shared/services/dispute/dispute.service';
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/billing/invoice";
import { InvoicesService} from 'src/app/shared/services/finance/invoice/invoices.service';
import { Invoice } from 'src/app/shared/services/finance/invoice/invoices.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import * as FileSaver from 'file-saver';
import swal from "sweetalert2";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  isValid: boolean;
  movementreport : FpldatasModel[] = [];
  movementreportStaged : FpldatasModel[] = [];
  remarkForm: FormGroup;

  cid_id:string;
  disputeStage: boolean = false;
  fplToDispute: any[] = [];
  disputeBody: any;
  displayCheck: any;

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  temp1 = [];
  temp2 = [];
  activeRow: any;
  rows = dummylist.invoicelist;

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

  // Data
  invoices: any;

  // Modal View

  companyperiod: string;
  companycid: any;
  companyname: string;
  companyaddress: string;
  companyemail: string;
  companytel: string;
  invoicenumber: string;
  invoicestatus: string;
  invoiceduedate: string;
  domesticflight: string;
  inboundflight: string;
  outboundflight: string;
  overflight: string;
  otherflight: string;
  subtotal: string;
  invoicesurcharge: string;
  invoicetotal: string;
  companyfax: string;
        
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
    class: "modal-xl",
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private invoiceService: InvoicesService,
    private disputeService: DisputeService,
    private datePipe: DatePipe,
    private authService: AuthService,
    private userService: UsersService,
    private fplService: FpldatasService,
    private formBuilder: FormBuilder,
  ) {
    this.filterby = "all";
    this.searchText = "";
    this.remarkForm = this.formBuilder.group({
      remark: new FormControl(""),     
    });
  }

  ngOnInit() {
    this.getFpls();
    this.unstageDispute();
  }

  stagingDispute() {
    this.disputeStage = true;
  }

  unstageDispute() {
    this.disputeStage = false;
    this.fplToDispute = [];
    this.fplService.unstage().subscribe(
      (res) => {
        this.getFpls();
        console.log(res);
      }, 
      (err) => {
        console.log(err);
    });
  }

  submit() {
    swal
      .fire({
        title: "Submit",
        text: "Do you want to submit dispute?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, Submit",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.disputeStage = false;
          this.disputeBody = {
            'cid': this.cid_id,  
            'remarks': this.remarkForm.value['remark'],
            'fpl_ids': this.fplToDispute,
          }

          console.log(this.disputeBody);

          this.disputeService.submit(this.disputeBody).subscribe(
          (res) => {
            this.unstageDispute();
          },
          (err) => {});


        } else {
          console.log("dismissed")
        }
      })

  }

  submitOld() {
    this.disputeStage = false;
    this.disputeBody = {
      'cid': this.cid_id,  
      'remarks': this.remarkForm.value['remark'],
      'fpl_ids': this.fplToDispute,
    }

    console.log(this.disputeBody);

      this.disputeService.submit(this.disputeBody).subscribe(
      (res) => {
        this.unstageDispute();
      },
      (err) => {});
  }

  archive(id) {
    this.fplService.stage({'id':id}).subscribe(
      (res) => {
        this.fplToDispute.push(id);
        console.log(this.fplToDispute);
        this.getFpls();
      },
      (err) => {
        console.log(err);
    });
  }

  

    // FilterDate() {
  //   let fromdate = this.fromDate
  //   let todate = this.toDate

  //   if (fromdate && todate) {
  //     this.temp = this.rows.filter(function (d) {
  //       return new Date(d.invoicedate) >= fromdate && new Date(d.invoicedate) <= todate;
  //     })
  //   }
  // }

  FilterDate() {
    let date:any = this.fromDate
    date = this.datePipe.transform(date, 'MM/dd/yyyy');
    console.log(date + " " + typeof(date))

    if (date) {
          this.temp = this.rows.filter(function (d) {
            return d.invoicedate == date
          })
        }
  }
  // user specific invoice 
  // obtainToken -> user_id -> get extended user fields -> usercid -> flter invoice using cid
  getFpls() {
    let userObj = this.authService.decodedToken();
    let userId = userObj.user_id
    this.userService.getOne(userId).subscribe(
      (res) => {
        this.cid_id = res.cid_id
        this.getInvoices();
        let postFilter = {
            'cid_id':this.cid_id
          }
        this.fplService.getFilteredMonthly(postFilter).subscribe(
          (res) => {
            var temp = [];
            this.movementreport = res;
            this.temp1 = this.movementreport.map((prop, key) => {
              return {
                ...prop,
                // id: key,
                no: key,
              };
            });


            for (var i=0; i < res.length; i++) {
              if (res[i].staged == true) {
                temp.push(res[i]);
              }
            }
            this.movementreportStaged = temp;
            
            console.log("staged", this.movementreportStaged);
          },
          (err) => {
            console.log(err)
        });

      },
      (err) => {
        console.log("err", err)
    });

  }
  filterTable($event) {
    let val = $event.target.value;
    this.temp1 = this.movementreport.filter(function (d) {
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



  filterTable2($event) {
    let val = $event.target.value;
    this.temp2 = this.invoices.filter(function (d) {
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


  getInvoices() {
    this.invoiceService.getfilteredCID({'cid_id':this.cid_id}).subscribe(
    (res) => {
      this.invoices = res;
      this.temp2 = this.invoices.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });

      console.log(this.invoices);
    },
    (err) => {
      console.log(err);
    });
  }



  entriesChange($event) {
    this.entries = $event.target.value;
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  detailView(modalRef: TemplateRef<any>, row) {
    console.log(row);
    this.modal = this.modalService.show(modalRef, this.modalConfig);
    this.companyname = row.company_name
    this.companyperiod = row.inv_period
    this.companycid = row.cid_id;
    this.companyname = row.company_name;
    this.companyaddress = row.company_address;
    this.companyemail = row.company_email;
    this.companytel = row.office_num;
    this.invoicenumber = row.invoice_no;
    this.invoicestatus = row.status;
    this.invoiceduedate = row.due_at_str;
    this.domesticflight = row.domestic_flight;
    this.inboundflight = row.inbound_flight;
    this.outboundflight = row.outbound_flight;
    this.overflight = row.over_flight;
    this.otherflight = row.other_flight;
    this.subtotal = row.sub_total;
    this.invoicesurcharge = row.surchage;
    this.invoicetotal = row.invoice_total;
    this.companyfax = row.fax_number;
   
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

}
