import { DetailPageComponent } from './../detail-page/detail-page.component';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-stock-preview',
  templateUrl: './stock-preview.component.html',
  styleUrls: ['./stock-preview.component.css']
})
export class StockPreviewComponent implements OnInit {
  @Input() descriptionData;
  constructor() { }

  ngOnInit(): void {
  }

}
