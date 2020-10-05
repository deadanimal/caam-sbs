import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import * as FromAirports from "src/app/variables/from-airports";
import swal from "sweetalert2";

import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html",
  styleUrls: ["./database.component.scss"],
})
export class DatabaseComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; // FromAirports.FromAirports;
  SelectionType = SelectionType;
  datas = [];
  dataErrors = [];
  toggleDataError: boolean = false;

  // FormGroup
  vfrtflFormGroup: FormGroup;

  // Totals
  vfrTotal: number = 0;
  tflTotal: number = 0;

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
    private fpldataService: FpldatasService
  ) {
    this.getVfrTflData();

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
      uploaded_by: new FormControl("2141400f-1734-4a3e-add5-53ca260714e3"),
      error_remark: new FormControl(""),
    });
  }

  getVfrTflData() {
    this.fpldataService
      .filter("uploaded_by=&submitted_at=")
      .subscribe((res) => {
        // console.log("res", res);
        this.rows = res;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.getTotalTfl();
        this.getTotalVfr();
      });
  }

  getTotalTfl() {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].fpl_type == "TFL") this.tflTotal++;
    }
  }

  getTotalVfr() {
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].fpl_type == "VFR") this.vfrTotal++;
    }
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

  editDatabase(row, content) {
    this.vfrtflFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "View VFR/TFL Data");
  }

  deleteDatabase() {
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

  ngOnInit() {}
}
