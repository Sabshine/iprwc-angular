import { Component, Input, OnInit} from '@angular/core';
import { OrderItemModel } from "../../shared/models/order-item.model";
import { OrderCartUtil } from "../../shared/cart-order.util";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-order',
  templateUrl: './cart-order.component.html',
  styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {
  @Input() cartItems: OrderItemModel[] | undefined
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  calculateTotal(): number {
    if(this.cartItems != undefined) {
      return OrderCartUtil.calculateTotal(this.cartItems)
    }
    return 0
  }

  onPlaceOrder() {
    this.router.navigate(['place-order'])
  }
}