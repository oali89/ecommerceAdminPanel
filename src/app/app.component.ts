import { Component } from '@angular/core';
import { OrderService } from './orders/services/order.service';
import { ProductService } from './products/services/product.service';
import { PrimeNGConfig } from 'primeng/api';
import { NetworkService } from './shared/services/network.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerceAdminPanel';
  constructor(
    private primengConfig: PrimeNGConfig,

    public networkService: NetworkService
  ) { }

  ngOnInit() {

    this.primengConfig.ripple = true;

  }


}
