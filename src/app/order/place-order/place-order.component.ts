import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { OrderItemModel } from 'src/app/shared/models/order-item.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  shoppingCartItems: OrderItemModel[] | undefined
  constructor(private cartService: CartService, private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCartItems = this.cartService.getShoppingCartItems()
  }

  onPayed(): void {
    const cartItems = this.cartService.getShoppingCartItems()
      if(cartItems.length === 0) {
        alert('You have no items in your shopping cart. First add items then come back to this page.')
        return
      }
      this.orderService.placeOrder({
        // @ts-ignore
        customer: localStorage.getItem('userId'),
        productOrders: cartItems
      }).subscribe((response) => {
        alert('Placed order! You will be redirected to the order page')
        this.cartService.clearShoppingCart()
        setTimeout(
          () => {
          this.router.navigate(["orders/"])
        }, 3000)
      , (error) => {
        alert('Failed to place order. Please try again later')
      }
    })
  }
}
