import { Product } from 'src/app/products/models/product';
import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { zip } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  Order: Order;
  orderId
  items: MenuItem[] | undefined = [
    {
      label: 'Confirmed',
      routerLink: 'personal'
    },
    {
      label: 'Shiped',
      routerLink: 'seat'
    },
    {
      label: 'Out for delivery',
      routerLink: 'payment'
    },
    {
      label: 'Arriving',
      routerLink: 'confirmation'
    }
  ];
  constructor(private orderService: OrderService,
    private ProductService: ProductService,
    public FormHelperService: FormHelperService,
    private route: ActivatedRoute) {
    route.params.subscribe(param => {
      this.orderId = param['id'];
    })
  }
  ngOnInit(): void {
    this.orderService.getOrder(this.orderId).subscribe(Response => {
      this.Order = Response;
      this.orderService.getuser(this.Order.UserId).subscribe(res => {
        this.Order.User = res;
        this.GetProductInfo();

      })
      this.Order.TotalPrice = this.getTotalPrice(this.Order);

    })

  }
  GetProductInfo() {
    this.Order.Products.forEach((prod, index) => {
      this.ProductService.getProduct(prod.ProductId).subscribe(productResp => {
        let Quantity = prod.Quantity;
        this.Order.Products[index] = productResp;
        this.Order.Products[index].Quantity = Quantity;

      })
    })
  }
  getTotalPrice(order) {
    return order.Products.reduce(
      (acc: number, product: Product) => {
        return acc + product.ProductPrice * product.Quantity
      },
      0)
  }
}
