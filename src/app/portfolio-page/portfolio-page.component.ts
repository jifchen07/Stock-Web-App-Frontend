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
  holdings: Array<any> = [];

  constructor(
    private router: Router, private localStorageService: LocalStorageService, private stockInfoService: StockInfoService) { }

  ngOnInit(): void {
    this.holdings = this.localStorageService.getPortfolio();
  }

}
