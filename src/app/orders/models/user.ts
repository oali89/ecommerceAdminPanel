import { Order } from "./order";

export class User {
  Address: string
  Email: string
  Id: string;
  Name: string
  Phone: string
  RegisterDate: Date;
  orderlst?: Order[]
}
