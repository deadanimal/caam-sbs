import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import * as L from "leaflet";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
//import * as AirportRoutes from "../../../variables/airport-routes";

const dataMarkers = [
  {
    lat: 12.854649,
    long: 96.240234,
    acmodel: "A109",
    callsign: "MARITIME700",
    dep: "WSSL",
    dest: "OMDW",
    fplno: "A6CBO",
  },
  {
    lat: 12.854649,
    long: 96.240234,
    acmodel: "A319",
    callsign: "GADING TAJAM",
    dep: "LBSF",
    dest: "WIHH",
    fplno: "ABP932",
  },
  {
    lat: 5.922045,
    long: 106.875,
    acmodel: "A320",
    callsign: "ADV01",
    dep: "VTSM",
    dest: "OMDW",
    fplno: "ABP941",
  },
  {
    lat: 4.303311,
    long: 93.47168,
    acmodel: "A321",
    callsign: "9MIMW",
    dep: "WSSS",
    dest: "VIDP",
    fplno: "AOJ84K",
  },
  {
    lat: 10.185187,
    long: 88.725586,
    acmodel: "A330",
    callsign: "T7LKT",
    dep: "VTSP",
    dest: "VCBI",
    fplno: "AXY0408",
  },
  {
    lat: 5.178482,
    long: 101.293945,
    acmodel: "AT402",
    callsign: "N9688R",
    dep: "WMKK",
    dest: "VANP",
    fplno: "AZS4901",
  },
  {
    lat: -2.372369,
    long: 102.788086,
    acmodel: "AW139",
    callsign: "9MHCB",
    dep: "WMKK",
    dest: "M765",
    fplno: "AZS6602",
  },
  {
    lat: 3.250209,
    long: 101.655182,
    acmodel: "B722",
    callsign: "9MAUB",
    dep: "ZGGG",
    dest: "WSSS",
    fplno: "B3277",
  },
  {
    lat: 9.102097,
    long: 103.183594,
    acmodel: "B732",
    callsign: "FALCON110",
    dep: "VHHH",
    dest: "WMSA",
    fplno: "B602U",
  },
  {
    lat: 8.276727,
    long: 94.394531,
    acmodel: "B742",
    callsign: "9MLEO",
    dep: "ZSHC",
    dest: "WMKL",
    fplno: "B7766",
  },
  {
    lat: 0.527336,
    long: 100.458984,
    acmodel: "B772",
    callsign: "T7LKT",
    dep: "WSSL",
    dest: "VTSM",
    fplno: "B7795",
  },
  {
    lat: -5.353521,
    long: 103.623047,
    acmodel: "BE19",
    callsign: "BAB08",
    dep: "RCSS",
    dest: "WMKL",
    fplno: "B9998",
  },
  {
    lat: 11.953349,
    long: 114.169922,
    acmodel: "BH206",
    callsign: "MAR700",
    dep: "WSSL",
    dest: "ZUCK",
    fplno: "BWJ083",
  },
  {
    lat: -11.436955,
    long: 112.148438,
    acmodel: "BH407",
    callsign: "9MAUB",
    dep: "WSSL",
    dest: "VRMM",
    fplno: "BWJ988",
  },
  {
    lat: -16.045813,
    long: 99.140625,
    acmodel: "C12",
    callsign: "N110TP",
    dep: "AYPY",
    dest: "WMSA",
    fplno: "CGGPM",
  },
];

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  leafletOptions = {
    layers: [
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          subdomains: "abcd",
          maxZoom: 19,
        }
      ),
    ],
    zoom: 6,
    center: L.latLng(3.945136, 108.252619),
    // 3.945136, 108.252619
    // 4.2105, 101.9758
  };

  markerLayer: L.Layer[] = [];

  airportList = []//AirportRoutes.AirportRoutes;

  constructor() {}

  ngOnInit() {
    // this.loadMarkers();
    this.initChart();
    this.initChart1();
  }

  loadMarkers() {
    dataMarkers.forEach((marker) => {
      this.markerLayer.push(
        L.marker([marker.lat, marker.long], {
          icon: L.icon({
            iconSize: [35, 35],
            iconUrl: "assets/img/marker/plane.svg",
            className: "plane-rotation",
          }),
        }).on("click", function () {
          swal.fire({
            html:
              "Model of Aircraft: " +
              marker.acmodel +
              "<br/>Callsign: " +
              marker.callsign +
              "<br/>DEP: " +
              marker.dep +
              "<br/>DEST: " +
              marker.dest +
              "<br/>FPL NO: " +
              marker.fplno,
            title: "Flight Detail",
            text: "",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-dark",
          });
        })
      );
    });
  }

  onMapReady(map) {
    for (let i = 0; i < this.airportList.length; i++) {
      var pointA = new L.LatLng(this.airportList[i].pointAlat, this.airportList[i].pointAlong);
      var pointB = new L.LatLng(this.airportList[i].pointBlat, this.airportList[i].pointBlong);
      var pointList = [pointA, pointB];

      var polyline = new L.Polyline(pointList, {
        color: "red",
        weight: 2,
        opacity: 0.5,
        smoothFactor: 1,
        
      });
      polyline.bindTooltip(this.airportList[i].desc);
      polyline.addTo(map);
    }
  }

  initChart() {
    let chart = am4core.create("chartdiv", am4charts.XYChart3D);

    // Add data
    chart.data = [
      {
        month: "Jan",
        year2018: 351,
        year2019: 421,
      },
      {
        country: "Feb",
        year2018: 171,
        year2019: 311,
      },
      {
        country: "Mar",
        year2018: 281,
        year2019: 291,
      },
      {
        country: "Apr",
        year2018: 216,
        year2019: 231,
      },
      {
        country: "May",
        year2018: 141,
        year2019: 211,
      },
      {
        country: "Jun",
        year2018: 261,
        year2019: 491,
      },
      {
        country: "Jul",
        year2018: 641,
        year2019: 721,
      },
      {
        month: "Aug",
        year2018: 821,
        year2019: 711,
      },
      {
        month: "Sep",
        year2018: 991,
        year2019: 1011,
      },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Total";
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    });

    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "year2018";
    series.dataFields.categoryX = "month";
    series.name = "Year 2018";
    series.clustered = false;
    series.columns.template.tooltipText =
      "Total flight in {category} (2018): [bold]{valueY}[/]";
    series.columns.template.fillOpacity = 0.9;

    let series2 = chart.series.push(new am4charts.ColumnSeries3D());
    series2.dataFields.valueY = "year2019";
    series2.dataFields.categoryX = "month";
    series2.name = "Year 2019";
    series2.clustered = false;
    series2.columns.template.tooltipText =
      "Total flight in {category} (2019): [bold]{valueY}[/]";
  }

  initChart1() {
    let chart = am4core.create("chartdiv1", am4charts.XYChart);

    chart.data = [
      {
        month: "Jan",
        active: 23.5,
        delayed: 18.1,
      },
      {
        month: "Feb",
        active: 26.2,
        delayed: 22.8,
      },
      {
        month: "Mar",
        active: 30.1,
        delayed: 23.9,
      },
      {
        month: "Apr",
        active: 29.5,
        delayed: 25.1,
      },
      {
        month: "May",
        active: 24.6,
        delayed: 25,
      },
    ];

    //create category axis for months
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;

    //create value axis for active and delayed
    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    //create columns
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "month";
    series.dataFields.valueX = "active";
    series.name = "Active flight";
    series.columns.template.fillOpacity = 0.5;
    series.columns.template.strokeOpacity = 0;
    series.tooltipText = "Active flights in {categoryY}: {valueX.value}";

    //create line
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryY = "year";
    lineSeries.dataFields.valueX = "delayed";
    lineSeries.name = "Delayed flight";
    lineSeries.strokeWidth = 3;
    lineSeries.tooltipText = "Delayed flights in {categoryY}: {valueX.value}";

    //add bullets
    let circleBullet = lineSeries.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.fill = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;

    //add chart cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomY";

    //add legend
    chart.legend = new am4charts.Legend();
  }
}
