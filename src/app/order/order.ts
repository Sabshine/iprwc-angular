import { UserModel } from "../authentication/user.model";
import { OrderItemModel } from "../shared/models/order-item.model";

export interface OrderModel {
  orderId: number;
  orderDate: Date
  orderStatus: string
  user: UserModel;
  productOrders: OrderItemModel[];
}