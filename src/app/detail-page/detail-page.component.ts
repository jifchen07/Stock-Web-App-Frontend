import { PriceData } from './../PriceData';
import { StockInfoService } from './../stock-info.service';
import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { formatCurrentTime, pad2 } from '../utility-funcs';
import { ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  descriptionData;  // pass into summary-tab and stock-preview
  newsData;
  priceData; // pass into summary-tab
  priceSeriesData; // pass into summary-tab for highchart
  lastPriceData: PriceData = {  // sent as input to stock-preview component
    lastPrice: null,
    change: null,
    changePercentage: null,
    timestamp: null,
    changeDir: 'up',
    marketStatus: null
  };
  historicalPriceData;  // pass into charts-tab
  ticker: string;
  loadingNum = 0;

  alertNum = 0;
  alertType = null;
  alertMessage = '';
  forceClose = true;

  buyAlert = false;

  resultNotFount = false;

  interval;

  constructor(private elementRef: ElementRef, private stockInfoService: StockInfoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticker = this.route.snapshot.params.ticker;
    this.stockInfoService.setTickerValue(this.ticker);
    // this.stockInfoService.getData();
    this.updateData();
    this.refreshPriceData();
    this.interval = setInterval(() => { this.refreshPriceData()}, 15000 );
  }

  ngOnDestroy(): void {
    // console.log('ng destroy');
    this.elementRef.nativeElement.remove();
    clearInterval(this.interval);
  }

  popAlert(valueEmitted: string): void {
    if (valueEmitted === 'favorated') {
      this.alertType = 'success';
      this.alertMessage = `${this.ticker} added to Watchlist`;
      this.alertNum += 1;
      this.forceClose = false;
      setTimeout(() => this.alertNum -= 1, 5000);
    } else if (valueEmitted === 'unfavorated') {
      this.alertType = 'danger';
      this.alertMessage = `${this.ticker} removed from Watchlist`;
      this.alertNum += 1;
      this.forceClose = false;
      setTimeout(() => this.alertNum -= 1, 5000);
    } else {
      this.buyAlert = true;
      setTimeout(() => this.buyAlert = false, 5000);
    }
  }

  clearAlert(): void {
    this.forceClose = true;
  }

  updateData(): void {
    this.loadingNum += 1;
    this.stockInfoService.getDescriptionData(this.ticker).subscribe((data) => {
      this.loadingNum -= 1;
      if (Object.keys(data).length === 1) {
        this.resultNotFount = true;
      } else {
        this.resultNotFount = false;
      }
      this.descriptionData = data;
      // console.log(this.descriptionData);
    });
    // this.data = this.stockInfoService.data;
    // console.log('in showData()' + this.data);

    this.loadingNum += 1;
    this.stockInfoService.getNewsData(this.ticker).subscribe((data) => {
      this.loadingNum -= 1;
      this.newsData = data;
      // console.log(this.newsData);
    });

    this.loadingNum += 1;
    this.stockInfoService.get2yearsPriceData(this.ticker).subscribe((data) => {
      this.loadingNum -= 1;
      this.historicalPriceData = data;
      // console.log(this.historicalPriceData);
    });
  }

  // this function is called every 15 seconds to refresh the price data
  refreshPriceData(): void {
    this.stockInfoService.getLastPriceData(this.ticker).subscribe((data) => {
      this.priceData = data[0];
      console.log(data);
      this.lastPriceData.lastPrice = data[0].last;
      const change = (data[0].last - data[0].prevClose);
      const changePercentage = change * 100 / data[0].prevClose;
      this.lastPriceData.change = change.toFixed(2);
      if (change < 0) {
        this.lastPriceData.changeDir = 'down';  // for color styling based on change dir
      }
      this.lastPriceData.changePercentage = '(' + changePercentage.toFixed(2) + '%' + ')';

      const timestamp = new Date(data[0].timestamp);
      const timestampCurrent = new Date();
      const timeDiff = Math.abs(timestamp.getTime() - timestampCurrent.getTime());
      const diffSeconds = Math.floor(timeDiff / 1000);
      console.log(diffSeconds);

      // if (data[0].askPrice == null || data[0].askPrice === 0) {
      if (diffSeconds > 60 && (data[0].askPrice == null || data[0].askPrice === 0)) {
        // if market is closed
        // console.log('market closed');
        this.lastPriceData.timestamp = formatCurrentTime();
        const lastTime = data[0].timestamp.substring(0, 10)
          + ' ' + '13:00:00';
        this.lastPriceData.marketStatus = 'Market Closed on ' + lastTime;

        const fromDate = data[0].timestamp.substring(0, 10);
        this.updateDailyPriceData(fromDate);
      } else {
        // if market is open
        this.lastPriceData.timestamp = formatCurrentTime();
        this.lastPriceData.marketStatus = 'Market is Open';

        const fromDate = formatCurrentTime().substring(0, 10);
        this.updateDailyPriceData(fromDate);
      }
    });
  }

  // get the price data for one day (either current day if market open or last day of market closed)
  updateDailyPriceData(fromDate: string): void {
    // this.loadingNum += 1;
    this.stockInfoService.getDailyPriceData(this.ticker, fromDate).subscribe((data: Array<any>) => {
      // this.loadingNum -= 1;
      // tslint:disable-next-line: prefer-for-of
      // console.log(data);
      let priceSeries = [];
      for (let i = 0; i < data.length; i++) {
        let timeString = new Date(data[i].date.substring(0, 19)).toString();
        let timestamp = Date.parse(timeString);
        priceSeries[i] = [timestamp, data[i].close];
      }
      this.priceSeriesData = priceSeries;
      // console.log('dailypriceupdate: ');
      // console.log(this.priceSeriesData);

    });
  }

}
