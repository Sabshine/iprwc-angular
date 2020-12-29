import { ProductModel } from "./product.model";

export interface OrderItemModel {
  product: ProductModel
  amount: number
}