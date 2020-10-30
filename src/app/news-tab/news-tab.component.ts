import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-news-tab',
  templateUrl: './news-tab.component.html',
  styleUrls: ['./news-tab.component.css']
})
export class NewsTabComponent implements OnInit {
  @Input() newsData;
  articles = [];
  rows = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.articles = this.newsData.articles;
    const numberOfRows = this.articles.length / 2 + this.articles.length % 2;
    this.rows = Array.from(Array(numberOfRows).keys());
  }

}
