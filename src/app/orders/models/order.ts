import { Product } from "src/app/products/models/product"
import { User } from "./user";

export class Order {
  OrderDate: Date;
  OrderId: number;
  PaymentType: string;
  Products: Product[];
  UserId: string;
  User?: User;
  TotalPrice?: number
}
