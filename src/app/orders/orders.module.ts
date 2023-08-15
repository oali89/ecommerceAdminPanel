import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    component: OrderListComponent
  },
  {
    path: 'OrderDetails',
    component: OrderDetailsComponent
  }
];


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule
    , RouterModule.forChild(routes),
    SharedModule


  ],
  exports: [RouterModule]
})
export class OrdersModule { }
