import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';
import { StockInfoService } from '../stock-info.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalBuyComponent } from './../modal-buy/modal-buy.component';
import { ModalSellComponent } from '../modal-sell/modal-sell.component';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  holdings = {};
  lastPriceInfo = {};
  modalRef = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private stockInfoService: StockInfoService,
    private modalService: NgbModal) { }

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

  openBuyModal(ticker: string, price: number, name: string): void {
    this.modalRef = this.modalService.open(ModalBuyComponent);
    this.modalRef.componentInstance.ticker = ticker;
    this.modalRef.componentInstance.tickerPrice = price;
    this.modalRef.componentInstance.name = name;
    this.modalRef.result.finally(() => {
      this.holdings = this.localStorageService.getPortfolio();
    });

    // const modalRef = this.modalService.open(ModalBuyComponent);
    // modalRef.componentInstance.ticker = this.descriptionData.ticker;
    // modalRef.componentInstance.tickerPrice = this.lastPriceData.lastPrice;

  }

  openSellModal(ticker: string, price: number, numOfShares: number): void {
    this.modalRef = this.modalService.open(ModalSellComponent);
    this.modalRef.componentInstance.ticker = ticker;
    this.modalRef.componentInstance.tickerPrice = price;
    this.modalRef.componentInstance.totalNum = numOfShares;
    this.modalRef.result.finally(() => {
      this.holdings = this.localStorageService.getPortfolio();
    });
  }
}
