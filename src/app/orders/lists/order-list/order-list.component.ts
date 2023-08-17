import { Columntype } from 'src/app/shared/models/Column';
import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { MessageService, SelectItem } from 'primeng/api';
import { zip } from 'rxjs';
import { ProductService } from 'src/app/products/services/product.service';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';
import { Product } from 'src/app/products/models/product';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddOrderComponent } from '../../manage/add-order/add-order.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DialogService, MessageService]
})
export class OrderListComponent {
  orderList: Order[];
  sortOrder!: number;

  sortField!: string;
  Columntypelst = Columntype
  sortOptions!: SelectItem[];
  layout: string = 'list';

  ref: DynamicDialogRef | undefined;

  constructor(private orderService: OrderService, public FormHelperService: FormHelperService,
    private ProductService: ProductService,
    public dialogService: DialogService) { }

  ngOnInit() {
    this.LoadList()
    this.sortOptions = [
      { label: 'Price High to Low', value: '!TotalPrice' },
      { label: 'Price Low to High', value: 'TotalPrice' }
    ];

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


  AddOrder() {
    this.ref = this.dialogService.open(AddOrderComponent, {
      width: '50vw',
      data: {

        id: '51gF3'

      },
      header: 'New Order'
    });
  }
}
