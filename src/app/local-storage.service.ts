import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.initializeWatchlist();
    this.initializePortfolio();
  }

  initializeWatchlist(): void {
    const initTickers = ['GOOG', 'WMG'];
    this.localStorage.setItem('watchlist', JSON.stringify(initTickers));
  }

  initializePortfolio(): void {
    const initPortfolio = {GOOG: {name: 'Alphabet Inc Class C', numOfShares: 20, totalCost: 28565.8, avgCpS: 1428.29},
    NVDA: {name: 'NVDIA Corp', numOfShares: 55, totalCost: 30780.1, avgCpS: 559.64}};
    this.localStorage.setItem('portfolio', JSON.stringify(initPortfolio));
  }

  getWatchlist(): Array<any> {
    return JSON.parse(this.localStorage.getItem('watchlist'));
  }

  getPortfolio(): Array<any> {
    return JSON.parse(this.localStorage.getItem('portfolio'));
  }

  updatePortfolio(data: any): void {
    this.localStorage.setItem('portfolio', JSON.stringify(data));
  }

  removeTicker(index: number): void {
    let tickers = this.getWatchlist();
    tickers.splice(index, 1);
    this.localStorage.setItem('watchlist', JSON.stringify(tickers));
    // console.log(this.getWatchlist());
  }

  addTickerByName(ticker: string): void {
    let tickers = this.getWatchlist();
    tickers.push(ticker);
    this.localStorage.setItem('watchlist', JSON.stringify(tickers));
  }

  removeTickerByName(ticker: string): void {
    let tickers = this.getWatchlist();
    const index = tickers.indexOf(ticker);
    tickers.splice(index, 1);
    this.localStorage.setItem('watchlist', JSON.stringify(tickers));
  }

}
