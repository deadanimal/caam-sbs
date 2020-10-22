import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
import * as FromAirports from "src/app/variables/from-airports";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { FpldatasService } from "src/app/shared/services/fpldatas/fpldatas.service";
import { UploadsService } from "src/app/shared/services/uploads/uploads.service";

export enum SelectionType {
  single = "single",
  multi = "multi",
  multiClick = "multiClick",
  cell = "cell",
  checkbox = "checkbox",
}

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnInit {
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
  fileuploadFormGroup: FormGroup;
  vfrtflFormGroup: FormGroup;

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
    private authService: AuthService,
    private fpldataService: FpldatasService,
    private fileuploadService: UploadsService
  ) {
    this.user_obj = this.authService.decodedToken();
    if (this.user_obj) this.getVfrTflData(this.user_obj);

    this.fileuploadFormGroup = this.formBuilder.group({
      id: [""],
      data_file_link: [""],
      data_type: [""],
      name: [""],
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

  getVfrTflData(user_obj) {
    this.fpldataService
      .filter("uploaded_by=" + user_obj.user_id + "&submitted_at=")
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

        this.calculateErrorData(this.rows);
      });
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

  editUpload(row, content) {
    this.vfrtflFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit VFR/TFL Data");
  }

  ngOnInit() {}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileuploadFormGroup.get("data_file_link").setValue(file);
      this.fileuploadFormGroup.get("name").setValue(file.name);
    }
  }

  upload() {
    const formData = new FormData();
    formData.append(
      "data_file_link",
      this.fileuploadFormGroup.get("data_file_link").value
    );
    formData.append(
      "data_type",
      this.fileuploadFormGroup.get("data_type").value
    );
    formData.append("name", this.fileuploadFormGroup.get("name").value);
    formData.append("uploaded_by", this.user_obj.user_id);
    this.spinner.show();

    this.fileuploadService.post(formData).subscribe(
      (res) => {
        console.log("res", res);
        formData.append("id", res.id);

        this.fileuploadService.upload(formData).subscribe(
          (res) => {
            if (res) {
              // console.log("res", res);
              this.spinner.hide();
              if (res === 400) {
                swal.fire({
                  title: "Warning",
                  text:
                    "There are errors in uploading your file. Please try again.",
                  type: "warning",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-warning",
                });
              } else {
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
                      this.getVfrTflData(this.user_obj);
                    }
                  });
              }
            }
          },
          (err) => {
            console.error("err", err);
            this.spinner.hide();
          }
        );
      },
      (err) => {
        this.spinner.hide();
        console.error("err", err);
      }
    );
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
                this.getVfrTflData(this.user_obj);
              }
            });
        },
        (err) => {
          console.error("err", err);
        }
      );
  }

  submit() {
    swal
      .fire({
        title: "Submit",
        text: "Are you want submit this VFR/TFL data into database?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, submit it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.fpldataService
            .submit({ uploaded_by: this.user_obj.user_id })
            .subscribe(
              (res) => {
                console.log("res", res);
                this.spinner.hide();
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
                      this.getVfrTflData(this.user_obj);
                    }
                  });
              },
              (err) => {
                console.error("err", err);
                this.spinner.hide();
              }
            );
        }
      });
  }

  draft() {
    swal
      .fire({
        title: "Draft",
        text: "Are you want to draft this VFR/TFL data?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, draft it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.router.navigate(['/airport/tflvfr']);
        }
      });
  }

  // getRowClass = (row) => {
  //   return {
  //     "row-color": row.error_remark != ""
  //   };
  // };

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
}
