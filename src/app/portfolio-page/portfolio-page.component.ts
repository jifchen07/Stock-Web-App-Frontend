import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { StockInfoService } from '../stock-info.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  holdings = {};
  lastPriceInfo = {};

  constructor(
    private router: Router, private localStorageService: LocalStorageService, private stockInfoService: StockInfoService) { }

  ngOnInit(): void {
    this.holdings = this.localStorageService.getPortfolio();
    this.updateData();
  }

  updateData(): void {
    const tickers = Object.keys(this.holdings);
    if (tickers.length > 0) {
      this.stockInfoService.getLastPriceData(tickers.toString()).subscribe((data: Array<any>) => {
        console.log(data);
        this.lastPriceInfo = {};
        data.forEach(item => {
          const key = item.ticker;
          const last = item.last;
          const diff = (last - this.holdings[key].avgCpS).toFixed(2);
          this.lastPriceInfo[key] = {lastPrice: last, change: diff};
        });
      });
    } else {
      this.lastPriceInfo = {};
    }
  }

  navigateTo(ticker: string): void {
    this.router.navigateByUrl(`/details/${ticker}`);
  }
}
