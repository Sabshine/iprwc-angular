import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { OrderModel } from "./order";
import { AuthService } from "../authentication/auth.service";
import { UserModel } from "../authentication/user.model";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  placeOrder(order: OrderModel): Observable<any>{
    let sendingOrder: Object[] = []

    // @ts-ignore
    for (let i = 0; i < order.productOrders.length; i++) {
      // @ts-ignore
      const productOrder = order.productOrders[i] as any
      sendingOrder.push({
        productId: productOrder.product.productId,
        amount: productOrder.amount,
      })
    }
    return this.httpClient.post('orders/user/' + localStorage.getItem('userId'), sendingOrder
    )
  }

  getOrdersOfCustomer(): Observable<OrderModel[]> {
    return this.httpClient.get<OrderModel[]>(`orders/user/` + localStorage.getItem('userId'))
  }

  // You can only fetch this if the user is an admin
  getAllOrders(): Observable<any> {
    return this.httpClient.get<OrderModel[]>('orders/')
  }

  getOrderById(orderId: number): Observable<any> {
    return this.httpClient.get<OrderModel>(`orders/${orderId}`)
  }
}