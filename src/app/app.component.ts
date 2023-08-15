import { Component } from '@angular/core';
import { OrderService } from './orders/services/order.service';
import { ProductService } from './products/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerceAdminPanel';
  constructor(private orderService: OrderService,
    private ProductService: ProductService) { }

  ngOnInit() {

    this.orderService.getOrders().subscribe(res => console.log(res))
    this.ProductService.getProducts().subscribe(res => console.log(res))
  }
}
