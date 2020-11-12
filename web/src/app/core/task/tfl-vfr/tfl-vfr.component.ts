
import { TflVfr } from './../../../shared/services/task/tfl-vfr/tfl-vfr.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, TemplateRef } from '@angular/core';
import swal from 'sweetalert2';
import { TflVfrService } from 'src/app/shared/services/task/tfl-vfr/tfl-vfr.service';
import { FlightData } from 'src/app/shared/services/task/flight-data/flight-data.model';
import { FlightDataService } from 'src/app/shared/services/task/flight-data/flight-data.service';
import { NotifyService } from 'src/app/shared/handler/notify/notify.service';

@Component({
  selector: 'app-tfl-vfr',
  templateUrl: './tfl-vfr.component.html',
  styleUrls: ['./tfl-vfr.component.scss']
})
export class TflVfrComponent implements OnInit {

  // Search Filter
  filterby: String;

  // Table
  entries: number = 5;
  activeRow: any;
  selectedRow: FlightData;

  // Checker
  isLoading: boolean = false

  // Data
  attachment: any;
  temp = [
    {
      datetime: "",
      callsign: "calsign 1",
      type: "type",
      departure: "",
      destination: "Jakarta",
      ctg: "",
      distance: 345657,
      route: "route A",
      error: "",
      haserror: true,
      reason: "",
      status: "draft"
    },
    {
      datetime: "",
      callsign: "calsign 2",
      type: "",
      departure: "",
      destination: "",
      ctg: "",
      distance: 3454557,
      route: "",
      error: "",
      haserror: false,
      reason: "",
      status: "deleted"
    },
    {
      datetime: "",
      callsign: "calsign 3",
      type: "",
      departure: "",
      destination: "",
      ctg: "",
      distance: 3668857,
      route: "",
      error: "",
      haserror: false,
      reason: "",
      status: "restored"
    },
  ];
  rows = [];
  flightDataDraft = [];
  flightDataArchieve = [];
  flightDataProcess = [];
  tflvfrrow: TflVfr[] = [];
  flightdatarow: FlightData[] = []
  dummy = [
    {
      uploaddate: "12/01/2020",
      filename: "filename123",
      filedate: "09/08/2020",
      totaldata: 45,
      status: "Draft",
    },
    {
      uploaddate: "04/15/2020",
      filename: "filename123",
      filedate: "09/08/2020",
      totaldata: 67,
      status: "Process",
    },
  ]

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-xl",
  };

  constructor(
    private tflVfrService: TflVfrService,
    private flightDataService: FlightDataService,
    private modalService: BsModalService,
    private toastr: NotifyService,
  ) {
    this.rows = this.dummy;
    this.allocateDataToTable();
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.attachment.get("data_file_link").setValue(file);
      this.attachment.get("name").setValue(file.name);
    }
  }

  allocateDataToTable() {
    let index= 0;
    for (let i = 0; i < this.temp.length; i++) {
      if (this.temp[i].haserror === true) {
        this.flightDataDraft[index] = this.temp[i];
        index = index +1;
      }
    }
    index = 0;
    for (let i = 0; i < this.temp.length; i++) {
      if (this.temp[i].haserror === false) {
        this.flightDataProcess[index] = this.temp[i];
        index = index +1;
      }
    }
    index = 0;
    for (let i = 0; i < this.temp.length; i++) {
      if (this.temp[i].status == 'deleted') {
        this.flightDataArchieve[index] = this.temp[i];
        index = index +1;
      }
    }
  }

  archieve(row){
    row.status=='restored';
    this.allocateDataToTable();
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  upload() {
    console.log(this.attachment)
    this.isLoading = true
    this.tflVfrService.post(this.attachment).subscribe(
      () => {
        // Success
        this.isLoading = false
      },
      () => {
        // Failed
        this.isLoading = false
      },
      () => {
        // After
        this.toastr.openToastr('', 'Successfully Uploaded')
      }
    )
  }

  getAllDataTflVfr = () => {
    this.tflVfrService.get().subscribe(
      data => {
        this.tflvfrrow = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getAllDataFlight = () => {
    this.flightDataService.get().subscribe(
      data => {
        this.flightdatarow = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }


  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>,row) {
    this.selectedRow = row;
    this.modal = this.modalService.show(modalRef, this.modalConfig);
  }

  closeModal() {
    this.modal.hide()
  }

  confirm() {
    swal.fire({
      title: "Confirmation",
      text: "Are you sure want to cancel?",
      type: "info",
      buttonsStyling: false,
      confirmButtonClass: "btn btn-dark",
      confirmButtonText: "Confirm",
      showCancelButton: true,
      cancelButtonClass: "btn btn-danger",
      cancelButtonText: "Back to Page"
    }).then((result) => {
      if (result.value) {
        this.modal.hide()
      }
      else { }
    })
  }

  updateData() {
    console.log(this.selectedRow)
    this.flightDataService.update(this.selectedRow.id,this.selectedRow).subscribe(
      () => {
        this.getAllDataFlight(),
          this.toastr.openToastr('Success', 'Successfully updated'),
          this.showModal = false;
          console.log(this.selectedRow.id)
      },
      error => {
        console.log(error)
        console.log(this.selectedRow)
      }
    )
  }

  statusBadge(status: string) {
    if (status == "Draft") return "badge badge-secondary";
    if (status == "Process") return "badge badge-primary";
    // if (status == "Paid") return "badge badge-success";
    // if (status == "Failed") return "badge badge-danger";
  }
}



