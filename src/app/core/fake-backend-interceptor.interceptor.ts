import { Order } from './../orders/models/order';
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import orderData from './data/orders.json';
import productsData from './data/porducts.json';
import UsersData from './data/users.json';


const dataFilePath = './data/orders.json';

@Injectable()
export class FakeBackendInterceptorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private httpClient: HttpClient) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();
    function handleRoute() {

      switch (true) {
        case url.endsWith('/Orders') && method === 'GET':
          return getOrders();

        case url.endsWith('/Products') && method === 'GET':
          return getProducts();

        case url.includes('/Products/') && method === 'GET': {

          const id = parseInt(url.split('/').pop() || '', 10);
          return getProduct(id);
        }


        case url.includes('/Orders/') && method === 'GET': {

          const id = parseInt(url.split('/').pop() || '', 10);
          return getOrder(id);
        }
        case url.endsWith('/users') && method === 'GET':
          return getUserOrders();
        case url.includes('/users/') && method === 'GET': {
          const id = url.split('/').pop();
          return getUser(id);
        }
        case url.endsWith('/Orders') && method === 'POST': {
          // Extract the product object from the request body
          let order = request.body;
          return of(new HttpResponse({ status: 200, body: { messege: 'added successfully' } }));


          return AddNewOrder(order, this.httpClient);
        }
        default:
          return next.handle(request);
      }
    }
  }


}
function getOrders() {
  // if (!isLoggedIn()) return unauthorized();

  return of(new HttpResponse({ status: 200, body: orderData }));
}
function getProduct(id) {
  let product = productsData.find(pro => pro.ProductId == id)
  return of(new HttpResponse({ status: 200, body: product }));
}
function getProducts() {
  return of(new HttpResponse({ status: 200, body: productsData }));
}

function getUserOrders() {
  // if (!isLoggedIn()) return unauthorized();
  return of(new HttpResponse({ status: 200, body: UsersData }));
}

function getOrder(id) {
  let order = orderData.find(ord => ord.OrderId == id)
  return of(new HttpResponse({ status: 200, body: order }));
}

function getUser(id) {
  let user = UsersData.find(u => u.Id == id)
  return of(new HttpResponse({ status: 200, body: user }));
}
function AddNewOrder(order, httpClient: HttpClient) {

  const options = { Headers, responseType: 'json' as 'blob' };

  httpClient.put('http://localhost:4200/assets/data/data.json', order, options)
  return of(new HttpResponse({ status: 200, body: { messege: 'added successfully' } }));


}
