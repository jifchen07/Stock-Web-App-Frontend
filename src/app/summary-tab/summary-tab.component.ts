import { Component, OnInit, Input } from '@angular/core';

import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-summary-tab',
  templateUrl: './summary-tab.component.html',
  styleUrls: ['./summary-tab.component.css']
})
export class SummaryTabComponent implements OnInit {
  @Input() priceData;
  @Input() descriptionData;
  @Input() priceSeriesData;

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = { ... }; // required
  chartOptions = {
    // chart: {
    //    type: "spline"
    // },
    time: {
      // timezone: 'America/New_York'
      timezoneOffset: 13 * 60
    },
    title: {
       text: ''
    },
    subtitle: {
    },
    xAxis: {
       type: 'time'

    },
    yAxis: {
       title: {
       }
    },
    tooltip: {
      valueDecimals: 2
    },
    rangeSelector: {
      enabled: false
    },
    series: [
       {
          name: '',
          data: []
       },
    ]
  };
  // tslint:disable-next-line: no-inferrable-types
  updateFlag: boolean = false; // optional boolean
  // tslint:disable-next-line: no-inferrable-types
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  // tslint:disable-next-line: no-inferrable-types
  runOutsideAngularFlag: boolean = false; // optional boolean, defaults to false
  chartCallback: Highcharts.ChartCallbackFunction = function(chart) {}; // optional function, defaults to null

  constructor() { }

  ngOnInit(): void {
    this.insertData();
  }

  ngOnChanges(): void {
    this.insertData();
    this.updateFlag = true;
  }

  insertData(): void {
    this.chartOptions.title.text = this.descriptionData.ticker;
    this.chartOptions.series[0].data = this.priceSeriesData;
    this.chartOptions.series[0].name = this.descriptionData.ticker;
  }

}
