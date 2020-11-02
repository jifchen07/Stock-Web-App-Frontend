import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timestampToYYYYMMDD } from './utility-funcs';
// import { ConsoleReporter } from 'jasmine';


@Injectable({
  providedIn: 'root'
})
export class StockInfoService {
  ticker: string;
  serverHost = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public setTickerValue(ticker: string): void {
    this.ticker = ticker;
    console.log('ticker in service' + this.ticker);
  }

  getDescriptionData(ticker: string): Observable<object> {
    // this.http.get(`http://localhost:3000/search/description/${this.ticker}`)
    //   .subscribe((res) => {
    //     this.data = res;
    //     console.log(this.data);
    //     console.log(this.data.description);
    //   });
    return this.http.get(`${this.serverHost}/search/description/${ticker}`);
  }

  getLastPriceData(ticker: string): Observable<object> {
    return this.http.get(`${this.serverHost}/search/lastdayprices/${ticker}`);
  }

  getAutoCompleteData(formInput: string): string[] {
    let names = [];
    this.http.get(`${this.serverHost}/search/autocomplete/${formInput}`)
      .subscribe((res: Array<any>) => {
        console.log(res);
        for (let i = 0; i < Math.min(10, res.length); i++) {
          names.push({name: res[i].name, ticker: res[i].ticker});
        }
      });
    return names;
  }

  getNewsData(ticker: string): Observable<object> {
    return this.http.get(`${this.serverHost}/search/news/${ticker}`);
  }

  getDailyPriceData(ticker: string, lastDate: string): Observable<object> {
    return this.http.get(`${this.serverHost}/search/prices/${ticker}?startDate=${lastDate}&resampleFreq=4min`);
  }

  get2yearsPriceData(ticker: string): Observable<object> {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    const fromDate = timestampToYYYYMMDD(date);
    return this.http.get(`${this.serverHost}/search/prices/${ticker}?startDate=${fromDate}&resampleFreq=12hour`);
  }
}
