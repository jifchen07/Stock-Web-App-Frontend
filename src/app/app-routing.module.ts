import { DetailPageComponent } from './detail-page/detail-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', component: SearchPageComponent},
  {path: 'details/:ticker', component: DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
