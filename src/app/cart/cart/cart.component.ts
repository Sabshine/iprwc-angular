import { Component, OnInit } from '@angular/core';
import { ProductAmountModel } from "../../shared/models/product-amount.model";
import { CartService } from "../cart.service";
import { ProductModel } from "../../shared/models/product.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: ProductAmountModel[] | undefined
  cartIsEmpty: Boolean;
  cartProducts : ProductModel[] | undefined
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getShoppingCartItems()
    this.cartIsEmpty = this.cartItems.length > 0
    this.cartProducts = this.cartItems.map((i: ProductAmountModel) => i.product)
  }

  onCartItemUpdated(item: ProductAmountModel) {
    if(this.cartItems) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i] === item) {
          this.cartItems[i] = item;
        }
      }
      this.cartService.setCartItems(this.cartItems)
    }
  }

  onCartItemRemoved(item: ProductAmountModel) {
    if(this.cartItems) {
      for(let i = 0; i < this.cartItems.length; i++){
        if (this.cartItems[i] === item) {
          this.cartItems.splice(i, 1);
        }
      }
      this.cartService.setCartItems(this.cartItems)
    }
  }

  onClearCart() {
    if (this.cartItems) {
      this.cartService.setCartItems([])
      this.cartItems = []
    }
  }
}