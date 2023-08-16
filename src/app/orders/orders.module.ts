import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './lists/order-list/order-list.component';
import { OrderDetailsComponent } from './manage/order-details/order-details.component';
import { SharedModule } from '../shared/shared.module';
import { UserOrderListComponent } from './lists/user-order-list/user-order-list.component';


const routes: Routes = [
  {
    path: '',
    component: OrderListComponent,
  pathMatch:'full'

  },
  {
    path: 'UserOrders',
    component: UserOrderListComponent
  },
  {
    path: 'OrderDetails',
    component: OrderDetailsComponent
  }
];


@NgModule({
  declarations: [
    OrderListComponent,
    OrderDetailsComponent,
    UserOrderListComponent
  ],
  imports: [
    CommonModule
    , RouterModule.forChild(routes),
    SharedModule


  ],
  exports: [RouterModule]
})
export class OrdersModule { }
