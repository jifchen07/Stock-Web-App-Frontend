import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material import
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

// for dynamic binding
import { FormsModule } from '@angular/forms';

// for http request
import { HttpClientModule } from '@angular/common/http';
import { SummaryTabComponent } from './summary-tab/summary-tab.component';
import { StockPreviewComponent } from './stock-preview/stock-preview.component';
import { NewsTabComponent } from './news-tab/news-tab.component';
import { NewsCardComponent } from './news-card/news-card.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { ChartsTabComponent } from './charts-tab/charts-tab.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { ModalBuyComponent } from './modal-buy/modal-buy.component';
import { PortfolioPageComponent } from './portfolio-page/portfolio-page.component';
import { ModalSellComponent } from './modal-sell/modal-sell.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailPageComponent,
    NavBarComponent,
    SearchPageComponent,
    SummaryTabComponent,
    StockPreviewComponent,
    NewsTabComponent,
    NewsCardComponent,
    ChartsTabComponent,
    WatchlistPageComponent,
    ModalBuyComponent,
    PortfolioPageComponent,
    ModalSellComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ ModalBuyComponent ]
})
export class AppModule { }
