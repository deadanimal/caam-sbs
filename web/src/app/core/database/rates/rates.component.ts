import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as RateLists from "src/app/variables/rate-lists";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { RatesService } from "src/app/shared/services/rates/rates.service";
import { UsersService } from "src/app/shared/services/users/users.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-rates",
  templateUrl: "./rates.component.html",
  styleUrls: ["./rates.component.scss"],
})
export class RatesComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; //RateLists.RateLists;
  SelectionType = SelectionType;

  // Forms
  rateFormGroup: FormGroup;

  // searchInput
  searchInput = {
    ln: "",
    rateid: "",
    lowerweightlimit: "",
    upperweightlimit: "",
    raterm: "",
    minimumcharges: "",
  };

  // Modal
  closeResult: string;
  processTitle: string;

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    public authService: AuthService,
    private rateService: RatesService,
    private userService: UsersService
  ) {
    this.getRates();

    this.rateFormGroup = this.formBuilder.group({
      id: new FormControl(""),
      name: new FormControl(""),
      lower_weight_limit: new FormControl(""),
      upper_weight_limit: new FormControl(""),
      rate: new FormControl(""),
    });
  }

  getRates() {
    this.rateService.get().subscribe(
      (res) => {
        if (res) {
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
        console.log("err", err);
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

    this.searchInput.ln = "";
    this.searchInput.rateid = "";
    this.searchInput.lowerweightlimit = "";
    this.searchInput.upperweightlimit = "";
    this.searchInput.raterm = "";
    this.searchInput.minimumcharges = "";
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

  create(content) {
    this.rateFormGroup.reset();
    this.open(content, "modal-mini", "sm", "Add New Rate");
  }

  edit(row, content) {
    this.rateFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit Rate");
  }

  delete() {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
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

  submit() {
    if (this.processTitle == "Add New Rate") {
      this.rateService.post(this.rateFormGroup.value).subscribe(
        (res) => {
          if (res) {
            swal
              .fire({
                title: "Success",
                text: "The submission has successfully created",
                type: "success",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
              })
              .then((result) => {
                if (result.value) {
                  this.modalService.dismissAll();
                  this.getRates();
                }
              });
          }
        },
        (err) => {
          console.error("err", err);
        }
      );
    } else if (this.processTitle == "Edit Rate") {
      this.rateService
        .update(this.rateFormGroup.value.id, this.rateFormGroup.value)
        .subscribe(
          (res) => {
            if (res) {
              swal
                .fire({
                  title: "Success",
                  text: "The submission has successfully updated",
                  type: "success",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                })
                .then((result) => {
                  if (result.value) {
                    this.modalService.dismissAll();
                    this.getRates();
                  }
                });
            }
          },
          (err) => {
            console.error("err", err);
          }
        );
    }
  }

  ngOnInit() {}
}
