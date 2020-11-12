import { Component, OnInit, NgZone, ViewChild, ElementRef } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import {
  NgbModal,
  ModalDismissReasons,
  NgbTabChangeEvent,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import swal from "sweetalert2";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";
import { OrganisationsService } from "src/app/shared/services/organisations/organisations.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = [];
  SelectionType = SelectionType;
  airlines = [];
  fpldatas = [];
  archivedfpldatas = [];
  errorfpldatas = [];
  invoice: any;

  // searchInput
  searchInput = {
    callsign: "",
    model: "",
    operator: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private fpldataService: FpldatasService,
    private organisationService: OrganisationsService
  ) { }

  ngOnInit() {
    this.getInvoice();

    this.getFpldata();
  }

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;


  downloadAsPDF() {
    // const doc = new jsPDF();

    // const specialElementHandlers = {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };

    // const pdfTable =  this.pdfTable.nativeElement;

    // doc.fromHTML(pdfTable.innerHTML, 15, 15, {
    //   width: 190,
    //   'elementHandlers': specialElementHandlers
    // });

    // doc.save('tableToPdf.pdf');
    var data = document.getElementById('pdfTable');  //Id of the table
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      let imgWidth = 208;
      let pageHeight = 295;
      let imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('Invoice.pdf'); // Generated PDF   
      
    });
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
        return obj.archived_at != "";
      });

      this.errorfpldatas = this.fpldatas.filter((obj) => {
        return obj.error_remark != "";
      });
    },
    (err) => {
      console.error("err", err);
    }
  );
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

resetTable() {
  this.temp = this.rows;

  this.searchInput.callsign = "";
  this.searchInput.model = "";
  this.searchInput.operator = "";
}

onSelect({ selected }) {
  this.selected.splice(0, this.selected.length);
  this.selected.push(...selected);
}

onActivate(event) {
  this.activeRow = event.row;
}

// Modal Add New Customer
open(content, type, modalDimension, processTitle) {
  this.processTitle = processTitle;
  // if (modalDimension === "sm" && type === "modal_mini") {
  this.modalService
    .open(content, {
      windowClass: "modal-mini",
      centered: true,
      backdrop: "static",
    })
    .result.then(
      (result) => {
        this.closeResult = "Closed with: $result";
      },
      (reason) => {
        this.closeResult = "Dismissed $this.getDismissReason(reason)";
      }
    );
  // }
}

  private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return "by pressing ESC";
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return "by clicking on a backdrop";
  } else {
    return "with: $reason";
  }
}

view(row) {
  let navigationExtras: NavigationExtras = {
    state: {
      invoice: row,
    },
  };
  this.router.navigate(["hod/task/invoice/view"], navigationExtras);
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
}
