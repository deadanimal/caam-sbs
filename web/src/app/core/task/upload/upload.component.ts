import { UploadsModel } from 'src/app/shared/services/uploads/uploads.model';
import { FpldatasHistoryModel } from './../../../shared/services/data-history/data-history.model';
import { FpldatasHistoryService } from './../../../shared/services/data-history/data-history.service';
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
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
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FpldatasModel } from 'src/app/shared/services/fpldatas/fpldatas.model';

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
  tempFileUpload = [];
  tempFlightData = [];
  tempFlightDataProcess = [];
  tempFlightDataHistory = [];
  activeRow: any;
  rowsFileUpload = [];
  rowsFlightData = [];
  rowsFlightDataProcess = [];
  rowsFlightDataHistory = [];
  SelectionType = SelectionType;
  datas = [];
  dataErrors = [];
  toggleDataError: boolean = false;
  user_obj: any;
  statuses = [];
  selectedRow: FpldatasModel;
  selectedRowHistory: FpldatasHistoryModel;
  tempFileName = false;
  uploadBy: string;
  fileId: string;
  uploadById = [];
  selectreason = '';
  status = '';

  // FormGroup
  fileuploadFormGroup: FormGroup;
  // vfrtflFormGroup: FormGroup;
  FlightDataHistory: FormGroup;

  // searchInput
  searchInput = {
    callsign: "",
    model: "",
    operator: "",
  };

  // Checker
  isLoading: boolean = false
  hasError = false;

  // Modal
  closeResult: string;
  processTitle: string;

  // Form // to upload file
  createForm: FormGroup
  registerFormMessages = {
    'reason': [
      { type: 'required', message: 'Reason is required.' },
    ],
    'remark': [
      { type: 'required', message: 'Remark is required.' },
    ],
  };

  uploadMessages = {
    // 'data_file_link': [
    //   { type: 'required', message: 'File is required.' },
    // ],
    'data_type': [
      { type: 'required', message: 'Please choose data type before upload' },
    ],
  };

  constructor(
    public formBuilder: FormBuilder,
    public zone: NgZone,
    private modalService: NgbModal,
    private modalDialogService: BsModalService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private authService: AuthService,
    private fpldataService: FpldatasService,
    private fileuploadService: UploadsService,
    private fpldatasHistoryService: FpldatasHistoryService
  ) {

    this.user_obj = this.authService.decodedToken();
    if (this.user_obj) this.getFileUpload(this.user_obj);

    this.fileuploadFormGroup = this.formBuilder.group({
      id: [""],
      data_file_link: [""],
      data_type: new FormControl('', Validators.compose([Validators.required])),
      name: [""],
    });
    this.statuses = this.fileuploadService.statuses();
    this.createForm = this.formBuilder.group({
      user_id: new FormControl(),
      master_data_id: new FormControl(),
      reason: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      remark: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit() {
  }


  // getRowClass = (row) => {
  //   return {
  //     "row-color": row.error_remark != ""
  //   };
  // };


  // To get data on table FlightData
  getFplData() {

    this.fpldataService
      .filter("uploaded_by=" + this.uploadBy + "&fileupload_id=" + this.fileId)
      .subscribe((res) => {
        this.rowsFlightData = [];
        this.rowsFlightDataProcess = [];
        // console.log("res", res);
        this.datas = res;
        let index = 0;

        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status == 'FPL0') {
            this.rowsFlightData[index] = this.datas[i];
            index = index + 1
          }
        }

        // check file upload status = 'processing'
        index = 0;
        if (this.status == 'FIL1') {
          for (let i = 0; i < this.datas.length; i++) {
            if (this.datas[i].status == 'FPL1') {
              this.rowsFlightDataProcess[index] = this.datas[i];
              index = index + 1
            }
          }
        }

        this.tempFlightData = this.rowsFlightData.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.tempFlightDataProcess = this.rowsFlightDataProcess.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });

        this.calculateErrorData(this.tempFlightData);
        console.log("process", this.rowsFlightDataProcess)
      });
  }

  // To get data on table Uploaded TFL File
  getFileUpload(user_obj) {
    this.fileuploadService
      .extended("uploaded_by=" + user_obj.user_id)
      .subscribe((res) => {
        // console.log("res", res);
        let index = 0;

        for (let i = 0; i < res.length; i++) {
          if ((res[i].data_type == 'TFL' || res[i].data_type == 'VFR') && (res[i].status == 'FIL0' || res[i].status == 'FIL1')) {
            this.rowsFileUpload[index] = res[i];
            index = index + 1;
          }
        }

        this.tempFileUpload = this.rowsFileUpload.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });
        return this.tempFileUpload = [...this.tempFileUpload]
      });
  }


  // To get data on Archive table
  getFplDataHistory() {
    this.fpldataService
      .filter("uploaded_by=" + this.uploadBy + "&fileupload_id=" + this.fileId)
      .subscribe((res) => {
        // console.log("res", res);
        this.rowsFlightDataHistory = [];
        this.datas = res;
        let index = 0;

        for (let i = 0; i < this.datas.length; i++) {
          if (this.datas[i].status == 'FPL3') {
            this.rowsFlightDataHistory[index] = this.datas[i];
            index = index + 1
          }
        }
        this.tempFlightDataHistory = this.rowsFlightDataHistory.map((prop, key) => {
          return {
            ...prop,
            // id: key
            no: key,
          };
        });
      });
  }


  calculateErrorData(rows) {
    this.dataErrors = [];
    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].error_remark != "") this.dataErrors.push(rows[i]);
      }
    } else {
      this.dataErrors.length = 0;
      this.toggleDataError = false;
    }
    if( this.dataErrors.length>0){this.hasError = true}
    else {this.hasError = false}
    console.log("data error",this.dataErrors)
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  // Filter table Uploaded TFL File
  filterTableUpload($event) {
    let val = $event.target.value;
    this.tempFileUpload = this.rowsFileUpload.filter(function (d) {
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

  // Filter table flight
  filterTableFlight($event) {
    let val = $event.target.value;
    this.tempFlightData = this.rowsFlightData.filter(function (d) {
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

  // Filter table archive
  filterTableFlightHistory($event) {
    let val = $event.target.value;
    this.tempFlightDataHistory = this.rowsFlightDataHistory.filter(function (d) {
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

  // Trigger on Select Type of reason in modal 'delete'
  triggerSelect() {
    this.selectreason = this.createForm.value.reason
    console.log(this.selectreason)
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  // Modal
  modal: BsModalRef;
  modalmodal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-xl",
  };

  // open modal after click 'upload'
  openModalUpload(modalRef: TemplateRef<any>) {
    this.uploadBy = this.user_obj.user_id;
    this.upload();
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  // open first modal (view)
  openModal(modalRef: TemplateRef<any>, row) {
    this.status = row.status
    this.fileId = row.id;
    this.uploadBy = row.uploaded_by.id;
    this.getFplDataHistory();
    this.getFplData();
    this.modal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  // Open modal after first modal (delete and update)
  openModalModal(modalRef: TemplateRef<any>, row) {
    this.selectedRow = row;
    this.selectedRow.uploaded_by = this.uploadBy;
    this.modalmodal = this.modalDialogService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  closeModalModal() {
    this.modalmodal.hide()
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileuploadFormGroup.get("data_file_link").setValue(file);
      this.fileuploadFormGroup.get("name").setValue(file.name);
      this.tempFileName = true;
    }
  }


  // upload vfl/tfr function
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
                      // this.getFplData(this.user_obj);
                      this.fileuploadService.filterByUpload(this.uploadBy).subscribe((res) => {
                        this.uploadById = res
                        var x = JSON.parse(JSON.stringify(this.uploadById));
                        if (x) {
                          this.fileId = x.id;
                          this.getFplDataHistory();
                          this.getFplData();
                          return this.fileId;
                        }
                      });
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

  updateData() {
    this.fpldataService.update(this.selectedRow.id, this.selectedRow).subscribe(
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
              this.modalmodal.hide();
              this.getFplData();
            }
          });
      },
      error => {
        console.error("err", error);
      }
    )
  }

  // when user click 'cancel' on openmodal
  cancelSubmit() {
    swal
      .fire({
        title: "Cancel",
        text: "Are you want to leave? the record will not be saved",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, Cancel it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.spinner.show();
          this.fileuploadService.delete(this.fileId)
            .subscribe(
              (res) => {
                console.log("res", res);
                this.spinner.hide();
                this.modal.hide();
              },
              (err) => {
                console.error("err", err);
                this.spinner.hide();
              }
            );
        }
      });
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
            .submit({ uploaded_by: this.user_obj.user_id, fileupload_id: this.fileId })
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
                      this.getFplData();
                      this.modal.hide();
                      window.location.reload();
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

  saveDraft() {
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
          this.modal.hide();
          window.location.reload();
        }
      });
  }

  undoArchive(row: any) {
    this.selectedRow = row;
    this.selectedRow.uploaded_by = this.uploadBy;
    this.selectedRow.status = "FPL0"
    this.getFplData();
    this.getFplDataHistory();

    swal
      .fire({
        title: "Undo",
        text: "Are you sure want to undo and remove the data form archive?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, Undo",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {
        if (result.value) {
          this.fpldataService.update(this.selectedRow.id, this.selectedRow).subscribe(
            () => {
              swal
                .fire({
                  title: "Success",
                  text: "The data has been undo successfully",
                  type: "success",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                })
                .then((result) => {
                  if (result.value) {
                    this.getFplData();
                    this.getFplDataHistory();
                  }
                });
            },
            (err) => {
              console.error("err", err);
              this.spinner.hide();
            }
          );
        }
      }
      );
  }

  deleteData() {
    this.createForm.value.user_id = this.user_obj.user_id;
    this.createForm.value.master_data_id = this.selectedRow.id;
    this.isLoading = true
    swal
      .fire({
        title: "Delete",
        text: "Are you want to delete this VFR/TFL data from database?",
        type: "question",
        showCancelButton: true,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-dark",
        confirmButtonText: "Yes, delete it",
        cancelButtonClass: "btn btn-secondary",
        cancelButtonText: "No",
      })
      .then((result) => {

        if (result.value) {
          this.selectedRow.status = "FPL3";
          this.selectedRow.remark = this.createForm.value.remark;
          this.selectedRow.reason = this.createForm.value.reason;
          this.selectedRow.uploaded_by = this.uploadBy;
          this.fpldataService.update(this.selectedRow.id, this.selectedRow).subscribe(
            () => {
              this.fpldatasHistoryService.add_history(this.createForm.value).subscribe(
                (res) => {
                  swal
                    .fire({
                      title: "Success",
                      text: "The data has been removed to archive record",
                      type: "success",
                      buttonsStyling: false,
                      confirmButtonClass: "btn btn-success",
                    })
                    .then((result) => {
                      if (result.value) {

                      }
                    });
                  this.getFplData();
                  this.getFplDataHistory();
                  this.createForm.reset()

                },
                error => {
                  console.error("err", error);
                }
              )
              this.modalmodal.hide();
              this.getFplData();
              this.getFplDataHistory();

              this.isLoading = false;
            }
          )

        }
      });
  }

  showDataError() {
    if (this.toggleDataError) {
      this.rowsFlightData = this.dataErrors;
      this.tempFlightData = this.rowsFlightData.map((prop, key) => {
        return {
          ...prop,
          // id: key
          no: key,
        };
      });
    } else {
      this.rowsFlightData = this.datas;
      this.tempFlightData = this.rowsFlightData.map((prop, key) => {
        return {
          ...prop,
          // id: key
          no: key,
        };
      });
    }
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
    if (value == "FIL2") return "badge badge-warning";
    if (value == "FIL3") return "badge badge-success";
  }
}
