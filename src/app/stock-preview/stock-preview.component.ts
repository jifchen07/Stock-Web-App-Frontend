
import { LocalStorageService } from './../local-storage.service';
import { PriceData } from './../PriceData';

import { Component, OnInit, Input } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalBuyComponent } from './../modal-buy/modal-buy.component';
import { IterableDiffer, IterableDiffers, DoCheck, IterableChanges } from '@angular/core';


// @Component({
//   selector: 'ngbd-modal-content',
//   template: `
//     <div class="modal-header">
//       <h1 class="modal-title">{{ticker.toUpperCase()}} </h1>
//       <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
//         <span aria-hidden="true">&times;</span>
//       </button>
//     </div>

//     <div class="modal-body">
//       <p>Current Price: {{tickerPrice}} </p><br>
//       <!-- <form> -->
//         <label>Quantity </label>
//         <input type="number" id="quantity" name="quantity" min='0' [(ngModel)]="numOfStocks" (ngModelChange)='calculateCost()'>
//       <!-- </form> -->
//     </div>
//     <div class="modal-footer">
//       <p>Total: {{totalCost}}</p>
//       <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Buy</button>
//     </div>
//   `
// })
// export class NgbdModalContent {
//   myControl = new FormControl();
//   @Input() ticker;
//   @Input() tickerPrice;
//   numOfStocks: number = 0;
//   totalCost: number = 0.00;
//   constructor(public activeModal: NgbActiveModal) {}

//   calculateCost(): void {
//     console.log('changed');
//     this.totalCost = this.numOfStocks * this.tickerPrice;
//   }
// }

@Component({
  selector: 'app-stock-preview',
  templateUrl: './stock-preview.component.html',
  styleUrls: ['./stock-preview.component.css']
})
export class StockPreviewComponent implements OnInit {
  @Input() descriptionData;
  @Input() lastPriceData: PriceData;
  @Input() lastPrice: number;
  modalRef = null;

  private diff: IterableDiffer<any>;

  favorited: boolean = false;

  constructor(
    private iterableDiffers: IterableDiffers,
    private localStorageService: LocalStorageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.checkFavoriteStatus();
    this.diff = this.iterableDiffers.find(this.lastPriceData).create();
  }

  // ngDoCheck(): void {
  //   const changes: IterableChanges<any> = this.diff.diff(this.lastPriceData);
  // }

  ngOnChanges(): void {
    this.checkFavoriteStatus();
    console.log('price changed');
    console.log(this.modalRef);
    if (this.modalRef) {
      this.modalRef.componentInstance.ticker = this.descriptionData.ticker;
      this.modalRef.componentInstance.tickerPrice = this.lastPriceData.lastPrice;
      this.modalRef.componentInstance.name = this.descriptionData.name;
      this.modalRef.componentInstance.calculateCost();
    }
  }

  favorite(): void {
    this.localStorageService.addTickerByName(this.descriptionData.ticker);
    this.favorited = true;
  }
  unfavorite(): void {
    this.localStorageService.removeTickerByName(this.descriptionData.ticker);
    this.favorited = false;
  }
  checkFavoriteStatus(): void {
    if (this.localStorageService.getWatchlist().includes(this.descriptionData.ticker)) {
      this.favorited = true;
    }
  }

  openBuyModal(): void {
    this.modalRef = this.modalService.open(ModalBuyComponent);
    this.modalRef.componentInstance.ticker = this.descriptionData.ticker;
    this.modalRef.componentInstance.tickerPrice = this.lastPriceData.lastPrice;
    this.modalRef.componentInstance.name = this.descriptionData.name;

    // const modalRef = this.modalService.open(ModalBuyComponent);
    // modalRef.componentInstance.ticker = this.descriptionData.ticker;
    // modalRef.componentInstance.tickerPrice = this.lastPriceData.lastPrice;

  }
}
