
import { LocalStorageService } from './../local-storage.service';
import { PriceData } from './../PriceData';

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalBuyComponent } from './../modal-buy/modal-buy.component';

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

  // for sending signal to parent if favorate/unfavorate event happens
  @Output() toggleFavorite: EventEmitter<any> = new EventEmitter<any>();
  @Output() buyAlert: EventEmitter<any> = new EventEmitter<any>();

  favorited: boolean = false;

  constructor(
    private localStorageService: LocalStorageService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.checkFavoriteStatus();
  }

  // ngDoCheck(): void {
  //   const changes: IterableChanges<any> = this.diff.diff(this.lastPriceData);
  // }

  ngOnChanges(): void {
    this.checkFavoriteStatus();
    // console.log('price changed');
    // console.log(this.modalRef);
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
    this.toggleFavorite.emit('favorated');
  }
  unfavorite(): void {
    this.localStorageService.removeTickerByName(this.descriptionData.ticker);
    this.favorited = false;
    this.toggleFavorite.emit('unfavorated');
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
    this.modalRef.result.then((res) => {
      if (res === 'Bought') {
        this.buyAlert.emit('bought');
      }
    });

    // const modalRef = this.modalService.open(ModalBuyComponent);
    // modalRef.componentInstance.ticker = this.descriptionData.ticker;
    // modalRef.componentInstance.tickerPrice = this.lastPriceData.lastPrice;

  }
}
