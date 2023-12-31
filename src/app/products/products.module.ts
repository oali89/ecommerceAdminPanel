import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './lists/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './manage/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule
    , RouterModule.forChild(routes),
    SharedModule


  ],
  exports: [RouterModule,
    ProductDetailsComponent]
})
export class ProductsModule { }
