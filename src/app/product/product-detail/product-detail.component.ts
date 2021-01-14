import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { ProductModel } from '../../shared/models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  currentProductId: number = 0
  product: ProductModel | undefined = undefined
  @ViewChild('orderForm') orderForm: NgForm | any;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.currentProductId = params.productId as number;
    });
    this.getProductById(this.currentProductId);
  }

  getProductById(id: number){
    this.productService.getProductById(id).subscribe((product) => {
        this.product = product.content[0];
      }, error => {
        alert("Something went wrong! Please try again later");
      });
  }

  addToShoppingCart() {
    // TODO add to shopping cart or go to finalize order page.
    const isAddedToCart = this.cartService.addProductToShoppingCart({
      amount: this.orderForm.value.amount,
      product: this.product,
    });
    if (isAddedToCart) {
      alert(`${this.orderForm.value.amount} ${this.product.productName} added to cart`)
    } else {
      alert('Could not add product, please try again later')
    }
    return isAddedToCart
  }
  
}
