import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from '../../authentication/auth.service';
import { OrderItemModel } from '../models/order-item.model';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  currentPage: string = 'home'
  isLoggedIn: boolean | undefined
  isUserAdmin: boolean | undefined
  cartItems: OrderItemModel[] | undefined

  constructor(private router: Router, private cartService: CartService, private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  //   this.activatedRoute.paramMap.subscribe( paramMap => {
  //     console.log(paramMap.get('home'))
  // })
    this.authService.isLoggedInSubject.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isUserAdmin = this.authService.isAdmin();
    this.cartService.cartSubject.subscribe((newShoppingCartItems) => {
      this.cartItems = newShoppingCartItems
    })
  }

  onLogin() {
    this.currentPage = 'login'
    this.router.navigate(['/login']);
  }

  onLogout() {
    // localStorage.removeItem('expirationDate');
    this.currentPage = 'logout'
    window.localStorage.clear()
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  onOrders() {
    this.isUserAdmin = this.authService.isAdmin()
    if (this.isUserAdmin){
      this.currentPage = 'all-orders'
      this.router.navigate(['/all'])
    } else {
      this.currentPage = 'orders'
      this.router.navigate(['/orders'])
    }
  }

  goToAddProducts(){
    this.currentPage = 'product'
    this.router.navigate(['/products/add'])
  }

  goToHome() {
    this.currentPage = 'home'
    this.router.navigate(['/home'])
  }

  goToCart() {
    this.currentPage = 'cart'
    this.router.navigate(['/cartitems'])
  }

}
