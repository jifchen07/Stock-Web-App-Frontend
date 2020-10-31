import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.initializeWatchlist();
  }

  initializeWatchlist(): void {
    const initTickers = ['GOOG', 'WMG'];
    this.localStorage.setItem('watchlist', JSON.stringify(initTickers));
  }

  getWatchlist(): Array<any> {
    return JSON.parse(this.localStorage.getItem('watchlist'));
  }

  removeTicker(index: number): void {
    let tickers = this.getWatchlist();
    tickers.splice(index, 1);
    this.localStorage.setItem('watchlist', JSON.stringify(tickers));
    console.log(this.getWatchlist());
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
