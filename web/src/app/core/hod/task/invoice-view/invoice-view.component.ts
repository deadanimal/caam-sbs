import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import swal from "sweetalert2";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-invoice-view",
  templateUrl: "./invoice-view.component.html",
  styleUrls: ["./invoice-view.component.scss"],
})
export class InvoiceViewComponent implements OnInit {
  private chart: am4charts.XYChart;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; // FromAirports.FromAirports;
  SelectionType = SelectionType;
  user_obj: any;
  countLocal = [];
  countDomestic = [];
  countInbound = [];
  countOutbound = [];
  countOver = [];

  // FormGroup
  vfrtflFormGroup: FormGroup;

  // Modal
  closeResult: string;
  processTitle: string;

  // URL Parameters
  invoice: any;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private fpldataService: FpldatasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user_obj = this.authService.decodedToken();

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.invoice = this.router.getCurrentNavigation().extras.state.invoice;
        if (this.invoice.cid) this.getVfrTflData(this.invoice.cid);
        console.log("invoice", this.invoice);
      }
    });

    this.vfrtflFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      cid: new FormControl(""),
      fpl_date: new FormControl(""),
      fpl_no: new FormControl(""),
      aircraft_model: new FormControl(""),
      dep: new FormControl(""),
      dest: new FormControl(""),
      ctg: new FormControl(""),
      dist: new FormControl(""),
      route: new FormControl(""),
      uploaded_by: new FormControl(""),
      error_remark: new FormControl(""),
    });
  }

  getVfrTflData(cid) {
    this.fpldataService.filter("cid=" + cid).subscribe((res) => {
      // console.log("res", res);
      this.rows = res;
      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          // id: key
          no: key,
        };
      });

      if (this.rows) this.countFlightCategory();
    });
  }

  countFlightCategory() {
    this.countDomestic = this.rows.filter((obj) => {
      return obj.ctg == 'DOM';
    });

    this.countLocal = this.rows.filter((obj) => {
      return obj.ctg == 'LOC';
    });

    this.countInbound = this.rows.filter((obj) => {
      return obj.ctg == 'INB';
    });

    this.countOutbound = this.rows.filter((obj) => {
      return obj.ctg == 'OUB';
    });

    this.countOver = this.rows.filter((obj) => {
      return obj.ctg == 'OVF';
    });
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
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  resetTable() {
    this.temp = this.rows;
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
        size: "lg",
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

  back() {
    this.router.navigate(["hod/task/invoice"]);
  }

  edit(row, content) {
    this.vfrtflFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit VFR/TFL Data");
  }

  update() {
    this.fpldataService
      .update(this.vfrtflFormGroup.value.id, this.vfrtflFormGroup.value)
      .subscribe(
        (res) => {
          console.log("res", res);
          swal
            .fire({
              title: "Success",
              text: "The submission has successfully recorded",
              type: "success",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
            })
            .then((result) => {
              if (result.value) {
                this.modalService.dismissAll();
                this.getVfrTflData(this.invoice.cid);
              }
            });
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  delete(value) {
    swal
      .fire({
        title: "Delete",
        text: "Are you sure want to delete this VFR/TFL file?",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-danger",
        confirmButtonText: "Yes, delete it!",
        cancelButtonClass: "btn btn-secondary",
      })
      .then((result) => {
        if (result.value) {
          // Show confirmation
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-primary",
          });
        }
      });
  }

  // submit() {
  //   swal
  //     .fire({
  //       title: "Submit",
  //       text: "Are you want submit this VFR/TFL data into database?",
  //       type: "question",
  //       showCancelButton: true,
  //       buttonsStyling: false,
  //       confirmButtonClass: "btn btn-dark",
  //       confirmButtonText: "Yes, submit it",
  //       cancelButtonClass: "btn btn-secondary",
  //       cancelButtonText: "No",
  //     })
  //     .then((result) => {
  //       if (result.value) {
  //         this.spinner.show();
  //         this.fpldataService
  //           .submit({
  //             uploaded_by: this.user_obj.user_id,
  //             fileupload_id: this.fileupload.id,
  //           })
  //           .subscribe(
  //             (res) => {
  //               console.log("res", res);
  //               this.spinner.hide();
  //               swal
  //                 .fire({
  //                   title: "Success",
  //                   text: "The submission has successfully recorded",
  //                   type: "success",
  //                   buttonsStyling: false,
  //                   confirmButtonClass: "btn btn-success",
  //                 })
  //                 .then((result) => {
  //                   if (result.value) {
  //                     this.modalService.dismissAll();
  //                     this.back();
  //                   }
  //                 });
  //             },
  //             (err) => {
  //               console.error("err", err);
  //               this.spinner.hide();
  //             }
  //           );
  //       }
  //     });
  // }

  // check() {
  //   let check_obj = {
  //     checked_by: this.user_obj.user_id,
  //     fileupload_id: this.fileupload.id,
  //   };
  //   this.spinner.show();
  //   this.fpldataService.check(check_obj).subscribe(
  //     (res) => {
  //       console.log("res", res);
  //       this.spinner.hide();
  //       if (res == 200) {
  //         swal
  //           .fire({
  //             title: "Success",
  //             text: "The submission has successfully recorded",
  //             type: "success",
  //             buttonsStyling: false,
  //             confirmButtonClass: "btn btn-success",
  //           })
  //           .then((result) => {
  //             if (result.value) {
  //               this.modalService.dismissAll();
  //               this.back();
  //             }
  //           });
  //       }
  //     },
  //     (err) => {
  //       console.error("err", err);
  //       this.spinner.hide();
  //     }
  //   );
  // }

  ngOnInit() {}
}
