import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];


@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    CommonModule
    , RouterModule.forChild(routes),
    SharedModule


  ],
  exports: [RouterModule]
})
export class ProductsModule { }
