import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>("http://localhost:4200/Orders")
  }
  getusers(): Observable<User[]> {
    return this.httpClient.get<User[]>("http://localhost:4200/users")
  }
  AddNewOrder() {

    return this.httpClient.post("http://localhost:4200/Orders", {})

  }
}
