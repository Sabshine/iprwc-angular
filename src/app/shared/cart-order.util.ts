import { ProductAmountModel } from "./models/product-amount.model";

export class OrderCartUtil {
  static calculateTotal(items: ProductAmountModel[]) {
    let totalAmount = 0;
    for (let i = 0; i < items.length; i++) {
      const cartItem = items[i];
      totalAmount += cartItem.amount * parseInt(cartItem.product.productPrice)
    }

    return totalAmount
  }
}