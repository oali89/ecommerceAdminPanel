import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { Product } from 'src/app/products/models/product';

@Injectable({
  providedIn: 'root'
})
export class FormHelperService {

  constructor(private router: Router) {

  }

  getFirstChars(Name) {
    let firstTwoLetters = '';
    if (Name != null) {
      const spaceIndex = Name.indexOf(' ');
      if (spaceIndex === -1) {
        firstTwoLetters = Name.substring(0, 2);
      } else {
        firstTwoLetters =
          Name.substring(0, 1) + Name.substring(spaceIndex + 1, spaceIndex + 2);
      }
    }
    return firstTwoLetters;
  }
  getProductSeverity(product: Product) {
    if (product.AvailablePieces >= 20) {

      return 'success';
    } else if (product.AvailablePieces < 20) {
      return 'warning';

    }
    else if (product.AvailablePieces == 0) { return 'danger'; }
    return null
  };
  getProductStatus(product: Product) {
    if (product.AvailablePieces >= 20) {
      return 'INSTOCK';
    } else if (product.AvailablePieces < 20) {
      return 'LOWSTOCK';
    }
    else if (product.AvailablePieces == 0) { return 'OUTOFSTOCK'; }
    return null
  };
}
