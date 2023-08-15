import { Order } from './../orders/models/order';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import orderData from './data/orders.json';
import productsData from './data/porducts.json';
import UsersData from './data/users.json';
import { User } from '../orders/models/user';


const users = {
  "users": [
    {
      "name": "chidume nnamdi",
      "age": 26
    },
    {
      "name": "chisom",
      "age": 46
    },
    {
      "name": "elvis",
      "age": 21
    },
    {
      "name": "osy mattew",
      "age": 21
    },
    {
      "name": "valentine",
      "age": 21
    },
  ]
}
const orders = orderData
const products = productsData
@Injectable()
export class FakeBackendInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();
    function handleRoute() {

      switch (true) {
        case url.endsWith('/Orders') && method === 'GET':
          return getOrders();

        case url.endsWith('/Products') && method === 'GET':
          return getProducts();
        case url.endsWith('/users') && method === 'GET':
          return getUserOrders();

        default:
          return next.handle(request);
        // if (request.method === "GET" && request.url === "http://localhost:4200/users") {
        //   return of(new HttpResponse({ status: 200, body: users }));
        // }
        // else {
        //   return next.handle(request);
        // }
        //  switch (true) {
        //           case url.endsWith('/users') && method === 'GET':
        //               return getUsers();
        //           default:
        //               // pass through any requests not handled above
        //               return next.handle(request);
        // }
      }
    }
  }

}
function getOrders() {
  // if (!isLoggedIn()) return unauthorized();
  return of(new HttpResponse({ status: 200, body: orderData }));
}
function getProducts() {
  // if (!isLoggedIn()) return unauthorized();
  return of(new HttpResponse({ status: 200, body: productsData }));
}

function getUserOrders() {
  // if (!isLoggedIn()) return unauthorized();
  return of(new HttpResponse({ status: 200, body: UsersData }));
}


