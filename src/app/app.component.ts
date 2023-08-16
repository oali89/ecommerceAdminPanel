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
    , private http: HttpClient) { }

  ngOnInit() {

    this.primengConfig.ripple = true;

    const user = {
      name: 'John Doe',
      age: 30,
    };

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:4200/assets/data/data.json', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

  }


}
