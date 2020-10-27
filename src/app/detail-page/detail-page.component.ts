import { StockInfoService } from './../stock-info.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  descriptionData;
  newsData;
  ticker: string;

  constructor(private stockInfoService: StockInfoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ticker = this.route.snapshot.params.ticker;
    this.stockInfoService.setTickerValue(this.ticker);
    // this.stockInfoService.getData();
    this.updateData();
  }

  updateData() {
    this.stockInfoService.getDescriptionData().subscribe((data) => {
      this.descriptionData = data;
      console.log(this.descriptionData);
    });
    // this.data = this.stockInfoService.data;
    // console.log('in showData()' + this.data);

    this.stockInfoService.getNewsData().subscribe((data) => {
      this.newsData = data;
      console.log(this.newsData);
    });
  }


}
