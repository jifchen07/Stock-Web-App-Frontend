import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  getDescriptionData() {
    // this.http.get(`http://localhost:3000/search/description/${this.ticker}`)
    //   .subscribe((res) => {
    //     this.data = res;
    //     console.log(this.data);
    //     console.log(this.data.description);
    //   });
    return this.http.get(`${this.serverHost}/search/description/${this.ticker}`);
  }

  getAutoCompleteData(formInput: string): string[] {
    let names = [];
    this.http.get(`${this.serverHost}/search/autocomplete/${formInput}`)
      .subscribe((res: Array<any>) => {
        console.log(res);
        for (let i = 0; i < Math.min(10, res.length); i++) {
          names.push(res[i]["name"]);
        }
      });
    return names;
  }

  getNewsData() {
    return this.http.get(`${this.serverHost}/search/news/${this.ticker}`);
  }
}
