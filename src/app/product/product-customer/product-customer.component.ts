import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/authentication/user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-customer',
  templateUrl: './product-customer.component.html',
  styleUrls: ['./product-customer.component.css']
})
export class ProductCustomerComponent implements OnInit {
  products = []
  username = 'test'
  
  constructor(private router: Router, private productService: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUserInfo();
  }

  getProducts(){
    this.productService.getProducts().subscribe((product) => {
        this.products = product.content;
      }, error => {
        alert(error);
      });
  }

  getUserInfo(){
    this.userService.getUserInfo(localStorage.getItem('usermail')).subscribe();
  }
}
