import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as InvoiceDatabases from "src/app/variables/invoice-database";
import swal from "sweetalert2";

import { ApprovalsService } from "src/app/shared/services/approvals/approvals.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-invoice-database-approval",
  templateUrl: "./invoice-database-approval.component.html",
  styleUrls: ["./invoice-database-approval.component.scss"],
})
export class InvoiceDatabaseApprovalComponent implements OnInit {
  @ViewChild("myTable", { static: false }) table: any;

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; //InvoiceDatabases.InvoiceDatabases;
  SelectionType = SelectionType;

  // Dropdowns
  types = [
    { value: "RA", name: "Rate" },
    { value: "AL", name: "Airline" },
    { value: "CS", name: "Callsign" },
    { value: "AC", name: "Aircraft" },
    { value: "AP", name: "Airport" },
    { value: "RO", name: "Route" },
    { value: "EX", name: "Exemptions" },
    { value: "NA", name: "Not Available" },
  ];
  statuses = [
    { value: "AP", name: "Approve" },
    { value: "RE", name: "Reject" },
    { value: "NA", name: "Pending" },
  ];

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public zone: NgZone,
    private modalService: NgbModal,
    private approvalService: ApprovalsService
  ) {
    this.getApproval();
  }

  getApproval() {
    this.approvalService.get().subscribe(
      (res) => {
        if (res) {
          // console.log("res", res);
          this.rows = res;
          this.temp = this.rows.map((prop, key) => {
            return {
              ...prop,
              // id: key,
              no: key,
            };
          });
        }
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
        if (
          d[key]
            .toString()
            .toLowerCase()
            .indexOf(val.toString().toLowerCase()) !== -1
        ) {
          return true;
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

  toggleExpandRow(row) {
    // console.log("Toggled Expand Row!", row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log("Detail Toggled", event);
  }

  approve() {
    console.log(this.selected);

    swal
      .fire({
        title: "Are you want to approve?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-default",
        confirmButtonText: "Yes",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          for (let i = 0; i < this.selected.length; i++) {
            this.approvalService
              .approval(this.selected[i].id, {}, "approve")
              .subscribe(
                (res) => {
                  if (res) {
                    // console.log("res", res);

                    // Show confirmation
                    swal
                      .fire({
                        title: "Success",
                        text: "The submission has successfully recorded",
                        type: "success",
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-success",
                      })
                      .then((result) => {
                        if (result.value) this.getApproval();
                      });
                  }
                },
                (err) => {
                  console.error("err", err);
                }
              );
          }
        }
      });
  }

  reject(id: string) {
    swal
      .fire({
        title: "Are you sure want to reject?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-default",
        confirmButtonText: "Yes",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.approvalService.approval(id, {}, "reject").subscribe(
            (res) => {
              if (res) {
                // console.log("res", res);

                // Show confirmation
                swal
                  .fire({
                    title: "Success",
                    text: "The submission has successfully recorded",
                    type: "success",
                    buttonsStyling: false,
                    confirmButtonClass: "btn btn-success",
                  })
                  .then((result) => {
                    if (result.value) this.getApproval();
                  });
              }
            },
            (err) => {
              console.error("err", err);
            }
          );
        }
      });
  }

  getType(value: string) {
    let result = this.types.find((obj) => {
      return obj.value == value;
    });
    return result.name;
  }

  getStatus(value: string) {
    let result = this.statuses.find((obj) => {
      return obj.value == value;
    });
    return result.name;
  }

  getStatusBadge(value: string) {
    if (value == "AP") return "badge badge-success";
    if (value == "RE") return "badge badge-danger";
    if (value == "NA") return "badge badge-default";
  }

  ngOnInit() {}
}
