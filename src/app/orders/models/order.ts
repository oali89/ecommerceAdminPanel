import { Product } from "src/app/products/models/product"
import { User } from "./user";

export class Order {
  OrderDate: string;
  OrderId: number;
  PaymentType: string;
  Products: Product[];
  UserId: string;
  User?: User;
}
