import { Component, OnInit, NgZone } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router, NavigationExtras } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerService } from "ngx-spinner";
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
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = [];
  SelectionType = SelectionType;
  user_obj: any;

  // FormGroup
  fileuploadFormGroup: FormGroup;

  // Dropdown
  statuses = [];
  // [
  //   { value: "FIL0", name: "Draf" },
  //   { value: "FIL1", name: "Processing" },
  //   { value: "FIL2", name: "Checked" },
  //   { value: "FIL3", name: "Approved" },
  // ];

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
    private fileuploadService: UploadsService,
  ) {
    this.user_obj = this.authService.decodedToken();
    if (this.user_obj) this.getFileUpload(this.user_obj);

    this.fileuploadFormGroup = this.formBuilder.group({
      id: [""],
      data_file_link: [""],
      data_type: [""],
      name: [""],
    });

    this.statuses = this.fileuploadService.statuses();
  }

  getFileUpload(user_obj) {
    this.fileuploadService
      .extended("uploaded_by=" + user_obj.user_id)
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
        fileupload_id: row.id,
        fileupload_status: row.status
      },
    };
    this.router.navigate(["/app/task/data-history"], navigationExtras);
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
        // console.log("res", res);
        formData.append("id", res.id);

        this.fileuploadService.upload(formData).subscribe(
          (res) => {
            if (res) {
              // console.log("res", res);
              this.spinner.hide();
              if (res === 400) {
                this.modalService.dismissAll();
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
                      this.modalService.dismissAll();
                      this.getFileUpload(this.user_obj);
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

  getStatus(value: string) {
    let result = this.statuses.find((obj) => {
      return obj.value == value;
    });
    return result.name;
  }

  getStatusBadge(value: string) {
    if (value == "FIL0") return "badge badge-default";
    if (value == "FIL1") return "badge badge-primary";
    if (value == "FIL2") return "badge badge-success";
  }

  ngOnInit() {}
}
