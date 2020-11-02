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
      this.options = this.stockInfoService.getAutoCompleteData(this.ticker);
    } else {
      this.options = [];
    }
  }
}
