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
  selector: "app-master-data",
  templateUrl: "./master-data.component.html",
  styleUrls: ["./master-data.component.scss"],
})
export class MasterDataComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = []; // FromAirports.FromAirports;
  SelectionType = SelectionType;
  datas = [];
  dataErrors = [];
  toggleDataError: boolean = false;
  user_obj: any;

  // FormGroup
  searchFormGroup: FormGroup;

  // Modal
  closeResult: string;
  processTitle: string;

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
    this.getVfrTflData();

    this.searchFormGroup = this.formBuilder.group({
      select: new FormControl("", Validators.required),
      keyword: new FormControl("", Validators.required),
    });
  }

  getVfrTflData() {
    var rolesSeeAll = ["HOD", "FIN", "OPS"];
    if (~rolesSeeAll.indexOf(this.authService.decodedToken().user_type)) {
      this.fpldataService.get().subscribe((res) => {
        // console.log("res", res);
        this.datas = res;
        this.rows = res;
        this.temp = this.rows.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.dataErrors.length = 0;
        this.calculateErrorData(this.rows);
      });
    } else {
      this.fpldataService
        .filter("uploaded_by=" + this.user_obj.user_id)
        .subscribe((res) => {
          // console.log("res", res);
          this.datas = res;
          this.rows = res;
          this.temp = this.rows.map((prop, key) => {
            return {
              ...prop,
              // id: key
              no: key,
            };
          });

          this.dataErrors.length = 0;
          this.calculateErrorData(this.rows);
        });
    }
  }

  calculateErrorData(rows) {
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].error_remark != "") this.dataErrors.push(rows[i]);
      }
    } else {
      this.dataErrors.length = 0;
      this.toggleDataError = false;
    }
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        console.log("d[key]", d[key]);
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
    this.temp = this.rows.filter((d) => {
      if (
        d[this.searchFormGroup.value.select]
          .toString()
          .toLowerCase()
          .indexOf(
            this.searchFormGroup.value.keyword.toString().toLowerCase()
          ) !== -1
      )
        return true;

      return false;
    });
  }

  resetTable() {
    this.temp = this.rows;
    this.searchFormGroup.reset();
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
    this.router.navigate(["/app/task/data"]);
  }

  showDataError() {
    if (this.toggleDataError) {
      this.rows = this.dataErrors;
      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          // id: key
          no: key,
        };
      });
    } else {
      this.rows = this.datas;
      this.temp = this.rows.map((prop, key) => {
        return {
          ...prop,
          // id: key
          no: key,
        };
      });
    }
  }

  ngOnInit() {}
}
