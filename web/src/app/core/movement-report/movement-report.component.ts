
import { Component, OnInit, NgZone, TemplateRef } from "@angular/core";
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import * as dummylist from "src/app/variables/movement-report";
import { MovementReportService } from 'src/app/shared/services/movement-report/movement-report.service';
import { MovementReport } from 'src/app/shared/services/movement-report/movement-report.model';

@Component({
  selector: 'app-movement-report',
  templateUrl: './movement-report.component.html',
  styleUrls: ['./movement-report.component.scss']
})


export class MovementReportComponent implements OnInit {

  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.movementreportlist;

  // Data
  movementReports: MovementReport[] = [];
  // public url: string = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  // Modal
  modal: BsModalRef;
  showModal: boolean;
  modalConfig = {
    keyboard: true,
    class: "modal-lg",
  };

  constructor(
    public zone: NgZone,
    private modalService: BsModalService,
    private movementReportService: MovementReportService,
  ) {
    this.temp = this.rows.map((prop, key) => {
      return {
        ...prop,
        id: key,
      };
    });
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  getAllData = () => {
    this.movementReportService.get().subscribe(
      data => {
        this.movementReports = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key].toString().toLowerCase().indexOf(val.toLowerCase()) !== -1) {
          return true;
        }
      }
      return false;
    });
  }


  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }

  ngOnInit() {
  }



}

