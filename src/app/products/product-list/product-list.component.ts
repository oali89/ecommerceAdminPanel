import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Column, Columntype, mapEnum } from 'src/app/shared/models/Column';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  constructor(
    private ProductService: ProductService) { }
  productList: Product[];
  columns: Column[] = [
    { field: 'ProductImg', header: '', sortable: false, type: Columntype.image },
    { field: 'ProductName', header: 'Product Name', sortable: true, type: Columntype.String },
    { field: 'ProductPrice', header: 'Product Price', type: Columntype.Currency, sortable: true },

    { field: 'AvailablePieces', header: 'Available Pieces', sortable: true, type: Columntype.Number }
  ];
  sortOrder!: number;

  sortField!: string;
  Columntypelst = Columntype
  sortOptions!: SelectItem[];
  layout: string = 'list';

  ngOnInit() {

    this.ProductService.getProducts().subscribe(res => { this.productList = res })
    this.sortOptions = [
      { label: 'Price High to Low', value: '!ProductPrice' },
      { label: 'Price Low to High', value: 'ProductPrice' }
    ];
  }


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
  getSeverity(product: Product) {
    if (product.AvailablePieces >= 20) {

      return 'success';
    } else if (product.AvailablePieces < 20) {
      return 'warning';

    }
    else if (product.AvailablePieces == 0) { return 'danger'; }
    return null
  };
  getStatus(product: Product) {
    if (product.AvailablePieces >= 20) {
      return 'INSTOCK';
    } else if (product.AvailablePieces < 20) {
      return 'LOWSTOCK';
    }
    else if (product.AvailablePieces == 0) { return 'OUTOFSTOCK'; }
    return null
  };
}
