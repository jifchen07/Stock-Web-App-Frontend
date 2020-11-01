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

}
