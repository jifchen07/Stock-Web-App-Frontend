import { PriceData } from './../PriceData';
import { StockInfoService } from './../stock-info.service';
import { LocalStorageService } from './../local-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// declare var $: any;

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css']
})
export class WatchlistPageComponent implements OnInit {
  watchlist: Array<string> = [];
  priceData: Array<PriceData> = [];
  descriptionData: Array<any> = [];
  loadingNum = 0;

  constructor(private router: Router, private localStorageService: LocalStorageService, private stockInfoService: StockInfoService) { }

  ngOnInit(): void {
    // $('button').click(function(){
    //   alert('Wass up!');
    // });
    // $('.close-icon').on('click', function() {
    //   $(this).closest('.card').fadeOut();
    // });

    this.watchlist = this.localStorageService.getWatchlist();
    this.updateData();  // update the current price data
  }

  updateData(): void {
    if (this.watchlist.length > 0) {
      const tickers = this.watchlist.toString();
      // this.priceData = Array(this.watchlist.length);
      this.loadingNum += 1;
      this.stockInfoService.getLastPriceData(tickers).subscribe((data: Array<any>) => {
        this.loadingNum -= 1;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.watchlist.length; i++) {
          this.priceData[i] = {
            lastPrice: null,
            change: null,
            changePercentage: null,
            timestamp: null,
            changeDir: 'up',
            marketStatus: null
          };
          this.priceData[i].lastPrice = data[i].last;
          const change = (data[i].last - data[i].prevClose);
          const changePercentage = change * 100 / data[i].prevClose;
          this.priceData[i].change = change.toFixed(2);
          if (change < 0) {
            this.priceData[i].changeDir = 'down';  // for color styling based on change dir
          }
          this.priceData[i].changePercentage = '(' + changePercentage.toFixed(2) + '%' + ')';
        }
      });

      // tslint:disable-next-line: prefer-for-of
      this.descriptionData = Array(this.watchlist.length);
      for (let i = 0; i < this.watchlist.length; i++) {
        this.loadingNum += 1;
        this.stockInfoService.getDescriptionData(this.watchlist[i]).subscribe((data) => {
          this.loadingNum -= 1;
          this.descriptionData[i] = data;
        });
      }
    }
  }

  removeTicker(index: number): void {
    console.log('clicked');
    this.watchlist.splice(index, 1);
    this.priceData.splice(index, 1);
    this.descriptionData.splice(index, 1);
    this.localStorageService.removeTicker(index);
  }

  navigateTo(ticker: string): void {
    this.router.navigateByUrl(`/details/${ticker}`);
  }
}
