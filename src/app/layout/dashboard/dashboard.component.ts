import { Component } from '@angular/core';
import { OrderService } from 'src/app/orders/services/order.service';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/services/product.service';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: Product[];
  responsiveOptions: any[] | undefined;

  constructor(private ProductService: ProductService,
    private OrderService: OrderService,

    private FormHelperService: FormHelperService) {
    this.ProductService.getProducts().subscribe(res => {
      this.products = res;
      this.countersNumbers[0].count = this.products.length
    })
    this.OrderService.getOrders().subscribe(resp => {
      this.countersNumbers[1].count = resp?.length
    })

    this.OrderService.getusers().subscribe(resp => {
      this.countersNumbers[2].count = resp?.length
    })
  }
  countersNumbers = [{ title: 'Product Count', count: 0 }, { title: 'Order Count', count: 500 }, { title: 'User Count', count: 300 }]
  counters = [0, 0, 0]

  ngOnInit(): void {

    this.countersNumbers.forEach((x, i) => {
      this.counters[i] = 0;
      const updateCounter = () => {
        const target = +x.count;
        const count = +this.counters[i];
        const increment = target / 200;
        if (count < target) {
          this.counters[i] = Math.ceil(count + increment);
          setTimeout(updateCounter, 1);
        } else {
          this.counters[i] = target;
        }
      };
      updateCounter();
    })

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }

}
