import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  constructor(private orderService: OrderService
  ) { }
  orderList: Order[];
  ngOnInit() {

    this.orderService.getOrders().subscribe(res => { this.orderList = res })
  }
}
