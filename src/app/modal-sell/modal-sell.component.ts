import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { LocalStorageService } from './../local-storage.service';

@Component({
  selector: 'app-modal-sell',
  templateUrl: './modal-sell.component.html',
  styleUrls: ['./modal-sell.component.css']
})
export class ModalSellComponent implements OnInit {
  @Input() public ticker;
  @Input() public tickerPrice;
  @Input() public totalNum;
  numOfStocks: number = 0;
  totalCost: number = 0.00;

  constructor(public activeModal: NgbActiveModal, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  calculateCost(): void {
    this.totalCost = this.numOfStocks * this.tickerPrice;
  }

  ngOnChanges(): void {
    this.calculateCost();
  }

  sellStocks(): void {
    let data = this.localStorageService.getPortfolio();
    if (this.numOfStocks === data[this.ticker].numOfShares) {
      // sell all the shares of that stock
      delete data[this.ticker];
    } else {
      data[this.ticker].numOfShares -= this.numOfStocks;
      data[this.ticker].totalCost -= this.numOfStocks * data[this.ticker].avgCpS;
      data[this.ticker].avgCpS =  data[this.ticker].totalCost / data[this.ticker].numOfShares;
    }
    this.localStorageService.updatePortfolio(data);
  }

}
