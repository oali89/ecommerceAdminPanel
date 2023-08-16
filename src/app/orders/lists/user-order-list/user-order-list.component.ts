import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { Column, Columntype } from 'src/app/shared/models/Column';
import { FormHelperService } from 'src/app/shared/HelperServices/FormHelper';
import { Product } from 'src/app/products/models/product';
import { ProductService } from 'src/app/products/services/product.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrls: ['./user-order-list.component.scss']
})
export class UserOrderListComponent {
  groupedData = [];
  expandedRows: {} = {};
  orderList: Order[];
  Columntypelst = Columntype;
  searchCtrl = new FormControl()
  columns: Column[] = [
    { field: '', header: '', width: '1%', type: Columntype.expanded },

    {
      field: 'OrderDate',
      header: 'Order Date',
      type: Columntype.date,
      width: '20%',
      sortable: true,
    },
    {
      field: 'PaymentType',
      header: 'Payment Type',
      type: Columntype.String,
      width: '20%',
      sortable: true,
    },
    {
      field: 'Products',
      header: 'Products',
      type: Columntype.listObjectCount,
      width: '15%',
      sortable: true,
    },
    {
      field: 'TotalPrice',
      header: 'Total Price',
      type: Columntype.Currency,
      width: '15%',
      sortable: true
    },

    {
      field: 'actions',
      header: 'Actions',
      type: Columntype.ActionMenu,
      sortable: false,
      width: '1%',
    },
    { field: '', header: '', width: '1%', type: Columntype.expanded },
  ];
  constructor(private orderService: OrderService, public FormHelperService: FormHelperService,
    private ProductService: ProductService) { }
  ngOnInit(): void {
    this.LoadList()
  }
  LoadList() {
    let userdata;
    this.orderService.getusers().subscribe(users => {
      userdata = users;
      this.orderService.getOrders().subscribe(res => {
        this.orderList = res
      })
    });


    const thisRef = this;
    this.groupedData = [];

    this.orderList.forEach(order => {
      order.User = userdata.find(x => x.Id == order.UserId)
      order.TotalPrice = order.Products.reduce(
        (acc: number, product: Product) => {
          let orignalProduct: Product;
          this.ProductService.getProduct(product.ProductId).subscribe(Response => {
            orignalProduct = Response;
          })
          return acc + orignalProduct.ProductPrice * product.Quantity
        },
        0)
      const existingGroup = this.groupedData.find(
        group => group.UserId === order.UserId)

      if (existingGroup != undefined) {
        existingGroup.items.push(order);
      } else {
        this.groupedData.push({
          UserId: order.UserId,
          User: order.User,

          items: [order],
        });
      }
      thisRef.expandedRows[order.UserId] = true;
    });

    this.expandedRows = Object.assign({}, this.expandedRows);
  }
}
