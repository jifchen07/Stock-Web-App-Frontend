import { Component, Input, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts/highstock';
import IndicatorsCore from 'highcharts/indicators/indicators';
import vbp from 'highcharts/indicators/volume-by-price';
import more from 'highcharts/highcharts-more';

IndicatorsCore(Highcharts);
vbp(Highcharts);
more(Highcharts);

@Component({
  selector: 'app-charts-tab',
  templateUrl: './charts-tab.component.html',
  styleUrls: ['./charts-tab.component.css']
})
export class ChartsTabComponent implements OnInit {
  @Input() historicalPriceData;
  @Input() ticker;

  groupingUnits = [[
    'week',                         // unit name
    [1]                             // allowed multiples
    ], [
    'month',
    [1, 2, 3, 4, 6]
  ]];

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'stockChart'; // optional string, defaults to 'chart'
  // chartOptions: Highcharts.Options = { ... }; // required
  chartOptions = {
    // chart: {
    //    type: "spline"
    // },
    // time: {
    //   // timezone: 'America/New_York'
    //   timezoneOffset: 13 * 60
    // },
    title: {
       text: ''
    },
    subtitle: {
      text: 'With SMA and Volume by Price technical indicators'
    },
    xAxis: {
       type: 'datetime'

    },
    yAxis: [{
      startOnTick: false,
      endOnTick: false,
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'OHLC'
      },
      height: '60%',
      lineWidth: 2,
      resize: {
        enabled: true
      }
    }, {
      labels: {
        align: 'right',
        x: -3
      },
      title: {
        text: 'Volume'
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 2
    }],
    tooltip: {
      valueDecimals: 2,
      split: true
    },
    plotOptions: {
      series: {
        dataGrouping: {
            // units: this.groupingUnits
        }
      }
    },
    rangeSelector: {
      selected: 2
    },
    series: [{
      type: 'candlestick',
      name: '',
      id: 'upper',
      zIndex: 2,
      data: []
    }, {
      type: 'column',
      name: 'Volume',
      id: 'volume',
      data: [],
      yAxis: 1
    }, {
      type: 'vbp',
      linkedTo: 'upper',
      params: {
        volumeSeriesID: 'volume'
      },
      dataLabels: {
        enabled: false
      },
      zoneLines: {
        enabled: false
      }
    }, {
      type: 'sma',
      linkedTo: 'upper',
      zIndex: 1,
      marker: {
        enabled: false
      }
    }]
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
    this.chartOptions.title.text = this.ticker.toUpperCase() + ' Historical';
    this.chartOptions.series[0].name = this.ticker.toUpperCase();

    let ohlc = [];
    let volume = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.historicalPriceData.length; i++) {
      let date = new Date(this.historicalPriceData[i].date.substring(0, 10));
      let timestamp = Date.parse(date.toString());
      ohlc.push([
        timestamp,
        this.historicalPriceData[i].open,
        this.historicalPriceData[i].high,
        this.historicalPriceData[i].low,
        this.historicalPriceData[i].close
      ]);

      volume.push([
        timestamp,
        this.historicalPriceData[i].volume
      ]);
    }
    this.chartOptions.series[0].data = ohlc;
    this.chartOptions.series[1].data = volume;
  }

}
