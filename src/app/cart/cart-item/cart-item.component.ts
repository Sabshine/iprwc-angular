import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ProductAmountModel } from "../../shared/models/product-amount.model";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  amount = 1
  @Input() editable = true
  @Input() cartItem: ProductAmountModel | undefined | any
  @Output() updated: EventEmitter<ProductAmountModel> = new EventEmitter();
  @Output() removed: EventEmitter<ProductAmountModel> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    if(this.cartItem) {
      this.amount = this.cartItem.amount
    }
  }

  onRemove() {
    this.removed.emit(this.cartItem);
  }

  updateAmount(event: any) {
    if(this.cartItem) {
      this.cartItem.amount = this.amount
      this.updated.emit(this.cartItem)
    }
  }

}