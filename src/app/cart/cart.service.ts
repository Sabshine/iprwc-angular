import { Injectable } from '@angular/core';
import { ProductAmountModel } from "../shared/models/product-amount.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartSubject = new BehaviorSubject(this.getShoppingCartItems());
  constructor() { }

  getShoppingCartItems(): ProductAmountModel[] {
    try {
      const cartItems = localStorage.getItem('shoppingCartItems')
      const items = JSON.parse(<string>cartItems) as ProductAmountModel[];
      if (items === null) {
        return []
      }
      return items
    }
     catch (e) {
      return []
    }
  }

  addProductToShoppingCart(item: ProductAmountModel): boolean {
    try {
      // add to existing products
      let currentShoppingItems = this.getShoppingCartItems();

      // if same product we want to add to the existing amount
      const existingProductIndex = currentShoppingItems.findIndex(
        (cartItem) => cartItem.product.productId == item.product.productId)

      if (existingProductIndex !== -1) {
        currentShoppingItems[existingProductIndex].amount += item.amount
      } else {
        currentShoppingItems.push(item)
      }
      localStorage.setItem('shoppingCartItems', JSON.stringify(currentShoppingItems));
      this.cartSubject.next(currentShoppingItems)
      return true
    } catch (e) {
      return false
    }
  }

  setCartItems(items: ProductAmountModel[]) {
    localStorage.setItem('shoppingCartItems', JSON.stringify(items));
    this.cartSubject.next(items)
  }

  clearShoppingCart() {
    localStorage.removeItem('shoppingCartItems')
    this.cartSubject.next([])
  }
}