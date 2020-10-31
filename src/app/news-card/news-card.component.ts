import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h1 class="modal-title"><b>{{article.source.name}}</b><br>
        <small>{{publishedDate}}</small></h1>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <h3>{{article.title}}</h3>
      <p>{{article.description}}!</p>
      <p>For more details click <a href='{{article.url}}' target='_blank'>here</a></p>
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
