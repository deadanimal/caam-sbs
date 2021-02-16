import { Component, OnInit } from "@angular/core";
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';
import swal from "sweetalert2";
import * as L from "leaflet";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);
//import * as AirportRoutes from "../../../variables/airport-routes";

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

  // card data
  total_invoice: any;
  total_paid: any;
  total_deposit: any;
  total_unpaid: any;

  chart1_data: any[];
  chart2_data: any[];

  constructor(
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dashboardService.get().subscribe(
      (res) => {
        console.log(res);
        this.total_invoice = res.total_invoice;
        this.total_paid= res.total_paid_invoice;
        this.total_deposit= res.total_deposits ;
        this.total_unpaid= res.total_unpaid_invoice;
        this.chart1_data = res.bar_data;
        this.chart2_data = res.donut_data;

        this.initChart();
        this.initChart2();


      },
      (err) => {
        console.log(err);
      }
    );
  }
 
  initChart() {
    let chart = am4core.create("chart", am4charts.XYChart);
	

    // legend
	chart.legend = new am4charts.Legend();
	chart.legend.useDefaultMarker = true;
	let marker = chart.legend.markers.template.children.getIndex(0);
	marker.strokeWidth = 2;
	marker.strokeOpacity = 1;
	marker.stroke = am4core.color("#ccc");
//	chart.data = [
//	  {
//	    category: "Jan",
//	    total_invoice: 1200,
//	    paid: 590,
//	  },
//	  {
//	    category: "Feb",
//	    total_invoice: 2500,
//	    paid: 1500,
//	  },
//	  {
//	    category: "March",
//	    total_invoice: 3300,
//	    paid: 1400,
//	  },
//	  {
//	    category: "April",
//	    total_invoice: 2500,
//	    paid: 1500,
//	  },
//	  {
//	    category: "May",
//	    total_invoice: 5400,
//	    paid: 4500,
//	  },
//	  {
//	    category: "June",
//	    total_invoice: 4300,
//	    paid: 3800,
//	  },
//	  {
//	    category: "July",
//	    total_invoice: 1509,
//	    paid: 800,
//	  },
//	  {
//	    category: "Aug",
//	    total_invoice: 4300,
//	    paid: 3800,
//	  },
//	  {
//	    category: "Sept",
//	    total_invoice: 5400,
//	    paid: 3800,
//	  },
//	  {
//	    category: "Oct",
//	    total_invoice: 4300,
//	    paid: 3800,
//	  },
//	];
//	
  chart.data = this.chart1_data;
	chart.colors.step = 2;
	
	var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
	categoryAxis.renderer.grid.template.disabled = true;

	categoryAxis.dataFields.category = "category";
	categoryAxis.renderer.grid.template.location = 0;
	categoryAxis.renderer.line.strokeOpacity = 1;
	categoryAxis.renderer.minGridDistance = 30;
	
	categoryAxis.renderer.cellStartLocation = 0.2;
	categoryAxis.renderer.cellEndLocation = 0.8;
	
	var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());  
	//valueAxis.title.text = "Amount (MYR)";
	
	var series1 = chart.series.push(new am4charts.ColumnSeries());
	series1.columns.template.width = am4core.percent(100);
	series1.columns.template.tooltipText = "{name}: {valueY.value}";
	series1.columns.template.strokeWidth = 0;
	series1.name = "Total Invoice";
	series1.dataFields.categoryX = "category";
	series1.dataFields.valueY = "total_invoice";
	
	var series2 = chart.series.push(new am4charts.ColumnSeries());
	series2.columns.template.width = am4core.percent(100);
	series2.columns.template.tooltipText = "{name}: {valueY.value}";
	series2.columns.template.strokeWidth = 0;
	series2.name = "Paid Invoice";
	series2.dataFields.categoryX = "category";
	series2.dataFields.valueY = "paid";
	}

  initChart2() {
	let chart = am4core.create("chart2", am4charts.PieChart);

	
	// Let's cut a hole in our Pie chart the size of 40% the radius
	chart.innerRadius = am4core.percent(25);
	chart.radius = am4core.percent(40);	
	
	// Add and configure Series
	let pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = "value";
	pieSeries.dataFields.category = "category";
	pieSeries.slices.template.stroke = am4core.color("#fff");
	pieSeries.innerRadius = 5;
	pieSeries.slices.template.fillOpacity = 0.5;
	
	pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
	pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
	pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";
	
	
	// Add data
	pieSeries.data = [{
	  "category": "",
	  "value": 60
	}, {
	  "category": "",
	  "value": 30,
	  "labelDisabled":true
	}];
	
	// Disable sliding out of slices
	pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
	pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
	
	pieSeries.labels.template.text = "{category}";
	pieSeries.labels.template.fontSize = 5;

	// Add second series
	let pieSeries2 = chart.series.push(new am4charts.PieSeries());
	pieSeries2.dataFields.value = "value";
	pieSeries2.dataFields.category = "category";
	pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
	pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
	pieSeries2.slices.template.propertyFields.fill = "fill";
	pieSeries2.labels.template.fontSize = 10;
	
	// Add data
	//pieSeries2.data = [{
	//  "category": "Paid",
	//  "value": 35
	//}, {
	//  "category": "Partial",
	//  "value": 40
	//}, {
	//  "category": "Unpaid",
	//  "value": 25,
	//  "fill":"#dedede"
	//}];
  pieSeries2.data = this.chart2_data;

	pieSeries.adapter.add("innerRadius", function(innerRadius, target){
	  return am4core.percent(40);
	})
	
	pieSeries2.adapter.add("innerRadius", function(innerRadius, target){
	  return am4core.percent(60);
	})
	
	pieSeries.adapter.add("radius", function(innerRadius, target){
	  return am4core.percent(100);
	})
	
	pieSeries2.adapter.add("radius", function(innerRadius, target){
	  return am4core.percent(80);
	})
  }
	
  initChart3() {
	// show different type of flight
	let chart = am4core.create("flight", am4charts.XYChart);
	chart.legend = new am4charts.Legend();
	chart.legend.useDefaultMarker = true;
	let marker = chart.legend.markers.template.children.getIndex(0);
	marker.strokeWidth = 2;
	marker.strokeOpacity = 1;
	marker.stroke = am4core.color("#ccc");

	// Add data
	chart.data = [
	  {date:new Date(2019,5,12), value1:50, value2:48, value3:32, value4:46, value5:23, previousDate:new Date(2019, 5, 5)},
	  {date:new Date(2019,5,13), value1:53, value2:51, value3:53, value4:26, value5:26, previousDate:new Date(2019, 5, 6)},
	  {date:new Date(2019,5,14), value1:56, value2:58, value3:23, value4:36, value5:33, previousDate:new Date(2019, 5, 7)},
	  {date:new Date(2019,5,15), value1:52, value2:53, value3:42, value4:36, value5:43, previousDate:new Date(2019, 5, 8)},
	  {date:new Date(2019,5,16), value1:48, value2:44, value3:35, value4:26, value5:23, previousDate:new Date(2019, 5, 9)},
	  {date:new Date(2019,5,17), value1:47, value2:42, value3:39, value4:36, value5:13, previousDate:new Date(2019, 5, 10)},
	  {date:new Date(2019,5,18), value1:59, value2:55, value3:34, value4:56, value5:23, previousDate:new Date(2019, 5, 11)},
	  {date:new Date(2019,5,19), value1:50, value2:48, value3:32, value4:46, value5:23, previousDate:new Date(2019, 5, 12)},
	  {date:new Date(2019,5,20), value1:53, value2:51, value3:53, value4:26, value5:26, previousDate:new Date(2019, 5, 13)},
	  {date:new Date(2019,5,21), value1:56, value2:58, value3:23, value4:36, value5:33, previousDate:new Date(2019, 5, 14)},
	  {date:new Date(2019,5,22), value1:52, value2:53, value3:42, value4:36, value5:43, previousDate:new Date(2019, 5, 15)},
	  {date:new Date(2019,5,23), value1:48, value2:44, value3:35, value4:26, value5:23, previousDate:new Date(2019, 5, 16)},
	  {date:new Date(2019,5,24), value1:47, value2:42, value3:39, value4:36, value5:13, previousDate:new Date(2019, 5, 17)},
	  {date:new Date(2019,5,25), value1:59, value2:55, value3:34, value4:56, value5:23, previousDate:new Date(2019, 5, 18)}

	]
	
	// Create axes
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.disabled = true;
	
	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	
	// Create series
	let series = chart.series.push(new am4charts.LineSeries());
	series.dataFields.valueY = "value1";
	series.dataFields.dateX = "date";
	series.strokeWidth = 0.5;
	series.minBulletDistance = 10;
	series.tensionX = 0.77;
	series.name = "Inbound";
	series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
	series.tooltip.pointerOrientation = "vertical";
	
	// Create series
	let series2 = chart.series.push(new am4charts.LineSeries());
	series2.dataFields.valueY = "value2";
	series2.dataFields.dateX = "date";
	series2.strokeWidth = 0.5;
	series2.tensionX = 0.77;
	series2.name = "Outbound";

	series2.stroke = am4core.color("#f2bf05");

	// Create series
	let series3 = chart.series.push(new am4charts.LineSeries());
	series3.dataFields.valueY = "value3";
	series3.dataFields.dateX = "date";
	series3.strokeWidth = 0.5;
	series3.stroke = series.stroke;
	series3.tensionX = 0.77;
	series3.stroke = am4core.color("#cc07eb");
	series3.name = "Domestic";
	// Create series

	let series4 = chart.series.push(new am4charts.LineSeries());
	series4.dataFields.valueY = "value4";
	series4.dataFields.dateX = "date";
	series4.strokeWidth = 0.5;
	series4.tensionX = 0.77;
	series4.stroke = series.stroke;
	series4.stroke = am4core.color("#0b68e0");
	series4.name = "Overflight";
	
	// Create series
	let series5 = chart.series.push(new am4charts.LineSeries());
	series5.dataFields.valueY = "value5";
	series5.dataFields.dateX = "date";
	series5.strokeWidth = 0.5;
	series5.tensionX = 0.77;
	series5.stroke = series.stroke;
	series5.stroke = am4core.color("#23de33");
	series5.name = "Other";
	
	// Add cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.xAxis = dateAxis;
  }
}
