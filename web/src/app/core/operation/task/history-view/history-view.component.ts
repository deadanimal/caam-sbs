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

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

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
  selector: "app-history-view",
  templateUrl: "./history-view.component.html",
  styleUrls: ["./history-view.component.scss"],
})
export class HistoryViewComponent implements OnInit {
  private chart: am4charts.XYChart;

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
  vfrtflFormGroup: FormGroup;

  // Modal
  closeResult: string;
  processTitle: string;

  // URL Parameters
  fileupload: any;

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

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fileupload = this.router.getCurrentNavigation().extras.state.fileupload;
        if (this.fileupload.id) this.getVfrTflData(this.fileupload.id);
      }
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

  getVfrTflData(fileupload_id) {
    this.fpldataService
      .filter("uploaded_by=&submitted_at=&fileupload_id=" + fileupload_id)
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
    this.router.navigate(["operation/task/tflvfr"]);
  }

  edit(row, content) {
    this.vfrtflFormGroup.patchValue({
      ...row,
    });
    this.open(content, "modal-mini", "sm", "Edit VFR/TFL Data");
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
                this.getVfrTflData(this.fileupload.id);
              }
            });
        },
        (err) => {
          console.error("err", err);
        }
      );
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
            .submit({
              uploaded_by: this.user_obj.user_id,
              fileupload_id: this.fileupload.id,
            })
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
                      this.back();
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

  check() {
    let check_obj = {
      checked_by: this.user_obj.user_id,
      fileupload_id: this.fileupload.id,
    };
    this.spinner.show();
    this.fpldataService.check(check_obj).subscribe(
      (res) => {
        console.log("res", res);
        this.spinner.hide();
        if (res == 200) {
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
                this.back();
              }
            });
        }
      },
      (err) => {
        console.error("err", err);
        this.spinner.hide();
      }
    );
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Export
    chart.exporting.menu = new am4core.ExportMenu();

    // Data for both series
    let data = [
      {
        year: "2009",
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: "2010",
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: "2011",
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: "2012",
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: "2013",
        income: 30.6,
        expenses: 28.2,
        lineDash: "5,5",
      },
      {
        year: "2014",
        income: 34.1,
        expenses: 32.9,
        strokeWidth: 1,
        columnDash: "5,5",
        fillOpacity: 0.2,
        additional: "(projection)",
      },
    ];

    /* Create axes */
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 30;

    /* Create value axis */
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    /* Create series */
    let columnSeries = chart.series.push(new am4charts.ColumnSeries());
    columnSeries.name = "Income";
    columnSeries.dataFields.valueY = "income";
    columnSeries.dataFields.categoryX = "year";

    columnSeries.columns.template.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    columnSeries.columns.template.propertyFields.fillOpacity = "fillOpacity";
    columnSeries.columns.template.propertyFields.stroke = "stroke";
    columnSeries.columns.template.propertyFields.strokeWidth = "strokeWidth";
    columnSeries.columns.template.propertyFields.strokeDasharray = "columnDash";
    columnSeries.tooltip.label.textAlign = "middle";

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = "Expenses";
    lineSeries.dataFields.valueY = "expenses";
    lineSeries.dataFields.categoryX = "year";

    lineSeries.stroke = am4core.color("#fdd400");
    lineSeries.strokeWidth = 3;
    lineSeries.propertyFields.strokeDasharray = "lineDash";
    lineSeries.tooltip.label.textAlign = "middle";

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color("#fdd400"); // tooltips grab fill from parent by default
    bullet.tooltipText =
      "[#fff font-size: 15px]{name} in {categoryX}:\n[/][#fff font-size: 20px]{valueY}[/] [#fff]{additional}[/]";
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color("#fff");
    circle.strokeWidth = 3;

    chart.data = data;
  }

  ngOnInit() {
    this.initChart();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      console.log("trigger runoutsideangular ngondestroy");
      if (this.chart) this.chart.dispose();
    });
  }
}
