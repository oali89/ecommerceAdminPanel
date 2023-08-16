import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { ProductService } from 'src/app/products/services/product.service';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';
import { Product } from 'src/app/products/models/product';
import { Columntype } from 'src/app/shared/models/Column';
import { SelectItem } from 'primeng/api';
import { zip } from 'rxjs';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orderList: Order[];
  sortOrder!: number;

  sortField!: string;
  Columntypelst = Columntype
  sortOptions!: SelectItem[];
  layout: string = 'list';

  constructor(private orderService: OrderService, public FormHelperService: FormHelperService,
    private ProductService: ProductService) { }

  ngOnInit() {
    this.LoadList()
    this.sortOptions = [
      { label: 'Price High to Low', value: '!TotalPrice' },
      { label: 'Price Low to High', value: 'TotalPrice' }
    ];
    this.orderService.AddNewOrder().subscribe(res => {
      console.log(res)
    })
    // this.orderService.getusers().subscribe(users => {
    //   console.log(users)
    // })
    // this.orderService.getOrders().subscribe(res => { this.orderList = res })

    // this.orderService.getusers().subscribe(users => {
    //   console.log(users)

    //   this.orderService.getOrders().subscribe(res => {
    //     res.forEach(order => {

    //       order.User = users.find(x => x.Id == order.UserId)
    //     })
    //     this.orderList = res
    //     console.log(this.orderList)
    //   })
    // });
  }
  LoadList() {
    let userdata;
    zip(this.orderService.getusers(),
      this.orderService.getOrders()
    )
      .subscribe(response => {
        userdata = response[0];
        this.orderList = response[1]
        this.orderList.forEach(order => {
          order.User = userdata.find(x => x.Id == order.UserId)
          order.TotalPrice = this.getTotalPrice(order)
        });

      })



  }
  getTotalPrice(order) {
    return order.Products.reduce(
      (acc: number, product: Product) => {
        let orignalProduct: Product;
        this.ProductService.getProduct(product.ProductId).subscribe(Response => {
          orignalProduct = Response;
        })

        return acc + orignalProduct.ProductPrice * product.Quantity
      },
      0)
  }
  getSeverity(order: Order) {
    if (order.PaymentType.toLowerCase() == 'online') {

      return 'success';
    } else {

      return 'warning';

    }
    return null
  };
  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
