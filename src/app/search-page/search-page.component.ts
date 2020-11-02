import { StockInfoService } from './../stock-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  myControl = new FormControl();
  options: Array<any> = [];
  loading: boolean = false;
  sub;

  ticker: string;

  constructor(private router: Router, private stockInfoService: StockInfoService) { }

  ngOnInit(): void {
  }

  startSearch(): void {
    console.log(this.ticker);
    this.router.navigateByUrl(`/details/${this.ticker}`);
    this.stockInfoService.setTickerValue(this.ticker);
    //this.stockInfoService.getData();
  }

  updateAutoComplete(): void {
    if (this.ticker) {
      this.loading = true;
      if (this.sub) {
        this.sub.unsubscribe();
      }
      this.sub = this.stockInfoService.getAutoCompleteData(this.ticker).subscribe((res: Array<any>) => {
        console.log(res);
        this.options = [];
        for (let i = 0; i < Math.min(10, res.length); i++) {
          this.options.push({name: res[i].name, ticker: res[i].ticker});
        }
        this.loading = false;
        console.log(this.options);
      });
    } else {
      this.options = [];
    }
  }
}

// let names = [];
//     this.http.get(`${this.serverHost}/search/autocomplete/${formInput}`)
//       .subscribe((res: Array<any>) => {
//         console.log(res);
//         for (let i = 0; i < Math.min(10, res.length); i++) {
//           names.push({name: res[i].name, ticker: res[i].ticker});
//         }
//       });
//     return names;
