import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  isUserAdmin: boolean | undefined

  constructor(private router: Router, private authService: AuthService, private productService: ProductService) { }

  ngOnInit(): void {
    this.isUserAdmin = this.authService.isAdmin();
  }

  onCardClick(productId: number) {
    this.router.navigate(["product/" + productId])
  }

  onDelete(productId: number) {
    this.productService.deleteProduct(productId).subscribe();
    alert(`Delete product ${this.product.productName}`);
    window.location.reload();
  }

  onEdit(productId: number) {
    this.router.navigate(["products/edit/" + productId])
  }

}
