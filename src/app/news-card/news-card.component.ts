import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h1 class="modal-title mb-0"><b>{{article.source.name}}</b><br>
        <small style='font-size: 15px'>{{publishedDate}}</small></h1>
      <button style='outline:0' type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}!</p>
      <p>For more details click <a href='{{article.url}}' target='_blank'>here</a></p>
    </div>
    <div class='card m-1'>
      <div class='card-body'>
        <p>Share</p><br>
        <a class="twitter-share-button mr-2" target="_blank"
        href='https://twitter.com/intent/tweet?text={{article.title}}%20{{article.url}}'><i style="font-size: 30px" class="fab fa-twitter"></i></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u={{article.url}}" target="_blank"><i style="font-size: 30px" class="fab fa-facebook-square"></i></a>
      </div>
    </div>
    <!-- <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div> -->
  `
})


export class NgbdModalContent {
  @Input() article; // passed in from the openNewsModal function
  @Input() publishedDate;

  constructor(public activeModal: NgbActiveModal) {}
}


@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() articles;  // passed in from the news-tab component
  @Input() rowNum;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openNewsModal(index: number): void {
    const modalRef = this.modalService.open(NgbdModalContent);
    const article = this.articles[index];
    modalRef.componentInstance.article = article;
    let utc = new Date(article.publishedAt.substring(0, 10));
    const publishedDate = moment(utc).format('MMMM D Y');
    modalRef.componentInstance.publishedDate = publishedDate;
  }
}
