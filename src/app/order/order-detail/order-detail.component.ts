import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrderService } from "../order.service";
import { OrderModel } from "../order";
import { OrderCartUtil } from "../../shared/cart-order.util";
import { AuthService } from "../../authentication/auth.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId = 0
  order: OrderModel | undefined
  isAdmin: boolean | undefined = false

  constructor(private route: ActivatedRoute, private orderService: OrderService,
              private  authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()

    this.route.params.subscribe(params => {
       this.orderId = +params['orderId']

       this.orderService.getOrderById(this.orderId).subscribe((order) => {
         this.order = order.content
       }, (error) => {
         alert('Failed to fetch order. You either have no access to this order or it does not exist anymore')
       })
    });
  }

  calculateTotal(): number {
    if(this.order != undefined) {
      return OrderCartUtil.calculateTotal(this.order.productOrders)
    }
    return 0
  }
}