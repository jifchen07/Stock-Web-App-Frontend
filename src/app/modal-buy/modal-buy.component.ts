import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { LocalStorageService } from './../local-storage.service';

@Component({
  selector: 'app-modal-buy',
  templateUrl: './modal-buy.component.html',
  styleUrls: ['./modal-buy.component.css']
})
export class ModalBuyComponent implements OnInit {
  @Input() public ticker;
  @Input() public tickerPrice;
  @Input() public name;
  numOfStocks: number = 0;
  totalCost: number = 0.00;

  constructor(public activeModal: NgbActiveModal, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    console.log(this.ticker);
  }

  calculateCost(): void {
    console.log('changed');
    this.totalCost = this.numOfStocks * this.tickerPrice;
  }

  // update the total price every time ticker price changes
  ngOnChanges(): void {
    this.calculateCost();
  }

  buyStocks(): void {
    let data = this.localStorageService.getPortfolio();
    if (this.ticker in data) {
      const numOfSharesNew = data[this.ticker].numOfShares + this.numOfStocks;
      const totalCostNew = data[this.ticker].totalCost + this.totalCost;
      const avgCpSNew = totalCostNew / numOfSharesNew;
      data[this.ticker].numOfShares = numOfSharesNew;
      data[this.ticker].totalCost = totalCostNew;
      data[this.ticker].avgCpS = avgCpSNew;
    } else {
      data[this.ticker] = {name: this.name,
      numOfShares: this.numOfStocks,
      totalCost: this.totalCost,
      avgCpS: this.totalCost / this.numOfStocks};
    }
    this.localStorageService.updatePortfolio(data);
  }

}
