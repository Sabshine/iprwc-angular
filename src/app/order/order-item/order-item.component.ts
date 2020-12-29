import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderCartUtil } from "../../shared/cart-order.util";
import { OrderModel } from "../order";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: OrderModel | undefined
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  calculateTotal(): number {
    if(this.order != undefined) {
      return OrderCartUtil.calculateTotal(this.order.productOrders)
    }
    return 0
  }

  onOrderDetails(orderId) {
    this.router.navigate(["detail/" + orderId])
  }
}