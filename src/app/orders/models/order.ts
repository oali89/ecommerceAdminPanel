import { Product } from "src/app/products/models/product"

export class Order {
  OrderDate: Date;
  OrderId: number;
  PaymentType: string;
  Products: Product[];
  UserId: string;
}
