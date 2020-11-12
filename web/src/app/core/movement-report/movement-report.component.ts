
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

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows = dummylist.movementreportlist;

  // Search Filter
  fromDate: Date;
  toDate: Date;
  filterby: String;
  searchText: String;

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
    this.filterby = "all";
    this.searchText = "";
  }

  ngOnInit() {
    this.FilterTable(this.filterby);
  }

  download(url: string): void {
    console.log(url);
    window.open(url, '_blank');
  }

  FilterTable(field) {
    let search = field.toLocaleLowerCase();
    let tempAll = [];


    if (this.filterby == 'all') {
      for (let i = 0; i < 15; i++) {
        if (this.rows[i] != null) { tempAll[i] = this.rows[i]; }
      }

      return this.temp = tempAll;

    }
    else if (this.filterby == 'departure') {
      this.temp = this.rows.filter(function (d) {
        return d.departure.toLocaleLowerCase().includes(search);
      })
    }
    else if (this.filterby == 'destination') {
      this.temp = this.rows.filter(function (d) {
        return d.destination.toLocaleLowerCase().includes(search);
      })
    }
  }

  FilterDate() {
    let fromdate = this.fromDate
    let todate = this.toDate

    if (fromdate && todate) {
      this.temp = this.rows.filter(function (d) {
        return new Date(d.datetime) >= fromdate && new Date(d.datetime) <= todate;
      })
    }
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



  onActivate(event) {
    this.activeRow = event.row;
  }

  openModal(modalRef: TemplateRef<any>) {
    this.modal = this.modalService.show(modalRef, this.modalConfig);

  }

  closeModal() {
    this.modal.hide()
  }


}

