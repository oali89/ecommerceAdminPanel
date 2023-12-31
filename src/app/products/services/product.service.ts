import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:4200/Products")
  }
  getProduct(id): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:4200/Products/" + id)
  }
}
